import { useState, useEffect, useRef } from 'react';
import { Trophy, RefreshCw, Star, Zap, Volume2, VolumeX, AlertCircle, CheckCircle } from 'lucide-react';
import { toast } from 'sonner';

// Game questions data
const CARDS_POOL = [
  { id: 'm1', name: 'كلية الطب البشري', track: 'medicine', icon: '🏥' },
  { id: 'm2', name: 'كلية طب الأسنان', track: 'medicine', icon: '🦷' },
  { id: 'm3', name: 'كلية الصيدلة', track: 'medicine', icon: '💊' },
  { id: 'm4', name: 'كلية التمريض', track: 'medicine', icon: '🩺' },
  { id: 'm5', name: 'كلية العلاج الطبيعي', track: 'medicine', icon: '🚶' },
  
  { id: 'e1', name: 'كلية الهندسة (جميع التخصصات)', track: 'engineering', icon: '🏗️' },
  { id: 'e2', name: 'كلية الحاسبات والمعلومات', track: 'engineering', icon: '💻' },
  { id: 'e3', name: 'كلية الذكاء الاصطناعي', track: 'engineering', icon: '🤖' },
  { id: 'e4', name: 'كلية الفنون التطبيقية (قسم تصميم)', track: 'engineering', icon: '🎨' },
  { id: 'e5', name: 'كلية تكنولوجيا المعلومات', track: 'engineering', icon: '📡' },
  
  { id: 'b1', name: 'كلية التجارة وإدارة الأعمال', track: 'business', icon: '📊' },
  { id: 'b2', name: 'كلية الاقتصاد والعلوم السياسية', track: 'business', icon: '📈' },
  { id: 'b3', name: 'نظم المعلومات الإدارية (MIS)', track: 'business', icon: '🖥️' },
  { id: 'b4', name: 'كلية السياحة والفنادق', track: 'business', icon: '🏨' },
  { id: 'b5', name: 'إدارة الأعمال الدولية', track: 'business', icon: '🌐' },
  
  { id: 'a1', name: 'كلية الألسن واللغات والترجمة', track: 'arts', icon: '🗣️' },
  { id: 'a2', name: 'كلية الإعلام والاتصال الجماهيري', track: 'arts', icon: '📣' },
  { id: 'a3', name: 'كلية الآداب', track: 'arts', icon: '📚' },
  { id: 'a4', name: 'كلية الحقوق والدراسات القانونية', track: 'arts', icon: '⚖️' },
  { id: 'a5', name: 'كلية الفنون الجميلة', track: 'arts', icon: '🎭' }
];

const TRACKS = [
  { id: 'medicine', name: 'الطب وعلوم الحياة', icon: '🏥', color: 'border-emerald-500 bg-emerald-50 dark:bg-emerald-950/20 text-emerald-700 dark:text-emerald-300 hover:bg-emerald-100/50' },
  { id: 'engineering', name: 'الهندسة والتكنولوجيا', icon: '💻', color: 'border-indigo-500 bg-indigo-50 dark:bg-indigo-950/20 text-indigo-700 dark:text-indigo-300 hover:bg-indigo-100/50' },
  { id: 'business', name: 'الأعمال والإدارة', icon: '📊', color: 'border-amber-500 bg-amber-50 dark:bg-amber-950/20 text-amber-700 dark:text-amber-300 hover:bg-amber-100/50' },
  { id: 'arts', name: 'الآداب والفنون', icon: '📚', color: 'border-rose-500 bg-rose-50 dark:bg-rose-950/20 text-rose-700 dark:text-rose-300 hover:bg-rose-100/50' }
];

const GAME_TIME = 25; // 25 seconds limit

