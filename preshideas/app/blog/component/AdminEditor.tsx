import React, { useState } from "react";
import { BlogPost } from "../types";
import { generateBlogPost, generateBlogImage } from "../services/geminiService";
import {
  Sparkles,
  Save,
  Image as ImageIcon,
  Loader2,
  ArrowLeft,
  Send,
} from "lucide-react";

interface AdminEditorProps {
  onSave: (post: BlogPost) => void;
  onCancel: () => void;
}

export const AdminEditor: React.FC<AdminEditorProps> = ({
  onSave,
  onCancel,
}) => {
  const [topic, setTopic] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [isGeneratingImage, setIsGeneratingImage] = useState(false);
  const [formData, setFormData] = useState<Partial<BlogPost>>({
    title: "",
    summary: "",
    content: "",
    tags: [],
    author: "Admin",
    coverImage: "",
  });

  const handleGenerate = async () => {
    if (!topic) return;
    setIsGenerating(true);
    try {
      const generated = await generateBlogPost(topic);
      setFormData((prev) => ({
        ...prev,
        ...generated,
      }));
    } catch (e) {
      console.error(e);
      alert("Failed to generate content. Please check API Key.");
    } finally {
      setIsGenerating(false);
    }
  };

  const handleGenerateImage = async () => {
    const prompt = formData.title || topic;
    if (!prompt) return;
    setIsGeneratingImage(true);
    try {
      const imageUrl = await generateBlogImage(prompt);
      setFormData((prev) => ({ ...prev, coverImage: imageUrl }));
    } catch (e) {
      console.error(e);
      alert("Failed to generate image.");
    } finally {
      setIsGeneratingImage(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title || !formData.content) return;

    const newPost: BlogPost = {
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      title: formData.title,
      content: formData.content,
      summary: formData.summary || "",
      tags: formData.tags || [],
      author: formData.author || "Admin",
      coverImage: formData.coverImage,
    };
    onSave(newPost);
  };

  return (
    <div className="max-w-6xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-500 pb-20">
      <div className="flex justify-between items-center mb-10">
        <div className="flex items-center gap-4">
          <button
            onClick={onCancel}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors text-gray-500"
          >
            <ArrowLeft size={20} />
          </button>
          <div>
            <h2 className="text-2xl font-serif font-bold text-gray-900">
              Create Story
            </h2>
            <p className="text-xs text-gray-400 uppercase tracking-widest">
              Draft Mode
            </p>
          </div>
        </div>

        <div className="flex gap-3">
          <button
            onClick={handleSubmit}
            className="bg-black text-white px-6 py-2.5 rounded-full font-medium hover:bg-gray-800 transition-all flex items-center shadow-lg hover:shadow-xl hover:-translate-y-0.5"
          >
            <Send className="mr-2" size={16} />
            Publish
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Main Editor Column */}
        <div className="lg:col-span-8 space-y-8">
          <div className="bg-white">
            <form onSubmit={handleSubmit} className="space-y-8">
              <div>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) =>
                    setFormData({ ...formData, title: e.target.value })
                  }
                  className="w-full text-4xl md:text-5xl font-serif font-bold placeholder-gray-200 border-none focus:ring-0 p-0 leading-tight"
                  placeholder="Title..."
                />
              </div>
              <div>
                <textarea
                  rows={2}
                  value={formData.summary}
                  onChange={(e) =>
                    setFormData({ ...formData, summary: e.target.value })
                  }
                  className="w-full text-xl text-gray-500 placeholder-gray-200 border-none focus:ring-0 p-0 resize-none font-serif leading-relaxed"
                  placeholder="Subtitle or summary..."
                />
              </div>

              <div className="relative group">
                {formData.coverImage ? (
                  <div className="relative w-full aspect-video rounded-2xl overflow-hidden group">
                    <img
                      src={formData.coverImage}
                      className="w-full h-full object-cover"
                      alt="Cover"
                    />
                    <button
                      type="button"
                      onClick={() =>
                        setFormData({ ...formData, coverImage: "" })
                      }
                      className="absolute top-4 right-4 bg-white/90 p-2 rounded-full shadow-sm opacity-0 group-hover:opacity-100 transition-opacity hover:text-red-500"
                    >
                      <ImageIcon size={16} />
                    </button>
                  </div>
                ) : (
                  <div
                    className="w-full aspect-[3/1] bg-gray-50 border-2 border-dashed border-gray-100 rounded-2xl flex flex-col items-center justify-center text-gray-400 hover:border-gray-300 hover:bg-gray-100 transition-all cursor-pointer"
                    onClick={handleGenerateImage}
                  >
                    <ImageIcon size={32} className="mb-2 opacity-20" />
                    <span className="text-sm font-medium">Add Cover Image</span>
                  </div>
                )}
              </div>

              <div className="pt-8 border-t border-gray-100">
                <textarea
                  required
                  rows={20}
                  value={formData.content}
                  onChange={(e) =>
                    setFormData({ ...formData, content: e.target.value })
                  }
                  className="w-full font-serif text-lg leading-loose text-gray-800 placeholder-gray-200 border-none focus:ring-0 p-0 resize-none"
                  placeholder="Tell your story..."
                />
              </div>
            </form>
          </div>
        </div>

        {/* Sidebar Tools */}
        <div className="lg:col-span-4 space-y-6">
          {/* AI Generator */}
          <div className="bg-gradient-to-br from-gray-900 to-black text-white p-6 rounded-2xl shadow-2xl">
            <div className="flex items-center gap-2 mb-6 text-purple-300">
              <Sparkles size={18} />
              <span className="font-bold tracking-widest text-xs uppercase">
                AI Assistant
              </span>
            </div>

            <div className="space-y-4">
              <div>
                <label className="text-xs text-gray-400 mb-2 block">
                  Generate Content
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Topic (e.g. Modern Architecture)"
                    className="w-full bg-white/10 border-transparent text-white rounded-lg px-4 py-3 text-sm focus:ring-2 focus:ring-purple-500 outline-none placeholder-gray-500"
                    value={topic}
                    onChange={(e) => setTopic(e.target.value)}
                  />
                </div>
              </div>

              <button
                onClick={handleGenerate}
                disabled={!topic || isGenerating}
                className="w-full bg-purple-600 hover:bg-purple-700 disabled:opacity-50 text-white py-3 rounded-lg font-medium transition-all flex items-center justify-center text-sm shadow-lg shadow-purple-900/20"
              >
                {isGenerating ? (
                  <Loader2 className="animate-spin mr-2" size={16} />
                ) : (
                  "Auto-Draft Article"
                )}
              </button>

              <button
                onClick={handleGenerateImage}
                disabled={isGeneratingImage || !formData.title}
                className="w-full bg-white/10 hover:bg-white/20 text-white py-3 rounded-lg font-medium transition-all flex items-center justify-center text-sm"
              >
                {isGeneratingImage ? (
                  <Loader2 className="animate-spin mr-2" size={16} />
                ) : (
                  "Generate Cover Image"
                )}
              </button>
            </div>
          </div>

          {/* Metadata */}
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 space-y-6">
            <h3 className="font-bold text-gray-900 text-xs uppercase tracking-wider border-b border-gray-100 pb-4">
              Details
            </h3>

            <div>
              <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">
                Author
              </label>
              <input
                type="text"
                value={formData.author}
                onChange={(e) =>
                  setFormData({ ...formData, author: e.target.value })
                }
                className="w-full px-4 py-2 bg-gray-50 rounded-lg border border-transparent focus:bg-white focus:border-black focus:ring-0 outline-none transition-all text-sm font-medium"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">
                Tags
              </label>
              <input
                type="text"
                value={formData.tags?.join(", ")}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    tags: e.target.value.split(",").map((t) => t.trim()),
                  })
                }
                className="w-full px-4 py-2 bg-gray-50 rounded-lg border border-transparent focus:bg-white focus:border-black focus:ring-0 outline-none transition-all text-sm font-medium"
                placeholder="Tech, Design..."
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">
                Image URL
              </label>
              <input
                type="text"
                value={formData.coverImage}
                onChange={(e) =>
                  setFormData({ ...formData, coverImage: e.target.value })
                }
                className="w-full px-4 py-2 bg-gray-50 rounded-lg border border-transparent focus:bg-white focus:border-black focus:ring-0 outline-none transition-all text-sm text-gray-500 truncate"
                placeholder="https://..."
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
