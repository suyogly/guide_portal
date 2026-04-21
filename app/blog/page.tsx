import { getAllBlogs } from "@/lib/db";
import BlogListing from "./_components/BlogListing";

export const revalidate = 60;

export const metadata = {
  title: "Blog | TrekGuide Hub",
  description: "Trekking tips, cultural insights, gear guides, and stories from the Himalayas.",
};

export default async function BlogPage() {
  const posts = await getAllBlogs();
  return <BlogListing posts={posts} />;
}
