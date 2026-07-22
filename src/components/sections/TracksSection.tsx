import { useState } from 'react';

const TRACKS = [
  {
    id: 'medicine',
    name: 'مسار الطب وعلوم الحياة',
    colorClass: 'emerald',
    bgColor: 'bg-emerald-600',
    textColor: 'text-emerald-600',
    darkTextColor: 'dark:text-emerald-400',
    lightBg: 'bg-emerald-50',
    darkBg: 'dark:bg-emerald-900/20',
    borderColor: 'border-emerald-200',
    darkBorderColor: 'dark:border-emerald-800',
    icon: '🏥',
    description: 'للطلاب الذين يطمحون للعمل في المجالات الطبية والبحثية',
    grade2: ['التربية الدينية', 'اللغة العربية', 'التاريخ المصري', 'اللغة الأجنبية الأولى', 'الأحياء', 'الكيمياء', 'اللغة الإنجليزية'],
    grade3: ['التربية الدينية', 'اللغة العربية', 'التاريخ المصري', 'اللغة الأجنبية الأولى', 'الأحياء (مستوى رفيع)', 'الكيمياء'],
    colleges: ['كلية الطب البشري', 'كلية طب الأسنان', 'كلية الصيدلة', 'كلية العلوم (قسم الأحياء)', 'كلية الطب البيطري', 'كلية التمريض']
  },
  {
    id: 'engineering',
    name: 'مسار الهندسة وعلوم الحاسب',
    colorClass: 'indigo',
    bgColor: 'bg-indigo-600',
    textColor: 'text-indigo-600',
    darkTextColor: 'dark:text-indigo-400',
    lightBg: 'bg-indigo-50',
    darkBg: 'dark:bg-indigo-900/20',
    borderColor: 'border-indigo-200',
    darkBorderColor: 'dark:border-indigo-800',
    icon: '💻',
    description: 'للطلاب الذين يحبون التكنولوجيا والابتكار وحل المشاكل',
    grade2: ['التربية الدينية', 'اللغة العربية', 'التاريخ المصري', 'اللغة الأجنبية الأولى', 'الرياضيات', 'الفيزياء', 'اللغة الإنجليزية'],
    grade3: ['التربية الدينية', 'اللغة العربية', 'التاريخ المصري', 'اللغة الأجنبية الأولى', 'الرياضيات (مستوى رفيع)', 'الفيزياء'],
    colleges: ['كلية الهندسة (جميع التخصصات)', 'كلية العلوم (قسم الفيزياء)', 'كلية الحاسبات والمعلومات', 'كلية تكنولوجيا المعلومات']
  },
  {
    id: 'business',
    name: 'مسار الأعمال',
    colorClass: 'amber',
    bgColor: 'bg-amber-600',
    textColor: 'text-amber-600',
    darkTextColor: 'dark:text-amber-400',
    lightBg: 'bg-amber-50',
    darkBg: 'dark:bg-amber-900/20',
    borderColor: 'border-amber-200',
    darkBorderColor: 'dark:border-amber-800',
    icon: '📊',
    description: 'للطلاب المهتمين بالإدارة والاقتصاد والمال',
    grade2: ['التربية الدينية', 'اللغة العربية', 'التاريخ المصري', 'اللغة الأجنبية الأولى', 'الرياضيات', 'الاقتصاد', 'اللغة الإنجليزية'],
    grade3: ['التربية الدينية', 'اللغة العربية', 'التاريخ المصري', 'اللغة الأجنبية الأولى', 'اقتصاد (مستوى رفيع)', 'الرياضيات'],
    colleges: ['كلية التجارة', 'إدارة الأعمال', 'الاقتصاد والعلوم السياسية', 'نظم المعلومات الإدارية (MIS)', 'السياحة والفنادق']
  },
  {
    id: 'arts',
    name: 'مسار الآداب والفنون',
    colorClass: 'rose',
    bgColor: 'bg-rose-600',
    textColor: 'text-rose-600',
    darkTextColor: 'dark:text-rose-400',
    lightBg: 'bg-rose-50',
    darkBg: 'dark:bg-rose-900/20',
    borderColor: 'border-rose-200',
    darkBorderColor: 'dark:border-rose-800',
    icon: '📚',
    description: 'للطلاب الذين يحبون اللغات والإبداع والتواصل',
    grade2: ['التربية الدينية', 'اللغة العربية', 'التاريخ المصري', 'اللغة الأجنبية الأولى', 'اللغة الإنجليزية', 'التاريخ'],
    grade3: ['التربية الدينية', 'اللغة العربية', 'التاريخ المصري', 'اللغة الأجنبية الأولى', 'جغرافيا (مستوى رفيع)', 'الإحصاء'],
    colleges: ['كلية الآداب', 'الألسن واللغات والترجمة', 'الإعلام والاتصال الجماهيري', 'الحقوق والدراسات القانونية', 'كلية التربية', 'الفنون الجميلة']
  }
];

