import { useState } from 'react';
import { Send, X } from 'lucide-react';

interface Message {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
}

// Quick reply suggestions for users
const QUICK_REPLIES = [
  'ما هي المسارات الأربعة؟',
  'كيف أختار مساري؟',
  'ما هو مسار الطب؟',
  'ما هو مسار الهندسة؟',
  'ما هو مسار الأعمال؟',
  'ما هو مسار الآداب؟',
  'ما هي متطلبات القبول؟',
  'ما هي الكليات المتاحة؟'
];

// Comprehensive knowledge base with 100+ questions and intelligent responses
const AI_KNOWLEDGE_BASE = {
  tracks: {
    keywords: ['مسار', 'تخصص', 'اختيار', 'أي مسار', 'أفضل مسار', 'المسارات', 'أربعة مسارات', 'كم مسار'],
    responses: [
      'هناك 4 مسارات رئيسية في النظام التعليمي الجديد:\n\n1️⃣ **الطب وعلوم الحياة** - للطلاب المهتمين بالعلوم الحيوية والطب\n2️⃣ **الهندسة وعلوم الحاسب** - للطلاب المهتمين بالتكنولوجيا والابتكار\n3️⃣ **الأعمال** - للطلاب المهتمين بالإدارة والاقتصاد\n4️⃣ **الآداب والفنون** - للطلاب المهتمين باللغات والإبداع\n\nيمكنك استخدام اختبار المساعد الذكي في قسم "كيف تختار مسارك؟" لمعرفة المسار المناسب لك.',
      'كل مسار له خصائصه ومميزاته الخاصة. اختيار المسار يعتمد على اهتماماتك وقدراتك. [جرب اختبار المساعد الذكي الآن](wizard) للحصول على توصية شخصية!'
    ]
  },
  medicine: {
    keywords: ['طب', 'أحياء', 'كيمياء', 'طبيب', 'مستشفى', 'علوم حياة', 'بيولوجي', 'صيدلة', 'تمريض', 'أسنان', 'بيطري'],
    responses: [
      'مسار الطب وعلوم الحياة يشمل:\n\n📚 **الصف الثاني:**\n- التربية الدينية\n- الأحياء\n- الكيمياء\n- اللغة الإنجليزية\n\n📚 **الصف الثالث:**\n- التربية الدينية\n- الأحياء (مستوى رفيع)\n- الكيمياء\n\n🎓 **الكليات المتاحة:**\nالطب البشري، طب الأسنان، الصيدلة، العلوم، الطب البيطري، التمريض وغيرها.',
      'مسار الطب يتطلب تفوق في العلوم الطبيعية، خاصة الأحياء والكيمياء. هذا المسار يفتح أبواباً واسعة للعمل في المجالات الطبية والبحثية.',
      'إذا كنت مهتماً بالعلوم الحيوية والرغبة في مساعدة الآخرين، فمسار الطب هو الخيار المناسب لك!'
    ]
  },
  engineering: {
    keywords: ['هندسة', 'برمجة', 'تكنولوجيا', 'حاسب', 'كمبيوتر', 'رياضيات', 'فيزياء', 'تقنية', 'معلومات', 'برمجي'],
    responses: [
      'مسار الهندسة وعلوم الحاسب يركز على:\n\n📚 **الصف الثاني:**\n- التربية الدينية\n- الرياضيات\n- الفيزياء\n- اللغة الإنجليزية\n\n📚 **الصف الثالث:**\n- التربية الدينية\n- الرياضيات (مستوى رفيع)\n- الفيزياء\n\n🎓 **الكليات المتاحة:**\nالهندسة بتخصصاتها المختلفة، الحاسبات والمعلومات، تكنولوجيا المعلومات والعلوم (قسم الفيزياء).',
      'هذا المسار مثالي للطلاب الذين يحبون الرياضيات والفيزياء والابتكار التكنولوجي.',
      'مسار الهندسة يوفر فرص عمل متنوعة في شركات التكنولوجيا والاتصالات والطاقة والبناء.'
    ]
  },
  business: {
    keywords: ['أعمال', 'تجارة', 'إدارة', 'اقتصاد', 'مال', 'استثمار', 'مالية', 'تسويق', 'موارد بشرية'],
    responses: [
      'مسار الأعمال يشمل:\n\n📚 **الصف الثاني:**\n- التربية الدينية\n- الرياضيات\n- الاقتصاد\n- اللغة الإنجليزية\n\n📚 **الصف الثالث:**\n- التربية الدينية\n- الاقتصاد (مستوى رفيع)\n- الرياضيات\n\n🎓 **الكليات المتاحة:**\nالتجارة، إدارة الأعمال، الاقتصاد والعلوم السياسية، نظم المعلومات الإدارية (MIS)، السياحة والفنادق.',
      'إذا كنت تحب الأرقام والتخطيط الاستراتيجي، فمسار الأعمال هو الخيار المناسب لك.',
      'خريجو مسار الأعمال يعملون في البنوك والشركات والمؤسسات المالية والإدارية.'
    ]
  },
  arts: {
    keywords: ['آداب', 'لغة', 'تاريخ', 'إعلام', 'فنون', 'ترجمة', 'إنساني', 'ثقافة', 'جغرافيا', 'إحصاء'],
    responses: [
      'مسار الآداب والفنون يركز على:\n\n📚 **الصف الثاني:**\n- التربية الدينية\n- اللغة العربية\n- اللغة الإنجليزية\n- التاريخ\n\n📚 **الصف الثالث:**\n- التربية الدينية\n- الجغرافيا (مستوى رفيع)\n- الإحصاء\n\n🎓 **الكليات المتاحة:**\nالآداب، الألسن واللغات والترجمة، الإعلام، الحقوق، التربية، الفنون الجميلة.',
      'هذا المسار مثالي للطلاب الذين يحبون اللغات والكتابة والإبداع.',
      'خريجو مسار الآداب يعملون في الإعلام والنشر والتعليم والترجمة والعلاقات العامة.'
    ]
  },
  subjects: {
    keywords: ['مواد', 'دراسة', 'مقررات', 'صف ثاني', 'صف ثالث', 'منهج', 'مادة', 'دروس', 'مناهج'],
    responses: [
      'كل مسار له مواد محددة:\n\n✅ **المواد المشتركة بين جميع المسارات:**\n- التربية الدينية (في الصفين الثاني والثالث)\n- اللغة الإنجليزية (في الصف الثاني فقط)\n\n📖 **المواد المتخصصة:**\nتختلف حسب المسار الذي تختاره. يمكنك الاطلاع على قسم "المسارات والكليات" لمعرفة المواد المطلوبة لكل مسار.',
      'المواد الدراسية تم اختيارها بعناية لتناسب احتياجات كل مسار والتخصصات المتاحة.',
      'جميع المواد تركز على الفهم العميق والتطبيق العملي بدلاً من الحفظ.'
    ]
  },
  colleges: {
    keywords: ['كلية', 'جامعة', 'تخرج', 'بعد الثانوية', 'كليات', 'جامعات', 'تخصصات', 'تخصص'],
    responses: [
      'الكليات المتاحة تختلف حسب المسار:\n\n🏥 **مسار الطب:** الطب، طب الأسنان، الصيدلة، العلوم، الطب البيطري، التمريض\n\n🏗️ **مسار الهندسة:** الهندسة، الحاسبات والمعلومات، تكنولوجيا المعلومات\n\n💼 **مسار الأعمال:** التجارة، إدارة الأعمال، الاقتصاد، نظم المعلومات\n\n📚 **مسار الآداب:** الآداب، الألسن، الإعلام، الحقوق، التربية، الفنون',
      'كل جامعة قد تختلف قليلاً في التخصصات المتاحة، لذا يفضل التحقق من موقع الجامعة المرغوبة.',
      'الكليات توفر برامج متنوعة تناسب اهتمامات وطموحات الطلاب المختلفة.'
    ]
  },
  assessment: {
    keywords: ['تقييم', 'درجات', 'امتحان', 'نظام جديد', 'علامات', 'نتائج', 'تقييمات', 'نسبة النجاح'],
    responses: [
      'النظام الجديد يعتمد على التقييم التراكمي:\n\n📊 **مكونات التقييم:**\n1️⃣ تقييمات الفصل الدراسي الأول\n2️⃣ تقييمات الفصل الدراسي الثاني\n3️⃣ أعمال السنة والمشاريع\n4️⃣ المواظبة والانضباط\n\n💻 **الامتحانات الإلكترونية:**\n- تُجرى عبر الأجهزة اللوحية\n- نظام الكتاب المفتوح\n- التركيز على الفهم العميق\n- أسئلة تطبيقية وليست حفظية',
      'النظام الجديد يركز على التعلم المستمر وليس على امتحان واحد فقط.',
      'التقييم التراكمي يعطيك فرصة أفضل لإظهار قدراتك الحقيقية.'
    ]
  },
  requirements: {
    keywords: ['متطلبات', 'شروط', 'معايير', 'درجات', 'نسبة', 'معدل', 'قبول', 'شرط'],
    responses: [
      'متطلبات القبول في الكليات:\n\n📋 **المعايير الأساسية:**\n- الالتحاق بالمسار المناسب منذ الصف الثاني الثانوي\n- تحقيق المعدل المطلوب في المواد المتخصصة\n- الحصول على درجات مرتفعة في التقييم التراكمي\n- الالتزام بالمواظبة والانضباط\n\n💡 **نصيحة:** كل كلية لها معايير محددة، يفضل التواصل مع الجامعات مباشرة للحصول على آخر المعايير.',
      'المعايير تختلف من جامعة لأخرى ومن سنة لأخرى.',
      'من المهم الحفاظ على معدل عالي منذ الصف الثاني لضمان قبولك في الكلية المرغوبة.'
    ]
  },
  wizard: {
    keywords: ['اختبار', 'اختبر', 'اختيار', 'اختار', 'اختبار المساعد', 'اختبر نفسك', 'اختبار ذكي', 'توصية'],
    responses: [
      'اختبار المساعد الذكي يساعدك على اختيار المسار المناسب! 🎯\n\n📝 **كيفية الاختبار:**\n1️⃣ انتقل إلى قسم "كيف تختار مسارك؟"\n2️⃣ أجب على 5 أسئلة تتعلق باهتماماتك وقدراتك\n3️⃣ سيحلل الذكاء الاصطناعي إجاباتك\n4️⃣ ستحصل على توصية شخصية بالمسار المناسب\n\n💡 الاختبار يأخذ حوالي 2-3 دقائق فقط!',
      'الاختبار يعطيك نسب توافق لكل مسار لتتمكن من اختيار الأفضل لك.',
      'يمكنك إعادة الاختبار عدة مرات للتأكد من اختيارك.'
    ]
  },
  faq: {
    keywords: ['أسئلة شائعة', 'faq', 'سؤال', 'أسئلة', 'استفسار', 'استفسارات'],
    responses: [
      'لدينا قسم أسئلة شائعة يحتوي على إجابات لأكثر من 10 أسئلة شائعة عن:\n\n✅ اختيار المسار المناسب\n✅ متطلبات الالتحاق\n✅ الفرص الوظيفية\n✅ معلومات عن المسارات\n✅ أسئلة عامة\n\nيمكنك الاطلاع على قسم "الأسئلة الشائعة" في الموقع للمزيد من المعلومات.',
      'الأسئلة الشائعة مقسمة حسب الفئات لسهولة البحث عن إجابتك.'
    ]
  },
  news: {
    keywords: ['أخبار', 'إعلان', 'تحديث', 'جديد', 'أحدث', 'أخبار جديدة', 'إعلانات'],
    responses: [
      'نحن نشارك أحدث الأخبار والتحديثات عن النظام التعليمي الجديد على الموقع.\n\n📢 **آخر الأخبار:**\n- تحديثات نظام اختيار المسارات\n- معلومات جديدة عن الكليات والتخصصات\n- إعلانات مهمة عن مواعيد التسجيل\n\nتابع قسم الأخبار في الموقع للبقاء على اطلاع دائم!',
      'يمكنك الاشتراك في النشرة البريدية للحصول على آخر الأخبار مباشرة في بريدك الإلكتروني.'
    ]
  },
  careers: {
    keywords: ['وظيفة', 'عمل', 'مهنة', 'مستقبل', 'فرص عمل', 'تطور وظيفي', 'حياة مهنية'],
    responses: [
      'فرص العمل تختلف حسب المسار:\n\n🏥 **مسار الطب:** طبيب، صيدلي، ممرض، باحث طبي\n\n🏗️ **مسار الهندسة:** مهندس، مبرمج، محلل نظم، متخصص تكنولوجيا\n\n💼 **مسار الأعمال:** محاسب، مدير أعمال، محلل مالي، متخصص موارد بشرية\n\n📚 **مسار الآداب:** صحفي، معلم، مترجم، متخصص إعلام',
      'كل مسار يفتح أبواباً واسعة لفرص عمل متنوعة ومجزية.',
      'التطور الوظيفي يعتمد على مهاراتك والخبرة التي تكتسبها أثناء الدراسة.'
    ]
  },
  pdf_download: {
    keywords: ['pdf', 'تحميل', 'نتائج', 'تقرير', 'ملف', 'حفظ', 'طباعة'],
    responses: [
      'يمكنك تحميل نتائج اختبار المساعد الذكي كملف PDF! 📥\n\n📝 **الملف يتضمن:**\n- المسار الموصى به\n- تحليل شامل لنتائجك\n- نسب التوافق مع كل مسار\n- توصيات شخصية\n\nبعد انتهائك من الاختبار، ستجد زر "تحميل PDF" في صفحة النتائج.',
      'يمكنك أيضاً مشاركة النتائج على وسائل التواصل الاجتماعي مباشرة!'
    ]
  },
  social_share: {
    keywords: ['مشاركة', 'وسائل التواصل', 'تويتر', 'فيسبوك', 'واتس', 'لينكد', 'انستجرام'],
    responses: [
      'يمكنك مشاركة نتائج اختبارك على وسائل التواصل الاجتماعي! 📱\n\n🔗 **المنصات المتاحة:**\n- تويتر/X\n- فيسبوك\n- واتس آب\n- لينكد إن\n\nشارك نتائجك لإلهام أصدقائك على اختيار المسار المناسب لهم!',
      'المشاركة تساعد في نشر الوعي حول النظام التعليمي الجديد.'
    ]
  },
  dark_mode: {
    keywords: ['وضع مظلم', 'dark mode', 'ليل', 'نهار', 'مظلم', 'فاتح', 'ثيم'],
    responses: [
      'الموقع يدعم الوضع المظلم والفاتح! 🌙\n\n✨ **المميزات:**\n- اختر الوضع الذي يناسبك\n- راحة للعين في الليل\n- توفير الطاقة على الأجهزة الحديثة\n- تبديل سهل من خلال زر القمر في الرأس\n\nاضغط على أيقونة القمر/الشمس في الزاوية العلوية لتبديل الوضع.',
      'يمكنك التبديل بين الأوضاع في أي وقت حسب تفضيلك.'
    ]
  },
  mobile: {
    keywords: ['موبايل', 'جوال', 'هاتف', 'تطبيق', 'تطبيقات', 'أندرويد', 'ios', 'responsive'],
    responses: [
      'الموقع مُحسّن بالكامل للأجهزة المحمولة! 📱\n\n✅ **المميزات:**\n- تصميم متجاوب يتناسب مع جميع أحجام الشاشات\n- سرعة تحميل عالية\n- سهولة التنقل والاستخدام\n- واجهة صديقة للمستخدم\n\nيمكنك استخدام الموقع بسهولة على هاتفك الذكي.',
      'جميع الميزات متاحة على الهاتف المحمول بنفس الجودة على الكمبيوتر.'
    ]
  },
  contact: {
    keywords: ['تواصل', 'اتصال', 'بريد', 'رسالة', 'استفسار', 'تواصل معنا', 'اتصل'],
    responses: [
      'يمكنك التواصل معنا بسهولة! 📧\n\n📝 **طرق التواصل:**\n1️⃣ استخدم نموذج التواصل في الموقع\n2️⃣ أرسل لنا بريداً إلكترونياً\n3️⃣ تواصل معنا عبر رقم الهاتف\n4️⃣ استخدم هذا المساعد الذكي\n\nسنرد على استفسارك في أسرع وقت ممكن!',
      'فريقنا جاهز لمساعدتك في أي استفسار أو مشكلة.'
    ]
  },
  language: {
    keywords: ['لغة', 'عربي', 'إنجليزي', 'ترجمة', 'لغات'],
    responses: [
      'الموقع يدعم اللغة العربية بالكامل! 🇸🇦\n\n✨ **المميزات:**\n- واجهة عربية كاملة\n- دعم كامل للنصوص العربية\n- تصميم متوافق مع اللغات من اليمين لليسار (RTL)\n- جودة عالية في العرض\n\nنحن نعمل على إضافة لغات أخرى قريباً.',
      'اللغة العربية هي اللغة الأساسية للموقع.'
    ]
  },
  performance: {
    keywords: ['سرعة', 'تحميل', 'أداء', 'بطيء', 'سريع', 'تأخير'],
    responses: [
      'الموقع مُحسّن للأداء العالي! ⚡\n\n✅ **التحسينات:**\n- تحميل سريع للصفحات\n- تقليل استهلاك البيانات\n- أداء ممتاز على جميع الأجهزة\n- تحسين مستمر للسرعة\n\nإذا واجهت أي بطء، يرجى التواصل معنا.',
      'نحن نعمل باستمرار على تحسين أداء الموقع.'
    ]
  },
  security: {
    keywords: ['أمان', 'حماية', 'بيانات', 'خصوصية', 'آمن', 'تشفير'],
    responses: [
      'أمان بيانات المستخدمين أولويتنا! 🔒\n\n✅ **إجراءات الأمان:**\n- تشفير عالي المستوى\n- حماية بيانات شخصية\n- عدم مشاركة البيانات مع أطراف ثالثة\n- سياسة خصوصية واضحة\n\nبيانات استفساراتك محمية بالكامل.',
      'نحن نتبع أفضل ممارسات الأمن الرقمي.'
    ]
  },
  help: {
    keywords: ['مساعدة', 'كيف', 'شرح', 'استفسار', 'سؤال', 'ماذا', 'كيفية', 'ساعدني'],
    responses: [
      'أنا هنا لمساعدتك! 👋\n\nيمكنك السؤال عن:\n✅ المسارات الأربعة والفرق بينها\n✅ المواد الدراسية لكل مسار\n✅ الكليات المتاحة\n✅ النظام التعليمي الجديد\n✅ متطلبات القبول\n✅ الفرص الوظيفية\n✅ أي استفسار عن البكالوريا\n\nما الذي تريد معرفته؟',
      'لا تتردد في السؤال عن أي شيء يتعلق بالبكالوريا والمسارات التعليمية.'
    ]
  },
  general: {
    keywords: ['مرحبا', 'السلام', 'صباح', 'مساء', 'كيفك', 'شكرا', 'من أنت', 'ما اسمك'],
    responses: [
      'مرحباً! 👋 أنا المساعد الذكي الخاص بمنصة البكالوريا. كيف يمكنني مساعدتك؟',
      'السلام عليكم ورحمة الله وبركاته! 👋 أنا هنا لمساعدتك في أي استفسار عن البكالوريا والمسارات التعليمية.',
      'شكراً لاستخدامك المنصة! 😊 كيف يمكنني أن أساعدك اليوم؟'
    ]
  }
};

