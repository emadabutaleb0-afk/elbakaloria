import { useRef, useState } from 'react';
import { toast } from 'sonner';

const SUPPORT_EMAIL = 'support@elbakaloria.com';

export default function ContactSection() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const nameRef    = useRef<HTMLInputElement>(null);
  const emailRef   = useRef<HTMLInputElement>(null);
  const typeRef    = useRef<HTMLSelectElement>(null);
  const subjectRef = useRef<HTMLInputElement>(null);
  const messageRef = useRef<HTMLTextAreaElement>(null);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    const name    = nameRef.current?.value    ?? '';
    const email   = emailRef.current?.value   ?? '';
    const type    = typeRef.current?.value    ?? '';
    const subject = subjectRef.current?.value ?? '';
    const message = messageRef.current?.value ?? '';

    const body = [
      `\u0627\u0644\u0627\u0633\u0645: ${name}`,
      `\u0627\u0644\u0628\u0631\u064a\u062f \u0627\u0644\u0625\u0644\u0643\u062a\u0631\u0648\u0646\u064a: ${email}`,
      `\u0646\u0648\u0639 \u0627\u0644\u0645\u0633\u062a\u062e\u062f\u0645: ${type}`,
      ``,
      `\u0627\u0644\u0631\u0633\u0627\u0644\u0629:`,
      message,
    ].join('\n');

    const mailtoUrl =
      `mailto:${SUPPORT_EMAIL}` +
      `?subject=${encodeURIComponent(subject || '\u0627\u0633\u062a\u0641\u0633\u0627\u0631 \u0645\u0646 \u0645\u0646\u0635\u0629 \u0627\u0644\u0628\u0643\u0627\u0644\u0648\u0631\u064a\u0627')}` +
      `&body=${encodeURIComponent(body)}`;

    window.location.href = mailtoUrl;

    setTimeout(() => {
      setIsSubmitting(false);
      toast.success('\u062a\u0645 \u0641\u062a\u062d \u062a\u0637\u0628\u064a\u0642 \u0627\u0644\u0628\u0631\u064a\u062f. \u0623\u0631\u0633\u0644 \u0627\u0644\u0631\u0633\u0627\u0644\u0629 \u0645\u0646 \u0647\u0646\u0627\u0643.');
      e.currentTarget?.reset();
    }, 800);
  };

  return (
    <section id="contact" className="py-16 md:py-24 px-4 border-t border-slate-200 dark:border-slate-800 scroll-mt-24">
      <div className="container mx-auto max-w-4xl">
        <div className="bg-white dark:bg-slate-800 rounded-3xl shadow-xl overflow-hidden border border-slate-200 dark:border-slate-700 flex flex-col md:flex-row">
          {/* Left Panel */}
          <div className="md:w-2/5 bg-gradient-to-br from-blue-600 to-blue-700 text-white p-8 md:p-10 flex flex-col justify-center">
            <h3 className="text-3xl font-bold mb-4">{'\u0647\u0644 \u0644\u062f\u064a\u0643 \u0627\u0633\u062a\u0641\u0633\u0627\u0631\u061f'}</h3>
            <p className="text-blue-100 mb-8 text-sm leading-relaxed">
              {'\u0641\u0631\u064a\u0642 \u0627\u0644\u062f\u0639\u0645 \u0627\u0644\u0641\u0646\u064a \u0648\u0627\u0644\u0623\u0643\u0627\u062f\u064a\u0645\u064a \u0641\u064a \u0627\u0644\u0628\u0643\u0627\u0644\u0648\u0631\u064a\u0627 \u0645\u062a\u0648\u0627\u062c\u062f \u0644\u0644\u0631\u062f \u0639\u0644\u0649 \u0643\u0627\u0641\u0629 \u0623\u0633\u0626\u0644\u062a\u0643.'}
            </p>
            <div className="space-y-4">
              <a
                href={`mailto:${SUPPORT_EMAIL}`}
                className="flex items-center gap-3 hover:text-blue-200 transition-colors group"
              >
                <span className="text-2xl group-hover:scale-110 transition-transform">✉️</span>
                <span className="text-sm font-medium">{SUPPORT_EMAIL}</span>
              </a>
              <div className="flex items-center gap-3">
                <span className="text-2xl">📞</span>
                <span className="text-sm">+20 123 456 7890</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-2xl">📍</span>
                <span className="text-sm">{'\u0627\u0644\u0642\u0627\u0647\u0631\u0629\u060c \u0645\u0635\u0631'}</span>
              </div>
            </div>
          </div>

          {/* Right Panel - Form */}
          <div className="md:w-3/5 p-8 md:p-10">
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-semibold mb-2 text-slate-700 dark:text-slate-300">
                    {'\u0627\u0644\u0627\u0633\u0645 \u0628\u0627\u0644\u0643\u0627\u0645\u0644'}
                  </label>
                  <input
                    ref={nameRef}
                    type="text"
                    required
                    className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-600 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                    placeholder={'\u0623\u062f\u062e\u0644 \u0627\u0633\u0645\u0643'}
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-2 text-slate-700 dark:text-slate-300">
                    {'\u0627\u0644\u0628\u0631\u064a\u062f \u0627\u0644\u0625\u0644\u0643\u062a\u0631\u0648\u0646\u064a'}
                  </label>
                  <input
                    ref={emailRef}
                    type="email"
                    required
                    className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-600 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                    placeholder={'\u0628\u0631\u064a\u062f\u0643 \u0627\u0644\u0625\u0644\u0643\u062a\u0631\u0648\u0646\u064a'}
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2 text-slate-700 dark:text-slate-300">
                  {'\u0646\u0648\u0639 \u0627\u0644\u0645\u0633\u062a\u062e\u062f\u0645'}
                </label>
                <select
                  ref={typeRef}
                  className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-600 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                >
                  <option>{'\u0637\u0627\u0644\u0628'}</option>
                  <option>{'\u0648\u0644\u064a \u0623\u0645\u0631'}</option>
                  <option>{'\u0645\u0639\u0644\u0645'}</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2 text-slate-700 dark:text-slate-300">
                  {'\u0627\u0644\u0645\u0648\u0636\u0648\u0639'}
                </label>
                <input
                  ref={subjectRef}
                  type="text"
                  required
                  className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-600 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                  placeholder={'\u0645\u0648\u0636\u0648\u0639 \u0631\u0633\u0627\u0644\u062a\u0643'}
                />
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2 text-slate-700 dark:text-slate-300">
                  {'\u0631\u0633\u0627\u0644\u062a\u0643'}
                </label>
                <textarea
                  ref={messageRef}
                  rows={4}
                  required
                  className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-600 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all resize-none"
                  placeholder={'\u0627\u0643\u062a\u0628 \u0631\u0633\u0627\u0644\u062a\u0643 \u0647\u0646\u0627...'}
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-slate-900 dark:bg-blue-600 hover:bg-slate-800 dark:hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold py-3 rounded-lg transition-all active:scale-95 flex justify-center items-center gap-2"
              >
                {isSubmitting ? (
                  <>
                    <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
                    </svg>
                    {'\u062c\u0627\u0631\u064a \u0627\u0644\u062a\u062d\u0636\u064a\u0631...'}
                  </>
                ) : (
                  <>
                    <span>{'\u0625\u0631\u0633\u0627\u0644 \u0627\u0644\u0631\u0633\u0627\u0644\u0629'}</span>
                    <span>✉️</span>
                  </>
                )}
              </button>

              <p className="text-xs text-slate-400 dark:text-slate-500 text-center">
                {'\u0633\u064a\u062a\u0645 \u0641\u062a\u062d \u062a\u0637\u0628\u064a\u0642 \u0627\u0644\u0628\u0631\u064a\u062f \u0644\u0625\u0631\u0633\u0627\u0644 \u0631\u0633\u0627\u0644\u062a\u0643 \u0625\u0644\u0649 '}
                <span className="text-blue-500 font-medium">{SUPPORT_EMAIL}</span>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
