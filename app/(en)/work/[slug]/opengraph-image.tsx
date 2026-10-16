import { projectCard, ogSize } from "@/lib/og";
import { getProject, getProjectNumber, getProjectSlugs, getProjectTotal } from "@/lib/projects";

export const size = ogSize;
export const contentType = "image/png";

export function generateStaticParams() {
  return getProjectSlugs().map((slug) => ({ slug }));
}

// Per-project alt text. (Unlike the image function below, this receives params as a plain object.)
export function generateImageMetadata({ params }: { params: { slug: string } }) {
  const project = getProject(params.slug, "en");
  return [{ id: "card", alt: project ? `${project.title} — ${project.tagline}` : "", size, contentType }];
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = getProject(slug, "en");
  if (!project) throw new Error(`Unknown project: ${slug}`);
  return projectCard(project, getProjectNumber(slug), getProjectTotal());
}
