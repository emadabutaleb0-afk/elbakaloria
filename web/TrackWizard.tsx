import { useState } from 'react';
import { generateTrackReportPDF, shareOnSocialMedia } from '@/lib/pdfGenerator';

interface TrackScores {
  medicine: number;
  engineering: number;
  business: number;
  arts: number;
}

const TRACK_INFO = {
  medicine: {
    name: 'مسار الطب وعلوم الحياة',
    icon: '🏥',
    emoji: '🏥',
    color: 'emerald',
    bgColor: 'bg-emerald-600',
    reasoning: 'شغفك بالعلوم ورغبتك في بيئة العمل الطبية والبحثية تجعل هذا المسار هو الأفضل لضمان مستقبل مشرق في الكليات الطبية والبيولوجية.'
  },
  engineering: {
    name: 'مسار الهندسة وعلوم الحاسب',
    icon: '💻',
    emoji: '💻',
    color: 'indigo',
    bgColor: 'bg-indigo-600',
    reasoning: 'تفكيرك المنطقي واهتمامك بالتكنولوجيا وحل المشكلات المعقدة يشير بقوة إلى أنك ستتميز وتبدع في المجالات الهندسية والبرمجية.'
  },
  business: {
    name: 'مسار الأعمال',
    icon: '📊',
    emoji: '📊',
    color: 'amber',
    bgColor: 'bg-amber-600',
    reasoning: 'شخصيتك القيادية واهتمامك بالأسواق والإدارة وتوظيف الموارد يشير إلى قدرتك الكبيرة على تحقيق النجاح في عالم المال والأعمال.'
  },
  arts: {
    name: 'مسار الآداب والفنون',
    icon: '📚',
    emoji: '📚',
    color: 'rose',
    bgColor: 'bg-rose-600',
    reasoning: 'ميولك الإبداعية وقدراتك المتميزة في اللغات والتواصل تجعلك المرشح المثالي للتأثير في المجتمعات عبر كليات الإعلام، الألسن، أو الآداب.'
  }
};

