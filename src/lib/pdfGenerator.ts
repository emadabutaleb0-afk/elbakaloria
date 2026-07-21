import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';

interface TrackResult {
  recommendedTrack: string;
  trackName: string;
  reasoning: string;
  scores: {
    medicine: number;
    engineering: number;
    business: number;
    arts: number;
  };
  total: number;
}

const TRACK_COLORS: Record<string, { bg: string; text: string; bar: string }> = {
  medicine:    { bg: '#ecfdf5', text: '#065f46', bar: '#10b981' },
  engineering: { bg: '#eef2ff', text: '#3730a3', bar: '#6366f1' },
  business:    { bg: '#fffbeb', text: '#78350f', bar: '#f59e0b' },
  arts:        { bg: '#fff1f2', text: '#881337', bar: '#f43f5e' },
};

/** Builds a fully styled HTML element in memory representing the PDF page */
function buildReportHTML(result: TrackResult): HTMLElement {
  const trackColor = TRACK_COLORS[result.recommendedTrack] ?? TRACK_COLORS.medicine;

  const tracks = [
    { key: 'medicine',    label: 'مسار الطب وعلوم الحياة',     color: '#10b981' },
    { key: 'engineering', label: 'مسار الهندسة وعلوم الحاسب', color: '#6366f1' },
    { key: 'business',    label: 'مسار الأعمال',               color: '#f59e0b' },
    { key: 'arts',        label: 'مسار الآداب والفنون',        color: '#f43f5e' },
  ];

  const wrapper = document.createElement('div');
  // Absolutely positioned off-screen — html2canvas requires the element to be
  // in the document flow with dimensions; fixed+negative coords break capture.
  wrapper.style.cssText = [
    'width: 794px',
    'min-height: 1123px',
    'font-family: Cairo, Segoe UI, Tahoma, sans-serif',
    'background: #ffffff',
    'direction: rtl',
    'text-align: right',
    'color: #1e293b',
    'position: absolute',
    'top: 0',
    'left: 0',
    'opacity: 0',
    'pointer-events: none',
    'z-index: -9999',
  ].join(';');

  wrapper.innerHTML = `
    <!-- Header -->
    <div style="background: linear-gradient(135deg, #1e40af 0%, #3b82f6 60%, #06b6d4 100%); padding: 36px 40px; position: relative; overflow: hidden;">
      <div style="position:absolute;top:-30px;left:-30px;width:160px;height:160px;background:rgba(255,255,255,0.07);border-radius:50%;"></div>
      <div style="position:absolute;bottom:-50px;right:-30px;width:200px;height:200px;background:rgba(255,255,255,0.05);border-radius:50%;"></div>
      <div style="position:relative;z-index:1;">
        <div style="display:flex;align-items:center;gap:12px;margin-bottom:16px;">
          <div style="background:rgba(255,255,255,0.2);border-radius:12px;padding:10px;display:flex;align-items:center;justify-content:center;">
            <span style="font-size:24px;">🎓</span>
          </div>
          <div>
            <div style="color:rgba(255,255,255,0.9);font-size:13px;font-weight:600;">منصة البكالوريا</div>
            <div style="color:rgba(255,255,255,0.6);font-size:11px;">Elbakaloria Platform</div>
          </div>
        </div>
        <h1 style="color:#ffffff;font-size:26px;font-weight:800;margin:0;line-height:1.3;">تقرير اختيار المسار الدراسي</h1>
        <p style="color:rgba(255,255,255,0.8);font-size:13px;margin:6px 0 0;">تاريخ الإصدار: ${new Date().toLocaleDateString('ar-EG', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
      </div>
    </div>

    <!-- Recommended Track Card -->
    <div style="padding: 32px 40px;">
      <div style="background:${trackColor.bg};border:2px solid ${trackColor.bar};border-radius:20px;padding:24px 28px;margin-bottom:28px;position:relative;overflow:hidden;">
        <div style="position:absolute;top:0;right:0;width:6px;height:100%;background:${trackColor.bar};border-radius:0 18px 18px 0;"></div>
        <div style="color:${trackColor.bar};font-size:12px;font-weight:700;text-transform:uppercase;letter-spacing:1px;margin-bottom:8px;">✓ المسار الموصى به</div>
        <div style="color:${trackColor.text};font-size:24px;font-weight:800;margin-bottom:12px;">${result.trackName}</div>
        <div style="color:#475569;font-size:13px;line-height:1.8;">${result.reasoning}</div>
      </div>

      <!-- Score Breakdown -->
      <div style="margin-bottom:28px;">
        <div style="font-size:16px;font-weight:800;color:#1e293b;margin-bottom:16px;display:flex;align-items:center;gap:8px;">
          <span style="display:inline-block;width:4px;height:18px;background:linear-gradient(180deg,#3b82f6,#6366f1);border-radius:2px;"></span>
          تحليل ميولك الدراسية
        </div>
        ${tracks.map(t => {
          const score = result.scores[t.key as keyof typeof result.scores];
          const pct = result.total > 0 ? Math.round((score / result.total) * 100) : 0;
          const recommended = t.key === result.recommendedTrack;
          return `
            <div style="margin-bottom:14px;">
              <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:6px;">
                <span style="font-size:13px;font-weight:${recommended ? '800' : '600'};color:${recommended ? t.color : '#475569'};">${recommended ? '★ ' : ''}${t.label}</span>
                <span style="font-size:13px;font-weight:700;color:${t.color};">${pct}%</span>
              </div>
              <div style="background:#f1f5f9;border-radius:8px;height:10px;overflow:hidden;">
                <div style="background:${t.color};width:${pct}%;height:100%;border-radius:8px;"></div>
              </div>
            </div>
          `;
        }).join('')}
      </div>

      <!-- Info Grid -->
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:14px;margin-bottom:28px;">
        <div style="background:#f8fafc;border:1px solid #e2e8f0;border-radius:14px;padding:18px;">
          <div style="color:#64748b;font-size:11px;font-weight:600;margin-bottom:6px;">📌 الخطوة التالية</div>
          <div style="color:#1e293b;font-size:13px;font-weight:700;">اكتشف الكليات المتاحة لمسارك</div>
        </div>
        <div style="background:#f8fafc;border:1px solid #e2e8f0;border-radius:14px;padding:18px;">
          <div style="color:#64748b;font-size:11px;font-weight:600;margin-bottom:6px;">💡 نصيحة</div>
          <div style="color:#1e293b;font-size:13px;font-weight:700;">شاور أهلك ومعلميك في القرار</div>
        </div>
      </div>

      <!-- Footer -->
      <div style="border-top:2px solid #f1f5f9;padding-top:20px;display:flex;justify-content:space-between;align-items:center;">
        <div style="color:#94a3b8;font-size:11px;">تم إنشاؤه بواسطة منصة البكالوريا</div>
        <div style="display:flex;align-items:center;gap:6px;">
          <div style="width:8px;height:8px;background:#3b82f6;border-radius:50%;"></div>
          <div style="width:8px;height:8px;background:#6366f1;border-radius:50%;"></div>
          <div style="width:8px;height:8px;background:#06b6d4;border-radius:50%;"></div>
        </div>
      </div>
    </div>
  `;

  return wrapper;
}

