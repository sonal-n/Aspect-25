export type Stage = {
    id: string;
    title: string;
    date?: string;
    description: string;
    status: "upcoming" | "ongoing" | "completed";
}

export const stages: Stage[] = [
  { id: "reg",  title: "Registration",  date: "2025-09-20", description: "Sign up & pick your category.", status: "ongoing" },
  { id: "short",title: "Shortlisting",  date: "2025-10-05", description: "Top submissions advance.",     status: "upcoming" },
  { id: "pitch",title: "Pitches",       date: "2025-10-18", description: "Present your idea.",           status: "upcoming" },
  { id: "dev",  title: "Development",   date: "2025-10-25", description: "Build & refine your work.",    status: "upcoming" },
  { id: "final",title: "Finals",        date: "2025-11-08", description: "Final presentation day.",       status: "upcoming" },
  { id: "awds", title: "Awards",        date: "2025-11-08", description: "Winners announced.",            status: "upcoming" },
];