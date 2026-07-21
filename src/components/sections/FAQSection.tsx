import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: string;
}

const FAQ_ITEMS: FAQItem[] = [
  {
    id: '1',
    category: 'اختيار المسار',
    question: 'كيف أختار المسار المناسب لي؟',
    answer: 'يمكنك استخدام اختبار اختيار المسار الذكي على المنصة، والذي يقيم اهتماماتك وقدراتك ويوصي بالمسار الأنسب. كما يمكنك استشارة المرشد الأكاديمي أو الاطلاع على معلومات كل مسار بالتفصيل.'
  },
  {
    id: '2',
    category: 'اختيار المسار',
    question: 'هل يمكن تغيير المسار بعد الاختيار؟',
    answer: 'نعم، في معظم الحالات يمكن تغيير المسار خلال الفترة المحددة من السنة الأولى. يفضل التواصل مع إدارة المدرسة أو الجامعة للتعرف على الشروط والإجراءات المطلوبة.'
  },
  {
    id: '3',
    category: 'متطلبات الالتحاق',
    question: 'ما هي متطلبات الالتحاق بمسار الطب؟',
    answer: 'عادة ما تتطلب معدل عالي في الثانوية العامة، خاصة في المواد العلمية (الأحياء والكيمياء والفيزياء). تختلف المتطلبات من جامعة لأخرى، لذا يفضل التحقق من موقع الجامعة المرغوبة.'
  },
  {
    id: '4',
    category: 'متطلبات الالتحاق',
    question: 'ما هي متطلبات الالتحاق بمسار الهندسة؟',
    answer: 'يتطلب تفوق في الرياضيات والفيزياء. معظم الجامعات تقبل الطلاب بمعدل عام جيد مع تركيز على درجات المواد العلمية. قد تطلب بعض الجامعات اختبارات قدرات إضافية.'
  },
  {
    id: '5',
    category: 'متطلبات الالتحاق',
    question: 'هل هناك متطلبات لغة أجنبية للالتحاق بالجامعة؟',
    answer: 'نعم، معظم الجامعات تتطلب مستوى معين من اللغة الإنجليزية. بعضها قد يطلب شهادة TOEFL أو IELTS. يفضل الاستفسار من الجامعة المرغوبة عن المتطلبات المحددة.'
  },
  {
    id: '6',
    category: 'الفرص الوظيفية',
    question: 'ما هي فرص العمل بعد التخرج من مسار الأعمال؟',
    answer: 'خريجو مسار الأعمال لديهم فرص وظيفية متنوعة في البنوك والشركات والمؤسسات المالية والإدارية. يمكنهم العمل في مجالات المحاسبة والإدارة والتسويق والموارد البشرية والاستثمار.'
  },
  {
    id: '7',
    category: 'الفرص الوظيفية',
    question: 'ما هي فرص العمل لخريجي مسار الآداب والفنون؟',
    answer: 'يمكن لخريجي هذا المسار العمل في الإعلام والنشر والتعليم والترجمة والعلاقات العامة والسياحة والثقافة. كما يمكنهم العمل بشكل حر كمدونين أو مترجمين أو كتاب.'
  },
  {
    id: '8',
    category: 'المسارات',
    question: 'كم عدد المسارات المتاحة؟',
    answer: 'هناك 4 مسارات رئيسية: مسار الطب وعلوم الحياة، مسار الهندسة وعلوم الحاسب، مسار الأعمال، ومسار الآداب والفنون. كل مسار يوفر تخصصات متعددة.'
  },
  {
    id: '9',
    category: 'المسارات',
    question: 'هل يمكن دراسة تخصصات من مسارات مختلفة؟',
    answer: 'في بعض الجامعات، يمكن الجمع بين تخصصات من مسارات مختلفة من خلال برامج مزدوجة أو ثنائية التخصص. يفضل الاستفسار من الجامعة عن هذه الخيارات.'
  },
  {
    id: '10',
    category: 'عام',
    question: 'كيف يمكنني التواصل مع المساعد الذكي؟',
    answer: 'يمكنك استخدام أيقونة الدردشة الزرقاء في أسفل الصفحة للتواصل مع المساعد الذكي. اطرح أسئلتك بحرية وسيساعدك المساعد في الحصول على الإجابات.'
  }
];

