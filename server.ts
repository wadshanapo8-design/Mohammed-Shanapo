import express, { Request, Response } from 'express';
import { createServer as createViteServer } from 'vite';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;
const isProduction = process.env.NODE_ENV === 'production';

// Ensure data persistence directory exists
const DATA_DIR = path.resolve(__dirname, 'data');
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

const CONTACTS_FILE = path.join(DATA_DIR, 'contacts.json');
const SUBSCRIBERS_FILE = path.join(DATA_DIR, 'subscribers.json');
const ORDERS_FILE = path.join(DATA_DIR, 'orders.json');

// Initialize files if not present
if (!fs.existsSync(CONTACTS_FILE)) {
  fs.writeFileSync(CONTACTS_FILE, JSON.stringify([], null, 2), 'utf-8');
}
if (!fs.existsSync(SUBSCRIBERS_FILE)) {
  fs.writeFileSync(SUBSCRIBERS_FILE, JSON.stringify([], null, 2), 'utf-8');
}
if (!fs.existsSync(ORDERS_FILE)) {
  fs.writeFileSync(ORDERS_FILE, JSON.stringify([], null, 2), 'utf-8');
}

// Helper to read and write safely
function readJsonFile<T>(filePath: string): T[] {
  try {
    const raw = fs.readFileSync(filePath, 'utf-8');
    return JSON.parse(raw) as T[];
  } catch {
    return [];
  }
}

function writeJsonFile<T>(filePath: string, data: T[]): void {
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf-8');
}

// Middleware
app.use(express.json({ limit: '1mb' }));
app.use(express.urlencoded({ extended: true }));

// Rate limiting map (simple in-memory by IP)
const requestRateMap = new Map<string, { count: number; resetTime: number }>();
function checkRateLimit(ip: string, maxRequests = 10, windowMs = 60000): boolean {
  const now = Date.now();
  const entry = requestRateMap.get(ip);
  if (!entry || now > entry.resetTime) {
    requestRateMap.set(ip, { count: 1, resetTime: now + windowMs });
    return true;
  }
  if (entry.count >= maxRequests) {
    return false;
  }
  entry.count += 1;
  return true;
}

// -----------------------------------------------------------------------------
// API Endpoints
// -----------------------------------------------------------------------------

// Health check endpoint
app.get('/api/health', (_req: Request, res: Response) => {
  res.json({
    status: 'ok',
    service: 'ket-kak-api',
    time: new Date().toISOString()
  });
});

// Real Contact Form Handler
app.post('/api/contact', (req: Request, res: Response) => {
  const clientIp = req.ip || req.socket.remoteAddress || 'unknown';
  if (!checkRateLimit(clientIp, 8, 60000)) {
    res.status(429).json({
      success: false,
      error: 'لقد أرسلت عدة رسائل في وقت قصير، يرجى الانتظار دقيقة قبل المحاولة مجدداً.'
    });
    return;
  }

  const { name, topic, message } = req.body;

  // Validation
  if (!name || typeof name !== 'string' || name.trim().length < 2) {
    res.status(400).json({
      success: false,
      error: 'يرجى كتابة الاسم بشكل صحيح (حرفين على الأقل).'
    });
    return;
  }

  if (name.trim().length > 70) {
    res.status(400).json({
      success: false,
      error: 'الاسم طويل جداً (الحد الأقصى 70 حرفاً).'
    });
    return;
  }

  if (!message || typeof message !== 'string' || message.trim().length < 5) {
    res.status(400).json({
      success: false,
      error: 'يرجى كتابة نص الرسالة بوضوح (5 أحرف على الأقل).'
    });
    return;
  }

  if (message.trim().length > 1500) {
    res.status(400).json({
      success: false,
      error: 'نص الرسالة طويل جداً (الحد الأقصى 1500 حرف).'
    });
    return;
  }

  const validTopics = ['استفسار عام', 'اقتراح لتطوير الخدمة', 'طلبات مناسبات وحفلات', 'رأي في طعام المطعم'];
  const sanitizedTopic = typeof topic === 'string' && validTopics.includes(topic) ? topic : 'استفسار عام';

  const messageRecord = {
    id: `msg_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
    name: name.trim(),
    topic: sanitizedTopic,
    message: message.trim(),
    timestamp: new Date().toISOString(),
    ip: clientIp.replace(/^.*:/, '') // Strip IPv6 prefix for privacy
  };

  try {
    const existing = readJsonFile<typeof messageRecord>(CONTACTS_FILE);
    existing.push(messageRecord);
    writeJsonFile(CONTACTS_FILE, existing);

    res.status(200).json({
      success: true,
      messageId: messageRecord.id,
      timestamp: messageRecord.timestamp,
      message: 'تم استلام رسالتك بنجاح من قبل خادم إدارة كت كاك، وسيتم متابعتها باهتمام.'
    });
  } catch (err) {
    console.error('Failed to save contact message:', err);
    res.status(500).json({
      success: false,
      error: 'حدث خطأ في الخادم أثناء حفظ الرسالة، يرجى المحاولة لاحقاً.'
    });
  }
});

// Real Online Ordering Notification Subscription Handler
app.post('/api/notifications/subscribe', (req: Request, res: Response) => {
  const clientIp = req.ip || req.socket.remoteAddress || 'unknown';
  if (!checkRateLimit(clientIp, 8, 60000)) {
    res.status(429).json({
      success: false,
      error: 'يرجى الانتظار قليلاً قبل المحاولة مرة أخرى.'
    });
    return;
  }

  const { contact } = req.body;

  if (!contact || typeof contact !== 'string') {
    res.status(400).json({
      success: false,
      error: 'يرجى إدخال رقم الهاتف أو البريد الإلكتروني.'
    });
    return;
  }

  const trimmed = contact.trim();
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const phoneCleaned = trimmed.replace(/[\s\-\(\)]/g, '');
  const phoneRegex = /^\+?[0-9]{7,15}$/;

  let type: 'email' | 'phone';
  let normalized: string;

  if (emailRegex.test(trimmed)) {
    type = 'email';
    normalized = trimmed.toLowerCase();
  } else if (phoneRegex.test(phoneCleaned)) {
    type = 'phone';
    normalized = phoneCleaned;
  } else {
    res.status(400).json({
      success: false,
      error: 'يرجى إدخال بريد إلكتروني صحيح أو رقم هاتف صحيح (7 أرقام على الأقل).'
    });
    return;
  }

  interface SubscriberRecord {
    id: string;
    type: 'email' | 'phone';
    normalized: string;
    subscribedAt: string;
    ip: string;
  }

  try {
    const existing = readJsonFile<SubscriberRecord>(SUBSCRIBERS_FILE);
    const alreadyExists = existing.some(sub => sub.normalized === normalized);

    if (alreadyExists) {
      res.status(200).json({
        success: true,
        alreadySubscribed: true,
        message: 'أنت مسجل بالفعل في قائمة الإشعارات! سنقوم بإعلامك فور انطلاق الخدمة.'
      });
      return;
    }

    const newSubscriber: SubscriberRecord = {
      id: `sub_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
      type,
      normalized,
      subscribedAt: new Date().toISOString(),
      ip: clientIp.replace(/^.*:/, '')
    };

    existing.push(newSubscriber);
    writeJsonFile(SUBSCRIBERS_FILE, existing);

    res.status(200).json({
      success: true,
      alreadySubscribed: false,
      message: 'تم تسجيلك بنجاح! سنقوم بإشعارك فور انطلاق خدمة الطلب والتوصيل أونلاين.'
    });
  } catch (err) {
    console.error('Failed to save subscriber:', err);
    res.status(500).json({
      success: false,
      error: 'حدث خطأ في الخادم أثناء حفظ التسجيل، يرجى المحاولة لاحقاً.'
    });
  }
});