export const generateTrackReportPDF = async (result: TrackResult): Promise<void> => {
  const element = buildReportHTML(result);

  // Wrap in a hidden overflow container so the element is in the flow
  // but invisible — html2canvas needs elements to be visible/renderable.
  const container = document.createElement('div');
  container.style.cssText = [
    'position: fixed',
    'top: 0',
    'left: 0',
    'width: 794px',
    'height: 0',
    'overflow: hidden',
    'z-index: -9999',
    'pointer-events: none',
  ].join(';');
  container.appendChild(element);
  document.body.appendChild(container);

  // Let the browser paint the element (fonts, images)
  await new Promise(resolve => setTimeout(resolve, 400));

  try {
    const canvas = await html2canvas(element, {
      scale: 2,
      useCORS: true,
      allowTaint: true,
      backgroundColor: '#ffffff',
      width: 794,
      height: element.scrollHeight,
      windowWidth: 794,
      scrollX: 0,
      scrollY: 0,
      logging: false,
      onclone: (doc) => {
        // Make the cloned element fully visible so canvas can paint it
        const el = doc.body.querySelector('div') as HTMLElement | null;
        if (el) {
          el.style.opacity = '1';
          el.style.position = 'relative';
          el.style.zIndex = '1';
        }
      },
    });

    if (canvas.width === 0 || canvas.height === 0) {
      throw new Error('Canvas capture returned empty dimensions');
    }

    const imgData = canvas.toDataURL('image/jpeg', 0.97);
    const pdf = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4' });
    const pdfW = pdf.internal.pageSize.getWidth();   // 210 mm
    const pdfH = (canvas.height * pdfW) / canvas.width;

    pdf.addImage(imgData, 'JPEG', 0, 0, pdfW, pdfH);
    pdf.save(`track-report-${Date.now()}.pdf`);
  } finally {
    document.body.removeChild(container);
  }
};

export const shareOnSocialMedia = (trackName: string, trackEmoji: string) => {
  const text = `🎓 لقد أكملت اختبار اختيار المسار على منصة البكالوريا!\n\nالمسار الموصى به لي: ${trackEmoji} ${trackName}\n\nاختبر أنت أيضاً واكتشف مسارك المثالي!\n\n#البكالوريا #الدراسة #المستقبل`;
  const encodedText = encodeURIComponent(text);
  const url = 'https://elbakalor-t4e36guj.manus.space';

  return {
    twitter:  `https://twitter.com/intent/tweet?text=${encodedText}&url=${encodeURIComponent(url)}`,
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}&quote=${encodedText}`,
    whatsapp: `https://wa.me/?text=${encodedText}%20${encodeURIComponent(url)}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
  };
};
