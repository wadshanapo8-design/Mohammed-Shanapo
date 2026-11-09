import React, { useState } from 'react';
import { Bell, Check, Sparkles, Truck, Clock, Smartphone, AlertCircle, Loader2 } from 'lucide-react';
import { validateSubscriberInput } from '../utils/menuData';

export const OnlineOrderingNotice: React.FC = () => {
  const [emailOrPhone, setEmailOrPhone] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successInfo, setSuccessInfo] = useState<{ message: string; alreadySubscribed: boolean } | null>(null);
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    // Pre-validation
    const validation = validateSubscriberInput(emailOrPhone);
    if (!validation.isValid) {
      setErrorMessage(validation.error || 'يرجى إدخال رقم هاتف أو بريد إلكتروني صالح');
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch('/api/notifications/subscribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contact: emailOrPhone.trim(),
        }),
      });

      const data = await response.json().catch(() => null);

      if (!response.ok || !data?.success) {
        throw new Error(data?.error || `فشل الحفظ في الخادم (رمز الاستجابة: ${response.status})`);
      }

      setSuccessInfo({
        message: data.message || 'تم تسجيلك بنجاح!',
        alreadySubscribed: Boolean(data.alreadySubscribed),
      });
      setEmailOrPhone('');
    } catch (err: unknown) {
      const errorText = err instanceof Error ? err.message : 'تعذر الاتصال بالخادم، يرجى المحاولة لاحقاً.';
      setErrorMessage(errorText);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="py-16 bg-gradient-to-r from-red-950/40 via-stone-900 to-amber-950/40 border-y border-stone-800 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="rounded-3xl bg-stone-900/80 border border-amber-500/30 p-6 sm:p-10 lg:p-12 shadow-2xl backdrop-blur-md">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            <div className="lg:col-span-8 text-right">
              <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-400 bg-amber-950/60 px-3.5 py-1 rounded-full border border-amber-500/30 mb-4">
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                <span>قريباً في كت كاك</span>
              </div>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white mb-3">
                خدمة الطلب عبر الإنترنت والتوصيل
              </h2>
              <p className="text-stone-300 text-sm sm:text-base leading-relaxed mb-6 max-w-2xl">
                نعمل على تجهيز خدمة الطلب الإلكتروني المباشر لتتمكن من اختيار وجباتك المفضلة من البروست والمشاوي والبيتزا والعصائر بضغطة زر واحدة.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 text-xs font-semibold text-stone-300">
                <div className="flex items-center gap-2.5 bg-stone-950/60 p-3 rounded-xl border border-stone-800">
                  <Smartphone className="w-4 h-4 text-amber-400 shrink-0" />
                  <span>طلب مباشر من الجوال</span>
                </div>
                <div className="flex items-center gap-2.5 bg-stone-950/60 p-3 rounded-xl border border-stone-800">
                  <Truck className="w-4 h-4 text-red-400 shrink-0" />
                  <span>توصيل ساخن وسريع</span>
                </div>
                <div className="flex items-center gap-2.5 bg-stone-950/60 p-3 rounded-xl border border-stone-800">
                  <Clock className="w-4 h-4 text-orange-400 shrink-0" />
                  <span>تحديث دوري لحالة الطلب</span>
                </div>
              </div>
            </div>

            <div className="lg:col-span-4 flex flex-col items-center lg:items-end justify-center">
              <div className="w-full max-w-sm bg-stone-950/90 p-5 rounded-2xl border border-stone-800 text-center">
                <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-red-600 to-amber-500 flex items-center justify-center mx-auto mb-3 text-white shadow-lg shadow-red-950/50">
                  <Bell className="w-6 h-6" />
                </div>
                <h3 className="text-sm font-bold text-white mb-1">
                  كن أول من يعلم عند إطلاق الخدمة
                </h3>
                <p className="text-stone-400 text-xs mb-4">
                  سجل رقمك أو بريدك لحفظ بياناتك في خادم الإشعارات والتنبيه الفوري
                </p>

                {successInfo ? (
                  <div className="p-4 rounded-xl bg-emerald-950/60 border border-emerald-500/40 text-emerald-300 text-xs font-bold text-right animate-in zoom-in-95">
                    <div className="flex items-center gap-2 mb-1.5 text-emerald-400">
                      <Check className="w-4 h-4 shrink-0" />
                      <span>{successInfo.alreadySubscribed ? 'مسجل مسبقاً' : 'تم الحفظ بنجاح'}</span>
                    </div>
                    <p className="text-[11px] leading-relaxed text-stone-200">
                      {successInfo.message}
                    </p>
                    <button
                      onClick={() => setSuccessInfo(null)}
                      className="mt-3 text-[11px] text-amber-400 hover:underline cursor-pointer block"
                    >
                      تسجيل وسيلة اتصال أخرى
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="flex flex-col gap-2.5">
                    {errorMessage && (
                      <div className="p-2.5 rounded-lg bg-red-950/70 border border-red-500/40 text-red-200 text-xs text-right flex items-center gap-1.5">
                        <AlertCircle className="w-3.5 h-3.5 text-red-400 shrink-0" />
                        <span>{errorMessage}</span>
                      </div>
                    )}
                    <label htmlFor="subscriber-input" className="sr-only">
                      رقم الهاتف أو البريد الإلكتروني
                    </label>
                    <input
                      id="subscriber-input"
                      type="text"
                      value={emailOrPhone}
                      onChange={(e) => setEmailOrPhone(e.target.value)}
                      placeholder="رقم الهاتف (مثال: 0912345678) أو البريد"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-stone-900 border border-stone-700 text-stone-100 placeholder:text-stone-500 text-xs focus:outline-none focus:border-amber-400 text-right min-h-[44px]"
                      required
                      disabled={isSubmitting}
                    />
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className={`w-full min-h-[44px] py-2.5 rounded-xl font-bold text-xs shadow-md transition-all cursor-pointer flex items-center justify-center gap-2 ${
                        isSubmitting
                          ? 'bg-stone-800 text-stone-400 cursor-not-allowed'
                          : 'bg-gradient-to-r from-red-600 to-amber-600 hover:from-red-500 hover:to-amber-500 text-white active:scale-98'
                      }`}
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="w-3.5 h-3.5 animate-spin text-amber-400" />
                          <span>جاري الحفظ في الخادم...</span>
                        </>
                      ) : (
                        <span>أبلغني عند الانطلاق</span>
                      )}
                    </button>
                  </form>
                )}
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};
