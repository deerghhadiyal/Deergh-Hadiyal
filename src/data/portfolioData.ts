import heroEditingSuiteImg from '../assets/images/hero_editing_suite_1790528737920.jpg';
import reelTalkingHeadImg from '../assets/images/reel_talking_head_creator_1790941012242.jpg';

export interface PortfolioCarouselVideo {
  id: number;
  title: string;
  category: string;
  src: string;
  poster: string;
  showcaseId: string;
  fit?: 'cover' | 'contain';
}

/**
 * 9:16 Portrait Video Cards for the Continuous Circular/Orbiting 3D Stage.
 * Every card strictly renders in a 9:16 portrait aspect ratio with object-fit: cover.
 */
const portfolioVideoFiles = [
  ['WhatsApp Video 2026-09-13 at 2.11.00 PM.mp4', 'WhatsApp Reel', 'Creator Reel'],
  ['AE-Giveaway-PR.mp4', 'AE Giveaway PR', 'Brand Reel'],
  ['brand-edit.mp4', 'Brand Edit', 'Brand Reel'],
  ['REEL 2.mp4', 'MINECRFAT Reel 2', 'Short-Form Reel'],
  ['REEL 4.mp4', 'MINECRFAT Reel 4', 'Short-Form Reel'],
  ['REEL 5.mp4', 'MINECRFAT Reel 5', 'Short-Form Reel'],
  ['REEL 6.mp4', 'MINECRFAT Reel 6', 'Short-Form Reel'],
  ['REEL 7(1).mp4', 'MINECRFAT Reel 7', 'Short-Form Reel'],
  ['SAMPLE LIKE AYUSH BHANDARI.mp4', 'Ayush Bhandari Sample', 'Creator Reel'],
  ['SAMPLE(1).mp4', 'YT EDIT', 'Short-Form Reel'],
  ['SHIVJI.mp4', 'Shivji', 'Cinematic Reel'],
  ['trading.mp4', 'Trading VIDEO EDIT', 'Creator Reel'],
] as const;

export const portfolioVideos: PortfolioCarouselVideo[] = portfolioVideoFiles.map(
  ([fileName, title, category], index) => ({
    id: index + 1,
    title,
    category,
    src: `/videos/${encodeURIComponent(fileName)}`,
    poster: reelTalkingHeadImg,
    showcaseId: `reel-${fileName}`,
  })
);

export interface ServiceItem {
  index: string;
  title: string;
  description: string;
  deliverables: string;
  turnaround: string;
}

export interface FeatureReason {
  title: string;
  description: string;
  metric: string;
}

export interface TimelineCutMarker {
  time: string;
  label: string;
  detail: string;
}

export interface VideoShowcaseItem {
  id: string;
  category: 'imported';
  categoryLabel: string;
  title: string;
  subtitle: string;
  description: string;
  thumbnail: string;
  videoSrc: string;
  aspect: '16:9' | '9:16';
  featuredSpan?: boolean;
  duration: string;
  fps: string;
  resolution: string;
  avgRetention: string;
  hookRate: string;
  softwareUsed: string;
  defaultYoutubeUrl: string;
  colorFilterRaw: string;
  colorFilterGraded: string;
  timelineMarkers: TimelineCutMarker[];
  fit?: 'cover' | 'contain';
}

export interface WorkProcessItem {
  index: string;
  label: string;
  title: string;
  description: string;
  keyTechniques: string;
  targetOutcome: string;
}

export const HERO_IMAGE = reelTalkingHeadImg;

export const SOCIAL_LINKS = {
  youtubeChannel: 'https://youtube.com/@deerghhadiyal',
  youtubeHandle: '@deerghhadiyal',
  hacksEditLabel: 'youtube.com/@deerghhadiyal',
  instagramUrl: 'https://www.instagram.com/deergh_hadiyal/',
  instagramHandle: '@deergh_hadiyal',
  instagramClean: 'instagram.com/deergh_hadiyal',
  email: 'deerghhadiyal@gmail.com',
};

export const EXPERIENCE_PILLARS = [
  {
    code: '01',
    title: 'Talking Head',
    detail: 'Zero-dead-air dialogue cuts, kinetic captions, and b-roll retention callouts.',
  },
  {
    code: '02',
    title: 'Documentary',
    detail: 'Cinematic narrative pacing, spatial sound design, and archival motion graphics.',
  },
  {
    code: '03',
    title: 'Speed Ramp',
    detail: 'Optical-flow velocity curves, frame-blended whip pans, and beat-locked transitions.',
  },
  {
    code: '04',
    title: 'Car Edit',
    detail: 'High-impact automotive reels, engine audio layering, and rolling LUT color grades.',
  },
  {
    code: '05',
    title: 'YT VIDEO & LONG FORM CONTENT',
    detail: 'Engaging long-form YouTube videos crafted with cinematic storytelling, smooth transitions, and dynamic visuals.',
  },
  {
    code: '06',
    title: 'GAMING EDIT',
    detail: 'Specialized in high-energy Minecraft and GTA video editing with cinematic cuts, effects, and engaging storytelling.',
  },
  {
    code: '07',
    title: 'AI VIDEO EDITING',
    detail: 'Leveraging AI tools for efficient video editing, including automated cuts, captioning, and content optimization.',
  },
];

