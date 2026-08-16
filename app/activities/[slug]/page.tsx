import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ActivityShowcase from "@/components/ActivityShowcase";
import { activityShowcaseBySlug, activityShowcases } from "@/data/activityShowcases";

export const dynamicParams = false;

export function generateStaticParams() {
  return activityShowcases.map(({ slug }) => ({ slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const definition = activityShowcaseBySlug[params.slug];
  if (!definition) return {};

  return {
    title: definition.metaTitle,
    description: definition.metaDescription,
    robots: {
      index: false,
      follow: false,
      noarchive: true,
      nosnippet: true,
      noimageindex: true,
    },
  };
}

export default function ActivityPage({ params }: { params: { slug: string } }) {
  const definition = activityShowcaseBySlug[params.slug];
  if (!definition) notFound();

  return <ActivityShowcase definition={definition} />;
}
