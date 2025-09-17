export type Stage = {
    id: string;
    title: string;
    date?: string;
    description: string;
    status: "upcoming" | "ongoing" | "completed";
}

export const stages: Stage[] = [
  { id: "reg",  title: "Registration Open",  date: "2025-09-20", description: "Participants can begin registering for the competition.", status: "upcoming" },
  { id: "sub-open",title: "Submission Open",  date: "2025-10-05", description: "Start submission process.",     status: "upcoming" },
  { id: "reg-close",title: "Registrations Closed",       date: "2025-10-18", description: "Last day to registers teams and individuals.",           status: "upcoming" },
  { id: "sub-close",  title: "Submission Closed",   date: "2025-10-25", description: "Last day to submit projects.",    status: "upcoming" },
  { id: "final",title: "Event Day",        date: "2025-11-08", description: "Top teams and winners are announced.",       status: "upcoming" },
];