export const SERVICES: ServiceItem[] = [
  {
    index: '01',
    title: 'Gaming Video Editing',
    description:
      'High-energy editing for Minecraft, GTA, and gameplay content with cinematic cuts, memes, effects, and engaging storytelling.',
    deliverables: 'Full YouTube Video, Highlights, Captions, SFX, Motion Graphics',
    turnaround: '2–4 Days',
  },
  {
    index: '02',
    title: 'Cinematic Video Editing',
    description:
      'Story-driven edits with smooth pacing, cinematic transitions, color grading, sound design, and impactful visual moments.',
    deliverables: 'Cinematic Edit, Color Grade, Transitions, Sound Design',
    turnaround: '2–5 Days',
  },
  {
    index: '03',
    title: 'Motion & Graphics',
    description:
      'Custom animations, speed-ramp transitions, and visual effects that elevate your talking-head, documentary, and sports brand content.',
    deliverables: 'After Effects Compositing · Kinetic Typography · Visual Callouts',
    turnaround: '4K 60fps Render',
  },
  {
    index: '04',
    title: 'Reels & Sound',
    description:
      'Fast-paced short-form content designed to capture attention quickly with punchy cuts, captions, effects, and trending editing styles.',
    deliverables: 'YouTube Shorts, Instagram Reels, Captions, SFX, Transitions',
    turnaround: '1-2 Days',
  },
  {
    index: '05',
    title: 'Color Grading & Sound Design',
    description:
      'Professional visual and audio enhancement to give your videos a polished, cinematic, and immersive feel.',
    deliverables: 'Color Correction, Color Grading, SFX, Audio Mixing, Music Sync',
    turnaround: '1–3 Days',
  },
  {
    index: '06',
    title: 'YouTube Content Editing',
    description:
      'Complete YouTube editing focused on storytelling, viewer retention, pacing, B-roll, captions, memes, and engaging visual effects.',
    deliverables: 'Long-Form Video, B-Roll, Captions, SFX, Motion Graphics, Thumbnail-ready Frames',
    turnaround: 'AS PER PROJECT SCOPE',
  },
];

export const WHY_CHOOSE_ME: FeatureReason[] = [
  {
    title: 'Retention-Focused Editing',
    description: 'I edit around pacing, hooks, and visual storytelling to keep viewers engaged from the first second.',
    metric: 'High-Retention Approach',
  },
  {
    title: 'Gaming Specialist',
    description: 'Specialized in Minecraft & GTA content with energetic cuts, cinematic moments, memes, SFX, and gameplay storytelling.',
    metric: 'Minecraft + GTA',
  },
  {
    title: 'Cinematic Visuals',
    description: 'I combine motion graphics, transitions, color grading, and sound design to create polished visuals.',
    metric: '4K-Ready Workflow',
  },
  {
    title: 'Fast Turnaround',
    description: 'Efficient editing workflow designed to deliver quality content without unnecessary delays.',
    metric: '2–7 Day Delivery',
  },
  {
    title: 'Detail-Oriented Editing',
    description: 'Every cut, sound effect, transition, caption, and visual element is carefully timed to the content.',
    metric: 'Frame-by-Frame Precision',
  },
  {
    title: 'Creator-Focused Workflow',
    description: 'I adapt my editing style to your brand, audience, and content goals instead of using a one-size-fits-all template.',
    metric: '100% Custom Edits',
  },
];

const importedShowcaseFiles = [
  ['game scene.mp4', 'Game Scene'],
  ["god's edit.mp4", "God's Edit"],
  ['KYT-10-Framer-Intro.mp4', 'KHUSHAL KSY Framer Intro'],
  ['podcast edit sample (1).mp4', 'Podcast Edit Sample'],
  ['SAMPLE 6(1).mp4', 'YT EDIT'],
  ['Sequence 01_2.mp4', 'DOCUMENTARY EDIT WITH AI'],
  ['solar system.mp4', 'Solar System'],
] as const;

