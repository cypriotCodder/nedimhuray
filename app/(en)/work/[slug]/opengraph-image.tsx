import { projectCard, ogSize } from "@/lib/og";
import { getProject, getProjectNumber, getProjects } from "@/lib/projects";

export const size = ogSize;
export const contentType = "image/png";

export function generateStaticParams() {
  return getProjects().map((p) => ({ slug: p.slug }));
}

// Per-project alt text. (Unlike the image function below, this receives params as a plain object.)
export function generateImageMetadata({ params }: { params: { slug: string } }) {
  const project = getProject(params.slug);
  return [{ id: "card", alt: project ? `${project.title} — ${project.tagline}` : "", size, contentType }];
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) throw new Error(`Unknown project: ${slug}`);
  return projectCard(project, getProjectNumber(slug), String(getProjects().length).padStart(2, "0"));
}
