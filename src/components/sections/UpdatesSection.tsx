import { useEffect, useRef, useState } from 'react';

const updates = [
  {
    icon: '📊',
    number: '01',
    title: 'التقييم التراكمي',
    description: 'لا يعتمد المجموع الهائي على امتحان واحد فقط. بل يعتمد على تقييمات الفصلين الدراسيين والأعمال والمواظبة.',
    tag: 'نظام جديد',
    gradient: 'from-blue-500 via-blue-600 to-indigo-600',
    glow: 'shadow-blue-500/30',
    hoverGlow: 'group-hover:shadow-blue-500/50',
    accent: 'bg-blue-500/10 text-blue-600 dark:text-blue-400',
    bar: 'from-blue-400 to-indigo-500',
    stats: ['فصلين دراسيين', 'تقييم مستمر', 'بدون حفظ'],
  },
  {
    icon: '💻',
    number: '02',
    title: 'الامتحانات الإلكترونية',
    description: 'تجرى الامتحانات بنظام الكتاب المفتوح على الأجهزة اللوحية. تركيز على الفهم العميق وليس الحفظ.',
    tag: 'تقنية حديثة',
    gradient: 'from-emerald-500 via-teal-500 to-cyan-600',
    glow: 'shadow-emerald-500/30',
    hoverGlow: 'group-hover:shadow-emerald-500/50',
    accent: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400',
    bar: 'from-emerald-400 to-teal-500',
    stats: ['أجهزة لوحية', 'كتاب مفتوح', 'فهم عميق'],
  },
  {
    icon: '📈',
    number: '03',
    title: 'التشعيب والمسارات',
    description: 'إتاحة التشعيب الدقيق والاستبدال به من الصف الثاني الثانوي. مسارات محددة لكل طالب حسب اهتماماته.',
    tag: '4 مسارات',
    gradient: 'from-amber-500 via-orange-500 to-rose-500',
    glow: 'shadow-amber-500/30',
    hoverGlow: 'group-hover:shadow-amber-500/50',
    accent: 'bg-amber-500/10 text-amber-600 dark:text-amber-400',
    bar: 'from-amber-400 to-orange-500',
    stats: ['من الصف الثاني', 'حسب الاهتمام', 'مستقبل مضمون'],
  },
];

function useInView(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setInView(true); },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, inView };
}

function UpdateCard({ update, index }: { update: typeof updates[0]; index: number }) {
  const { ref, inView } = useInView();
  const [hovered, setHovered] = useState(false);

  return (
    <div
      ref={ref}
      className={`group relative transition-all duration-700 ${
        inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
      }`}
      style={{ transitionDelay: `${index * 150}ms` }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Glow ring on hover */}
      <div className={`absolute -inset-px rounded-3xl bg-gradient-to-br ${update.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-sm`} />

      {/* Card */}
      <div className={`relative h-full bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/80 dark:border-slate-700/80 shadow-xl ${update.glow} ${update.hoverGlow} transition-all duration-500 group-hover:-translate-y-2 group-hover:shadow-2xl overflow-hidden flex flex-col`}>

        {/* Gradient top strip */}
        <div className={`h-1 w-full bg-gradient-to-l ${update.bar}`} />

        {/* Number watermark */}
        <div className="absolute top-4 left-6 text-7xl font-black text-slate-100 dark:text-slate-800 select-none leading-none pointer-events-none transition-all duration-500 group-hover:scale-110 group-hover:text-slate-200 dark:group-hover:text-slate-700">
          {update.number}
        </div>

        <div className="relative z-10 p-7 flex flex-col gap-5 flex-1">
          {/* Tag + icon row */}
          <div className="flex items-start justify-between">
            <span className={`text-xs font-bold px-3 py-1 rounded-full ${update.accent} border border-current/20`}>
              {update.tag}
            </span>
            <div
              className={`text-4xl transition-transform duration-500 ${hovered ? 'scale-125 rotate-6' : 'scale-100 rotate-0'}`}
            >
              {update.icon}
            </div>
          </div>

          {/* Title */}
          <div>
            <h3 className="text-xl font-black text-slate-900 dark:text-white mb-2 leading-tight">
              {update.title}
            </h3>
            <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed">
              {update.description}
            </p>
          </div>

          {/* Animated divider */}
          <div className="flex items-center gap-2">
            <div className={`h-px flex-1 bg-gradient-to-l ${update.bar} transition-all duration-700 ${hovered ? 'opacity-100' : 'opacity-30'}`} />
            <div className={`w-1.5 h-1.5 rounded-full bg-gradient-to-br ${update.gradient} transition-transform duration-300 ${hovered ? 'scale-125' : 'scale-100'}`} />
          </div>

          {/* Stat chips */}
          <div className="flex flex-wrap gap-2 mt-auto">
            {update.stats.map((stat, i) => (
              <span
                key={i}
                className={`text-xs px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 font-medium transition-all duration-300`}
                style={{ transitionDelay: `${i * 60}ms` }}
              >
                {stat}
              </span>
            ))}
          </div>
        </div>

        {/* Bottom animated bar on hover */}
        <div className={`h-1 w-0 bg-gradient-to-l ${update.bar} transition-all duration-500 ${hovered ? 'w-full' : 'w-0'}`} />
      </div>
    </div>
  );
}

export default function UpdatesSection() {
  const { ref: headerRef, inView: headerInView } = useInView(0.2);

  return (
    <section
      id="updates"
      className="relative py-20 md:py-32 px-4 scroll-mt-24 overflow-hidden"
    >
      {/* Background decoration */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-slate-300 dark:via-slate-600 to-transparent" />
        <div className="absolute bottom-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-slate-300 dark:via-slate-600 to-transparent" />
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-blue-100 dark:bg-blue-950/30 rounded-full blur-3xl opacity-40" />
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-amber-100 dark:bg-amber-950/30 rounded-full blur-3xl opacity-40" />
      </div>

      <div className="container mx-auto">
        {/* Header */}
        <div
          ref={headerRef}
          className={`text-center mb-16 transition-all duration-700 ${
            headerInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-50 dark:bg-blue-950/50 border border-blue-200 dark:border-blue-800 text-blue-600 dark:text-blue-400 text-sm font-semibold mb-5">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse" />
            النظام التعليمي الجديد
          </div>
          <h2 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white mb-4 leading-tight">
            ملامح النظام التعليمي
            <span className="block bg-gradient-to-r from-blue-600 via-indigo-500 to-purple-600 bg-clip-text text-transparent">
              الجديد
            </span>
          </h2>
          <p className="text-slate-500 dark:text-slate-400 text-lg max-w-xl mx-auto">
            تعرف على أبرز التطورات التي يجلبها النظام الجديد للطلاب
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {updates.map((update, index) => (
            <UpdateCard key={index} update={update} index={index} />
          ))}
        </div>

        {/* Bottom CTA strip */}
        <div
          className={`mt-14 text-center transition-all duration-700 delay-500 ${
            headerInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
          }`}
        >
          <a
            href="#guidance"
            className="inline-flex items-center gap-2 text-sm font-bold text-blue-600 dark:text-blue-400 hover:gap-3 transition-all duration-200 group"
          >
            اكتشف كيف تختار مسارك المناسب
            <span className="inline-block transition-transform duration-200 group-hover:-translate-x-1">←</span>
          </a>
        </div>
      </div>
    </section>
  );
}