const createImportedShowcaseItem = (
  id: string,
  title: string,
  videoSrc: string,
  aspect: VideoShowcaseItem['aspect']
): VideoShowcaseItem => ({
  id,
  category: 'imported',
  categoryLabel: `${aspect} Portfolio Video`,
  title,
  subtitle: `Imported ${aspect} portfolio video`,
  description: 'Original video shown without cropping, in a muted looping preview.',
  thumbnail: aspect === '9:16' ? reelTalkingHeadImg : heroEditingSuiteImg,
  videoSrc,
  aspect,
  duration: 'Looping preview',
  fps: 'Original',
  resolution: 'Original dimensions',
  avgRetention: '—',
  hookRate: '—',
  softwareUsed: '—',
  defaultYoutubeUrl: SOCIAL_LINKS.youtubeChannel,
  colorFilterRaw: 'none',
  colorFilterGraded: 'none',
  fit: 'contain',
  timelineMarkers: [
    {
      time: 'Full video',
      label: 'Imported portfolio video',
      detail: 'This preview plays the original video in a continuous muted loop.',
    },
  ],
});

const importedVideoShowcase: VideoShowcaseItem[] = importedShowcaseFiles.map(
  ([fileName, title]) =>
    createImportedShowcaseItem(
      `imported-${fileName}`,
      title,
      `/videos/${encodeURIComponent(fileName)}`,
      '16:9'
    )
);

export const PORTFOLIO_REEL_SHOWCASE: VideoShowcaseItem[] = portfolioVideos.map((video) =>
  createImportedShowcaseItem(video.showcaseId, video.title, video.src, '9:16')
);

export const VIDEO_SHOWCASE: VideoShowcaseItem[] = importedVideoShowcase;

export const WORK_PROCESS: WorkProcessItem[] = [
  {
    index: '01',
    label: 'DISCOVER',
    title: 'Understand the Vision',
    description:
      'I first understand your content, target audience, references, and editing style before starting the project.',
    keyTechniques: 'Brief Analysis, Reference Study, Audience Research',
    targetOutcome: 'A clear editing direction aligned with your vision.',
  },
  {
    index: '02',
    label: 'PLAN',
    title: 'Build the Story',
    description:
      ' I organize the footage and create a strong structure with the right pacing, hooks, and visual flow.',
    keyTechniques: 'Storyboarding, Timeline Planning, Beat Mapping',
    targetOutcome: 'A well-structured edit with engaging pacing.',
  },
  {
    index: '03',
    label: 'EDIT',
    title: 'Bring It to Life',
    description:
      'I transform raw footage into an engaging video using precise cuts, transitions, effects, and storytelling.',
    keyTechniques: 'Dynamic Cuts, B-Roll, Zooms, Transitions, Captions',
    targetOutcome: 'A polished and engaging first cut.',
  },
  {
    index: '04',
    label: ' ENHANCE',
    title: 'Add the Cinematic Touch',
    description:
      'I enhance the edit with motion graphics, color grading, sound design, and carefully timed effects.',
    keyTechniques: 'Motion Graphics, Color Grading, SFX, Sound Design',
    targetOutcome: 'A professional, cinematic, and immersive video.',
  },
  {
    index: '05',
    label: 'DELIVER',
    title: ' Final Polish & Delivery',
    description:
      ' I review every detail, apply feedback, optimize the final video, and deliver it in the required format.',
    keyTechniques: 'Quality Control, Revisions, Export Optimization',
    targetOutcome: 'A ready-to-publish final video.',
  },
];

export const TECHNICAL_SKILLS = [
  {
    category: 'Software',
    items: [
      'Adobe Premiere Pro',
      'DaVinci Resolve',
      'After Effects',
      'CapCut Pro',
    ],
  },
  {
    category: 'Experience & Specializations',
    items: [
      'Talking Head Edits',
      'Documentary Storytelling',
      'Speed Ramp Mastery',
      'Car Edits',
      'Gaming Video Editing',
      'Short-Form Video (9:16)',
      'Motion Graphics',
      'REAL ESTATE & SPORTS BRAND PAGES',
    ],
  },
  {
    category: 'Platforms',
    items: ['YouTube', 'Instagram', 'TikTok', 'Snapchat', 'Twitter', 'LinkedIn'],
  },
];

