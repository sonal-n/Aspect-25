export type Criterion = { label: string; weight: number; desc?: string };

export type Track = {
  slug: "graphic-design" | "web-development" | "video-editing" | "gaming" | "quiz";
  title: string;
  short: string;
  heroImg?: string;
  heroBg?: string;
  color: string;
  icon?: string;
  overview: string;
  whatToBuild: string[];
  deliverables: string[];
  rules: string[];
  judging: Criterion[];
  eligibility?: string[];
  rulesDoc?: string;
  resources?: { label: string; href: string }[];
};

export const tracks: Track[] = [
  {
    slug: "graphic-design",
    title: "Graphic Design",
    short: "Create a cohesive visual identity for a fictional event/brand.",
    heroImg: "/comp-covers/graphic-web.png",
    heroBg: "/comp-covers/graphic-bg.png",
    color: "#E65F4E",
    overview: "Design a mini brand system presented as a poster set and socials.",
    whatToBuild: [
      "Logo and lockup",
      "Color palette and type pairing",
      "A3 poster + Instagram post + story",
      "Brand usage sheet (1 page)"
    ],
    deliverables: [
      "Exported PNG/JPG for posters and socials",
      "One PDF with brand usage sheet",
      "Source file ZIP (PSD/AI/XD/Figma export)"
    ],
    rules: [
      "All submissions must be original and created during the competition period.",
      "Team size: 1–4 members. Cross-school teams are not allowed.",
      "Use of AI assistants is allowed only for ideation; generated assets must be disclosed.",
      "Plagiarism, hate speech, and NSFW content lead to disqualification.",
      "Late submissions are not accepted unless organizers announce an extension.",
      "Judges’ decisions are final."
    ],
    judging: [
      { label: "Concept & Story", weight: 30 },
      { label: "Craft & Consistency", weight: 30 },
      { label: "Originality", weight: 25 },
      { label: "Presentation", weight: 15 }
    ],
    eligibility: ["Open to Grades 9–13"],
    rulesDoc: "/docs/ASPECT25-Rules.pdf",
    resources: [{ label: "Brand grids", href: "https://example.com" }],
  },
  {
    slug: "web-development",
    title: "Web Development",
    short: "Build a responsive, accessible single-page site.",
    heroImg: "/comp-covers/programming-web.png",
    heroBg: "/comp-covers/programming-bg.png",
    color: "#3BA5F2",
    overview: "Create a themed landing page with interactive section.",
    whatToBuild: [
      "Hero with CTA",
      "Features section",
      "Interactive component",
      "Contact form (no backend required)"
    ],
    deliverables: [
      "GitHub repo link",
      "Deployed preview link",
      "README with setup and credits"
    ],
    rules: [
      "All submissions must be original and created during the competition period.",
      "Team size: 1–4 members. Cross-school teams are not allowed.",
      "Use of AI assistants is allowed only for ideation; generated assets must be disclosed.",
      "Plagiarism, hate speech, and NSFW content lead to disqualification.",
      "Late submissions are not accepted unless organizers announce an extension.",
      "Judges’ decisions are final."
    ],
    judging: [
      { label: "UX & Accessibility", weight: 30 },
      { label: "Code Quality", weight: 30 },
      { label: "Visual Design", weight: 25 },
      { label: "Originality", weight: 15 }
    ],
    eligibility: ["Open to Grades 9–13"],
    rulesDoc: "/docs/ASPECT25-Rules.pdf",
  },
  {
    slug: "video-editing",
    title: "Video Editing",
    short: "Cut a 30–60s story with sound design.",
    heroImg: "/comp-covers/video-editing-web.png",
    heroBg: "/comp-covers/video-bg.png",
    color: "#B78BFF",
    overview: "Edit from provided footage or your own with clear narrative.",
    whatToBuild: ["30–60s edit", "Basic color and audio mix", "End card"],
    deliverables: ["1080p MP4 (H.264)", "Project file ZIP", "Credits text"],
    rules: [
      "All submissions must be original and created during the competition period.",
      "Team size: 1–4 members. Cross-school teams are not allowed.",
      "Use of AI assistants is allowed only for ideation; generated assets must be disclosed.",
      "Plagiarism, hate speech, and NSFW content lead to disqualification.",
      "Late submissions are not accepted unless organizers announce an extension.",
      "Judges’ decisions are final."
    ],
    judging: [
      { label: "Story & Pace", weight: 35 },
      { label: "Edit & Transitions", weight: 30 },
      { label: "Audio & Color", weight: 20 },
      { label: "Originality", weight: 15 }
    ],
    rulesDoc: "/docs/ASPECT25-Rules.pdf"
  },
  {
    slug: "gaming",
    title: "Gaming",
    short: "Compete head-to-head under fair-play settings.",
    heroImg: "/comp-covers/gaming-web.png",
    heroBg: "/comp-covers/gaming-bg.png",
    color: "#E67E22",
    overview: "Tournament format announced on match day.",
    whatToBuild: ["Team registration", "Match presence", "Proof of results"],
    deliverables: ["Team roster", "Contact handle", "Screenshots if requested"],
    rules: [
      "All submissions must be original and created during the competition period.",
      "Team size: 1–4 members. Cross-school teams are not allowed.",
      "Use of AI assistants is allowed only for ideation; generated assets must be disclosed.",
      "Plagiarism, hate speech, and NSFW content lead to disqualification.",
      "Late submissions are not accepted unless organizers announce an extension.",
      "Judges’ decisions are final."
    ],
    judging: [{ label: "Match Results", weight: 100 }],
    rulesDoc: "/docs/ASPECT25-Rules.pdf"
  },
  {
    slug: "quiz",
    title: "Quiz",
    short: "Tech and general-knowledge quiz with team rounds.",
    heroImg: "/comp-covers/quiz-web.png",
    heroBg: "/comp-covers/quiz-bg.png",
    color: "#A78BFA",
    overview: "Test speed and accuracy across MCQ, rapid-fire, and buzzer rounds.",
    whatToBuild: ["Team of 2–3", "Register with school ID", "Be present for briefing"],
    deliverables: ["Team list", "Student IDs", "Contact number"],
    rules: [
      "Teams must answer within the stated time per question.",
      "Use of devices or external help during rounds is prohibited.",
      "Ties will be settled by a sudden-death round.",
      "Disruptive behavior results in disqualification.",
      "Judges’ decisions are final."
    ],
    judging: [{ label: "Round Scores", weight: 100 }],
    eligibility: ["Open to Grades 9–13"],
    rulesDoc: "/docs/ASPECT25-Rules.pdf",
  }
];

export type TrackSlug = (typeof tracks)[number]["slug"];

export const getAllTrackSlugs = (): TrackSlug[] => tracks.map((t) => t.slug);

export const getTrack = (slug: TrackSlug): Track | undefined =>
  tracks.find((t) => t.slug === slug);
