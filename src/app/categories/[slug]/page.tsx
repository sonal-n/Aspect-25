import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getTrack } from "../../data/tracks";
import TrackClient from "./TrackClient";

type Props = { params: { slug: string } };

export function generateMetadata({ params }: Props): Metadata {
  const t = getTrack(params.slug as any);
  if (!t) return { title: "ASPECT’25" };
  return {
    title: t.title,
    description: t.short,
    openGraph: {
      title: t.title,
      description: t.short,
      images: t.heroImg ? [{ url: t.heroImg }] : undefined,
    },
    alternates: { canonical: `/categories/${t.slug}` },
  };
}

export default function Page({ params }: Props) {
  const t = getTrack(params.slug as any);
  if (!t) return notFound();

  return (
    <main className="min-h-screen bg-[#160e0e]">
      <TrackClient
        track={{
          slug: t.slug,
          title: t.title,
          short: t.short,
          heroImg: t.heroImg,
          heroBg: t.heroBg,
          color: t.color,
          overview: t.overview,
          whatToBuild: t.whatToBuild,
          deliverables: t.deliverables,
          rules: t.rules,
          judging: t.judging,
          eligibility: t.eligibility ?? [],
          resources: t.resources ?? [],
        }}
      />
    </main>
  );
}
