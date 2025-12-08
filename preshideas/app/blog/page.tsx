"use client";

import React, { useState, useEffect } from "react";
import { BlogPost } from "./types";
import { PostCard } from "../blog/component/PostCard";
import { AdminEditor } from "../blog/component/AdminEditor";
import { MarkdownRenderer } from "../blog/component/MarkdownRenderer";
import { Login } from "../blog/component/Login";
import HiddenSignInButton from "../component/HiddenSignInButton";
import {
  Menu,
  X,
  Plus,
  BookOpen,
  ChevronLeft,
  LogIn,
  LogOut,
  User,
} from "lucide-react";

const INITIAL_POSTS: BlogPost[] = [
  {
    id: "1",
    title: "The Future of Digital Storytelling",
    summary:
      "Exploring how AI and modern web technologies are reshaping the way we consume and create content online.",
    content:
      '# The Future of Digital Storytelling\n\nWe are standing on the precipice of a new era in content creation. \n\n### The Shift\n\nTraditional blogging is evolving into immersive experiences. With tools like **Gemini** and **React**, we can build platforms that don\'t just display text, but understand it.\n\n> "Technology is best when it brings people together." - Matt Mullenweg\n\nStay tuned as we explore these themes on PreshIdeas.',
    author: "Presh Admin",
    createdAt: new Date().toISOString(),
    tags: ["Future", "Tech"],
    coverImage:
      "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2072&auto=format&fit=crop",
  },
];