const CATEGORIES = ['الكل', 'اختيار المسار', 'متطلبات الالتحاق', 'الفرص الوظيفية', 'المسارات', 'عام'];

export default function FAQSection() {
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState('الكل');

  const filteredFAQs = selectedCategory === 'الكل' 
    ? FAQ_ITEMS 
    : FAQ_ITEMS.filter(item => item.category === selectedCategory);

  const toggleExpand = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <section id="faq" className="py-20 px-4 bg-gradient-to-b from-white via-blue-50/30 to-white dark:from-slate-900 dark:via-slate-800/50 dark:to-slate-900">
      <div className="container mx-auto max-w-4xl">
        {/* Section Header */}
        <div className="text-center mb-12 animate-fade-in-up">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-slate-900 dark:text-white">
            الأسئلة الشائعة
          </h2>
          <p className="text-lg text-slate-600 dark:text-slate-300">
            إجابات على الأسئلة الأكثر شيوعاً حول اختيار المسار ومتطلبات الالتحاق
          </p>
        </div>

        {/* Category Filter */}
        <div className="mb-8 flex flex-wrap gap-2 justify-center animate-fade-in-up" style={{ animationDelay: '100ms' }}>
          {CATEGORIES.map((category) => (
            <button
              key={category}
              onClick={() => {
                setSelectedCategory(category);
                setExpandedId(null);
              }}
              className={`px-4 py-2 rounded-full font-semibold transition-all ${
                selectedCategory === category
                  ? 'bg-blue-600 text-white shadow-lg'
                  : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:border-blue-400 dark:hover:border-blue-400'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* FAQ Items */}
        <div className="space-y-3 animate-fade-in-up" style={{ animationDelay: '200ms' }}>
          {filteredFAQs.map((item, index) => (
            <div
              key={item.id}
              className="border border-slate-200 dark:border-slate-700 rounded-xl overflow-hidden bg-white dark:bg-slate-800 shadow-sm hover:shadow-md transition-all duration-300"
              style={{ animationDelay: `${300 + index * 50}ms` }}
            >
              <button
                onClick={() => toggleExpand(item.id)}
                className="w-full px-6 py-4 flex items-center justify-between hover:bg-blue-50 dark:hover:bg-slate-700/50 transition-colors"
              >
                <span className="text-right flex-1 font-semibold text-slate-900 dark:text-white">
                  {item.question}
                </span>
                <ChevronDown
                  className={`w-5 h-5 text-blue-600 dark:text-blue-400 transition-transform duration-300 flex-shrink-0 mr-4 ${
                    expandedId === item.id ? 'rotate-180' : ''
                  }`}
                />
              </button>

              {/* Answer */}
              {expandedId === item.id && (
                <div className="px-6 py-4 border-t border-slate-200 dark:border-slate-700 bg-blue-50/50 dark:bg-slate-700/30 animate-slide-down">
                  <p className="text-slate-700 dark:text-slate-300 leading-relaxed text-right">
                    {item.answer}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* No Results */}
        {filteredFAQs.length === 0 && (
          <div className="text-center py-12">
            <p className="text-slate-600 dark:text-slate-400 text-lg">
              لم نجد أسئلة في هذه الفئة. يرجى اختيار فئة أخرى.
            </p>
          </div>
        )}

        {/* Contact CTA */}
        <div className="mt-12 p-8 bg-gradient-to-r from-blue-600 to-blue-700 rounded-2xl text-white text-center animate-fade-in-up" style={{ animationDelay: '400ms' }}>
          <h3 className="text-2xl font-bold mb-3">لم تجد إجابة لسؤالك؟</h3>
          <p className="mb-6 opacity-90">
            تواصل معنا مباشرة عبر نموذج التواصل أو استخدم المساعد الذكي للحصول على إجابة فورية
          </p>
          <a
            href="#contact"
            className="inline-block px-8 py-3 bg-white text-blue-600 font-bold rounded-lg hover:bg-blue-50 transition-all active:scale-95"
          >
            تواصل معنا الآن
          </a>
        </div>
      </div>
    </section>
  );
}
