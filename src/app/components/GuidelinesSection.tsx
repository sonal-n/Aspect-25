'use client';

import {
  Lightbulb,
  Wrench,
  Scale,
  UserRound,
  CheckCircle2,
  CircleDot,
  ChevronRight,
  Sparkles,
} from 'lucide-react';

type BulletIconKind = 'check' | 'dot' | 'arrow' | 'sparkle';

type Group = {
  key: string;
  title: string;
  icon: 'astronaut' | 'lightbulb' | 'wrench' | 'scale';
  bullets: string[];
  bulletIcon?: BulletIconKind;
};

const IconMap = {
  astronaut: UserRound,
  lightbulb: Lightbulb,
  wrench: Wrench,
  scale: Scale,
} as const;

const BulletIconMap: Record<BulletIconKind, typeof CheckCircle2> = {
  check: CheckCircle2,
  dot: CircleDot,
  arrow: ChevronRight,
  sparkle: Sparkles,
};

export default function GuidelinesSection({
  groups = [],
  accent = '#E65F4E',           
  variant = 'grid',
}: {
  groups?: Group[];
  accent?: string;
  variant?: 'grid' | 'accordion';
}) {
  if (!Array.isArray(groups) || groups.length === 0) return null;

  return (
    <section
      className="relative"
      style={{ ['--acc' as any]: accent, ['--ring' as any]: 'rgba(255,255,255,0.12)' }}
    >
      {variant === 'grid' ? (
        <div className="grid gap-6 sm:grid-cols-2">
          {groups.map((g) => (
            <Card key={g.key} title={g.title} iconKey={g.icon} bullets={g.bullets} bulletIcon={g.bulletIcon} />
          ))}
        </div>
      ) : (
        <div className="space-y-3">
          {groups.map((g) => (
            <details
              key={g.key}
              className="
                group overflow-hidden rounded-2xl ring-1
                ring-[color:var(--ring)] bg-[rgba(10,8,8,0.65)] backdrop-blur
                shadow-[0_18px_60px_-20px_rgba(0,0,0,0.65)]
              "
            >
              <summary className="flex cursor-pointer items-center justify-between gap-3 px-5 py-4 text-white">
                <Header iconKey={g.icon} title={g.title} />
                <span className="h-4 w-4 rounded-full ring-1 ring-white/20 group-open:bg-white/25" />
              </summary>
              <div className="px-5 pb-5">
                <BulletList bullets={g.bullets} icon={BulletIconMap[g.bulletIcon ?? 'check']} />
              </div>
            </details>
          ))}
        </div>
      )}
    </section>
  );
}

function Header({ iconKey, title }: { iconKey: keyof typeof IconMap; title: string }) {
  const Icon = IconMap[iconKey];
  return (
    <div className="flex items-center gap-3">
      <span
        className="
          grid h-9 w-9 place-items-center rounded-xl
          ring-1 ring-[color:var(--acc)/45]
          bg-[color:var(--acc)/18]
          shadow-[inset_0_-8px_24px_-16px_var(--acc)]
        "
      >
        <Icon className="h-5 w-5 text-white/95" />
      </span>
      <span className="text-[17px] font-semibold tracking-tight text-white">{title}</span>
    </div>
  );
}

function BulletList({
  bullets,
  icon: BulletIcon,
}: {
  bullets: string[];
  icon: typeof CheckCircle2;
}) {
  if (!Array.isArray(bullets) || bullets.length === 0) return null;
  return (
    <ul className="space-y-2.5">
      {bullets.map((b, i) => (
        <li key={i} className="flex items-start gap-3">
          <span className="mt-0.5">
            <BulletIcon className="h-5 w-5 text-[color:var(--acc)/90]" />
          </span>
          <span className="text-white/92">{b}</span>
        </li>
      ))}
    </ul>
  );
}

function Card({
  title,
  iconKey,
  bullets,
  bulletIcon,
}: {
  title: string;
  iconKey: keyof typeof IconMap;
  bullets: string[];
  bulletIcon?: BulletIconKind;
}) {
  const Icon = IconMap[iconKey];
  const BulletIcon = BulletIconMap[bulletIcon ?? 'check'];

  return (
    <div
      className="
        rounded-2xl ring-1 ring-[color:var(--ring)]
        bg-[rgba(10,8,8,0.65)] backdrop-blur
        shadow-[0_18px_60px_-20px_rgba(0,0,0,0.65)]
        p-5
        relative
      "
    >
      <div className="pointer-events-none absolute inset-0 rounded-2xl [box-shadow:inset_0_0_0_1px_rgba(255,255,255,.06)]" />
      <div className="mb-3 flex items-center gap-3">
        <span
          className="
            grid h-9 w-9 place-items-center rounded-xl
            ring-1 ring-[color:var(--acc)/45] bg-[color:var(--acc)/18]
            shadow-[inset_0_-8px_24px_-16px_var(--acc)]
          "
        >
          <Icon className="h-5 w-5 text-white/95" />
        </span>
        <h3 className="text-lg font-semibold text-white">{title}</h3>
      </div>
      <BulletList bullets={bullets} icon={BulletIcon} />
    </div>
  );
}