// Simple synthesised synthesizer sounds for arcade feedback
const playSynthesizerSound = (type: 'correct' | 'wrong' | 'win' | 'click', muted: boolean) => {
  if (muted) return;
  try {
    const ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain);
    gain.connect(ctx.destination);

    if (type === 'correct') {
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(523.25, ctx.currentTime); // C5
      osc.frequency.setValueAtTime(659.25, ctx.currentTime + 0.1); // E5
      gain.gain.setValueAtTime(0.15, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.3);
      osc.start();
      osc.stop(ctx.currentTime + 0.3);
    } else if (type === 'wrong') {
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(220, ctx.currentTime); // A3
      osc.frequency.setValueAtTime(147, ctx.currentTime + 0.1); // D3
      gain.gain.setValueAtTime(0.15, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.4);
      osc.start();
      osc.stop(ctx.currentTime + 0.4);
    } else if (type === 'win') {
      osc.type = 'sine';
      osc.frequency.setValueAtTime(523.25, ctx.currentTime); // C5
      osc.frequency.setValueAtTime(659.25, ctx.currentTime + 0.1); // E5
      osc.frequency.setValueAtTime(783.99, ctx.currentTime + 0.2); // G5
      osc.frequency.setValueAtTime(1046.50, ctx.currentTime + 0.3); // C6
      gain.gain.setValueAtTime(0.2, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.6);
      osc.start();
      osc.stop(ctx.currentTime + 0.6);
    } else if (type === 'click') {
      osc.type = 'sine';
      osc.frequency.setValueAtTime(600, ctx.currentTime);
      gain.gain.setValueAtTime(0.08, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.08);
      osc.start();
      osc.stop(ctx.currentTime + 0.08);
    }
  } catch (e) {
    // Audio Context blocked or unsupported
  }
};

