export default function HeroSection() {
  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center px-4 py-20 overflow-hidden bg-gradient-to-br from-blue-50 via-white to-slate-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-800">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-10 left-10 w-72 h-72 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse dark:opacity-10"></div>
        <div className="absolute top-40 right-10 w-72 h-72 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse dark:opacity-10" style={{ animationDelay: '2s' }}></div>
        <div className="absolute -bottom-8 left-1/2 w-72 h-72 bg-pink-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse dark:opacity-10" style={{ animationDelay: '4s' }}></div>
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-4xl mx-auto text-center">
        {/* Main Heading */}
        <div className="mb-6 animate-fade-in-up">
          <h1 className="text-5xl md:text-7xl font-black tracking-tight mb-4">
            <span className="block text-slate-900 dark:text-white">مستقبلك يبدأ من</span>
            <span className="block bg-gradient-to-r from-blue-600 via-blue-500 to-blue-400 text-transparent bg-clip-text">البكالوريا</span>
          </h1>
        </div>

        {/* Subtitle */}
        <p className="text-lg md:text-xl text-slate-600 dark:text-slate-300 mb-8 max-w-2xl mx-auto leading-relaxed animate-fade-in-up" style={{ animationDelay: '100ms' }}>
          منصة متكاملة توفر لك أحدث البيانات الرسمية، إرشادات المسارات، الكليات المتاحة لكل مسار، ومساعد ذكي للإجابة على كافة استفساراتك.
        </p>

        {/* CTA Buttons */}
        <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center animate-fade-in-up" style={{ animationDelay: '200ms' }}>
          <a
            href="#guidance"
            className="px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 active:scale-95 inline-flex items-center justify-center gap-2 group"
          >
            ابدأ الآن
            <span className="group-hover:translate-x-1 transition-transform">→</span>
          </a>
          <a
            href="#tracks"
            className="px-8 py-4 bg-white dark:bg-slate-800 border-2 border-blue-600 text-blue-600 dark:text-blue-400 font-bold rounded-lg hover:bg-blue-50 dark:hover:bg-slate-700 transition-all duration-300 active:scale-95 inline-flex items-center justify-center gap-2"
          >
            اكتشف المسارات
            <span>🎓</span>
          </a>
        </div>


      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <svg className="w-6 h-6 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      </div>
    </section>
  );
}