export default function TrackWizard() {
  const [scores, setScores] = useState<TrackScores>({ medicine: 0, engineering: 0, business: 0, arts: 0 });
  const [currentStep, setCurrentStep] = useState(1);
  const [showResult, setShowResult] = useState(false);

  const handleOption = (track: keyof TrackScores) => {
    setScores(prev => ({ ...prev, [track]: prev[track] + 1 }));

    if (currentStep < 5) {
      setCurrentStep(currentStep + 1);
    } else {
      setShowResult(true);
    }
  };

  const getRecommendedTrack = (): keyof TrackScores => {
    let maxScore = -1;
    let recommendedTrack: keyof TrackScores = 'medicine';

    for (const [track, score] of Object.entries(scores)) {
      if (score > maxScore) {
        maxScore = score;
        recommendedTrack = track as keyof TrackScores;
      }
    }

    return recommendedTrack;
  };

  const getScorePercentage = (track: keyof TrackScores): number => {
    const total = Object.values(scores).reduce((a, b) => a + b, 0);
    return total > 0 ? Math.round((scores[track] / total) * 100) : 0;
  };

  const handleDownloadPDF = () => {
    const recommendedTrack = getRecommendedTrack();
    const trackInfo = TRACK_INFO[recommendedTrack];
    const total = Object.values(scores).reduce((a, b) => a + b, 0);

    generateTrackReportPDF({
      recommendedTrack,
      trackName: trackInfo.name,
      reasoning: trackInfo.reasoning,
      scores,
      total
    });
  };

  const handleShareSocial = (platform: string) => {
    const recommendedTrack = getRecommendedTrack();
    const trackInfo = TRACK_INFO[recommendedTrack];
    const platforms = shareOnSocialMedia(trackInfo.name, trackInfo.emoji);

    const url = platforms[platform as keyof typeof platforms];
    if (url) {
      window.open(url, '_blank', 'width=600,height=400');
    }
  };

  const resetWizard = () => {
    setScores({ medicine: 0, engineering: 0, business: 0, arts: 0 });
    setCurrentStep(1);
    setShowResult(false);
  };

  const progressPercentage = (currentStep / 5) * 100;
  const recommendedTrack = getRecommendedTrack();
  const trackInfo = TRACK_INFO[recommendedTrack];

  // Get all tracks sorted by score
  const sortedTracks = Object.entries(scores)
    .map(([track, score]) => ({ track: track as keyof TrackScores, score }))
    .sort((a, b) => b.score - a.score);

  return (
    <div className="bg-white dark:bg-slate-800 rounded-3xl p-8 shadow-lg border border-slate-200 dark:border-slate-700">
      {/* Progress Bar */}
      <div className="mb-8">
        <div className="flex justify-between items-center mb-3">
          <h3 className="font-bold text-slate-800 dark:text-slate-100">اختبار اختيار المسار</h3>
          <span className="text-sm font-semibold text-slate-600 dark:text-slate-400">
            {showResult ? 'اكتمل' : `${currentStep} / 5`}
          </span>
        </div>
        <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2 overflow-hidden">
          <div
            className="bg-gradient-to-r from-blue-500 to-blue-600 h-full transition-all duration-500 ease-out"
            style={{ width: `${showResult ? 100 : progressPercentage}%` }}
          />
        </div>
      </div>

      {!showResult ? (
        <div className="space-y-6 animate-fade-in-up">
          {currentStep === 1 && (
            <div>
              <h4 className="text-lg font-bold mb-4 text-slate-800 dark:text-slate-100">١. ما هي اهتماماتك الأساسية؟</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <button
                  onClick={() => handleOption('medicine')}
                  className="p-4 rounded-xl border-2 border-emerald-200 dark:border-emerald-800 bg-emerald-50 dark:bg-emerald-900/20 hover:bg-emerald-100 dark:hover:bg-emerald-900/40 text-emerald-800 dark:text-emerald-200 font-semibold transition-all hover:shadow-md active:scale-95"
                >
                  🏥 الطب والعلوم الحيوية
                </button>
                <button
                  onClick={() => handleOption('engineering')}
                  className="p-4 rounded-xl border-2 border-indigo-200 dark:border-indigo-800 bg-indigo-50 dark:bg-indigo-900/20 hover:bg-indigo-100 dark:hover:bg-indigo-900/40 text-indigo-800 dark:text-indigo-200 font-semibold transition-all hover:shadow-md active:scale-95"
                >
                  💻 الهندسة والتكنولوجيا
                </button>
                <button
                  onClick={() => handleOption('business')}
                  className="p-4 rounded-xl border-2 border-amber-200 dark:border-amber-800 bg-amber-50 dark:bg-amber-900/20 hover:bg-amber-100 dark:hover:bg-amber-900/40 text-amber-800 dark:text-amber-200 font-semibold transition-all hover:shadow-md active:scale-95"
                >
                  📊 الأعمال والإدارة
                </button>
                <button
                  onClick={() => handleOption('arts')}
                  className="p-4 rounded-xl border-2 border-rose-200 dark:border-rose-800 bg-rose-50 dark:bg-rose-900/20 hover:bg-rose-100 dark:hover:bg-rose-900/40 text-rose-800 dark:text-rose-200 font-semibold transition-all hover:shadow-md active:scale-95"
                >
                  📚 الآداب والفنون
                </button>
              </div>
            </div>
          )}

          {currentStep === 2 && (
            <div>
              <h4 className="text-lg font-bold mb-4 text-slate-800 dark:text-slate-100">٢. في الصف الأول الثانوي، ما هي المواد التي تحقق فيها أعلى تفوق؟</h4>
              <div className="space-y-3">
                {[
                  { track: 'engineering' as const, text: 'الرياضيات البحتة، الفيزياء، والبرمجة' },
                  { track: 'medicine' as const, text: 'الأحياء، الكيمياء، والعلوم الحيوية' },
                  { track: 'arts' as const, text: 'اللغة العربية، اللغات الأجنبية، والتاريخ' },
                  { track: 'business' as const, text: 'المهارات الحسابية التطبيقية والقدرة على الفهم المتوازن' }
                ].map((option, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleOption(option.track)}
                    className="w-full text-right p-4 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 hover:border-blue-400 hover:shadow-md transition-all font-semibold text-slate-700 dark:text-slate-200 active:scale-95"
                  >
                    {option.text}
                  </button>
                ))}
              </div>
            </div>
          )}

          {currentStep === 3 && (
            <div>
              <h4 className="text-lg font-bold mb-4 text-slate-800 dark:text-slate-100">٣. كيف تفضل أن تكون بيئة عملك المستقبلية؟</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <button
                  onClick={() => handleOption('medicine')}
                  className="p-4 rounded-xl border-2 border-emerald-200 dark:border-emerald-800 bg-emerald-50 dark:bg-emerald-900/20 hover:bg-emerald-100 dark:hover:bg-emerald-900/40 text-emerald-800 dark:text-emerald-200 font-semibold transition-all hover:shadow-md active:scale-95"
                >
                  المستشفيات والعيادات
                </button>
                <button
                  onClick={() => handleOption('business')}
                  className="p-4 rounded-xl border-2 border-amber-200 dark:border-amber-800 bg-amber-50 dark:bg-amber-900/20 hover:bg-amber-100 dark:hover:bg-amber-900/40 text-amber-800 dark:text-amber-200 font-semibold transition-all hover:shadow-md active:scale-95"
                >
                  المؤسسات المالية والشركات
                </button>
                <button
                  onClick={() => handleOption('engineering')}
                  className="p-4 rounded-xl border-2 border-indigo-200 dark:border-indigo-800 bg-indigo-50 dark:bg-indigo-900/20 hover:bg-indigo-100 dark:hover:bg-indigo-900/40 text-indigo-800 dark:text-indigo-200 font-semibold transition-all hover:shadow-md active:scale-95"
                >
                  مكاتب الهندسة والبرمجة
                </button>
                <button
                  onClick={() => handleOption('arts')}
                  className="p-4 rounded-xl border-2 border-rose-200 dark:border-rose-800 bg-rose-50 dark:bg-rose-900/20 hover:bg-rose-100 dark:hover:bg-rose-900/40 text-rose-800 dark:text-rose-200 font-semibold transition-all hover:shadow-md active:scale-95"
                >
                  الوكالات الإعلامية والنشر
                </button>
              </div>
            </div>
          )}

          {currentStep === 4 && (
            <div>
              <h4 className="text-lg font-bold mb-4 text-slate-800 dark:text-slate-100">٤. عند مواجهة مشكلة معقدة، ما أسلوبك؟</h4>
              <div className="space-y-3">
                {[
                  { track: 'engineering' as const, text: 'تحليلها منطقياً واستخدام الأرقام والمعادلات' },
                  { track: 'arts' as const, text: 'التفكير الإبداعي والتواصل مع الآخرين' },
                  { track: 'medicine' as const, text: 'تشخيص المسببات بعناية والمقارنة مع التجارب السابقة' },
                  { track: 'business' as const, text: 'حساب التكلفة والعائد والتخطيط لتقليل المخاطر' }
                ].map((option, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleOption(option.track)}
                    className="w-full text-right p-4 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 hover:border-blue-400 hover:shadow-md transition-all font-semibold text-slate-700 dark:text-slate-200 active:scale-95"
                  >
                    {option.text}
                  </button>
                ))}
              </div>
            </div>
          )}

          {currentStep === 5 && (
            <div>
              <h4 className="text-lg font-bold mb-4 text-slate-800 dark:text-slate-100">٥. ما هو طموحك الأسمى للمستقبل؟</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <button
                  onClick={() => handleOption('engineering')}
                  className="p-6 rounded-xl border-2 border-indigo-200 dark:border-indigo-800 bg-indigo-50 dark:bg-indigo-900/20 hover:bg-indigo-100 dark:hover:bg-indigo-900/40 text-indigo-800 dark:text-indigo-200 font-semibold transition-all hover:shadow-md active:scale-95"
                >
                  💡 تصميم التكنولوجيا
                </button>
                <button
                  onClick={() => handleOption('medicine')}
                  className="p-6 rounded-xl border-2 border-emerald-200 dark:border-emerald-800 bg-emerald-50 dark:bg-emerald-900/20 hover:bg-emerald-100 dark:hover:bg-emerald-900/40 text-emerald-800 dark:text-emerald-200 font-semibold transition-all hover:shadow-md active:scale-95"
                >
                  ❤️ المساهمة في العلاج
                </button>
                <button
                  onClick={() => handleOption('business')}
                  className="p-6 rounded-xl border-2 border-amber-200 dark:border-amber-800 bg-amber-50 dark:bg-amber-900/20 hover:bg-amber-100 dark:hover:bg-amber-900/40 text-amber-800 dark:text-amber-200 font-semibold transition-all hover:shadow-md active:scale-95"
                >
                  📈 إدارة الأعمال
                </button>
                <button
                  onClick={() => handleOption('arts')}
                  className="p-6 rounded-xl border-2 border-rose-200 dark:border-rose-800 bg-rose-50 dark:bg-rose-900/20 hover:bg-rose-100 dark:hover:bg-rose-900/40 text-rose-800 dark:text-rose-200 font-semibold transition-all hover:shadow-md active:scale-95"
                >
                  🎤 التأثير الإعلامي
                </button>
              </div>
            </div>
          )}
        </div>
      ) : (
        <div className="text-center animate-scale-in">
          <div className={`inline-flex items-center justify-center h-20 w-20 rounded-full ${trackInfo.bgColor} text-white mb-6 border-4 border-white dark:border-slate-800 shadow-xl`}>
            {trackInfo.icon}
          </div>
          <h3 className="text-2xl font-bold mb-4 text-slate-800 dark:text-slate-100">تحليل المساعد الذكي</h3>

          <div className={`${trackInfo.bgColor} text-white p-8 rounded-2xl shadow-lg mb-8`}>
            <p className="text-white/90 text-sm mb-2 font-semibold">المسار الأكاديمي الموصى به لك هو:</p>
            <h4 className="text-3xl font-bold mb-4">{trackInfo.name}</h4>
            <p className="text-white/95 text-sm leading-relaxed border-t border-white/30 pt-4">
              {trackInfo.reasoning}
            </p>
          </div>

          {/* Score Breakdown */}
          <div className="mb-8 bg-slate-50 dark:bg-slate-700/50 p-6 rounded-2xl">
            <h5 className="font-bold text-slate-800 dark:text-slate-100 mb-4">تحليل النتائج:</h5>
            <div className="space-y-3">
              {sortedTracks.map(({ track, score }) => {
                const info = TRACK_INFO[track];
                const percentage = getScorePercentage(track);
                return (
                  <div key={track} className="text-left">
                    <div className="flex justify-between items-center mb-1">
                      <span className="font-semibold text-slate-700 dark:text-slate-200">{info.name}</span>
                      <span className="text-sm font-bold text-slate-600 dark:text-slate-400">{percentage}%</span>
                    </div>
                    <div className="w-full bg-slate-200 dark:bg-slate-600 rounded-full h-2 overflow-hidden">
                      <div
                        className={`${info.bgColor} h-full transition-all duration-500`}
                        style={{ width: `${percentage}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="space-y-4">
            {/* Primary Actions */}
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <a
                href="#tracks"
                className="px-6 py-3 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-xl font-bold shadow-md hover:shadow-lg transition-all active:scale-95"
              >
                تصفح مواد المسار
              </a>
              <button
                onClick={resetWizard}
                className="px-6 py-3 bg-white dark:bg-slate-700 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-600 rounded-xl font-bold hover:bg-slate-50 dark:hover:bg-slate-600 transition-all active:scale-95"
              >
                إعادة الاختبار
              </button>
            </div>

            {/* Download & Share Section */}
            <div className="border-t border-slate-200 dark:border-slate-700 pt-6 mt-6">
              <p className="text-sm font-semibold text-slate-600 dark:text-slate-400 mb-4">شارك نتائجك:</p>
              
              {/* Download PDF */}
              <div className="mb-4">
                <button
                  onClick={handleDownloadPDF}
                  className="w-full px-4 py-3 bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 border border-blue-200 dark:border-blue-800 rounded-lg font-semibold hover:bg-blue-100 dark:hover:bg-blue-900/40 transition-all active:scale-95 flex items-center justify-center gap-2"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2m0 0v-8m0 8H3m0 0h18" />
                  </svg>
                  تحميل النتائج PDF
                </button>
              </div>

              {/* Social Media Sharing */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                <button
                  onClick={() => handleShareSocial('twitter')}
                  className="px-3 py-2 bg-sky-100 dark:bg-sky-900/20 text-sky-600 dark:text-sky-400 border border-sky-200 dark:border-sky-800 rounded-lg font-semibold hover:bg-sky-200 dark:hover:bg-sky-900/40 transition-all active:scale-95 text-sm"
                  title="Share on Twitter"
                >
                  𝕏
                </button>
                <button
                  onClick={() => handleShareSocial('facebook')}
                  className="px-3 py-2 bg-blue-100 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 border border-blue-200 dark:border-blue-800 rounded-lg font-semibold hover:bg-blue-200 dark:hover:bg-blue-900/40 transition-all active:scale-95 text-sm"
                  title="Share on Facebook"
                >
                  f
                </button>
                <button
                  onClick={() => handleShareSocial('whatsapp')}
                  className="px-3 py-2 bg-green-100 dark:bg-green-900/20 text-green-600 dark:text-green-400 border border-green-200 dark:border-green-800 rounded-lg font-semibold hover:bg-green-200 dark:hover:bg-green-900/40 transition-all active:scale-95 text-sm"
                  title="Share on WhatsApp"
                >
                  💬
                </button>
                <button
                  onClick={() => handleShareSocial('linkedin')}
                  className="px-3 py-2 bg-blue-100 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 border border-blue-200 dark:border-blue-800 rounded-lg font-semibold hover:bg-blue-200 dark:hover:bg-blue-900/40 transition-all active:scale-95 text-sm"
                  title="Share on LinkedIn"
                >
                  in
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
