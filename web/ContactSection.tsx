import { useState } from 'react';
import { toast } from 'sonner';

export default function ContactSection() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      toast.success('تم إرسال رسالتك بنجاح! سنرد عليك قريباً.');
      e.currentTarget.reset();
    }, 1500);
  };

  return (
    <section id="contact" className="py-16 md:py-24 px-4 border-t border-slate-200 dark:border-slate-800 scroll-mt-24">
      <div className="container mx-auto max-w-4xl">
        <div className="bg-white dark:bg-slate-800 rounded-3xl shadow-xl overflow-hidden border border-slate-200 dark:border-slate-700 flex flex-col md:flex-row">
          {/* Left Panel */}
          <div className="md:w-2/5 bg-gradient-to-br from-blue-600 to-blue-700 text-white p-8 md:p-10 flex flex-col justify-center">
            <h3 className="text-3xl font-bold mb-4">هل لديك استفسار؟</h3>
            <p className="text-blue-100 mb-8 text-sm leading-relaxed">
              فريق الدعم الفني والأكاديمي في البكالوريا متواجد للرد على كافة أسئلتك بخصوص النظام الجديد والتسجيل في المنصة.
            </p>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <span className="text-2xl">✉️</span>
                <span className="text-sm">support@elbakaloria.com</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-2xl">📞</span>
                <span className="text-sm">+20 123 456 7890</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-2xl">📍</span>
                <span className="text-sm">القاهرة، مصر</span>
              </div>
            </div>
          </div>

          {/* Right Panel - Form */}
          <div className="md:w-3/5 p-8 md:p-10">
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-semibold mb-2 text-slate-700 dark:text-slate-300">
                    الاسم بالكامل
                  </label>
                  <input
                    type="text"
                    required
                    className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-600 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                    placeholder="أدخل اسمك"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-2 text-slate-700 dark:text-slate-300">
                    البريد الإلكتروني
                  </label>
                  <input
                    type="email"
                    required
                    className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-600 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                    placeholder="بريدك الإلكتروني"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2 text-slate-700 dark:text-slate-300">
                  نوع المستخدم
                </label>
                <select className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-600 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all">
                  <option>طالب</option>
                  <option>ولي أمر</option>
                  <option>معلم</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2 text-slate-700 dark:text-slate-300">
                  الموضوع
                </label>
                <input
                  type="text"
                  required
                  className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-600 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                  placeholder="موضوع رسالتك"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2 text-slate-700 dark:text-slate-300">
                  رسالتك
                </label>
                <textarea
                  rows={4}
                  required
                  className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-600 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all resize-none"
                  placeholder="اكتب رسالتك هنا..."
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-slate-900 dark:bg-blue-600 hover:bg-slate-800 dark:hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold py-3 rounded-lg transition-all active:scale-95 flex justify-center items-center gap-2"
              >
                {isSubmitting ? (
                  <>
                    <span className="inline-block animate-spin">⏳</span>
                    جاري الإرسال...
                  </>
                ) : (
                  <>
                    <span>إرسال الرسالة</span>
                    <span>✉️</span>
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
