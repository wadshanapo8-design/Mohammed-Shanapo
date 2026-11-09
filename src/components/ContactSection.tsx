import React, { useState } from 'react';
import { MessageSquare, Send, CheckCircle2, AlertCircle, Loader2, HeartHandshake } from 'lucide-react';
import { validateContactForm, SOCIAL_CONFIG } from '../utils/menuData';

export const ContactSection: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    topic: 'استفسار عام',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedMessageId, setSubmittedMessageId] = useState<string | null>(null);
  const [serverSuccessMessage, setServerSuccessMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    // Client-side pre-validation
    const validation = validateContactForm(formData.name, formData.message);
    if (!validation.isValid) {
      setErrorMessage(validation.error || 'يرجى مراجعة البيانات المدخلة');
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name.trim(),
          topic: formData.topic,
          message: formData.message.trim(),
        }),
      });

      const data = await response.json().catch(() => null);

      if (!response.ok || !data?.success) {
        throw new Error(data?.error || `فشل إرسال الرسالة (رمز الاستجابة: ${response.status})`);
      }

      // Confirmed real server success
      setSubmittedMessageId(data.messageId || 'MSG-RECEIVED');
      setServerSuccessMessage(data.message || 'تم استلام رسالتك وحفظها بنجاح في نظام إدارة كت كاك.');
      setFormData({ name: '', topic: 'استفسار عام', message: '' });
    } catch (err: unknown) {
      const errorText = err instanceof Error ? err.message : 'تعذر الاتصال بالخادم، يرجى المحاولة لاحقاً.';
      setErrorMessage(errorText);
    } finally {
      setIsSubmitting(false);
    }
  };

  const socialChannels = [
    {
      name: 'واتساب',
      english: 'WhatsApp',
      href: SOCIAL_CONFIG.whatsapp,
      icon: '💬',
      desc: 'محادثة مباشرة واستفسارات',
      color: 'hover:border-emerald-500/60 hover:text-emerald-400 group-hover:border-emerald-500/60',
    },
    {
      name: 'إنستغرام',
      english: 'Instagram',
      href: SOCIAL_CONFIG.instagram,
      icon: '📸',
      desc: 'صور الوجبات واليوميات',
      color: 'hover:border-pink-500/60 hover:text-pink-400 group-hover:border-pink-500/60',
    },
    {
      name: 'فيسبوك',
      english: 'Facebook',
      href: SOCIAL_CONFIG.facebook,
      icon: '👍',
      desc: 'الصفحة الرسمية والأخبار',
      color: 'hover:border-blue-500/60 hover:text-blue-400 group-hover:border-blue-500/60',
    },
    {
      name: 'تيك توك',
      english: 'TikTok',
      href: SOCIAL_CONFIG.tiktok,
      icon: '🎵',
      desc: 'مقاطع وفيديوهات سريعة',
      color: 'hover:border-amber-400/60 hover:text-amber-300 group-hover:border-amber-400/60',
    },
  ];

  return (
    <section id="contact" className="py-20 bg-[#0e0c0a] relative border-t border-stone-800/80 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-400 bg-amber-950/40 px-3.5 py-1 rounded-full border border-amber-500/20 mb-3">
            <HeartHandshake className="w-3.5 h-3.5 text-amber-400" />
            <span>نحن في خدمتكم دائماً</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight mb-4">
            تواصل مع سلسلة مطاعم <span className="text-amber-400">كت كاك</span>
          </h2>
          <p className="text-stone-400 text-base sm:text-lg leading-relaxed">
            يسعدنا استقبال آرائكم واستفساراتكم وملاحظاتكم عبر القنوات الرسمية أو عبر إرسال رسالتكم مباشرة إلى إدارة المطعم.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          {/* Left Column: Real Working Social Links & Hospitality note */}
          <div className="lg:col-span-5 flex flex-col justify-between text-right">
            <div>
              <h3 className="text-xl font-bold text-white mb-3">
                قنوات التواصل والمتابعة
              </h3>
              <p className="text-stone-300 text-sm leading-relaxed mb-6">
                اضغط على أي منصة للتواصل المباشر معنا ومتابعة كل ما هو جديد في كت كاك:
              </p>

              {/* Real Clickable Social Channels */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
                {socialChannels.map((social, idx) => (
                  <a
                    key={idx}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`p-4 rounded-2xl bg-stone-900/90 border border-stone-800 transition-all flex items-center gap-3 cursor-pointer group ${social.color}`}
                    aria-label={`زيارة حساب ${social.name} الرسمي`}
                  >
                    <span className="text-2xl shrink-0" aria-hidden="true">{social.icon}</span>
                    <div className="min-w-0">
                      <div className="text-sm font-bold text-white group-hover:text-amber-400 transition-colors truncate">
                        {social.name}
                      </div>
                      <div className="text-[11px] text-stone-400 truncate">
                        {social.desc}
                      </div>
                    </div>
                  </a>
                ))}
              </div>
            </div>

            {/* Quality Statement Box */}
            <div className="p-5 rounded-2xl bg-stone-950 border border-stone-800 text-xs text-stone-400 leading-relaxed">
              <span className="text-amber-400 font-bold block mb-1">✦ خدمة الزبائن:</span>
              نرحب بجميع الملاحظات والاستفسارات، ويهمنا تقديم تجربة طعام طيبة ومرضية لكل زائر.
            </div>
          </div>

          {/* Right Column: Customer Inquiries Form with Real Backend Connection */}
          <div className="lg:col-span-7">
            <div className="rounded-3xl bg-stone-900/90 border border-stone-800 p-6 sm:p-8 shadow-xl text-right">
              <h3 className="text-xl font-bold text-white mb-2 flex items-center gap-2">
                <MessageSquare className="w-5 h-5 text-amber-400" />
                <span>أرسل لنا رسالة أو اقتراح</span>
              </h3>
              <p className="text-stone-400 text-xs sm:text-sm mb-6">
                يتم إرسال رسالتك وحفظها على خادم إدارة مطاعم كت كاك لمتابعتها.
              </p>

              {submittedMessageId ? (
                <div className="p-6 rounded-2xl bg-emerald-950/60 border border-emerald-500/40 text-emerald-300 text-center animate-in zoom-in-95">
                  <CheckCircle2 className="w-12 h-12 text-emerald-400 mx-auto mb-3" />
                  <h4 className="text-lg font-bold text-white mb-1">تم استلام رسالتك وحفظها بنجاح!</h4>
                  <p className="text-xs text-emerald-300 mb-3">
                    {serverSuccessMessage}
                  </p>
                  <p className="text-[11px] font-mono text-emerald-400/80 bg-emerald-900/40 py-1 px-3 rounded-lg inline-block border border-emerald-500/30">
                    رقم مرجع الرسالة: {submittedMessageId}
                  </p>
                  <div className="mt-5">
                    <button
                      onClick={() => setSubmittedMessageId(null)}
                      className="px-4 py-2 rounded-xl bg-stone-900 hover:bg-stone-800 text-white text-xs font-bold border border-stone-700 transition-colors cursor-pointer"
                    >
                      إرسال رسالة أخرى
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  {errorMessage && (
                    <div className="p-3.5 rounded-xl bg-red-950/70 border border-red-500/40 text-red-200 text-xs font-semibold flex items-center gap-2">
                      <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
                      <span>{errorMessage}</span>
                    </div>
                  )}

                  <div>
                    <label htmlFor="contact-name" className="block text-xs font-bold text-stone-300 mb-1.5">
                      الاسم الكريم <span className="text-red-500">*</span>
                    </label>
                    <input
                      id="contact-name"
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="أدخل اسمك"
                      className="w-full px-4 py-3 rounded-xl bg-stone-950 border border-stone-700/80 text-white placeholder:text-stone-500 text-sm focus:outline-none focus:border-amber-400 text-right"
                      required
                      disabled={isSubmitting}
                      maxLength={70}
                    />
                  </div>

                  <div>
                    <label htmlFor="contact-topic" className="block text-xs font-bold text-stone-300 mb-1.5">
                      موضوع الرسالة
                    </label>
                    <select
                      id="contact-topic"
                      value={formData.topic}
                      onChange={(e) => setFormData({ ...formData, topic: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-stone-950 border border-stone-700/80 text-white text-sm focus:outline-none focus:border-amber-400 text-right cursor-pointer"
                      disabled={isSubmitting}
                    >
                      <option value="استفسار عام">استفسار عام عن المنيو</option>
                      <option value="اقتراح لتطوير الخدمة">اقتراح لتطوير الخدمة</option>
                      <option value="طلبات مناسبات وحفلات">طلبات مناسبات وحفلات</option>
                      <option value="رأي في طعام المطعم">رأي في طعام المطعم</option>
                    </select>
                  </div>

                  <div>
                    <label htmlFor="contact-message" className="block text-xs font-bold text-stone-300 mb-1.5">
                      نص الرسالة أو الملاحظة <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      id="contact-message"
                      rows={4}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="اكتب استفسارك أو ملاحظتك هنا..."
                      className="w-full px-4 py-3 rounded-xl bg-stone-950 border border-stone-700/80 text-white placeholder:text-stone-500 text-sm focus:outline-none focus:border-amber-400 text-right resize-none"
                      required
                      disabled={isSubmitting}
                      maxLength={1500}
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`w-full min-h-[44px] py-3.5 px-6 rounded-xl font-bold text-sm shadow-xl transition-all flex items-center justify-center gap-2 border border-amber-300/20 cursor-pointer ${
                      isSubmitting
                        ? 'bg-stone-800 text-stone-400 border-stone-700 cursor-not-allowed'
                        : 'bg-gradient-to-r from-red-600 via-red-500 to-amber-500 hover:from-red-500 hover:to-amber-400 text-white active:scale-98 shadow-red-950/40'
                    }`}
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin text-amber-400" />
                        <span>جاري إرسال الرسالة إلى الخادم...</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4 text-amber-200" />
                        <span>إرسال الرسالة</span>
                      </>
                    )}
                  </button>
                </form>
              )}

            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
