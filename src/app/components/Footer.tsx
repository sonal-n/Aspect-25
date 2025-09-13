import Link from "next/link";
import Image from "next/image";
import { Mail, Phone, MapPin, Instagram, Facebook, Linkedin } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa6";

export default function Footer() {
  return (
    <footer className="relative mt-24 border-t border-white/10 bg-[#0f0e0e]">
      <div className="pointer-events-none absolute inset-0 -z-10
                      [mask-image:radial-gradient(60%_50%_at_50%_0%,black,transparent)]
                      bg-gradient-to-b from-red-500/10 to-transparent" />
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/25 to-transparent" />

      <div className="container mx-auto max-w-6xl px-4 py-16">
        <div className="grid gap-10 sm:grid-cols-2 md:grid-cols-4">
          <div>
            <Link href="#home" className="inline-flex items-center gap-2">
              <Image src="/aspect-logo.svg" alt="ASPECT’25" width={120} height={28} />
            </Link>
            <p className="mt-4 text-sm text-red-50/70 leading-relaxed">
              ASPECT’25 — Bandaranayake College Computer Society’s intra-school ICT competition.
              Launch your ideas from registration to finals.
            </p>

            <div className="mt-4 flex items-center gap-3">
              <a href="https://whatsapp.com/channel/0029ValqqeV9hXFBFpk5N02o" aria-label="Whatsapp" className="rounded-full border border-white/10 p-2 text-red-50/80 hover:bg-white/10"><FaWhatsapp className="h-4 w-4" /></a>

              <a href="https://www.instagram.com/teambccs/" aria-label="Instagram"
                 className="rounded-full border border-white/10 p-2 text-red-50/80 hover:bg-white/10">
                <Instagram className="h-4 w-4" />
              </a>
              <a href="https://www.facebook.com/teambccs" aria-label="Facebook"
                 className="rounded-full border border-white/10 p-2 text-red-50/80 hover:bg-white/10">
                <Facebook className="h-4 w-4" />
              </a>
              <a href="https://www.linkedin.com/company/teambccs/posts/?feedView=all" aria-label="LinkedIn"
                 className="rounded-full border border-white/10 p-2 text-red-50/80 hover:bg-white/10">
                <Linkedin className="h-4 w-4" />
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-red-100 font-semibold">Explore</h3>
            <ul className="mt-4 space-y-2 text-red-50/80">
              <li><Link href="#home" className="hover:text-red-200">Home</Link></li>
              <li><Link href="#about" className="hover:text-red-200">About</Link></li>
              <li><Link href="#categories" className="hover:text-red-200">Categories</Link></li>
              <li><Link href="#timeline" className="hover:text-red-200">Timeline</Link></li>
              <li><Link href="#faq" className="hover:text-red-200">FAQ</Link></li>
              <li><Link href="#contact" className="hover:text-red-200">Contact</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-red-100 font-semibold">Tracks</h3>
            <ul className="mt-4 space-y-2 text-red-50/80">
              <li><Link href="#categories" className="hover:text-red-200">Graphic Design</Link></li>
              <li><Link href="#categories" className="hover:text-red-200">Programming</Link></li>
              <li><Link href="#categories" className="hover:text-red-200">Video Editing</Link></li>
              <li><Link href="#categories" className="hover:text-red-200">Quiz</Link></li>
              <li><Link href="#categories" className="hover:text-red-200">Gaming</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-red-100 font-semibold">Mission Control</h3>
            <ul className="mt-4 space-y-3 text-red-50/80">
              <li className="flex items-start gap-2">
                <Mail className="mt-0.5 h-4 w-4 opacity-70" />
                <a href="mailto:aspect@bccs.lk" className="hover:text-red-200">aspect@bccs.lk</a>
              </li>
              <li className="flex items-start gap-2">
                <Phone className="mt-0.5 h-4 w-4 opacity-70" />
                <a href="tel:+94710000000" className="hover:text-red-200">+94 71 000 0000</a>
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="mt-0.5 h-4 w-4 opacity-70" />
                <span>Bandaranayake College, Gampaha</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t border-white/10 pt-6 text-xs text-red-50/60 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <p>© {new Date().getFullYear()} Bandaranayake College Computer Society — ASPECT’25.</p>
          <div className="flex items-center gap-4">
            <a href="#home" className="rounded-full border border-white/10 px-3 py-1 hover:bg-white/10">Back to top</a>
          </div>
        </div>
      </div>
    </footer>
  );
}