export default function CollegesCardGame() {
  const [gameState, setGameState] = useState<'start' | 'playing' | 'result'>('start');
  const [cards, setCards] = useState<typeof CARDS_POOL>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(GAME_TIME);
  const [muted, setMuted] = useState(false);
  
  // Feedback states
  const [feedback, setFeedback] = useState<'correct' | 'wrong' | null>(null);
  const [shake, setShake] = useState(false);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Helper to shuffle array
  const shuffleArray = (arr: typeof CARDS_POOL) => {
    return [...arr].sort(() => Math.random() - 0.5).slice(0, 10); // Take 10 random cards
  };

  const startGame = () => {
    playSynthesizerSound('click', muted);
    setCards(shuffleArray(CARDS_POOL));
    setCurrentIndex(0);
    setScore(0);
    setTimeLeft(GAME_TIME);
    setFeedback(null);
    setGameState('playing');
  };

  // Timer loop
  useEffect(() => {
    if (gameState !== 'playing') return;

    timerRef.current = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          if (timerRef.current) clearInterval(timerRef.current);
          setGameState('result');
          playSynthesizerSound('wrong', muted);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [gameState, muted]);

  const handleClassification = (selectedTrack: string) => {
    if (feedback !== null || gameState !== 'playing') return;

    const currentCard = cards[currentIndex];
    const isCorrect = currentCard.track === selectedTrack;

    if (isCorrect) {
      setFeedback('correct');
      setScore(prev => prev + 1);
      playSynthesizerSound('correct', muted);
    } else {
      setFeedback('wrong');
      setShake(true);
      playSynthesizerSound('wrong', muted);
      setTimeout(() => setShake(false), 500);
    }

    // Go to next card after delay
    setTimeout(() => {
      setFeedback(null);
      if (currentIndex + 1 < cards.length) {
        setCurrentIndex(prev => prev + 1);
      } else {
        if (timerRef.current) clearInterval(timerRef.current);
        setGameState('result');
        playSynthesizerSound('win', muted);
      }
    }, 600);
  };

  const currentCard = cards[currentIndex];

  return (
    <section id="game-section" className="py-16 md:py-24 px-4 bg-slate-50/50 dark:bg-slate-900/30 scroll-mt-24 border-t border-slate-200 dark:border-slate-800">
      <div className="container mx-auto max-w-3xl">
        
        {/* Header Title */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300 text-xs font-bold mb-4">
            <Zap className="w-3.5 h-3.5" />
            استراحة تفاعلية
          </div>
          <h2 className="text-3xl md:text-4xl font-black mb-3">لعبة تصنيف الكليات 🎮</h2>
          <p className="text-slate-600 dark:text-slate-400">اختبر معلوماتك وصنف الكليات في مساراتها الصحيحة قبل نفاد الوقت!</p>
        </div>

        {/* Game Box */}
        <div className="bg-white dark:bg-slate-800 rounded-3xl border border-slate-200 dark:border-slate-700 shadow-xl overflow-hidden relative">
          
          {/* Top Control Bar */}
          <div className="flex justify-between items-center px-6 py-4 bg-slate-50 dark:bg-slate-900/50 border-b border-slate-100 dark:border-slate-700">
            <div className="flex items-center gap-3">
              <span className="font-bold text-slate-700 dark:text-slate-300">النقاط: {score} / 10</span>
            </div>
            
            {/* Timer for playing state */}
            {gameState === 'playing' && (
              <div className="flex items-center gap-2 bg-rose-50 dark:bg-rose-950/30 px-3 py-1 rounded-full text-rose-600 dark:text-rose-400 font-bold text-sm">
                <span className="animate-pulse">⏱️</span>
                <span>{timeLeft} ثانية</span>
              </div>
            )}

            {/* Mute button */}
            <button 
              onClick={() => setMuted(!muted)}
              className="p-1.5 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-500 dark:text-slate-400 transition-colors"
            >
              {muted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
            </button>
          </div>

          {/* 1. Start Screen */}
          {gameState === 'start' && (
            <div className="p-8 md:p-12 text-center flex flex-col items-center gap-6">
              <div className="w-20 h-20 bg-blue-100 dark:bg-blue-900/30 rounded-2xl flex items-center justify-center text-4xl shadow-inner animate-bounce">
                🏫
              </div>
              <div>
                <h3 className="text-2xl font-black text-slate-800 dark:text-white mb-2">فرز الكليات الذكي</h3>
                <p className="text-slate-500 dark:text-slate-400 text-sm max-w-md mx-auto leading-relaxed">
                  ستظهر لك بطاقات بأسماء الكليات والجامعات المصرية المختلفة. قم بتصنيف كل كلية سريعاً بسحبها أو النقر على مسارها الصحيح.
                </p>
              </div>

              <div className="flex flex-wrap gap-2 justify-center max-w-sm">
                <span className="text-xs font-semibold px-2.5 py-1 rounded-md bg-emerald-50 dark:bg-emerald-950/20 text-emerald-600 border border-emerald-200 dark:border-emerald-800">🏥 طبي</span>
                <span className="text-xs font-semibold px-2.5 py-1 rounded-md bg-indigo-50 dark:bg-indigo-950/20 text-indigo-600 border border-indigo-200 dark:border-indigo-800">💻 هندسي</span>
                <span className="text-xs font-semibold px-2.5 py-1 rounded-md bg-amber-50 dark:bg-amber-950/20 text-amber-600 border border-amber-200 dark:border-amber-800">📊 إداري</span>
                <span className="text-xs font-semibold px-2.5 py-1 rounded-md bg-rose-50 dark:bg-rose-950/20 text-rose-600 border border-rose-200 dark:border-rose-800">📚 أدبي</span>
              </div>

              <button
                onClick={startGame}
                className="px-8 py-3.5 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl shadow-lg hover:shadow-xl hover:scale-105 active:scale-95 transition-all duration-300"
              >
                ابدأ التحدي الآن 🚀
              </button>
            </div>
          )}

          {/* 2. Playing Screen */}
          {gameState === 'playing' && currentCard && (
            <div className="p-8 md:p-12 flex flex-col items-center gap-8">
              
              {/* Progress bar */}
              <div className="w-full bg-slate-100 dark:bg-slate-700 h-1.5 rounded-full overflow-hidden">
                <div 
                  className="bg-blue-600 h-full transition-all duration-300" 
                  style={{ width: `${(currentIndex / 10) * 100}%` }}
                />
              </div>

              {/* College Card */}
              <div 
                className={`relative w-full max-w-sm aspect-[1.7/1] rounded-3xl p-6 border-2 flex flex-col justify-center items-center text-center shadow-lg transition-all duration-300 ${
                  shake ? 'animate-shake' : ''
                } ${
                  feedback === 'correct' 
                    ? 'border-emerald-500 bg-emerald-50/80 dark:bg-emerald-950/40 text-emerald-800 dark:text-emerald-200' 
                    : feedback === 'wrong'
                    ? 'border-rose-500 bg-rose-50/80 dark:bg-rose-950/40 text-rose-800 dark:text-rose-200'
                    : 'border-slate-200 dark:border-slate-600 bg-slate-50 dark:bg-slate-900'
                }`}
              >
                {/* Floating feedback icon */}
                {feedback === 'correct' && (
                  <div className="absolute top-4 right-4 text-emerald-600 animate-scale-in">
                    <CheckCircle className="w-6 h-6" />
                  </div>
                )}
                {feedback === 'wrong' && (
                  <div className="absolute top-4 right-4 text-rose-600 animate-scale-in">
                    <AlertCircle className="w-6 h-6" />
                  </div>
                )}

                <div className="text-5xl mb-4 animate-pulse">{currentCard.icon}</div>
                <h4 className="text-xl md:text-2xl font-black text-slate-800 dark:text-white leading-tight">
                  {currentCard.name}
                </h4>
              </div>

              {/* Classification Options */}
              <div className="w-full">
                <p className="text-center text-xs font-bold text-slate-400 dark:text-slate-500 mb-4 uppercase tracking-wider">اختر المسار المطابق الكلية</p>
                <div className="grid grid-cols-2 gap-3">
                  {TRACKS.map(track => (
                    <button
                      key={track.id}
                      onClick={() => handleClassification(track.id)}
                      disabled={feedback !== null}
                      className={`flex items-center gap-2 p-3.5 border rounded-2xl text-right font-bold transition-all active:scale-95 text-sm md:text-base ${track.color}`}
                    >
                      <span className="text-xl">{track.icon}</span>
                      <span>{track.name}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* 3. Result Screen */}
          {gameState === 'result' && (
            <div className="p-8 md:p-12 text-center flex flex-col items-center gap-6">
              <div className="w-16 h-16 bg-amber-100 dark:bg-amber-900/30 rounded-2xl flex items-center justify-center text-3xl shadow-inner text-amber-500">
                <Trophy className="w-10 h-10 animate-bounce" />
              </div>

              <div>
                <h3 className="text-2xl font-black text-slate-800 dark:text-white mb-1">انتهى التحدي!</h3>
                <p className="text-slate-500 dark:text-slate-400 text-sm">
                  {score >= 8 
                    ? 'أحسنت! معلوماتك عن تخصصات الكليات المصرية ممتازة.' 
                    : score >= 5
                    ? 'جيد جداً! تعرف الكثير ولكن بعض التخصصات تتداخل.'
                    : 'فرصة جيدة للتعلم ومطالعة تفاصيل المسارات مجدداً.'}
                </p>
              </div>

              {/* Score Display Card */}
              <div className="flex gap-4 items-center bg-slate-50 dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-700 w-full max-w-sm justify-around shadow-inner">
                <div>
                  <div className="text-xs font-semibold text-slate-400 dark:text-slate-500 mb-1">النتيجة النهائية</div>
                  <div className="text-3xl font-black text-blue-600 dark:text-blue-400">{score} / 10</div>
                </div>
                <div className="w-px h-10 bg-slate-200 dark:bg-slate-700" />
                <div>
                  <div className="text-xs font-semibold text-slate-400 dark:text-slate-500 mb-1">الدقة</div>
                  <div className="text-3xl font-black text-indigo-600 dark:text-indigo-400">{score * 10}%</div>
                </div>
              </div>

              <div className="flex gap-3 w-full max-w-sm">
                <button
                  onClick={startGame}
                  className="flex-1 px-5 py-3.5 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl shadow-md hover:shadow-lg hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-2"
                >
                  <RefreshCw className="w-4 h-4" />
                  العب مجدداً
                </button>
                <a
                  href="#tracks"
                  className="flex-1 px-5 py-3.5 bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-200 font-bold rounded-xl hover:bg-slate-200 dark:hover:bg-slate-600 transition-all flex items-center justify-center gap-2"
                >
                  تفاصيل المسارات
                </a>
              </div>
            </div>
          )}

        </div>

      </div>

      {/* Embedded arcade styles */}
      <style>{`
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          20%, 60% { transform: translateX(-8px); }
          40%, 80% { transform: translateX(8px); }
        }
        .animate-shake {
          animation: shake 0.4s ease-in-out;
        }
      `}</style>
    </section>
  );
}
