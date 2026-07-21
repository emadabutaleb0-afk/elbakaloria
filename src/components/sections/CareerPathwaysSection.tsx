import { useState } from 'react';
import { ChevronRight, TrendingUp } from 'lucide-react';

interface CareerPath {
  track: string;
  subjects: string[];
  colleges: string[];
  careers: string[];
  salaryRange: string;
  color: string;
}

const CAREER_PATHS: CareerPath[] = [
  {
    track: 'الطب وعلوم الحياة',
    subjects: ['الأحياء', 'الكيمياء', 'الإنجليزية', 'التربية الدينية'],
    colleges: ['الطب البشري', 'طب الأسنان', 'الصيدلة', 'العلوم', 'الطب البيطري'],
    careers: ['طبيب', 'صيدلاني', 'باحث علمي', 'طبيب أسنان', 'ممرض'],
    salaryRange: '15,000 - 50,000 ريال',
    color: 'from-red-500 to-pink-500'
  },
  {
    track: 'الهندسة وعلوم الحاسب',
    subjects: ['الرياضيات', 'الفيزياء', 'الإنجليزية', 'التربية الدينية'],
    colleges: ['الهندسة', 'الحاسبات والمعلومات', 'تكنولوجيا المعلومات', 'العلوم'],
    careers: ['مهندس برمجيات', 'مهندس مدني', 'مطور ويب', 'محلل بيانات', 'مهندس شبكات'],
    salaryRange: '12,000 - 45,000 ريال',
    color: 'from-blue-500 to-cyan-500'
  },
  {
    track: 'الأعمال',
    subjects: ['الرياضيات', 'الاقتصاد', 'الإنجليزية', 'التربية الدينية'],
    colleges: ['التجارة', 'إدارة الأعمال', 'الاقتصاد والعلوم السياسية', 'نظم المعلومات'],
    careers: ['محاسب', 'مدير مشروع', 'محلل مالي', 'رائد أعمال', 'مستشار أعمال'],
    salaryRange: '10,000 - 40,000 ريال',
    color: 'from-amber-500 to-orange-500'
  },
  {
    track: 'الآداب والفنون',
    subjects: ['اللغة العربية', 'اللغة الإنجليزية', 'التاريخ', 'الجغرافيا'],
    colleges: ['الآداب', 'الألسن واللغات', 'الإعلام', 'الحقوق', 'التربية'],
    careers: ['معلم', 'صحفي', 'مترجم', 'محامي', 'كاتب'],
    salaryRange: '8,000 - 35,000 ريال',
    color: 'from-purple-500 to-pink-500'
  }
];

