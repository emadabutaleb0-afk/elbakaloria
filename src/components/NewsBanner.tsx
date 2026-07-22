import { useState, useEffect, useRef } from 'react';
import { X, ChevronRight, ChevronLeft, Megaphone, Sparkles, AlertTriangle, BookOpen } from 'lucide-react';

interface NewsItem {
  id: string;
  tag: string;
  message: string;
  type: 'info' | 'warning' | 'success' | 'urgent';
  link?: string;
  linkText?: string;
}

const NEWS_ITEMS: NewsItem[] = [
  {
    id: '1',
    tag: 'جديد',
    message: 'تم تحديث نظام اختيار المسارات — يمكنك الآن تحميل نتائجك كملف PDF ومشاركتها.',
    type: 'success',
    link: '#guidance',
    linkText: 'اختبر الآن'
  },
  {
    id: '2',
    tag: 'تحديث',
    message: 'تم إضافة معلومات جديدة عن الكليات والتخصصات المتاحة في كل مسار.',
    type: 'info',
    link: '#tracks',
    linkText: 'اعرف أكثر'
  },
  {
    id: '3',
    tag: 'تنبيه',
    message: 'تأكد من مراجعة نظام التقييم الجديد للبكالوريا قبل اختيار مسارك الدراسي.',
    type: 'warning',
    link: '#updates',
    linkText: 'مراجعة النظام'
  }
];

const AUTO_PLAY_INTERVAL = 5000;

const TYPE_CONFIG = {
  success: {
    bar: 'from-emerald-500 to-teal-500',
    badge: 'bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 border-emerald-400/30',
    dot: 'bg-emerald-500',
    link: 'text-emerald-600 dark:text-emerald-400 hover:text-emerald-700',
    Icon: Sparkles,
  },
  info: {
    bar: 'from-blue-500 to-cyan-500',
    badge: 'bg-blue-500/20 text-blue-600 dark:text-blue-400 border-blue-400/30',
    dot: 'bg-blue-500',
    link: 'text-blue-600 dark:text-blue-400 hover:text-blue-700',
    Icon: BookOpen,
  },
  warning: {
    bar: 'from-amber-500 to-orange-400',
    badge: 'bg-amber-500/20 text-amber-600 dark:text-amber-400 border-amber-400/30',
    dot: 'bg-amber-500',
    link: 'text-amber-600 dark:text-amber-400 hover:text-amber-700',
    Icon: AlertTriangle,
  },
  urgent: {
    bar: 'from-rose-500 to-red-500',
    badge: 'bg-rose-500/20 text-rose-600 dark:text-rose-400 border-rose-400/30',
    dot: 'bg-rose-500',
    link: 'text-rose-600 dark:text-rose-400 hover:text-rose-700',
    Icon: Megaphone,
  },
};

