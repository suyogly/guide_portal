"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Calendar, User, ArrowRight } from "lucide-react";
import type { BlogPost } from "@/app/blog/data";

export default function BlogListing({ posts }: { posts: BlogPost[] }) {
    if (posts.length === 0) {
        return (
            <main className="min-h-screen bg-slate-950 text-white flex items-center justify-center">
                <p className="text-gray-400 text-lg">No posts yet. Check back soon.</p>
            </main>
        );
    }

    return (
        <main className="min-h-screen bg-slate-950 text-white">
            {/* Hero Section */}
            <section className="relative pt-32 pb-20 px-4 overflow-hidden">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-orange-500/10 via-transparent to-transparent blur-3xl opacity-50" />

                <div className="max-w-7xl mx-auto relative z-10 text-center">
                    <motion.span
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-nepal-orange font-bold tracking-widest uppercase mb-4 block"
                    >
                        The Trekker&apos;s Journal
                    </motion.span>
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-5xl md:text-7xl font-display font-bold mb-6"
                    >
                        Insights from the <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-500 text-nepal-orange">Himalayas</span>
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="text-gray-400 max-w-2xl mx-auto text-xl leading-relaxed"
                    >
                        Expert guides, cultural deep-dives, and gear reviews for the conscious mountaineer.
                    </motion.p>
                </div>
            </section>

            {/* Featured Post (Bento Style) */}
            <section className="px-4 pb-32">
                <div className="max-w-7xl mx-auto">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                        {/* Hero Blog Card */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="lg:col-span-8 group relative h-[500px] rounded-3xl overflow-hidden border border-white/10"
                        >
                            {posts[0].image && <Image
                                src={posts[0].image}
                                alt={posts[0].title}
                                fill
                                priority
                                className="object-cover group-hover:scale-105 transition-transform duration-700"
                            />}
                            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />
                            <div className="absolute bottom-0 left-0 p-8 md:p-12 w-full">
                                <span className="bg-nepal-orange text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider mb-4 inline-block">
                                    {posts[0].category}
                                </span>
                                <h2 className="text-3xl md:text-5xl font-bold text-white mb-4 group-hover:text-nepal-orange transition-colors max-w-2xl">
                                    {posts[0].title}
                                </h2>
                                <p className="text-gray-300 text-lg mb-6 max-w-xl line-clamp-2">
                                    {posts[0].excerpt}
                                </p>
                                <Link
                                    href={`/blog/${posts[0].slug}`}
                                    className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md text-white px-6 py-3 rounded-full font-bold hover:bg-white/20 transition-all border border-white/10"
                                >
                                    Read Full Post <ArrowRight className="w-4 h-4" />
                                </Link>
                            </div>
                        </motion.div>

                        {/* Recent Posts Sidebar */}
                        <div className="lg:col-span-4 space-y-8">
                            {posts.slice(1).map((post, idx) => (
                                <motion.div
                                    key={post.slug}
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 0.3 + idx * 0.1 }}
                                    className="group flex gap-4 bg-slate-900/50 p-4 rounded-2xl border border-white/5 hover:border-nepal-orange/30 transition-all"
                                >
                                    <div className="relative w-24 h-24 shrink-0 rounded-xl overflow-hidden">
                                        <Image src={post.image} alt={post.title} fill className="object-cover" />
                                    </div>
                                    <div className="flex flex-col justify-between">
                                        <div>
                                            <span className="text-[10px] font-bold text-nepal-orange uppercase tracking-wider mb-1 block">
                                                {post.category}
                                            </span>
                                            <h3 className="font-bold text-white line-clamp-2 leading-tight group-hover:text-nepal-orange transition-colors">
                                                <Link href={`/blog/${post.slug}`}>{post.title}</Link>
                                            </h3>
                                        </div>
                                        <div className="flex items-center gap-2 text-[10px] text-gray-500">
                                            <Calendar className="w-3 h-3" /> {post.date}
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>

                    {/* Blog Feed Grid */}
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
                        {posts.map((post, index) => (
                            <motion.article
                                key={post.slug}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 }}
                                viewport={{ once: true }}
                                className="group bg-slate-900 border border-white/10 rounded-3xl overflow-hidden hover:border-nepal-orange/50 transition-all duration-500"
                            >
                                <div className="relative h-56 overflow-hidden">
                                    <Image
                                        src={post.image}
                                        alt={post.title}
                                        fill
                                        className="object-cover group-hover:scale-110 transition-transform duration-700"
                                    />
                                    <div className="absolute bottom-4 left-4">
                                        <span className="bg-black/60 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-bold text-white uppercase tracking-wider border border-white/10">
                                            {post.category}
                                        </span>
                                    </div>
                                </div>
                                <div className="p-6">
                                    <div className="flex items-center gap-4 text-[10px] text-gray-500 mb-4 uppercase tracking-widest font-bold">
                                        <span className="flex items-center gap-1"><User className="w-3 h-3" /> {post.author}</span>
                                        <span className="flex items-center gap-1"><Calendar className="w-3 h-3" /> {post.date}</span>
                                    </div>
                                    <h3 className="text-xl font-bold mb-3 group-hover:text-nepal-orange transition-colors">
                                        <Link href={`/blog/${post.slug}`}>{post.title}</Link>
                                    </h3>
                                    <p className="text-gray-400 text-sm mb-6 line-clamp-2">
                                        {post.excerpt}
                                    </p>
                                    <Link
                                        href={`/blog/${post.slug}`}
                                        className="inline-flex items-center gap-2 text-sm font-bold text-white group-hover:text-nepal-orange transition-colors"
                                    >
                                        Read More <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                    </Link>
                                </div>
                            </motion.article>
                        ))}
                    </div>
                </div>
            </section>
        </main>
    );
}