export default function CareerPathwaysSection() {
  const [selectedPath, setSelectedPath] = useState<number>(0);
  const [expandedStep, setExpandedStep] = useState<string | null>('subjects');

  const currentPath = CAREER_PATHS[selectedPath];

  return (
    <section className="py-20 px-4 bg-gradient-to-b from-slate-50 to-white dark:from-slate-900 dark:to-slate-800">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-block mb-4">
            <span className="px-4 py-2 bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 rounded-full text-sm font-semibold">
              🚀 مسارات النجاح الوظيفي
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-4">
            رحلتك من المسار إلى الحلم الوظيفي
          </h2>
          <p className="text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
            اكتشف المسار الكامل من اختيار التخصص إلى الوظيفة والراتب المتوقع
          </p>
        </div>

        {/* Track Selection */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
          {CAREER_PATHS.map((path, index) => (
            <button
              key={index}
              onClick={() => {
                setSelectedPath(index);
                setExpandedStep('subjects');
              }}
              className={`p-4 rounded-xl transition-all duration-300 transform hover:scale-105 ${
                selectedPath === index
                  ? `bg-gradient-to-br ${path.color} text-white shadow-lg scale-105`
                  : 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white border-2 border-slate-200 dark:border-slate-600 hover:border-slate-300'
              }`}
            >
              <h3 className="font-bold text-sm md:text-base">{path.track}</h3>
            </button>
          ))}
        </div>

        {/* Flowchart */}
        <div className="bg-white dark:bg-slate-800 rounded-2xl p-8 shadow-lg border border-slate-200 dark:border-slate-700">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Step 1: Subjects */}
            <div className="relative">
              <button
                onClick={() => setExpandedStep(expandedStep === 'subjects' ? null : 'subjects')}
                className="w-full p-6 bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900 dark:to-blue-800 rounded-xl border-2 border-blue-300 dark:border-blue-600 hover:shadow-lg transition-all cursor-pointer"
              >
                <div className="text-3xl mb-2">📚</div>
                <h4 className="font-bold text-slate-900 dark:text-white mb-2">المواد الدراسية</h4>
                <p className="text-sm text-slate-600 dark:text-slate-300">{currentPath.subjects.length} مواد</p>
              </button>
              {expandedStep === 'subjects' && (
                <div className="absolute top-full left-0 right-0 mt-2 p-4 bg-white dark:bg-slate-700 rounded-xl shadow-lg border border-slate-200 dark:border-slate-600 z-10">
                  <ul className="space-y-2">
                    {currentPath.subjects.map((subject, idx) => (
                      <li key={idx} className="flex items-center gap-2 text-slate-700 dark:text-slate-300">
                        <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                        {subject}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              <div className="hidden lg:block absolute -right-3 top-1/2 transform -translate-y-1/2">
                <ChevronRight className="w-6 h-6 text-slate-400" />
              </div>
            </div>

            {/* Step 2: Colleges */}
            <div className="relative">
              <button
                onClick={() => setExpandedStep(expandedStep === 'colleges' ? null : 'colleges')}
                className="w-full p-6 bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900 dark:to-purple-800 rounded-xl border-2 border-purple-300 dark:border-purple-600 hover:shadow-lg transition-all cursor-pointer"
              >
                <div className="text-3xl mb-2">🏫</div>
                <h4 className="font-bold text-slate-900 dark:text-white mb-2">الكليات المتاحة</h4>
                <p className="text-sm text-slate-600 dark:text-slate-300">{currentPath.colleges.length} كليات</p>
              </button>
              {expandedStep === 'colleges' && (
                <div className="absolute top-full left-0 right-0 mt-2 p-4 bg-white dark:bg-slate-700 rounded-xl shadow-lg border border-slate-200 dark:border-slate-600 z-10">
                  <ul className="space-y-2">
                    {currentPath.colleges.map((college, idx) => (
                      <li key={idx} className="flex items-center gap-2 text-slate-700 dark:text-slate-300">
                        <span className="w-2 h-2 bg-purple-500 rounded-full"></span>
                        {college}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              <div className="hidden lg:block absolute -right-3 top-1/2 transform -translate-y-1/2">
                <ChevronRight className="w-6 h-6 text-slate-400" />
              </div>
            </div>

            {/* Step 3: Careers */}
            <div className="relative">
              <button
                onClick={() => setExpandedStep(expandedStep === 'careers' ? null : 'careers')}
                className="w-full p-6 bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900 dark:to-green-800 rounded-xl border-2 border-green-300 dark:border-green-600 hover:shadow-lg transition-all cursor-pointer"
              >
                <div className="text-3xl mb-2">💼</div>
                <h4 className="font-bold text-slate-900 dark:text-white mb-2">الفرص الوظيفية</h4>
                <p className="text-sm text-slate-600 dark:text-slate-300">{currentPath.careers.length} وظائف</p>
              </button>
              {expandedStep === 'careers' && (
                <div className="absolute top-full left-0 right-0 mt-2 p-4 bg-white dark:bg-slate-700 rounded-xl shadow-lg border border-slate-200 dark:border-slate-600 z-10">
                  <ul className="space-y-2">
                    {currentPath.careers.map((career, idx) => (
                      <li key={idx} className="flex items-center gap-2 text-slate-700 dark:text-slate-300">
                        <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                        {career}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              <div className="hidden lg:block absolute -right-3 top-1/2 transform -translate-y-1/2">
                <ChevronRight className="w-6 h-6 text-slate-400" />
              </div>
            </div>

            {/* Step 4: Salary */}
            <div>
              <div className="w-full p-6 bg-gradient-to-br from-amber-50 to-amber-100 dark:from-amber-900 dark:to-amber-800 rounded-xl border-2 border-amber-300 dark:border-amber-600">
                <div className="text-3xl mb-2">💰</div>
                <h4 className="font-bold text-slate-900 dark:text-white mb-2">الراتب المتوقع</h4>
                <p className="text-sm font-semibold text-amber-700 dark:text-amber-300">{currentPath.salaryRange}</p>
              </div>
            </div>
          </div>

          {/* Mobile Flowchart Info */}
          <div className="lg:hidden mt-8 p-6 bg-slate-100 dark:bg-slate-700 rounded-xl">
            <p className="text-sm text-slate-600 dark:text-slate-300 text-center">
              اضغط على أي خطوة أعلاه لعرض التفاصيل
            </p>
          </div>
        </div>

        {/* Info Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
          <div className="p-6 bg-blue-50 dark:bg-blue-900/30 rounded-xl border border-blue-200 dark:border-blue-700">
            <TrendingUp className="w-8 h-8 text-blue-600 dark:text-blue-400 mb-3" />
            <h3 className="font-bold text-slate-900 dark:text-white mb-2">نمو الفرص</h3>
            <p className="text-sm text-slate-600 dark:text-slate-300">
              الطلب على التخصصات التقنية والطبية يزداد بنسبة 15% سنوياً
            </p>
          </div>
          <div className="p-6 bg-green-50 dark:bg-green-900/30 rounded-xl border border-green-200 dark:border-green-700">
            <div className="text-2xl mb-3">🎓</div>
            <h3 className="font-bold text-slate-900 dark:text-white mb-2">مسار واضح</h3>
            <p className="text-sm text-slate-600 dark:text-slate-300">
              كل مسار له مسار واضح من الدراسة إلى الوظيفة والتطور الوظيفي
            </p>
          </div>
          <div className="p-6 bg-purple-50 dark:bg-purple-900/30 rounded-xl border border-purple-200 dark:border-purple-700">
            <div className="text-2xl mb-3">🌍</div>
            <h3 className="font-bold text-slate-900 dark:text-white mb-2">فرص عالمية</h3>
            <p className="text-sm text-slate-600 dark:text-slate-300">
              التخصصات المختارة توفر فرص عمل محلية وعالمية متميزة
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