export default function NewsBanner() {
  const [dismissed, setDismissed] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovering, setIsHovering] = useState(false);
  const [animating, setAnimating] = useState(false);
  const [direction, setDirection] = useState<'next' | 'prev'>('next');
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const progressRef = useRef<HTMLDivElement>(null);

  const startProgress = () => {
    if (progressRef.current) {
      progressRef.current.style.transition = 'none';
      progressRef.current.style.width = '100%';
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          if (progressRef.current) {
            progressRef.current.style.transition = `width ${AUTO_PLAY_INTERVAL}ms linear`;
            progressRef.current.style.width = '0%';
          }
        });
      });
    }
  };

  useEffect(() => {
    if (dismissed || isHovering) {
      if (timerRef.current) clearInterval(timerRef.current);
      return;
    }
    startProgress();
    timerRef.current = setInterval(() => {
      goTo('next');
    }, AUTO_PLAY_INTERVAL);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isHovering, dismissed, currentIndex]);

  const goTo = (dir: 'next' | 'prev') => {
    if (animating) return;
    setDirection(dir);
    setAnimating(true);
    setTimeout(() => {
      setCurrentIndex(prev =>
        dir === 'next'
          ? (prev + 1) % NEWS_ITEMS.length
          : (prev - 1 + NEWS_ITEMS.length) % NEWS_ITEMS.length
      );
      setAnimating(false);
    }, 300);
  };

  if (dismissed) return null;

  const news = NEWS_ITEMS[currentIndex];
  const cfg = TYPE_CONFIG[news.type];
  const Icon = cfg.Icon;

  return (
    <div
      className="relative z-30 overflow-hidden bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-slate-200/60 dark:border-slate-700/60"
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      {/* Top gradient bar */}
      <div className={`h-0.5 w-full bg-gradient-to-l ${cfg.bar} transition-all duration-700`} />

      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 py-2 md:py-0 md:h-11">
          <div className="flex items-center justify-between md:justify-start gap-3 w-full md:w-auto">
            {/* Icon + Badge */}
            <div className="flex items-center gap-2 flex-shrink-0">
              <div className={`flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-bold border ${cfg.badge}`}>
                <Icon className="w-3 h-3" />
                <span>{news.tag}</span>
              </div>
            </div>
            {/* Mobile Controls (Next/Prev/Dismiss) */}
            <div className="flex md:hidden items-center gap-1 flex-shrink-0">
              <button
                onClick={() => goTo('prev')}
                className="p-1 rounded-md text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-700 transition-all"
                aria-label="السابق"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
              <button
                onClick={() => goTo('next')}
                className="p-1 rounded-md text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-700 transition-all"
                aria-label="التالي"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={() => setDismissed(true)}
                className="p-1 rounded-md text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-all"
                aria-label="إغلاق"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Divider */}
          <div className="hidden md:block w-px h-4 bg-slate-300 dark:bg-slate-600 flex-shrink-0" />

          {/* Message — animated slide */}
          <div className="flex-1 w-full overflow-hidden">
            <div
              key={currentIndex}
              className={`flex flex-wrap md:flex-nowrap items-center gap-x-2 gap-y-1 transition-all duration-300 ${
                animating
                  ? direction === 'next'
                    ? 'opacity-0 -translate-y-2'
                    : 'opacity-0 translate-y-2'
                  : 'opacity-100 translate-y-0'
              }`}
            >
              <p className="text-[13px] md:text-sm text-slate-700 dark:text-slate-300 leading-relaxed md:leading-none">
                {news.message}
              </p>
              {news.link && (
                <a
                  href={news.link}
                  className={`text-xs font-bold flex-shrink-0 flex items-center gap-0.5 transition-colors ${cfg.link}`}
                >
                  {news.linkText}
                  <ChevronLeft className="w-3.5 h-3.5" />
                </a>
              )}
            </div>
          </div>

          {/* Desktop Controls */}
          <div className="hidden md:flex items-center gap-1 flex-shrink-0">
            {/* Dots */}
            <div className="hidden sm:flex items-center gap-1 ml-1">
              {NEWS_ITEMS.map((_, i) => (
                <button
                  key={i}
                  onClick={() => { setCurrentIndex(i); startProgress(); }}
                  className={`rounded-full transition-all duration-300 ${
                    i === currentIndex
                      ? `w-5 h-1.5 ${cfg.dot}`
                      : 'w-1.5 h-1.5 bg-slate-300 dark:bg-slate-600 hover:bg-slate-400'
                  }`}
                  aria-label={`خبر ${i + 1}`}
                />
              ))}
            </div>

            {/* Prev / Next */}
            <button
              onClick={() => goTo('prev')}
              className="p-1 rounded-md text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-700 transition-all"
              aria-label="السابق"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
            <button
              onClick={() => goTo('next')}
              className="p-1 rounded-md text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-700 transition-all"
              aria-label="التالي"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>

            {/* Dismiss */}
            <button
              onClick={() => setDismissed(true)}
              className="p-1 rounded-md text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-all"
              aria-label="إغلاق"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Progress bar */}
        <div className="h-px bg-slate-100 dark:bg-slate-800 overflow-hidden -mx-4">
          <div
            ref={progressRef}
            className={`h-full bg-gradient-to-l ${cfg.bar} opacity-60`}
            style={{ width: '100%' }}
          />
        </div>
      </div>
    </div>
  );
}