const Blog: React.FC = () => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [view, setView] = useState<"home" | "post" | "admin" | "login">("home");
  const [activePostId, setActivePostId] = useState<string | null>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Load posts and auth status
  useEffect(() => {
    const savedPosts = localStorage.getItem("presh_blog_posts");
    if (savedPosts) {
      setPosts(JSON.parse(savedPosts));
    } else {
      setPosts(INITIAL_POSTS);
    }

    const savedAuth = localStorage.getItem("presh_auth");
    if (savedAuth === "true") {
      setIsAuthenticated(true);
    }
  }, []);

  // Save posts
  useEffect(() => {
    if (posts.length > 0) {
      localStorage.setItem("presh_blog_posts", JSON.stringify(posts));
    }
  }, [posts]);

  const handlePostClick = (id: string) => {
    setActivePostId(id);
    setView("post");
    window.scrollTo(0, 0);
  };

  const handleSavePost = (newPost: BlogPost) => {
    const updatedPosts = [newPost, ...posts];
    setPosts(updatedPosts);
    setView("home");
  };

  const handleLogin = (success: boolean) => {
    if (success) {
      setIsAuthenticated(true);
      setView("admin"); // Redirect to admin after login
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("presh_auth");
    setIsAuthenticated(false);
    setView("home");
  };
  

  const activePost = posts.find((p) => p.id === activePostId);
   

  return (
    <div className="min-h-screen bg-white text-gray-900 font-sans selection:bg-gray-900 selection:text-white">
      {/* Login Modal */}
      {view === "login" && (
        <Login onLogin={handleLogin} onCancel={() => setView("home")} />
      )}

      {/* Header */}
      <header className="fixed top-0 w-full z-40 bg-white/90 backdrop-blur-xl border-b border-gray-100 transition-all duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            {/* Desktop Nav */}
            <nav className="hidden md:flex items-center space-x-6 ml-auto">
              {isAuthenticated ? (
                <>
                  <button
                    onClick={() => setView("admin")}
                    className={`text-sm font-medium transition-colors hover:text-black ${
                      view === "admin" ? "text-black" : "text-gray-500"
                    }`}
                  >
                    Dashboard
                  </button>

                  <button
                    onClick={handleLogout}
                    className="text-sm font-medium text-red-500 hover:text-red-700 transition-colors flex items-center"
                  >
                    <LogOut size={16} className="mr-1" />
                    Sign Out
                  </button>

                  <button
                    onClick={() => setView("admin")}
                    className="bg-black text-white px-5 py-2.5 rounded-xl text-sm font-semibold 
                   hover:bg-gray-800 transition-all flex items-center shadow-md 
                   hover:shadow-lg transform hover:-translate-y-0.5"
                  >
                    <Plus size={16} className="mr-2" />
                    New Story
                  </button>
                </>
              ) : (
                <button
                  onClick={() => setView("login")}
                  className="text-sm font-medium text-gray-900 hover:text-gray-600 transition-colors"
                >
                  {/* Sign In */}
                </button>
              )}
            </nav>

            {/* Mobile Menu Button */}
            <div className="md:hidden">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="p-2 text-gray-600"
              >
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-white border-b border-gray-100 animate-in fade-in slide-in-from-top-5">
            <div className="px-4 py-4 space-y-3">
              <button
                onClick={() => {
                  setView("home");
                  setIsMenuOpen(false);
                }}
                className="block w-full text-left px-3 py-2 text-base font-medium text-gray-900 hover:bg-gray-50 rounded-lg"
              >
                Home
              </button>
              {isAuthenticated ? (
                <>
                  <button
                    onClick={() => {
                      setView("admin");
                      setIsMenuOpen(false);
                    }}
                    className="block w-full text-left px-3 py-2 text-base font-medium text-gray-900 hover:bg-gray-50 rounded-lg"
                  >
                    Write Post
                  </button>
                  <button
                    onClick={() => {
                      handleLogout();
                      setIsMenuOpen(false);
                    }}
                    className="block w-full text-left px-3 py-2 text-base font-medium text-red-600 hover:bg-red-50 rounded-lg"
                  >
                    Sign Out
                  </button>
                </>
              ) : (
                <button
                  onClick={() => {
                    setView("login");
                    setIsMenuOpen(false);
                  }}
                  className="block w-full text-left px-3 py-2 text-base font-medium text-gray-900 hover:bg-gray-50 rounded-lg"
                >
                  Admin Sign In
                </button>
              )}
            </div>
          </div>
        )}
      </header>

      {/* Main Content */}
      <main className="flex-grow pt-24 pb-20 px-4 sm:px-6">
        {view === "home" && (
          <div className="max-w-7xl mx-auto animate-in fade-in duration-700">
            {/* Header / Intro */}
            <div className="mb-16 md:mb-24 mt-8 md:mt-12 text-center max-w-4xl mx-auto">
              <p className="text-sm font-bold tracking-widest text-gray-400 uppercase mb-4">
                The PreshIdeas Blog
              </p>
              <h1 className="text-4xl md:text-7xl font-serif font-medium text-gray-900 leading-tight mb-6">
                Insights for the <br />
                <span className="italic text-gray-500">modern creator.</span>
              </h1>
              <div className="h-1 w-20 bg-black mx-auto"></div>
            </div>

            {/* Featured Post (First one) */}
            {posts.length > 0 && (
              <PostCard
                post={posts[0]}
                onClick={handlePostClick}
                featured={true}
              />
            )}

            {/* Sub-header for Grid */}
            <div className="flex items-center mb-10 border-t border-gray-100 pt-10">
              <h3 className="text-2xl font-serif font-bold">Latest Stories</h3>
            </div>

            {/* Posts Grid (Rest of posts) */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
              {posts.slice(1).map((post) => (
                <PostCard key={post.id} post={post} onClick={handlePostClick} />
              ))}
              {posts.length === 1 && (
                <div className="col-span-full py-12 text-center text-gray-400 italic">
                  More stories coming soon...
                </div>
              )}
            </div>
          </div>
        )}

        {view === "post" && activePost && (
          <article className="animate-in fade-in duration-500">
            {/* Post Hero */}
            <div className="relative h-[40vh] md:h-[60vh] w-full max-w-7xl mx-auto rounded-3xl overflow-hidden mb-12 shadow-2xl">
              {activePost.coverImage ? (
                <img
                  src={activePost.coverImage}
                  alt={activePost.title}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full bg-gray-900" />
              )}
              <div className="absolute inset-0 bg-black/40" />

              <button
                onClick={() => setView("home")}
                className="absolute top-8 left-8 bg-white/10 backdrop-blur-md border border-white/20 text-white px-4 py-2 rounded-full hover:bg-white/20 transition-all flex items-center gap-2 text-sm font-medium"
              >
                <ChevronLeft size={16} /> Back to Journal
              </button>

              <div className="absolute bottom-0 left-0 w-full p-8 md:p-16 text-white">
                <div className="max-w-4xl mx-auto text-center">
                  <div className="flex justify-center gap-3 mb-6">
                    {activePost.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-3 py-1 bg-white text-black rounded-full text-xs font-bold uppercase tracking-widest shadow-lg"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <h1 className="text-3xl md:text-6xl font-bold font-serif leading-tight mb-6">
                    {activePost.title}
                  </h1>
                  <div className="flex items-center justify-center text-sm md:text-base font-medium text-white/90 space-x-6 tracking-wide">
                    <span className="flex items-center">
                      <User size={16} className="mr-2" /> {activePost.author}
                    </span>
                    <span>•</span>
                    <span>
                      {new Date(activePost.createdAt).toLocaleDateString(
                        undefined,
                        { dateStyle: "long" }
                      )}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Content Body */}
            <div className="max-w-3xl mx-auto px-4">
              <div className="prose prose-lg prose-stone md:prose-xl mx-auto prose-headings:font-serif prose-headings:font-bold prose-p:font-serif prose-p:text-gray-600 prose-img:rounded-xl prose-a:text-blue-600">
                <MarkdownRenderer content={activePost.content} />
              </div>

              {/* Footer of Article */}
              <div className="mt-16 pt-8 border-t border-gray-100 text-center">
                <p className="italic text-gray-500 font-serif">
                  Thanks for reading.
                </p>
                <button
                  onClick={() => setView("home")}
                  className="mt-6 text-sm font-bold uppercase tracking-widest hover:underline"
                >
                  Read More Stories
                </button>
              </div>
            </div>
          </article>
        )}

        {view === "admin" && isAuthenticated && (
          <AdminEditor
            onSave={handleSavePost}
            onCancel={() => setView("home")}
          />
        )}

        <HiddenSignInButton isAuthenticated={isAuthenticated} setView={setView} />
      </main>
    </div>
  );
};

export default Blog;
