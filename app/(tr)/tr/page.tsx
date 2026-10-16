import { HomeView, homeMetadata } from "@/components/views/HomeView";

export const metadata = homeMetadata("tr");

export default function Page() {
  return <HomeView lang="tr" />;
}
