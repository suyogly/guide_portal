import { getAllBlogs, getBlogBySlug } from "@/lib/db";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import BlogPostView from "./_components/BlogPost";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const posts = await getAllBlogs();
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = await getBlogBySlug(slug);
  if (!post) return {};
  return {
    title: `${post.title} | TrekGuide Hub`,
    description: post.excerpt,
    openGraph: { images: post.image ? [post.image] : [] },
  };
}

export default async function BlogSlugPage({ params }: Props) {
  const { slug } = await params;
  const post = await getBlogBySlug(slug);
  if (!post) notFound();
  return <BlogPostView post={post} />;
}