export default function TracksSection() {
  const [activeTrack, setActiveTrack] = useState('medicine');

  const track = TRACKS.find(t => t.id === activeTrack)!;

  return (
    <section id="tracks" className="py-16 md:py-24 px-4 border-t border-slate-200 dark:border-slate-800 scroll-mt-24">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">الدليل الشامل للمسارات والكليات المتاحة</h2>
          <p className="text-slate-600 dark:text-slate-400">اختر المسار الذي يناسبك لمعرفة المواد والكليات المتاحة</p>
        </div>

        {/* Track Tabs */}
        <div className="flex flex-wrap justify-center gap-3 mb-8 md:mb-12">
          {TRACKS.map(t => (
            <button
              key={t.id}
              onClick={() => setActiveTrack(t.id)}
              className={`px-4 md:px-6 py-2 md:py-3 rounded-xl font-bold transition-all active:scale-95 whitespace-nowrap ${
                activeTrack === t.id
                  ? `${t.bgColor} text-white shadow-lg hover:shadow-xl`
                  : `bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:shadow-md`
              }`}
            >
              <span className="mr-2">{t.icon}</span>
              {t.name}
            </button>
          ))}
        </div>

        {/* Track Details */}
        <div className="max-w-4xl mx-auto bg-white dark:bg-slate-800 rounded-2xl shadow-lg border border-slate-200 dark:border-slate-700 p-6 md:p-8 animate-fade-in-up">
          <div className="mb-8">
            <h3 className={`text-2xl md:text-3xl font-bold mb-2 ${track.textColor} ${track.darkTextColor}`}>
              {track.icon} {track.name}
            </h3>
            <p className="text-slate-600 dark:text-slate-400 text-lg">{track.description}</p>
          </div>

          {/* Subjects Grid */}
          <div className="grid md:grid-cols-2 gap-8 mb-8">
            <div>
              <h4 className={`font-bold text-lg mb-4 ${track.textColor} ${track.darkTextColor}`}>مقررات الصف الثاني ({track.grade2.length} مواد)</h4>
              <ul className="space-y-3">
                {track.grade2.map((subject, idx) => (
                  <li key={idx} className={`${track.lightBg} ${track.darkBg} p-3 rounded-lg border ${track.borderColor} ${track.darkBorderColor} shadow-sm flex items-center gap-3`}>
                    <span className={`w-6 h-6 rounded-full ${track.bgColor} text-white flex items-center justify-center text-xs shrink-0 font-bold`}>
                      {idx + 1}
                    </span>
                    <span className="font-semibold text-slate-800 dark:text-slate-200">{subject}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className={`font-bold text-lg mb-4 ${track.textColor} ${track.darkTextColor}`}>مقررات الصف الثالث ({track.grade3.length} مواد)</h4>
              <ul className="space-y-3">
                {track.grade3.map((subject, idx) => (
                  <li key={idx} className={`${track.lightBg} ${track.darkBg} p-3 rounded-lg border ${track.borderColor} ${track.darkBorderColor} shadow-sm flex items-center gap-3`}>
                    <span className={`w-6 h-6 rounded-full ${track.bgColor} text-white flex items-center justify-center text-xs shrink-0 font-bold`}>
                      {idx + 1}
                    </span>
                    <span className="font-semibold text-slate-800 dark:text-slate-200">{subject}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Available Colleges */}
          <div className={`pt-6 border-t ${track.borderColor} ${track.darkBorderColor}`}>
            <h4 className={`font-bold text-lg mb-4 ${track.textColor} ${track.darkTextColor} flex items-center gap-2`}>
              🏛️ الكليات المتاحة لخريجي هذا المسار
            </h4>
            <div className="flex flex-wrap gap-2">
              {track.colleges.map((college, idx) => (
                <span
                  key={idx}
                  className={`px-4 py-2 ${track.lightBg} ${track.darkBg} ${track.textColor} ${track.darkTextColor} border ${track.borderColor} ${track.darkBorderColor} rounded-lg text-sm font-bold shadow-sm hover:shadow-md transition-all`}
                >
                  {college}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
