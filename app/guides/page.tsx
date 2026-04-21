import { getAllGuides } from "@/lib/db";
import GuidesContent from "./_components/GuidesContent";

export const metadata = {
  title: "Our Guides | TrekGuide Hub",
  description: "Browse our vetted, professional trekking guides across Nepal's Everest, Annapurna, Langtang, and Manaslu regions.",
};

/** Revalidate so new guides from the admin DB appear on Vercel without a full redeploy. */
export const revalidate = 60;

export default async function GuideLandingPage() {
  const guides = await getAllGuides();
  return <GuidesContent guides={guides} />;
}
