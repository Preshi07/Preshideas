"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, MessageCircle, Share2, Bookmark, Clock, ArrowRight } from "lucide-react";

// --- Data ---
const blogPosts = [
  {
    id: 1,
    author: {
      name: "Precious Iheanacho",
      avatar: "/blogs/user.png",
      username: "@presh",
    },
    content: {
      title: "Turning Keywords into Questions",
      excerpt: "Discover the SEO trick that transforms simple queries into high-ranking content clusters.",
      image: "/blogs/Seo.png",
      category: "SEO Strategy",
    },
    engagement: { likes: 1247, comments: 89, shares: 34 },
    readTime: "5 min read",
    date: "Oct 24",
    trending: true,
  },
  {
    id: 2,
    author: {
      name: "Precious Iheanacho",
      avatar: "/blogs/user.png",
      username: "@presh",
    },
    content: {
      title: "The Future of Data Analytics",
      excerpt: "How to craft content that doesn't just rank, but resonates deeply with your target audience.",
      image: "/blogs/Data.png",
      category: "Development",
    },
    engagement: { likes: 2156, comments: 143, shares: 67 },
    readTime: "8 min read",
    date: "Oct 22",
    trending: false,
  },
  {
    id: 3,
    author: {
      name: "Precious Iheanacho",
      avatar: "/blogs/user.png",
      username: "@presh",
    },
    content: {
      title: "Sustainable Tech Practices",
      excerpt: "Balancing profit and the planet: A guide for modern startups in the African ecosystem.",
      image: "/blogs/Profit.png",
      category: "Sustainability",
    },
    engagement: { likes: 3421, comments: 234, shares: 156 },
    readTime: "6 min read",
    date: "Oct 20",
    trending: true,
  },
];

// --- Utility: Format Numbers ---
const formatNumber = (num) => {
  return num >= 1000 ? (num / 1000).toFixed(1) + "k" : num;
};

// --- Sub-Component: Blog Card ---
function BlogCard({ post, index }) {
  const [isLiked, setIsLiked] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [likes, setLikes] = useState(post.engagement.likes);

  const handleLike = (e) => {
    e.stopPropagation(); // Prevent card click
    setIsLiked(!isLiked);
    setLikes(isLiked ? likes - 1 : likes + 1);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group relative flex flex-col h-full bg-white border border-slate-200 rounded-3xl overflow-hidden hover:shadow-2xl hover:shadow-[#00C96D]/10 transition-all duration-500 cursor-pointer"
    >
      {/* Image Container */}
      <div className="relative h-64 w-full overflow-hidden">
        <Image
          src={post.content.image}
          alt={post.content.title}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-105"
        />
        
        {/* Overlay Gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-60" />

        {/* Floating Category Badge */}
        <div className="absolute top-4 left-4">
          <span className="px-3 py-1 text-xs font-bold uppercase tracking-wider bg-white/90 backdrop-blur-md text-slate-900 rounded-full border border-white/20 shadow-sm">
            {post.content.category}
          </span>
        </div>

        {/* Floating Author (Bottom Left) */}
        <div className="absolute bottom-4 left-4 flex items-center gap-2">
          <div className="relative w-8 h-8 rounded-full border-2 border-white overflow-hidden">
            <Image src={post.author.avatar} alt="Author" fill className="object-cover" />
          </div>
          <div className="text-white">
            <p className="text-xs font-semibold">{post.author.name}</p>
            <p className="text-[10px] opacity-80">{post.date} • {post.readTime}</p>
          </div>
        </div>
      </div>

      {/* Content Body */}
      <div className="flex flex-col flex-grow p-6">
        <div className="flex-grow">
          <h3 className="text-2xl font-bold text-slate-900 mb-3 group-hover:text-[#00C96D] transition-colors leading-tight">
            {post.content.title}
          </h3>
          <p className="text-slate-500 text-sm leading-relaxed line-clamp-3">
            {post.content.excerpt}
          </p>
        </div>

        {/* Footer / Actions */}
        <div className="mt-6 pt-6 border-t border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-4 text-slate-400">
            {/* Like Button */}
            <motion.button 
              onClick={handleLike} 
              whileTap={{ scale: 0.8 }}
              className={`flex items-center gap-1.5 text-sm font-medium transition-colors ${isLiked ? "text-red-500" : "hover:text-slate-600"}`}
            >
              <Heart className={`w-5 h-5 ${isLiked ? "fill-current" : ""}`} />
              <span>{formatNumber(likes)}</span>
            </motion.button>

            {/* Comments */}
            <div className="flex items-center gap-1.5 text-sm font-medium">
              <MessageCircle className="w-5 h-5" />
              <span>{post.engagement.comments}</span>
            </div>
          </div>

          {/* Bookmark */}
          <motion.button 
            onClick={(e) => { e.stopPropagation(); setIsBookmarked(!isBookmarked); }}
            whileTap={{ scale: 0.9 }}
            className={`p-2 rounded-full transition-colors ${isBookmarked ? "text-[#00B5D1] bg-[#00B5D1]/10" : "text-slate-400 hover:bg-slate-100"}`}
          >
            <Bookmark className={`w-5 h-5 ${isBookmarked ? "fill-current" : ""}`} />
          </motion.button>
        </div>
      </div>

      {/* Hover Border Effect */}
      <div className="absolute inset-0 border-2 border-transparent group-hover:border-[#00C96D]/20 rounded-3xl pointer-events-none transition-colors duration-500" />
    </motion.div>
  );
}

// --- Main Component ---
export default function Blog() {
  return (
    <section className="relative bg-[#fafafa] py-24 overflow-hidden selection:bg-[#00C96D]/20">
      
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#00C96D]/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-[#2D79FF]/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="w-full max-w-[1400px] mx-auto px-6 lg:px-12 relative z-10">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row items-end justify-between mb-16 gap-6">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <span className="text-[#00C96D] font-mono uppercase tracking-widest text-xs font-semibold mb-2 block">
              The Journal
            </span>
            <h2 className="text-5xl md:text-7xl font-bold text-slate-900 tracking-tight leading-[0.9]">
              Latest <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00C96D] via-[#00B5D1] to-[#2D79FF]">
                Insights.
              </span>
            </h2>
          </motion.div>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-2 px-6 py-3 bg-white border border-slate-200 rounded-full font-semibold text-sm hover:border-[#00C96D] transition-colors shadow-sm"
          >
            Read all articles
            <ArrowRight className="w-4 h-4 text-[#00C96D]" />
          </motion.button>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.map((post, i) => (
            <BlogCard key={post.id} post={post} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}