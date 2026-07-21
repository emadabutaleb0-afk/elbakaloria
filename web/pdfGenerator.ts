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

export const generateTrackReportPDF = (result: TrackResult) => {
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4'
  });

  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const margin = 15;
  let yPosition = margin;

  // Set font
  doc.setFont('Calibri', 'normal');

  // Header with gradient background (simulated with color)
  doc.setFillColor(59, 130, 246);
  doc.rect(0, 0, pageWidth, 40, 'F');

  // Title
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(24);
  doc.setFont('Calibri', 'bold');
  doc.text('تقرير اختبار اختيار المسار', pageWidth / 2, 15, { align: 'center' });
  doc.setFontSize(12);
  doc.setFont('Calibri', 'normal');
  doc.text('منصة البكالوريا - Elbakaloria Platform', pageWidth / 2, 25, { align: 'center' });

  yPosition = 50;

  // Recommended Track Section
  doc.setTextColor(0, 0, 0);
  doc.setFillColor(229, 231, 235);
  doc.rect(margin, yPosition, pageWidth - 2 * margin, 25, 'F');

  doc.setFontSize(14);
  doc.setFont('Calibri', 'bold');
  doc.text('المسار الموصى به:', margin + 5, yPosition + 8);
  doc.setFontSize(16);
  doc.setTextColor(59, 130, 246);
  doc.text(result.trackName, margin + 5, yPosition + 18);

  yPosition += 35;

  // Reasoning Section
  doc.setTextColor(0, 0, 0);
  doc.setFontSize(12);
  doc.setFont('Calibri', 'bold');
  doc.text('التحليل والتوصية:', margin, yPosition);

  yPosition += 8;
  doc.setFont('Calibri', 'normal');
  doc.setFontSize(11);
  const reasoningLines = doc.splitTextToSize(result.reasoning, pageWidth - 2 * margin - 5);
  doc.text(reasoningLines, margin + 5, yPosition);

  yPosition += reasoningLines.length * 6 + 10;

  // Score Breakdown Section
  doc.setFont('Calibri', 'bold');
  doc.setFontSize(12);
  doc.text('تحليل النتائج:', margin, yPosition);

  yPosition += 10;

  // Track scores table
  const tracks = [
    { name: 'مسار الطب وعلوم الحياة', score: result.scores.medicine },
    { name: 'مسار الهندسة وعلوم الحاسب', score: result.scores.engineering },
    { name: 'مسار الأعمال', score: result.scores.business },
    { name: 'مسار الآداب والفنون', score: result.scores.arts }
  ];

  doc.setFont('Calibri', 'normal');
  doc.setFontSize(10);

  tracks.forEach((track, index) => {
    const percentage = result.total > 0 ? Math.round((track.score / result.total) * 100) : 0;

    // Track name
    doc.text(track.name, margin + 5, yPosition);

    // Percentage
    const percentageText = `${percentage}%`;
    doc.text(percentageText, pageWidth - margin - 15, yPosition, { align: 'right' });

    // Progress bar
    const barWidth = pageWidth - 2 * margin - 40;
    const barHeight = 4;
    doc.setDrawColor(200, 200, 200);
    doc.rect(margin + 5, yPosition + 2, barWidth, barHeight);

    // Filled portion
    const colors: [number, number, number][] = [
      [16, 185, 129], // emerald (medicine)
      [99, 102, 241], // indigo (engineering)
      [217, 119, 6],  // amber (business)
      [190, 24, 93]   // rose (arts)
    ];
    const [r, g, b] = colors[index];
    doc.setFillColor(r, g, b);
    doc.rect(margin + 5, yPosition + 2, (barWidth * percentage) / 100, barHeight, 'F');

    yPosition += 12;
  });

  // Footer
  yPosition = pageHeight - 20;
  doc.setFontSize(9);
  doc.setTextColor(128, 128, 128);
  doc.text('تم إنشاء هذا التقرير بواسطة منصة البكالوريا', pageWidth / 2, yPosition, { align: 'center' });
  doc.text(`التاريخ: ${new Date().toLocaleDateString('ar-EG')}`, pageWidth / 2, yPosition + 6, { align: 'center' });

  // Save PDF
  const fileName = `track-recommendation-${new Date().getTime()}.pdf`;
  doc.save(fileName);
};

export const shareOnSocialMedia = (trackName: string, trackEmoji: string) => {
  const text = `🎓 لقد أكملت اختبار اختيار المسار على منصة البكالوريا!\n\nالمسار الموصى به لي: ${trackEmoji} ${trackName}\n\nاختبر أنت أيضاً واكتشف مسارك المثالي!\n\n#البكالوريا #الدراسة #المستقبل`;

  const encodedText = encodeURIComponent(text);
  const url = 'https://elbakalor-t4e36guj.manus.space';

  const platforms = {
    twitter: `https://twitter.com/intent/tweet?text=${encodedText}&url=${encodeURIComponent(url)}`,
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}&quote=${encodedText}`,
    whatsapp: `https://wa.me/?text=${encodedText}%20${encodeURIComponent(url)}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`
  };

  return platforms;
};
