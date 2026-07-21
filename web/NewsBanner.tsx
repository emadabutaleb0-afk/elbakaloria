import { useState, useEffect, useRef } from 'react';
import { X } from 'lucide-react';

interface NewsItem {
  id: string;
  title: string;
  message: string;
  type: 'info' | 'warning' | 'success' | 'urgent';
  icon: string;
  link?: string;
  linkText?: string;
}

const NEWS_ITEMS: NewsItem[] = [
  {
    id: '1',
    title: '📢 إعلان هام',
    message: 'تم تحديث نظام اختيار المسارات! الآن يمكنك تحميل نتائجك كملف PDF ومشاركتها على وسائل التواصل الاجتماعي.',
    type: 'success',
    icon: '✨',
    link: '#guidance',
    linkText: 'اختبر الآن'
  },
  {
    id: '2',
    title: '🎓 تحديث مهم',
    message: 'تم إضافة معلومات جديدة عن الكليات والتخصصات المتاحة في كل مسار. استكشف الخيارات المتاحة لك.',
    type: 'info',
    icon: '📚',
    link: '#tracks',
    linkText: 'اعرف أكثر'
  }
];

const AUTO_PLAY_INTERVAL = 5000; // 5 seconds

export default function NewsBanner() {
  const [visibleNews, setVisibleNews] = useState<Set<string>>(new Set(NEWS_ITEMS.map(item => item.id)));
  const [currentNewsIndex, setCurrentNewsIndex] = useState(0);
  const [isHovering, setIsHovering] = useState(false);
  const autoPlayTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Auto-play functionality
  useEffect(() => {
    if (visibleNews.size === 0) return;

    const startAutoPlay = () => {
      autoPlayTimerRef.current = setInterval(() => {
        setCurrentNewsIndex((prev) => (prev + 1) % NEWS_ITEMS.length);
      }, AUTO_PLAY_INTERVAL);
    };

    if (!isHovering) {
      startAutoPlay();
    }

    return () => {
      if (autoPlayTimerRef.current) {
        clearInterval(autoPlayTimerRef.current);
      }
    };
  }, [isHovering, visibleNews.size]);

  const handleClose = (id: string) => {
    const newVisible = new Set(visibleNews);
    newVisible.delete(id);
    setVisibleNews(newVisible);
  };

  const handleNext = () => {
    setCurrentNewsIndex((prev) => (prev + 1) % NEWS_ITEMS.length);
    // Reset timer when manually navigating
    if (autoPlayTimerRef.current) {
      clearInterval(autoPlayTimerRef.current);
    }
  };

  const handlePrev = () => {
    setCurrentNewsIndex((prev) => (prev - 1 + NEWS_ITEMS.length) % NEWS_ITEMS.length);
    // Reset timer when manually navigating
    if (autoPlayTimerRef.current) {
      clearInterval(autoPlayTimerRef.current);
    }
  };

  const handleDotClick = (index: number) => {
    setCurrentNewsIndex(index);
    // Reset timer when manually navigating
    if (autoPlayTimerRef.current) {
      clearInterval(autoPlayTimerRef.current);
    }
  };

  if (visibleNews.size === 0) return null;

  const currentNews = NEWS_ITEMS[currentNewsIndex];
  if (!visibleNews.has(currentNews.id)) {
    handleNext();
    return null;
  }

  const typeStyles = {
    info: 'bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800 text-blue-800 dark:text-blue-200',
    warning: 'bg-amber-50 dark:bg-amber-900/20 border-amber-200 dark:border-amber-800 text-amber-800 dark:text-amber-200',
    success: 'bg-emerald-50 dark:bg-emerald-900/20 border-emerald-200 dark:border-emerald-800 text-emerald-800 dark:text-emerald-200',
    urgent: 'bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800 text-red-800 dark:text-red-200'
  };

  const bgGradient = {
    info: 'from-blue-400/10 to-cyan-400/10',
    warning: 'from-amber-400/10 to-orange-400/10',
    success: 'from-emerald-400/10 to-green-400/10',
    urgent: 'from-red-400/10 to-pink-400/10'
  };

  return (
    <div 
      className={`${typeStyles[currentNews.type]} border-l-4 border-current bg-gradient-to-r ${bgGradient[currentNews.type]} backdrop-blur-sm transition-all duration-300`}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-start gap-3 flex-1">
            <span className="text-2xl mt-1 flex-shrink-0 animate-bounce" style={{ animationDelay: '0s' }}>{currentNews.icon}</span>
            <div className="flex-1">
              <h3 className="font-bold text-lg mb-1">{currentNews.title}</h3>
              <p className="text-sm opacity-90 mb-2">{currentNews.message}</p>
              {currentNews.link && (
                <a
                  href={currentNews.link}
                  className="inline-block text-sm font-semibold underline hover:no-underline transition-all"
                >
                  {currentNews.linkText} →
                </a>
              )}
            </div>
          </div>

          <div className="flex items-center gap-3 flex-shrink-0">
            {/* Navigation Arrows */}
            <div className="hidden sm:flex gap-2">
              <button
                onClick={handlePrev}
                className="p-1 hover:bg-white/20 dark:hover:bg-white/10 rounded-lg transition-all"
                aria-label="Previous news"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <button
                onClick={handleNext}
                className="p-1 hover:bg-white/20 dark:hover:bg-white/10 rounded-lg transition-all"
                aria-label="Next news"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>

            {/* Navigation dots */}
            <div className="flex gap-1">
              {NEWS_ITEMS.map((_, index) => (
                <button
                  key={index}
                  onClick={() => handleDotClick(index)}
                  className={`h-2 rounded-full transition-all ${
                    index === currentNewsIndex ? 'w-6 opacity-100' : 'w-2 opacity-50 hover:opacity-75'
                  }`}
                  style={{
                    backgroundColor: 'currentColor'
                  }}
                  aria-label={`Go to news ${index + 1}`}
                />
              ))}
            </div>

            {/* Close button */}
            <button
              onClick={() => handleClose(currentNews.id)}
              className="p-1 hover:bg-white/20 dark:hover:bg-white/10 rounded-lg transition-all"
              aria-label="Close news banner"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Progress Bar for auto-play */}
        {!isHovering && (
          <div className="mt-2 h-1 bg-white/20 rounded-full overflow-hidden">
            <div
              className="h-full bg-current opacity-50 transition-all"
              style={{
                animation: `progress ${AUTO_PLAY_INTERVAL}ms linear infinite`,
                width: '100%'
              }}
            />
          </div>
        )}
      </div>

      <style>{`
        @keyframes progress {
          from {
            width: 100%;
          }
          to {
            width: 0%;
          }
        }
      `}</style>
    </div>
  );
}
