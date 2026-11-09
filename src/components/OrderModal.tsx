import React, { useState, useEffect } from 'react';
import { X, ShoppingBag, Plus, Minus, MessageCircle, Send, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';
import { MenuItem, SOCIAL_CONFIG } from '../utils/menuData';

interface OrderModalProps {
  item: MenuItem | null;
  onClose: () => void;
}

export const OrderModal: React.FC<OrderModalProps> = ({ item, onClose }) => {
  const [selectedSize, setSelectedSize] = useState<string>('');
  const [quantity, setQuantity] = useState<number>(1);
  const [customerName, setCustomerName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [notes, setNotes] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [confirmedOrder, setConfirmedOrder] = useState<{
    orderId: string;
    message: string;
    totalDisplay: string;
  } | null>(null);

  // Initialize selected size when item changes
  useEffect(() => {
    if (item && item.sizes && item.sizes.length > 0) {
      setSelectedSize(item.sizes[0].name);
    } else {
      setSelectedSize('');
    }
    setQuantity(1);
    setErrorMessage('');
    setConfirmedOrder(null);
  }, [item]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!item) return null;

  // Compute active price string
  const getActivePrice = (): string => {
    if (item.sizes && item.sizes.length > 0) {
      const match = item.sizes.find((s) => s.name === selectedSize);
      return match ? match.price : item.sizes[0].price;
    }
    return item.basePrice;
  };

  const activeUnitPrice = getActivePrice();

  // Helper to calculate total price if price is numeric format like 25.000
  const calculateTotal = (): string => {
    const cleaned = activeUnitPrice.replace(/[^0-9.]/g, '');
    const num = parseFloat(cleaned);
    if (!isNaN(num) && num > 0) {
      const total = (num * quantity).toFixed(3);
      return total;
    }
    return activeUnitPrice;
  };

  const totalPrice = calculateTotal();

  // Format order summary for WhatsApp
  const handleOrderViaWhatsApp = () => {
    if (!customerName.trim() || customerName.trim().length < 2) {
      setErrorMessage('يرجى كتابة اسم العميل لإتمام الطلب.');
      return;
    }
    if (!phone.trim() || phone.trim().length < 7) {
      setErrorMessage('يرجى إدخال رقم الهاتف للتواصل.');
      return;
    }

    const orderText = `*🍗 طلب جديد من موقع كت كاك - KET KAK*
-----------------------------
*الصنف:* ${item.name} (${item.englishName})
${selectedSize ? `*الحجم المختار:* ${selectedSize}` : ''}
*الكمية:* ${quantity}
*سعر الوحدة:* ${activeUnitPrice}
*الإجمالي المتوقع:* ${totalPrice}
-----------------------------
*بيانات العميل:*
*الاسم:* ${customerName.trim()}
*الهاتف:* ${phone.trim()}
${address.trim() ? `*العنوان / مكان التوصيل:* ${address.trim()}` : ''}
${notes.trim() ? `*ملاحظات إضافية:* ${notes.trim()}` : ''}
-----------------------------
أرجو تأكيد استلام الطلب والوقت المتوقع للتجهيز.`;

    const encoded = encodeURIComponent(orderText);
    const whatsappUrl = `https://wa.me/?text=${encoded}`;
    window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
  };

  // Direct backend digital order
  const handleDirectOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    if (!customerName.trim() || customerName.trim().length < 2) {
      setErrorMessage('يرجى كتابة الاسم بشكل صحيح (حرفين على الأقل).');
      return;
    }

    if (!phone.trim() || phone.trim().length < 7) {
      setErrorMessage('يرجى إدخال رقم هاتف صحيح للتواصل.');
      return;
    }

    setIsSubmitting(true);

    try {
      const payload = {
        customerName: customerName.trim(),
        phone: phone.trim(),
        address: address.trim(),
        notes: notes.trim(),
        items: [
          {
            itemId: item.id,
            name: item.name,
            size: selectedSize || 'قياسي',
            quantity,
            unitPrice: activeUnitPrice,
            totalPrice,
          },
        ],
      };

      const response = await fetch('/api/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json().catch(() => null);

      if (!response.ok || !data?.success) {
        throw new Error(data?.error || 'تعذر إرسال الطلب إلى الخادم');
      }

      setConfirmedOrder({
        orderId: data.orderId,
        message: data.message,
        totalDisplay: totalPrice,
      });
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'حدث خطأ في الاتصال، يرجى المحاولة لاحقاً.';
      setErrorMessage(msg);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200 select-none overflow-y-auto"
      role="dialog"
      aria-modal="true"
      aria-label={`طلب صنف ${item.name}`}
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-lg bg-stone-900 border border-stone-800 rounded-3xl overflow-hidden shadow-2xl text-right animate-in zoom-in-95 duration-200 max-h-[92vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Bar */}
        <div className="flex items-center justify-between px-6 py-4 bg-stone-950 border-b border-stone-800">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-amber-400" />
            <h3 className="text-lg font-bold text-white">طلب صنف من كت كاك</h3>
          </div>
          <button
            onClick={onClose}
            className="min-h-[44px] min-w-[44px] p-2 rounded-xl bg-stone-900 hover:bg-stone-800 text-stone-400 hover:text-white transition-colors cursor-pointer flex items-center justify-center"
            aria-label="إغلاق نافذة الطلب"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="p-6 overflow-y-auto space-y-6">
          {confirmedOrder ? (
            <div className="text-center py-6 animate-in zoom-in-95">
              <CheckCircle2 className="w-16 h-16 text-emerald-400 mx-auto mb-4" />
              <h4 className="text-2xl font-black text-white mb-2">تم تسجيل طلبك بنجاح!</h4>
              <p className="text-stone-300 text-sm leading-relaxed mb-4">
                {confirmedOrder.message}
              </p>
              <div className="p-4 rounded-2xl bg-stone-950 border border-emerald-500/30 text-right space-y-2 mb-6">
                <div className="flex justify-between text-xs text-stone-400">
                  <span>رقم الطلب:</span>
                  <span className="font-mono text-amber-400 font-bold">{confirmedOrder.orderId}</span>
                </div>
                <div className="flex justify-between text-xs text-stone-400">
                  <span>الصنف المطلوب:</span>
                  <span className="text-white font-semibold">{item.name} {selectedSize && `(${selectedSize})`} × {quantity}</span>
                </div>
                <div className="flex justify-between text-xs text-stone-400 pt-2 border-t border-stone-800">
                  <span>إجمالي القيمة:</span>
                  <span className="text-lg font-black font-mono text-emerald-400 tabular-nums">{confirmedOrder.totalDisplay}</span>
                </div>
              </div>

              <button
                onClick={onClose}
                className="w-full min-h-[44px] py-3 rounded-xl bg-stone-800 hover:bg-stone-700 text-white font-bold text-sm transition-colors cursor-pointer"
              >
                تم والعودة للقائمة
              </button>
            </div>
          ) : (
            <>
              {/* Item Overview Mini Card */}
              <div className="flex items-center gap-4 p-3.5 rounded-2xl bg-stone-950 border border-stone-800">
                <div className="w-16 h-16 rounded-xl overflow-hidden bg-stone-900 shrink-0 border border-stone-800">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="text-base font-bold text-white truncate">{item.name}</h4>
                  <p className="text-xs text-stone-400 truncate">{item.categoryTitle}</p>
                  <p className="text-sm font-mono font-bold text-amber-400 mt-1 tabular-nums">
                    سعر الوحدة: {activeUnitPrice}
                  </p>
                </div>
              </div>

              {/* Size Selector (If multiple sizes available) */}
              {item.sizes && item.sizes.length > 0 && (
                <div>
                  <label className="block text-xs font-bold text-stone-300 mb-2">
                    اختر الحجم المطلوب:
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                    {item.sizes.map((s, idx) => {
                      const isSelected = selectedSize === s.name;
                      return (
                        <button
                          key={idx}
                          type="button"
                          onClick={() => setSelectedSize(s.name)}
                          className={`p-2.5 rounded-xl border text-xs font-bold transition-all cursor-pointer flex flex-col items-center justify-between min-h-[52px] ${
                            isSelected
                              ? 'bg-red-950/80 border-red-500 text-white shadow-md'
                              : 'bg-stone-950 border-stone-800 text-stone-400 hover:border-stone-700 hover:text-white'
                          }`}
                        >
                          <span>{s.name}</span>
                          <span className="font-mono text-amber-400 text-xs mt-0.5 tabular-nums">
                            {s.price}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Quantity Selector */}
              <div className="flex items-center justify-between p-3.5 rounded-2xl bg-stone-950 border border-stone-800">
                <span className="text-sm font-bold text-stone-300">الكمية المطلوبة:</span>
                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    disabled={quantity <= 1}
                    className={`min-h-[44px] min-w-[44px] rounded-xl flex items-center justify-center border transition-colors cursor-pointer ${
                      quantity <= 1
                        ? 'bg-stone-900 border-stone-800 text-stone-600 cursor-not-allowed'
                        : 'bg-stone-900 hover:bg-stone-800 border-stone-700 text-white'
                    }`}
                    aria-label="إنقاص الكمية"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="font-mono text-lg font-bold text-white min-w-[24px] text-center tabular-nums">
                    {quantity}
                  </span>
                  <button
                    type="button"
                    onClick={() => setQuantity((q) => Math.min(20, q + 1))}
                    className="min-h-[44px] min-w-[44px] rounded-xl bg-stone-900 hover:bg-stone-800 border border-stone-700 text-white flex items-center justify-center transition-colors cursor-pointer"
                    aria-label="زيادة الكمية"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Total Calculation Strip */}
              <div className="p-3.5 rounded-2xl bg-amber-950/30 border border-amber-500/30 flex items-center justify-between">
                <span className="text-xs font-bold text-stone-300">الإجمالي المتوقع:</span>
                <span className="text-xl font-black font-mono text-amber-400 tabular-nums">
                  {totalPrice}
                </span>
              </div>

              {/* Customer Details Form */}
              <form onSubmit={handleDirectOrder} className="space-y-3.5">
                {errorMessage && (
                  <div className="p-3 rounded-xl bg-red-950/70 border border-red-500/40 text-red-200 text-xs font-semibold flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
                    <span>{errorMessage}</span>
                  </div>
                )}

                <div>
                  <label htmlFor="order-customer-name" className="block text-xs font-bold text-stone-300 mb-1">
                    اسم العميل <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="order-customer-name"
                    type="text"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    placeholder="أدخل اسمك الكريم"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-stone-950 border border-stone-700 text-white placeholder:text-stone-500 text-xs focus:outline-none focus:border-amber-400 text-right min-h-[44px]"
                    required
                    disabled={isSubmitting}
                  />
                </div>

                <div>
                  <label htmlFor="order-phone" className="block text-xs font-bold text-stone-300 mb-1">
                    رقم الهاتف للتواصل <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="order-phone"
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="رقم الهاتف للتأكيد (مثال: 0912345678)"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-stone-950 border border-stone-700 text-white placeholder:text-stone-500 text-xs focus:outline-none focus:border-amber-400 text-right min-h-[44px]"
                    required
                    disabled={isSubmitting}
                  />
                </div>

                <div>
                  <label htmlFor="order-address" className="block text-xs font-bold text-stone-300 mb-1">
                    العنوان / طاولة الصالة (اختياري)
                  </label>
                  <input
                    id="order-address"
                    type="text"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    placeholder="مكان التوصيل أو رقم الطاولة داخل المطعم"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-stone-950 border border-stone-700 text-white placeholder:text-stone-500 text-xs focus:outline-none focus:border-amber-400 text-right min-h-[44px]"
                    disabled={isSubmitting}
                  />
                </div>

                <div>
                  <label htmlFor="order-notes" className="block text-xs font-bold text-stone-300 mb-1">
                    ملاحظات على الطلب (اختياري)
                  </label>
                  <input
                    id="order-notes"
                    type="text"
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="مثال: بدون شطة، زيادة ثومية، إلخ..."
                    className="w-full px-3.5 py-2.5 rounded-xl bg-stone-950 border border-stone-700 text-white placeholder:text-stone-500 text-xs focus:outline-none focus:border-amber-400 text-right min-h-[44px]"
                    disabled={isSubmitting}
                  />
                </div>

                {/* Two Action Buttons: Direct Server Order or WhatsApp Order */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-4">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`min-h-[44px] py-3 px-4 rounded-xl font-bold text-xs shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer ${
                      isSubmitting
                        ? 'bg-stone-800 text-stone-400 cursor-not-allowed'
                        : 'bg-gradient-to-r from-red-600 via-red-500 to-amber-500 hover:from-red-500 hover:to-amber-400 text-white active:scale-98'
                    }`}
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin text-amber-400" />
                        <span>جاري الحفظ...</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4 text-amber-200" />
                        <span>تأكيد الطلب المباشر</span>
                      </>
                    )}
                  </button>

                  <button
                    type="button"
                    onClick={handleOrderViaWhatsApp}
                    className="min-h-[44px] py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer border border-emerald-400/30"
                  >
                    <MessageCircle className="w-4 h-4 text-white" />
                    <span>طلب فوري عبر واتساب</span>
                  </button>
                </div>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