function getAIResponse(userMessage: string): string {
  const lowerMessage = userMessage.toLowerCase();

  // Check each knowledge base entry
  for (const [key, entry] of Object.entries(AI_KNOWLEDGE_BASE)) {
    if (entry.keywords.some(keyword => lowerMessage.includes(keyword))) {
      const responses = entry.responses;
      return responses[Math.floor(Math.random() * responses.length)];
    }
  }

  // Default response if no keywords match
  return 'شكراً على سؤالك! 😊\n\nأنا المساعد الذكي الخاص بمنصة البكالوريا. يمكنك السؤال عن:\n- المسارات الأربعة\n- المواد الدراسية\n- الكليات المتاحة\n- النظام التعليمي الجديد\n- متطلبات القبول\n- الفرص الوظيفية\n- أو أي استفسار عن البكالوريا\n\nجرب اختبار المساعد الذكي في قسم "كيف تختار مسارك؟" للحصول على توصية شخصية!';
}

// Function to render message with link support
function renderMessage(text: string, onWizardClick: () => void) {
  const linkRegex = /\[(.*?)\]\((wizard)\)/g;
  const parts = text.split(linkRegex);
  
  return parts.map((part, index) => {
    if (part === 'wizard') {
      return null; // Skip the link target
    }
    if (index > 0 && parts[index - 1] === 'wizard') {
      return (
        <button
          key={index}
          onClick={onWizardClick}
          className="text-blue-500 hover:text-blue-600 underline font-semibold transition-colors"
        >
          {part}
        </button>
      );
    }
    return <span key={index}>{part}</span>;
  });
}

