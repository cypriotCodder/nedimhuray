import type { Metadata } from "next";
import { CaseStudyView, caseStudyMetadata, caseStudyParams } from "@/components/views/CaseStudyView";

// Every case study is prerendered at build time; any other slug is a 404.
export const dynamicParams = false;
export const generateStaticParams = caseStudyParams;

export async function generateMetadata({ params }: PageProps<"/work/[slug]">): Promise<Metadata> {
  return caseStudyMetadata("en", (await params).slug);
}

export default async function Page({ params }: PageProps<"/work/[slug]">) {
  return <CaseStudyView lang="en" slug={(await params).slug} />;
}
