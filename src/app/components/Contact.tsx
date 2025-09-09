"use client";
import { Mail, Phone, Users } from "lucide-react";

type Person = {
  name: string;
  role: string;
  email?: string;
  phone?: string;
  avatar?: string; 
};

const team: Person[] = [
  { name: "Senuka Thisath",  role: "Lead Organizer",   email: "senuka@example.com",  phone: "+94712345678", avatar: "/team/senuka.jpg" },
  { name: "Nisal Nethsara",  role: "Co-Organizer",     email: "nisal@example.com",   phone: "+94711223344", avatar: "/team/nisal.jpg" },
  { name: "Oshan Kavishka",  role: "Marketing Head",   email: "oshan@example.com",   phone: "+94717654321", avatar: "/team/oshan.jpg" },
];

export default function Contact() {
  return (
    <section id="contact" className="scroll-mt-24 py-20 particles">
      <div className="container mx-auto max-w-6xl px-6 text-center">
        <div className="inline-flex items-center gap-2 rounded-full px-4 py-2 bg-white/5 border border-white/10 text-red-50/80">
          <Users className="w-4 h-4" />
          Meet our team
        </div>

        <h2 className="mt-6 text-5xl md:text-6xl font-extrabold tracking-tight text-red-100">
          Mission Control
        </h2>
        <p className="mt-3 text-red-50/80 max-w-3xl mx-auto">
          The crew keeping your mission in stable orbit.
        </p>

        <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {team.map((p) => (
            <article
              key={p.name}
              className="
                group relative rounded-3xl border border-white/10
                bg-gradient-to-b from-white/[0.06] to-white/[0.02]
                shadow-[0_10px_30px_-10px_rgba(0,0,0,0.6)]
                backdrop-blur-sm px-6 py-8
                transition duration-300
                hover:-translate-y-1 hover:border-white/20
                hover:shadow-[0_20px_40px_-10px_rgba(0,0,0,0.7)]
              "
            >
              <div
                className="
                  pointer-events-none absolute inset-x-6 top-0 h-px
                  bg-gradient-to-r from-transparent via-white/30 to-transparent
                "
              />

              <div className="mx-auto h-28 w-28 rounded-full ring-1 ring-white/15 p-[3px] bg-gradient-to-br from-purple-700/40 to-fuchsia-500/30">
                <div className="h-full w-full rounded-full overflow-hidden bg-black/40">
                  {p.avatar ? (
                    <img src={p.avatar} alt="" className="h-full w-full object-cover" />
                  ) : (
                    <div className="h-full w-full grid place-items-center text-red-50/70 text-2xl">
                      {p.name[0]}
                    </div>
                  )}
                </div>
              </div>

              <div className="mt-5">
                <h3 className="text-xl font-bold text-red-100">{p.name}</h3>
                <p className="text-sm text-red-50/70">{p.role}</p>
              </div>

              <div className="mt-6 flex items-center justify-center gap-3">
                {p.email && (
                  <a
                    href={`mailto:${p.email}`}
                    className="
                      inline-flex items-center justify-center h-10 w-10 rounded-full
                      border border-white/10 text-red-50/90
                      hover:bg-white/10 hover:border-white/20 transition
                    "
                    aria-label={`Email ${p.name}`}
                  >
                    <Mail className="w-4 h-4" />
                  </a>
                )}
                {p.phone && (
                  <a
                    href={`tel:${p.phone.replace(/\s+/g, "")}`}
                    className="
                      inline-flex items-center justify-center h-10 w-10 rounded-full
                      border border-white/10 text-red-50/90
                      hover:bg-white/10 hover:border-white/20 transition
                    "
                    aria-label={`Call ${p.name}`}
                  >
                    <Phone className="w-4 h-4" />
                  </a>
                )}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
