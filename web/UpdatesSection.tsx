const updates = [
  {
    icon: '📊',
    title: 'التقييم التراكمي',
    description: 'لا يعتمد المجموع الهائي على امتحان واحد فقط. بل يعتمد على تقييمات الفصلين الدراسيين والأعمال والمواظبة.',
    color: 'from-blue-400 to-blue-600'
  },
  {
    icon: '💻',
    title: 'الامتحانات الإلكترونية',
    description: 'تجرى الامتحانات بنظام الكتاب المفتوح على الأجهزة اللوحية. تركيز على الفهم العميق وليس الحفظ.',
    color: 'from-green-400 to-green-600'
  },
  {
    icon: '📈',
    title: 'التشعيب والمسارات',
    description: 'إتاحة التشعيب الدقيق والاستبدال به من الصف الثاني الثانوي. مسارات محددة لكل طالب حسب اهتماماته.',
    color: 'from-amber-400 to-amber-600'
  }
];

export default function UpdatesSection() {
  return (
    <section id="updates" className="py-16 md:py-24 px-4 border-t border-slate-200 dark:border-slate-800 scroll-mt-24 bg-slate-50/50 dark:bg-slate-900/30">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">ملامح النظام التعليمي الجديد</h2>
          <p className="text-slate-600 dark:text-slate-400 text-lg">تعرف على أبرز التطورات في النظام الجديد</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {updates.map((update, index) => (
            <div
              key={index}
              className={`bg-gradient-to-br ${update.color} p-6 md:p-8 rounded-2xl border border-white/20 shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 animate-fade-in-up group overflow-hidden relative`}
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {/* Animated background */}
              <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

              {/* Content */}
              <div className="relative z-10">
                <div className="text-5xl mb-4 group-hover:scale-110 transition-transform duration-300">{update.icon}</div>
                <h3 className="text-xl font-bold mb-3 text-white">{update.title}</h3>
                <p className="text-white/90 leading-relaxed text-sm md:text-base">{update.description}</p>
              </div>

              {/* Decorative element */}
              <div className="absolute top-0 right-0 w-20 h-20 bg-white/10 rounded-full -mr-10 -mt-10 group-hover:scale-150 transition-transform duration-300"></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
