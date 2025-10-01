"use client"

import React from "react"
import { motion } from "framer-motion"
import { Heart, MessageCircle, Share2, Bookmark, MoreHorizontal, TrendingUp } from "lucide-react"
import { Button } from "@/components/ui/button"

const blogPosts = [
  {
    id: 1,
    author: {
      name: "Carrie Rose",
      avatar: "/professional-woman-portrait.png",
      username: "@carrierose",
    },
    content: {
      title: "The Future of Design Systems",
      excerpt:
        "Exploring how modern design systems are evolving to meet the demands of cross-platform development and AI-assisted design tools.",
      image: "/modern-workspace.png",
      category: "Design",
    },
    engagement: { likes: 1247, comments: 89, shares: 34 },
    timestamp: "3 mins ago",
    isLiked: false,
    isBookmarked: false,
    trending: true,
  },
  {
    id: 2,
    author: {
      name: "Ray Saddiq",
      avatar: "/professional-man-portrait.png",
      username: "@raysaddiq",
    },
    content: {
      title: "Building Scalable React Applications",
      excerpt:
        "Learn the best practices for architecting large-scale React applications that maintain performance and developer experience.",
      image: "/react-code-development.jpg",
      category: "Development",
    },
    engagement: { likes: 2156, comments: 143, shares: 67 },
    timestamp: "1 hour ago",
    isLiked: true,
    isBookmarked: false,
    trending: false,
  },
  {
    id: 3,
    author: {
      name: "Sarah Chen",
      avatar: "/asian-woman-professional.png",
      username: "@sarahchen",
    },
    content: {
      title: "The Art of Minimalist UI Design",
      excerpt:
        "Discover how less can be more when it comes to creating intuitive and beautiful user interfaces that users love.",
      image: "/minimalist-ui.png",
      category: "UI/UX",
    },
    engagement: { likes: 3421, comments: 234, shares: 156 },
    timestamp: "2 hours ago",
    isLiked: false,
    isBookmarked: true,
    trending: true,
  },
]

function BlogCard({ post, index }) {
  const [isLiked, setIsLiked] = React.useState(post.isLiked)
  const [isBookmarked, setIsBookmarked] = React.useState(post.isBookmarked)
  const [likes, setLikes] = React.useState(post.engagement.likes)

  const handleLike = () => {
    setIsLiked(!isLiked)
    setLikes(isLiked ? likes - 1 : likes + 1)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group relative bg-card/50 backdrop-blur-xl border border-border/50 rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl hover:shadow-accent/10 transition-all duration-500 hover:scale-[1.02] hover:border-accent/50 hover:-translate-y-1"
    >
      <div className="p-6 flex flex-col gap-4">
        {/* Author */}
        <div className="flex items-center gap-3">
          <img
            src={post.author.avatar}
            alt={post.author.name}
            className="w-10 h-10 rounded-full border border-border/30"
          />
          <div>
            <p className="font-semibold">{post.author.name}</p>
            <p className="text-sm text-muted-foreground">{post.author.username}</p>
          </div>
        </div>

        {/* Content */}
        <div>
          <img
            src={post.content.image}
            alt={post.content.title}
            className="w-full h-48 object-cover rounded-xl mb-4"
          />
          <h3 className="text-xl font-bold">{post.content.title}</h3>
          <p className="text-muted-foreground text-sm mt-2">{post.content.excerpt}</p>
        </div>

        {/* Engagement */}
        <div className="flex items-center justify-between pt-4 border-t border-border/20">
          <div className="flex items-center gap-4">
            <button onClick={handleLike} className="flex items-center gap-1">
              <Heart className={`w-5 h-5 ${isLiked ? "text-red-500 fill-red-500" : ""}`} />
              <span className="text-sm">{likes}</span>
            </button>
            <button className="flex items-center gap-1">
              <MessageCircle className="w-5 h-5" />
              <span className="text-sm">{post.engagement.comments}</span>
            </button>
            <button className="flex items-center gap-1">
              <Share2 className="w-5 h-5" />
              <span className="text-sm">{post.engagement.shares}</span>
            </button>
          </div>
          <button onClick={() => setIsBookmarked(!isBookmarked)}>
            <Bookmark
              className={`w-5 h-5 ${isBookmarked ? "text-yellow-500 fill-yellow-500" : ""}`}
            />
          </button>
        </div>
      </div>
    </motion.div>
  )
}

export default function Blog() {
  return (
    <section className="relative bg-background py-20">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl bg-gradient-to-r from-teal-500 via-green-500 to-blue-500 bg-clip-text text-transparent md:text-7xl font-bold">What's New</h2>
          <Button
            variant="ghost"
            className="mt-4 text-sm font-medium text-muted-foreground hover:text-accent transition-all duration-300"
          >
            Explore More Thoughts →
          </Button>
        </motion.div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.map((post, i) => (
            <BlogCard key={post.id} post={post} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
