import { useState } from 'react';
import TrackWizard from '@/components/TrackWizard';

export default function GuidanceSection() {
  return (
    <section id="guidance" className="py-16 md:py-24 px-4 border-t border-slate-200 dark:border-slate-800 scroll-mt-24">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-blue-600 dark:text-blue-400">
            كيف تختار مسارك؟
          </h2>
          <p className="text-slate-600 dark:text-slate-400 text-lg max-w-3xl mx-auto">
            الجمع بين التحليل الذاتي الدقيق واستخدام التكنولوجيا يساعدك على اتخاذ القرار الأكاديمي الأهم في حياتك.
          </p>
        </div>

        <div className="grid lg:grid-cols-12 gap-8 max-w-6xl mx-auto items-start">
          {/* Static Advice Panel */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-white dark:bg-slate-800 rounded-3xl p-8 shadow-lg border border-slate-200 dark:border-slate-700">
              <h3 className="text-xl font-bold mb-6 flex items-center gap-3 text-slate-800 dark:text-slate-100 border-b border-slate-100 dark:border-slate-700 pb-4">
                ✓ خطوات التقييم الذاتي
              </h3>

              <div className="space-y-6">
                {[
                  {
                    num: 1,
                    title: 'اكتشف شغفك الحقيقي',
                    desc: 'اختر المجال الذي يدفعك للتعلم المستمر، سواء كان الطب، الابتكار الهندسي، التجارة، أو الآداب.',
                    color: 'indigo'
                  },
                  {
                    num: 2,
                    title: 'حلل درجاتك الأكاديمية',
                    desc: 'الشغف وحده لا يكفي. قارن بين تفوقك في الرياضيات والفيزياء مقابل الأحياء والكيمياء واللغات.',
                    color: 'emerald'
                  },
                  {
                    num: 3,
                    title: 'تخيل بيئة عملك المستقبلية',
                    desc: 'ابحث عن طبيعة وظائف الخريجين لكل مسار، وتأكد أنها تتناسب مع نمط الحياة الذي تطمح إليه.',
                    color: 'amber'
                  },
                  {
                    num: 4,
                    title: 'استشر المتخصصين',
                    desc: 'تحدث مع معلميك وأولياء أمورك وخريجي المسارات المختلفة للحصول على رؤى عملية.',
                    color: 'rose'
                  }
                ].map((step, idx) => (
                  <div key={idx} className="flex gap-4 items-start group">
                    <div className={`flex-shrink-0 w-10 h-10 bg-${step.color}-50 dark:bg-${step.color}-900/30 text-${step.color}-600 dark:text-${step.color}-400 rounded-xl flex items-center justify-center font-bold transition-transform group-hover:scale-110`}>
                      {step.num}
                    </div>
                    <div>
                      <h4 className="font-bold mb-1 text-slate-800 dark:text-slate-200">{step.title}</h4>
                      <p className="text-sm text-slate-500 dark:text-slate-400">{step.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* AI Wizard Panel */}
          <div className="lg:col-span-7">
            <TrackWizard />
          </div>
        </div>
      </div>
    </section>
  );
}
