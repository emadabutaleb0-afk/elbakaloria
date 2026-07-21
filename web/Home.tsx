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

export default function Home() {
  const [scrolled, setScrolled] = useState(false);
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      {/* Navigation Header */}
      <header className={`sticky top-0 z-40 w-full border-b transition-all duration-300 ${
        scrolled 
          ? 'bg-white/90 dark:bg-slate-900/90 backdrop-blur-md shadow-md' 
          : 'bg-transparent'
      }`}>
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="bg-blue-600 p-2 rounded-lg text-white shadow-lg shadow-blue-500/30 hover:shadow-blue-500/50 transition-all duration-300">
              <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C6.5 6.253 2 10.753 2 16.253s4.5 10 10 10 10-4.5 10-10-4.5-10-10-10z" />
              </svg>
            </div>
            <span className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">البكالوريا</span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex gap-6 text-sm font-semibold text-slate-600 dark:text-slate-300">
            <a href="#updates" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">نظام التقييم</a>
            <a href="#guidance" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors text-blue-600 dark:text-blue-400">كيف تختار مسارك؟</a>
            <a href="#tracks" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">المسارات والكليات</a>
            <a href="#contact" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">تواصل معنا</a>
          </nav>

          {/* Theme Toggle */}
          <div className="flex items-center gap-2">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 active:scale-90"
              title={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
            >
              {theme === 'light' ? (
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
                </svg>
              ) : (
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                  <circle cx="12" cy="12" r="5" />
                  <path d="M12 1v6m0 6v6M4.22 4.22l4.24 4.24m3.08 3.08l4.24 4.24M1 12h6m6 0h6m-15.78 7.78l4.24-4.24m3.08-3.08l4.24-4.24" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow">
      <HeroSection />
      <NewsBanner />
      <UpdatesSection />
      <GuidanceSection />
      <TracksSection />
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
        </div>
      </footer>
    </div>
  );
}