export function downloadPortfolioDossier() {
  const dossierHtml = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <title>Deergh Hadiyal — Professional Video Editing Portfolio</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body {
      font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      background: #070707;
      color: #D6D6D6;
      line-height: 1.6;
      padding: 48px 24px;
    }
    .page {
      max-width: 880px;
      margin: 0 auto;
      background: #0B0B0C;
      border: 1px solid rgba(255, 106, 50, 0.3);
      border-radius: 14px;
      padding: 48px;
    }
    .header {
      border-bottom: 1px solid rgba(255, 106, 50, 0.25);
      padding-bottom: 28px;
      margin-bottom: 32px;
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      flex-wrap: wrap;
      gap: 16px;
    }
    h1 {
      font-size: 36px;
      color: #FFFFFF;
      letter-spacing: -0.03em;
      margin-bottom: 6px;
    }
    .tagline {
      font-size: 18px;
      color: #FF6A32;
      font-weight: 600;
    }
    .contact-meta {
      font-size: 13px;
      color: #929292;
      text-align: right;
    }
    .contact-meta a {
      color: #FF9A62;
      text-decoration: none;
    }
    h2 {
      font-size: 16px;
      text-transform: uppercase;
      letter-spacing: 0.08em;
      color: #FF6A32;
      margin: 32px 0 16px;
      border-bottom: 1px solid rgba(255,255,255,0.08);
      padding-bottom: 8px;
    }
    .summary {
      font-size: 15px;
      color: #D6D6D6;
      margin-bottom: 24px;
    }
    .grid {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 16px;
    }
    .card {
      background: #111214;
      border: 1px solid rgba(255, 255, 255, 0.08);
      padding: 18px;
      border-radius: 10px;
    }
    .card h3 {
      font-size: 16px;
      color: #FFFFFF;
      margin-bottom: 6px;
    }
    .card p {
      font-size: 13px;
      color: #929292;
    }
    .meta-line {
      font-size: 12px;
      color: #FF9A62;
      margin-top: 8px;
    }
    .skill-row {
      margin-bottom: 12px;
      font-size: 14px;
    }
    .skill-row strong {
      color: #FF6A32;
    }
    .footer {
      margin-top: 40px;
      padding-top: 20px;
      border-top: 1px solid rgba(255,255,255,0.08);
      font-size: 12px;
      color: #929292;
      display: flex;
      justify-content: space-between;
    }
    @media print {
      body { background: #ffffff; color: #111111; padding: 0; }
      .page { background: #ffffff; border: none; padding: 24px; }
      h1, .card h3 { color: #111111; }
      .summary, .card p, .contact-meta { color: #3f3f46; }
      .card { border-color: #e4e4e7; background: #fafafa; }
    }
  </style>
</head>
<body>
  <div class="page">
    <div class="header">
      <div>
        <h1>DEERGH HADIYAL</h1>
        <div class="tagline">Professional Video Editor • Creative Storyteller • Audience Growth Specialist</div>
      </div>
      <div class="contact-meta">
        <div>Email: <a href="mailto:deerghhadiyal@gmail.com">deerghhadiyal@gmail.com</a></div>
        <div>YouTube: <a href="https://youtube.com/@deerghhadiyal">@deerghhadiyal</a></div>
        <div>Instagram: <a href="https://www.instagram.com/deergh_hadiyal/">@deergh_hadiyal</a></div>
      </div>
    </div>

    <p class="summary">
      I transform raw footage into engaging 9:16 vertical and cinematic visual experiences designed to capture attention, improve retention, and tell compelling stories. Specializing in Talking Head, Documentary, Speed Ramp, Car Edits, CapCut & After Effects workflows, and HACKS EDIT / Sports Brand Pages.
    </p>

    <h2>Core Experience & Editing Formats</h2>
    <div class="grid">
      ${EXPERIENCE_PILLARS.map(
        (exp) => `
      <div class="card">
        <h3>${exp.code}. ${exp.title}</h3>
        <p>${exp.detail}</p>
      </div>`
      ).join('')}
    </div>

    <h2>Core Services & Capabilities</h2>
    <div class="grid">
      ${SERVICES.map(
        (s) => `
      <div class="card">
        <h3>${s.index}. ${s.title}</h3>
        <p>${s.description}</p>
        <div class="meta-line">${s.deliverables}</div>
      </div>`
      ).join('')}
    </div>

    <h2>Technical Stack & Platforms</h2>
    <div class="skill-row"><strong>Software:</strong> Adobe Premiere Pro · DaVinci Resolve · After Effects · CapCut Pro · Adobe Audition</div>
    <div class="skill-row"><strong>Specializations:</strong> Talking Head · Documentary · Speed Ramp · Car Edit · HACKS EDIT & Sports Brand Page · Short-Form Video (9:16) · Motion Graphics · Color Grading</div>
    <div class="skill-row"><strong>Platforms:</strong> YouTube · Instagram · TikTok · Snapchat · Twitter · LinkedIn</div>

    <div class="footer">
      <span>© 2026 Deergh Hadiyal · Video Editor & Content Creator</span>
      <span>deerghhadiyal@gmail.com · youtube.com/@deerghhadiyal</span>
    </div>
  </div>
</body>
</html>`;

  const blob = new Blob([dossierHtml], { type: 'text/html;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = 'Deergh_Hadiyal_Portfolio.html';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}
