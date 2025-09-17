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
    short: "Create cosmic visuals around the theme “Space Aspects.”",
    heroImg: "/comp-covers/graphic-web.png",
    heroBg: "/comp-covers/graphic-bg.png",
    color: "#E65F4E",
    overview:
      "Embark on a creative journey beyond the stars. The ASPECT Intra-School Graphic Designing Competition, hosted by Bandaranayake College and organized by TeamBCCS, invites young designers to explore the mysteries of space through digital artistry. Bring galaxies, planets, and cosmic wonders to life—and shine among the stars with your creativity.",
    whatToBuild: [
      "At least three still images aligned to the “Space Aspects” theme",
      "Use cosmic visual language (galaxies, planets, nebulae, starfields)",
      "Prepare for poster and social display",
    ],
    deliverables: ["3+ images in PNG or JPG", "Resolutions: 1800×2240 and 1500×1500"],
    rules: [
      "Theme is mandatory: “Space Aspects.”",
      "No copyrighted materials without permission.",
      "No offensive, violent, or inappropriate content.",
      "Work must be done by the competitor without external help.",
      "Any form of cheating leads to disqualification.",
      "Using AI designing tools for designing leads to disqualification.",
    ],
    judging: [
      { label: "Creativity & Originality", weight: 25 },
      { label: "Relevance to the Theme", weight: 20 },
      { label: "Visual Appeal & Consistency", weight: 25 },
      { label: "Use of Resources", weight: 15 },
      { label: "Uniqueness", weight: 15 },
    ],
    eligibility: [
      "Open to Bandaranayake College students (Grades 6–13)",
      "Junior: Grades 6–9",
      "Senior: Grades 10–13",
    ],
    resources: [
      { label: "Register Now", href: "https://forms.gle/your-form-id" },
      { label: "Contact TeamBCCS", href: "mailto:aspectcompetition@school.edu" },
    ],
  },

  {
    slug: "web-development",
    title: "Web Development",
    short: "Build a fully functional site around the theme “Space Elevator”.",
    heroImg: "/comp-covers/programming-web.png",
    heroBg: "/comp-covers/programming-bg.png",
    color: "#3BA5F2",
    overview:
      "The Aspect Intra-School Web Development Competition invites students to design and build a fully functional website around the theme “Space Elevator”. This is your chance to combine creativity, coding, and innovation to launch ideas into the digital universe.",
    whatToBuild: [
      "Build a fully functional website about the “Space Elevator” theme.",
      "Frontend may be HTML/CSS/JS or frameworks such as React, Angular, or Vue.",
      "Optional backend (e.g., MERN/MEAN or others).",
      "Simpler path: build from scratch using only HTML, CSS, and JavaScript.",
      "You may use free-to-use graphics/assets (credit the source).",
      "Technologies allowed: HTML, CSS, JavaScript; frameworks/libraries like Bootstrap, Tailwind, jQuery, AOS.",
      "Editors: VS Code, Sublime Text, or any offline editor.",
    ],
    deliverables: [
      "Project files or repository link (GitHub preferred).",
      "2–10 minute video presentation showing features & functionality, theme alignment (Space Elevator), and user experience.",
      "Upload the video to YouTube/Google Drive and share the link with your submission.",
      "Submit everything before the deadline.",
    ],
    rules: [
      "Using pre-made templates or copied code leads to immediate disqualification.",
      "Plagiarism or unmodified AI-generated code is not allowed.",
      "All work must be original and authentic.",
      "All entries must be submitted before the deadline.",
    ],
    judging: [
      { label: "Creativity & Theme Adhesion", weight: 20 },
      { label: "Design & UI", weight: 25 },
      { label: "Functionality", weight: 25 },
      { label: "Code Quality", weight: 20 },
      { label: "Innovation", weight: 10 },
    ],
    eligibility: [
      "Open to all students of Bandaranayake College.",
      "External help is not permitted.",
    ],
  },

  {
    slug: "video-editing",
    title: "Video Editing",
    short: "Lights. Camera. Creativity.",
    heroImg: "/comp-covers/video-editing-web.png",
    heroBg: "/comp-covers/video-editing-bg.png",
    color: "#A12C2C",
    overview: "Craft a cinematic story around the idea of a Space Elevator.",
    whatToBuild: ["Create a 1–3 minute video interpreting the theme “Space Elevator”."],
    deliverables: [
      "Format: MP4/MOV/AVI",
      "Resolution: 1080p (1920×1080)",
      "Aspect ratio: 16:9",
      "Length: 1–3 minutes",
    ],
    rules: [
      "Original work only. Using copyrighted material without permission will lead to disqualification.",
      "No offensive, violent, or inappropriate content.",
      "No external help; the edit must be your own work.",
      "Submit your entry via the provided form before the deadline.",
    ],
    eligibility: [
      "Open to Bandaranayake College students",
      "Junior: Grades 6–9",
      "Senior: Grades 10–13",
    ],
    judging: [
      { label: "Creativity & Originality", weight: 20 },
      { label: "Relevance to the Theme", weight: 20 },
      { label: "Visual Appeal & Style Consistency", weight: 20 },
      { label: "Use of Resources", weight: 20 },
      { label: "Uniqueness", weight: 20 },
    ],
  },

  {
    slug: "quiz",
    title: "Quiz",
    short: "Show your speed, accuracy, and teamwork across rounds.",
    heroImg: "/comp-covers/quiz-web.png",
    heroBg: "/comp-covers/quiz-bg.png",
    color: "#A78BFA",
    overview:
      "The ASPECT Intra-School Quiz Competition challenges students’ knowledge, speed, and teamwork across three exciting rounds. From quick-fire questions to the grand finale, this is your chance to prove your brilliance and claim the spotlight.",
    whatToBuild: [],
    deliverables: [],
    rules: [
      "Team: Each team must have 5 members.",
      "Team: All members must be current students of Bandaranayake College Gampaha.",
      "Category: Junior Division — Grades 6–9.",
      "Category: Senior Division — Grades 10–13.",
      "Format: Round 1 — Online preliminary quiz.",
      "Format: Semi-Final — Online session for selected teams.",
      "Format: Final Round — Grand Finale held live at the main ASPECT’25 event.",
      "Guideline: Dates and schedules will be informed in advance.",
      "Guideline: Online rounds will be conducted via Zoom breakout rooms.",
      "Guideline: Teams must ensure a stable internet connection during online rounds.",
      "Guideline: Any form of malpractice or external assistance will result in disqualification.",
      "Guideline: Decisions made by the judges are final.",
      "Judging: Round 1 scores decide who moves to the semi-final.",
      "Judging: Semi-final winners advance to the grand finale.",
      "Judging: Judges assess accuracy, speed, and teamwork.",
      "Participation: Teams must register before the deadline.",
      "Participation: Further details (dates, links, instructions) will be shared with team leaders via email.",
    ],
    judging: [
      { label: "Accuracy", weight: 40 },
      { label: "Speed", weight: 30 },
      { label: "Teamwork", weight: 30 },
    ],
    eligibility: ["Open to Bandaranayake College students"],
  },

  {
    slug: "gaming",
    title: "Gaming",
    short: "Compete head-to-head under fair-play settings.",
    heroImg: "/comp-covers/gaming-web.png",
    heroBg: "/comp-covers/gaming-bg.png",
    color: "#E67E22",
    overview:
      "The Aspect Intra-School Gaming Competition brings together the best gamers of Bandaranayake College for a thrilling showdown of skill, strategy, and reflexes. Step into the arena, compete with your peers, and prove who truly dominates the digital battlefield!",
    whatToBuild: [
      "Official game titles will be announced prior to the competition.",
      "Matches will follow standard competitive formats.",
      "Modes: 1v1 or Team Battles, depending on the title.",
      "Time limits and scoring methods will be pre-defined.",
    ],
    deliverables: [
      "Register before the deadline via the official form.",
      "For team games, the captain must submit player details in advance.",
      "Be present and ready at the allotted match time.",
    ],
    rules: [
      "Any form of cheating, hacking, or exploiting bugs will result in immediate disqualification.",
      "Offensive behavior, abusive language, or misconduct will not be tolerated.",
      "Participants must follow referee/judge instructions at all times.",
      "Fair play and good sportsmanship are mandatory.",
    ],
    judging: [
      { label: "Skill", weight: 40 },
      { label: "Strategy", weight: 30 },
      { label: "Teamwork", weight: 20 },
      { label: "Sportsmanship", weight: 10 },
    ],
    eligibility: [
      "Open to all students of Bandaranayake College.",
      "Participants compete individually or in teams as specified by the game.",
      "Fair play and good sportsmanship are required.",
    ],
  },
];

export type TrackSlug = (typeof tracks)[number]["slug"];
export const getAllTrackSlugs = (): TrackSlug[] => tracks.map((t) => t.slug);
export const getTrack = (slug: TrackSlug): Track | undefined => tracks.find((t) => t.slug === slug);
