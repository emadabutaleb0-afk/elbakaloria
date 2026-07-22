import { useState, useEffect } from 'react';
import { useTheme } from '@/contexts/ThemeContext';
import HeroSection from '@/components/sections/HeroSection';
import UpdatesSection from '@/components/sections/UpdatesSection';
import GuidanceSection from '@/components/sections/GuidanceSection';
import TracksSection from '@/components/sections/TracksSection';
import FAQSection from '@/components/sections/FAQSection';
import ContactSection from '@/components/sections/ContactSection';
import NewsletterSection from '@/components/sections/NewsletterSection';
import AIChat from '@/components/AIChat';
import NewsBanner from '@/components/NewsBanner';
import CollegesCardGame from '@/components/CollegesCardGame';

const NAV_LINKS = [
  { href: '#updates',  label: 'نظام التقييم',       icon: '📊' },
  { href: '#guidance', label: 'كيف تختار مسارك؟',  icon: '🧭' },
  { href: '#tracks',   label: 'المسارات والكليات',  icon: '🎓' },
  { href: '#contact',  label: 'تواصل معنا',          icon: '💬' },
];

export default function Home() {
  const [scrolled, setScrolled]         = useState(false);
  const [activeLink, setActiveLink]     = useState('#guidance');
  const [mobileOpen, setMobileOpen]     = useState(false);
  const [hovered, setHovered]           = useState<string | null>(null);
  const { theme, toggleTheme }          = useTheme();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on resize
  useEffect(() => {
    const onResize = () => { if (window.innerWidth >= 768) setMobileOpen(false); };
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">

      {/* ── Navigation Header ── */}
      <header className={`sticky top-0 z-40 w-full transition-all duration-500 ${
        scrolled
          ? 'bg-white/80 dark:bg-slate-950/80 backdrop-blur-xl shadow-lg shadow-slate-200/40 dark:shadow-slate-900/40'
          : 'bg-transparent'
      }`}>

        {/* Main nav row */}
        <div className={`border-b transition-colors duration-300 ${
          scrolled ? 'border-slate-200/60 dark:border-slate-700/60' : 'border-transparent'
        }`}>
          <div className="container mx-auto flex h-[68px] items-center justify-between px-4 gap-4">

            {/* ── Logo ── */}
            <a href="#" className="flex items-center gap-3 group flex-shrink-0">
              <div className="relative">
                <div className="absolute inset-0 bg-blue-500 rounded-xl blur-md opacity-40 group-hover:opacity-70 transition-opacity duration-300" />
                <div className="relative bg-gradient-to-br from-blue-500 to-indigo-600 p-2.5 rounded-xl text-white shadow-md group-hover:scale-105 transition-transform duration-300">
                  <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5}
                      d="M12 14l9-5-9-5-9 5 9 5zm0 0v6m0-6c-4.418 0-8 1.343-8 3s3.582 3 8 3 8-1.343 8-3" />
                  </svg>
                </div>
              </div>
              <div>
                <span className="text-xl font-black tracking-tight text-slate-900 dark:text-white leading-none">البكالوريا</span>
                <span className="block text-[10px] font-medium text-blue-500 dark:text-blue-400 leading-none mt-0.5 tracking-wide">منصة التوجيه الأكاديمي</span>
              </div>
            </a>

            {/* ── Desktop Nav ── */}
            <nav className="hidden md:flex items-center gap-1" aria-label="Main navigation">
              {NAV_LINKS.map(link => {
                const isActive  = activeLink === link.href;
                const isHovered = hovered === link.href;
                return (
                  <a
                    key={link.href}
                    href={link.href}
                    onClick={() => setActiveLink(link.href)}
                    onMouseEnter={() => setHovered(link.href)}
                    onMouseLeave={() => setHovered(null)}
                    className={`relative px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-200 flex items-center gap-1.5 group ${
                      isActive
                        ? 'text-blue-600 dark:text-blue-400'
                        : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                    }`}
                  >
                    {/* Hover / active background pill */}
                    <span className={`absolute inset-0 rounded-xl transition-all duration-200 ${
                      isActive
                        ? 'bg-blue-50 dark:bg-blue-950/60'
                        : isHovered
                        ? 'bg-slate-100 dark:bg-slate-800/70'
                        : 'bg-transparent'
                    }`} />

                    {/* Icon */}
                    <span className={`relative text-base transition-transform duration-200 ${
                      isHovered || isActive ? '-translate-y-0.5 scale-110' : ''
                    }`}>
                      {link.icon}
                    </span>

                    {/* Label */}
                    <span className="relative">{link.label}</span>

                    {/* Active underline dot */}
                    {isActive && (
                      <span className="absolute bottom-1 right-1/2 translate-x-1/2 w-1 h-1 rounded-full bg-blue-500" />
                    )}
                  </a>
                );
              })}
            </nav>

            {/* ── Right Controls ── */}
            <div className="flex items-center gap-2 flex-shrink-0">

              {/* Theme Toggle */}
              <button
                onClick={toggleTheme}
                aria-label="تبديل المظهر"
                className="relative p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 hover:scale-105 active:scale-95 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <span className={`block transition-all duration-300 ${theme === 'dark' ? 'rotate-0 opacity-100' : '-rotate-90 opacity-0 absolute'}`}>
                  <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                    <circle cx="12" cy="12" r="5"/>
                    <path d="M12 1v2m0 18v2M4.22 4.22l1.42 1.42m12.72 12.72 1.42 1.42M1 12h2m18 0h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"
                      stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                  </svg>
                </span>
                <span className={`block transition-all duration-300 ${theme === 'light' ? 'rotate-0 opacity-100' : 'rotate-90 opacity-0 absolute'}`}>
                  <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
                  </svg>
                </span>
              </button>

              {/* Mobile Hamburger */}
              <button
                onClick={() => setMobileOpen(prev => !prev)}
                aria-label="فتح القائمة"
                aria-expanded={mobileOpen}
                className="md:hidden p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 active:scale-95 transition-all duration-200"
              >
                <div className="w-4 h-3.5 flex flex-col justify-between">
                  <span className={`block h-0.5 bg-current rounded-full transition-all duration-300 origin-center ${mobileOpen ? 'rotate-45 translate-y-1.5' : ''}`} />
                  <span className={`block h-0.5 bg-current rounded-full transition-all duration-300 ${mobileOpen ? 'opacity-0 scale-x-0' : ''}`} />
                  <span className={`block h-0.5 bg-current rounded-full transition-all duration-300 origin-center ${mobileOpen ? '-rotate-45 -translate-y-1.5' : ''}`} />
                </div>
              </button>
            </div>
          </div>
        </div>

        {/* ── Mobile Drawer ── */}
        <div className={`md:hidden overflow-hidden transition-all duration-400 ease-in-out ${
          mobileOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        }`}>
          <div className="bg-white/95 dark:bg-slate-950/95 backdrop-blur-xl border-b border-slate-200 dark:border-slate-800 px-4 py-3">
            <nav className="flex flex-col gap-1">
              {NAV_LINKS.map((link, i) => {
                const isActive = activeLink === link.href;
                return (
                  <a
                    key={link.href}
                    href={link.href}
                    onClick={() => { setActiveLink(link.href); setMobileOpen(false); }}
                    className={`flex items-center gap-3 px-4 py-3 rounded-xl font-semibold text-sm transition-all duration-200 ${
                      isActive
                        ? 'bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400'
                        : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
                    }`}
                    style={{ animationDelay: `${i * 50}ms` }}
                  >
                    <span className="text-lg">{link.icon}</span>
                    <span>{link.label}</span>
                    {isActive && (
                      <span className="mr-auto w-1.5 h-1.5 rounded-full bg-blue-500" />
                    )}
                  </a>
                );
              })}
            </nav>
          </div>
        </div>

        {/* News Banner — sticky below nav */}
        <NewsBanner />
      </header>

      {/* ── Main Content ── */}
      <main className="flex-grow">
        <HeroSection />
        <UpdatesSection />
        <GuidanceSection />
        <TracksSection />
        <CollegesCardGame />
        <FAQSection />
        <NewsletterSection />
        <ContactSection />
      </main>

      {/* AI Chat Widget */}
      <AIChat />

      {/* Footer */}
      <footer className="border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50 py-8">
        <div className="container mx-auto px-4 text-center text-sm text-slate-600 dark:text-slate-400">
          <p>© 2026 منصة البكالوريا. جميع الحقوق محفوظة.</p>
          <p className="mt-3 text-xs text-slate-400 dark:text-slate-500 max-w-2xl mx-auto leading-relaxed">
            إخلاء مسؤولية: جميع المعلومات والبيانات الواردة في هذه المنصة هي لأغراض إرشادية وتثقيفية فقط وتستند إلى التوجيهات الرسمية المعلنة. للحصول على القرارات النهائية والمعلومات الرسمية المعتمدة، يرجى دائماً مراجعة القنوات الرسمية لوزارة التربية والتعليم.
          </p>
        </div>
      </footer>
    </div>
  );
}
