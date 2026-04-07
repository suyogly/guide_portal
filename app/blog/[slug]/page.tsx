"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { ArrowLeft, Calendar, User, Clock, Share2, Tag } from "lucide-react";
import { BLOG_POSTS } from "../data";

export default function BlogPostPage() {
    const params = useParams();
    const post = BLOG_POSTS.find(p => p.slug === params.slug);

    if (!post) {
        return (
            <main className="min-h-screen bg-slate-950 text-white flex items-center justify-center pt-24">
                <div className="text-center">
                    <h1 className="text-4xl font-bold mb-4">Post Not Found</h1>
                    <Link href="/blog" className="text-nepal-orange hover:underline">Back to Blog</Link>
                </div>
            </main>
        );
    }

    return (
        <main className="min-h-screen bg-slate-950 text-white">
            {/* Post Header */}
            <header className="relative pt-40 pb-20 px-4">
                <div className="max-w-4xl mx-auto relative z-10">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="mb-8"
                    >
                        <Link href="/blog" className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors group">
                            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" /> Back to Articles
                        </Link>
                    </motion.div>

                    <motion.span
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-nepal-orange font-bold tracking-widest uppercase mb-4 block"
                    >
                        {post.category}
                    </motion.span>
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-4xl md:text-6xl font-display font-bold mb-8 leading-tight"
                    >
                        {post.title}
                    </motion.h1>

                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.2 }}
                        className="flex flex-wrap items-center gap-8 text-gray-400 border-t border-white/10 pt-8"
                    >
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-nepal-orange/20 flex items-center justify-center text-nepal-orange text-lg font-bold">
                                {post.author.charAt(0)}
                            </div>
                            <div>
                                <p className="text-white text-sm font-bold leading-none mb-1">{post.author}</p>
                                <p className="text-[10px] uppercase tracking-wider">Expert Contributor</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-2 text-sm uppercase tracking-widest font-bold">
                            <Calendar className="w-4 h-4 text-nepal-orange" /> {post.date}
                        </div>
                        <div className="flex items-center gap-2 text-sm uppercase tracking-widest font-bold">
                            <Clock className="w-4 h-4 text-nepal-orange" /> 6 min read
                        </div>
                    </motion.div>
                </div>
            </header>

            {/* Featured Image */}
            <section className="px-4 mb-20">
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="max-w-6xl mx-auto h-[60vh] relative rounded-[40px] overflow-hidden border border-white/10 shadow-2xl"
                >
                    <Image src={post.image} alt={post.title} fill className="object-cover" priority />
                </motion.div>
            </section>

            {/* Post Content */}
            <section className="px-4 pb-32">
                <div className="max-w-4xl mx-auto">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                        {/* Sidebar/Share */}
                        <div className="lg:col-span-1 hidden lg:block sticky top-32 h-fit">
                            <div className="flex flex-col gap-4">
                                <button className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center hover:bg-white/5 transition-all text-gray-400 hover:text-white"><Share2 className="w-5 h-5" /></button>
                                <button className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center hover:bg-white/5 transition-all text-gray-400 hover:text-white"><Tag className="w-5 h-5" /></button>
                            </div>
                        </div>

                        {/* Article Body */}
                        <div className="lg:col-span-11 bg-slate-900/40 border border-white/5 rounded-3xl p-8 md:p-16">
                            <div className="prose prose-invert prose-orange max-w-none">
                                <div dangerouslySetInnerHTML={{ __html: post.content }} />
                            </div>

                            {/* Author Bio Section */}
                            <div className="mt-20 pt-12 border-t border-white/10 flex flex-col md:flex-row gap-8 items-start">
                                <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-nepal-orange to-orange-600 flex items-center justify-center shrink-0">
                                    <User className="text-white w-10 h-10" />
                                </div>
                                <div>
                                    <h4 className="text-xl font-bold text-white mb-2">About {post.author}</h4>
                                    <p className="text-gray-400 leading-relaxed mb-6">
                                        Pasang is a third-generation mountain guide with over 15 years of experience leading expeditions across the Himalayas. When not on the trail, he writes about sustainable tourism and Sherpa culture.
                                    </p>
                                    <button className="text-nepal-orange font-bold hover:underline">View More Articles {"->"}</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
}