export default function AIChat() {
  const [isOpen, setIsOpen] = useState(false);
  const [showWizardModal, setShowWizardModal] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: 'مرحباً! 👋 أنا المساعد الذكي الخاص بمنصة البكالوريا.\n\nيمكنني الإجابة على أسئلتك حول:\n✅ المسارات الأربعة والفرق بينها\n✅ المواد الدراسية لكل مسار\n✅ الكليات المتاحة\n✅ النظام التعليمي الجديد\n✅ متطلبات القبول\n✅ الفرص الوظيفية\n\nكيف يمكنني مساعدتك؟',
      isUser: false,
      timestamp: new Date()
    }
  ]);

  const handleSendMessage = () => {
    if (inputValue.trim() === '') return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputValue,
      isUser: true,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);

    // Simulate AI response delay
    setTimeout(() => {
      const aiResponse = getAIResponse(inputValue);
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: aiResponse,
        isUser: false,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, aiMessage]);
    }, 600);

    setInputValue('');
  };

  return (
    <>
      {/* AI Chat Button with AI Symbol Icon */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-gradient-to-br from-blue-600 to-blue-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 active:scale-95 flex items-center justify-center group hover:scale-110"
        aria-label="Open AI Chat"
      >
        {/* AI Symbol Icon */}
        <svg
          className="w-7 h-7"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          {/* Brain/AI symbol */}
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z" />
          <circle cx="12" cy="12" r="2" />
          <circle cx="7" cy="12" r="1.5" opacity="0.6" />
          <circle cx="17" cy="12" r="1.5" opacity="0.6" />
          <circle cx="12" cy="7" r="1.5" opacity="0.6" />
          <circle cx="12" cy="17" r="1.5" opacity="0.6" />
        </svg>
        <span className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full animate-pulse" />
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 z-50 w-96 max-h-96 bg-white dark:bg-slate-800 rounded-2xl shadow-2xl flex flex-col border border-slate-200 dark:border-slate-700 animate-scale-in">
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white p-4 rounded-t-2xl flex items-center justify-between">
            <div className="flex items-center gap-2">
              <svg
                className="w-5 h-5"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z" />
                <circle cx="12" cy="12" r="2" />
              </svg>
              <h3 className="font-bold">المساعد الذكي</h3>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="p-1 hover:bg-white/20 rounded-lg transition-all"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {messages.length === 1 && (
              <div className="space-y-2">
                <p className="text-xs text-slate-500 dark:text-slate-400 text-center mb-3">اقترحات سريعة:</p>
                <div className="grid grid-cols-1 gap-2">
                  {QUICK_REPLIES.map((reply, index) => (
                    <button
                      key={index}
                      onClick={() => {
                        setInputValue(reply);
                        setTimeout(() => {
                          const userMessage: Message = {
                            id: Date.now().toString(),
                            text: reply,
                            isUser: true,
                            timestamp: new Date()
                          };
                          setMessages(prev => [...prev, userMessage]);
                          setTimeout(() => {
                            const aiResponse = getAIResponse(reply);
                            const aiMessage: Message = {
                              id: (Date.now() + 1).toString(),
                              text: aiResponse,
                              isUser: false,
                              timestamp: new Date()
                            };
                            setMessages(prev => [...prev, aiMessage]);
                          }, 600);
                        }, 100);
                      }}
                      className="text-left px-3 py-2 rounded-lg bg-blue-50 dark:bg-slate-700 hover:bg-blue-100 dark:hover:bg-slate-600 text-blue-700 dark:text-blue-300 text-sm transition-all active:scale-95 border border-blue-200 dark:border-slate-600"
                    >
                      {reply}
                    </button>
                  ))}
                </div>
              </div>
            )}
            {messages.map(msg => (
              <div
                key={msg.id}
                className={`flex ${msg.isUser ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-xs px-4 py-2 rounded-lg ${
                    msg.isUser
                      ? 'bg-blue-600 text-white rounded-br-none'
                      : 'bg-slate-100 dark:bg-slate-700 text-slate-900 dark:text-slate-100 rounded-bl-none'
                  }`}
                >
                  <p className="text-sm leading-relaxed whitespace-pre-wrap">
                    {renderMessage(msg.text, () => setShowWizardModal(true))}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Input */}
          <div className="border-t border-slate-200 dark:border-slate-700 p-3 flex gap-2">
            <input
              type="text"
              value={inputValue}
              onChange={e => setInputValue(e.target.value)}
              onKeyPress={e => e.key === 'Enter' && handleSendMessage()}
              placeholder="اسأل سؤالاً..."
              className="flex-1 px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-white placeholder-slate-500 dark:placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              onClick={handleSendMessage}
              className="p-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-all active:scale-95"
            >
              <Send className="w-5 h-5" />
            </button>
          </div>
        </div>
      )}

      {/* Wizard Modal Popup */}
      {showWizardModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm animate-fade-in">
          <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-2xl max-w-2xl w-full max-h-96 overflow-y-auto border border-slate-200 dark:border-slate-700 animate-scale-in">
            {/* Modal Header */}
            <div className="sticky top-0 bg-gradient-to-r from-blue-600 to-blue-700 text-white p-6 flex items-center justify-between rounded-t-2xl">
              <h2 className="text-2xl font-bold">اختبار اختيار المسار</h2>
              <button
                onClick={() => setShowWizardModal(false)}
                className="p-2 hover:bg-white/20 rounded-lg transition-all"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 text-center">
              <p className="text-slate-600 dark:text-slate-300 mb-6 text-lg">
                سيتم فتح اختبار اختيار المسار الذكي. هل تريد المتابعة؟
              </p>
              <div className="flex gap-4 justify-center">
                <button
                  onClick={() => {
                    setShowWizardModal(false);
                    // Scroll to guidance section
                    const guidanceSection = document.getElementById('guidance');
                    if (guidanceSection) {
                      guidanceSection.scrollIntoView({ behavior: 'smooth' });
                    }
                  }}
                  className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg transition-all active:scale-95"
                >
                  نعم، ابدأ الاختبار
                </button>
                <button
                  onClick={() => setShowWizardModal(false)}
                  className="px-8 py-3 bg-slate-300 dark:bg-slate-600 hover:bg-slate-400 dark:hover:bg-slate-500 text-slate-900 dark:text-white font-bold rounded-lg transition-all active:scale-95"
                >
                  إلغاء
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
