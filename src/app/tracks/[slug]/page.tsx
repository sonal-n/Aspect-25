import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getTrack, getAllTrackSlugs, type TrackSlug } from "../../data/tracks";
import TrackClient from "./TrackClient";

type Props = { params: { slug: TrackSlug } };

export const dynamicParams = false;

export function generateStaticParams() {
  return getAllTrackSlugs().map((slug) => ({ slug }));
}

export function generateMetadata({ params }: Props): Metadata {
  const t = getTrack(params.slug);
  if (!t) {
    return { title: "Track not found • ASPECT’25", description: "Please choose a valid track." };
  }
  return {
    title: `${t.title} • ASPECT’25`,
    description: t.short,
    openGraph: {
      title: `${t.title} • ASPECT’25`,
      description: t.short,
      images: t.heroImg ? [{ url: t.heroImg }] : undefined,
    },
  };
}

export default function Page({ params }: Props) {
  const t = getTrack(params.slug);
  if (!t) notFound();

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
