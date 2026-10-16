import { NotFoundView, notFoundMetadata } from "@/components/views/NotFoundView";

export const metadata = notFoundMetadata("tr");

export default function NotFound() {
  return <NotFoundView lang="tr" />;
}
