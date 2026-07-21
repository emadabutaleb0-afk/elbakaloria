import { useState } from 'react';
import { Mail, Check } from 'lucide-react';
import { toast } from 'sonner';

const SUPPORT_EMAIL = 'support@elbakaloria.com';

export default function NewsletterSection() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      toast.error('البريد الإلكتروني غير صحيح');
      return;
    }

    setLoading(true);

    const subj = encodeURIComponent('طلب اشتراك جديد - منصة البكالوريا');
    const body = encodeURIComponent('بريد المشترك: ' + email);
    window.location.href = 'mailto:' + SUPPORT_EMAIL + '?subject=' + subj + '&body=' + body;

    setTimeout(() => {
      setLoading(false);
      setSubscribed(true);
      setEmail('');
      toast.success('تم فتح تطبيق البريد. أرسل طلب الاشتراك من هناك!');
      setTimeout(() => setSubscribed(false), 3000);
    }, 600);
  };

  return (
    <section className="py-20 px-4 bg-gradient-to-r from-blue-600 to-blue-700 dark:from-blue-900 dark:to-blue-800">
      <div className="max-w-4xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="text-white">
            <div className="inline-block mb-4 px-4 py-2 bg-white/20 rounded-full">
              <span className="text-sm font-semibold">📬 البقاء على اطلاع</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              اشترك في النشرة البريدية
            </h2>
            <p className="text-lg text-blue-100 mb-8">
              احصل على آخر المستجدات حول الكليات والمنح الدراسية والفرص الوظيفية مباشرة في بريدك الإلكتروني
            </p>

            {/* Benefits List */}
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <Check className="w-6 h-6 text-green-300 flex-shrink-0 mt-1" />
                <div>
                  <h4 className="font-semibold mb-1">آخر أخبار الكليات</h4>
                  <p className="text-blue-100 text-sm">تحديثات حول البرامج الجديدة والتخصصات</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Check className="w-6 h-6 text-green-300 flex-shrink-0 mt-1" />
                <div>
                  <h4 className="font-semibold mb-1">مواعيد التقديم والمنح</h4>
                  <p className="text-blue-100 text-sm">لا تفوت أي فرصة تقديم أو منحة دراسية</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Check className="w-6 h-6 text-green-300 flex-shrink-0 mt-1" />
                <div>
                  <h4 className="font-semibold mb-1">نصائح الاختيار الوظيفي</h4>
                  <p className="text-blue-100 text-sm">مقالات ونصائح من الخبراء والمتخصصين</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Check className="w-6 h-6 text-green-300 flex-shrink-0 mt-1" />
                <div>
                  <h4 className="font-semibold mb-1">فرص العمل والتدريب</h4>
                  <p className="text-blue-100 text-sm">عروض عمل وبرامج تدريب حصرية للمشتركين</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Form */}
          <div>
            <div className="bg-white dark:bg-slate-800 rounded-2xl p-8 shadow-2xl">
              {!subscribed ? (
                <>
                  <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">
                    اشترك الآن مجاناً
                  </h3>
                  <p className="text-slate-600 dark:text-slate-300 mb-6">
                    لا توجد رسوم إضافية، يمكنك إلغاء الاشتراك في أي وقت
                  </p>

                  <form onSubmit={handleSubscribe} className="space-y-4">
                    <div>
                      <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
                        البريد الإلكتروني
                      </label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
                        <input
                          type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="your@email.com"
                          className="w-full pl-10 pr-4 py-3 border-2 border-slate-200 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:border-blue-500 dark:focus:border-blue-400 transition-colors"
                          disabled={loading}
                        />
                      </div>
                    </div>

                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full py-3 px-6 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-bold rounded-lg transition-all duration-300 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                    >
                      {loading ? (
                        <>
                          <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                          جاري المعالجة...
                        </>
                      ) : (
                        <>
                          <Mail className="w-5 h-5" />
                          اشترك الآن
                        </>
                      )}
                    </button>

                    <p className="text-xs text-slate-500 dark:text-slate-400 text-center">
                      بالاشتراك، أوافق على سياسة الخصوصية وشروط الاستخدام
                    </p>
                  </form>
                </>
              ) : (
                <div className="text-center py-8">
                  <div className="w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Check className="w-8 h-8 text-green-600 dark:text-green-400" />
                  </div>
                  <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">
                    تم الاشتراك بنجاح! 🎉
                  </h3>
                  <p className="text-slate-600 dark:text-slate-300 mb-4">
                    شكراً لك على الاشتراك. تحقق من بريدك الإلكتروني للتأكيد
                  </p>
                  <p className="text-sm text-slate-500 dark:text-slate-400">
                    سنرسل لك أحدث المستجدات والعروض الحصرية قريباً
                  </p>
                </div>
              )}
            </div>

            {/* Trust Badges */}
            <div className="mt-6 flex items-center justify-center gap-4 text-white text-sm">
              <div className="flex items-center gap-1">
                <span>✓</span>
                <span>آمن وموثوق</span>
              </div>
              <div className="w-1 h-1 bg-white/50 rounded-full"></div>
              <div className="flex items-center gap-1">
                <span>✓</span>
                <span>بدون إزعاج</span>
              </div>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16 pt-16 border-t border-white/20">
          <div className="text-center text-white">
            <div className="text-4xl font-bold mb-2">50K+</div>
            <p className="text-blue-100">طالب مشترك</p>
          </div>
          <div className="text-center text-white">
            <div className="text-4xl font-bold mb-2">200+</div>
            <p className="text-blue-100">كلية وجامعة</p>
          </div>
          <div className="text-center text-white">
            <div className="text-4xl font-bold mb-2">1000+</div>
            <p className="text-blue-100">فرصة وظيفية</p>
          </div>
        </div>
      </div>
    </section>
  );
}