// Real Digital Order Submission Handler
app.post('/api/orders', (req: Request, res: Response) => {
  const clientIp = req.ip || req.socket.remoteAddress || 'unknown';
  if (!checkRateLimit(clientIp, 10, 60000)) {
    res.status(429).json({
      success: false,
      error: 'لقد قمت بإرسال عدة طلبات مؤخراً، يرجى الانتظار قليلاً.'
    });
    return;
  }

  const { customerName, phone, address, items, notes } = req.body;

  if (!customerName || typeof customerName !== 'string' || customerName.trim().length < 2) {
    res.status(400).json({
      success: false,
      error: 'يرجى إدخال اسم العميل بشكل صحيح.'
    });
    return;
  }

  if (!phone || typeof phone !== 'string' || phone.trim().length < 7) {
    res.status(400).json({
      success: false,
      error: 'يرجى إدخال رقم هاتف صالح للتواصل بخصوص الطلب.'
    });
    return;
  }

  if (!Array.isArray(items) || items.length === 0) {
    res.status(400).json({
      success: false,
      error: 'الطلب لا يحتوي على أي صنف.'
    });
    return;
  }

  const orderId = `ORD-${Date.now().toString().slice(-6)}-${Math.random().toString(36).substring(2, 5).toUpperCase()}`;

  const orderRecord = {
    id: orderId,
    customerName: customerName.trim(),
    phone: phone.trim(),
    address: typeof address === 'string' ? address.trim() : '',
    items,
    notes: typeof notes === 'string' ? notes.trim() : '',
    status: 'received',
    createdAt: new Date().toISOString(),
    ip: clientIp.replace(/^.*:/, '')
  };

  try {
    const existing = readJsonFile<typeof orderRecord>(ORDERS_FILE);
    existing.push(orderRecord);
    writeJsonFile(ORDERS_FILE, existing);

    res.status(200).json({
      success: true,
      orderId,
      createdAt: orderRecord.createdAt,
      message: `تم استلام طلبك بنجاح برقم (${orderId})! سيتواصل معك فريق كت كاك لتأكيد تفاصيل التوصيل.`
    });
  } catch (err) {
    console.error('Failed to save order:', err);
    res.status(500).json({
      success: false,
      error: 'حدث خطأ في الخادم أثناء تسجيل الطلب، يرجى التواصل هاتفياً أو عبر واتساب.'
    });
  }
});

// -----------------------------------------------------------------------------
// Vite Dev Server / Static Hosting
// -----------------------------------------------------------------------------
async function startServer() {
  if (!isProduction) {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa'
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.resolve(__dirname, 'dist');
    app.use(express.static(distPath));
    app.get('*', (_req: Request, res: Response) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`KET KAK full-stack server running on http://0.0.0.0:${PORT}`);
  });
}

startServer().catch((err) => {
  console.error('Failed to start server:', err);
  process.exit(1);
});
