import React from 'react';
import { BlogPost } from '../types';
import { ArrowUpRight } from 'lucide-react';

interface PostCardProps {
  post: BlogPost;
  onClick: (id: string) => void;
  featured?: boolean;
}

export const PostCard: React.FC<PostCardProps> = ({ post, onClick, featured = false }) => {
  const date = new Date(post.createdAt).toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric'
  });

  if (featured) {
    return (
      <div 
        onClick={() => onClick(post.id)}
        className="group cursor-pointer relative w-full h-[600px] rounded-3xl overflow-hidden shadow-2xl transition-all duration-500 hover:shadow-3xl"
      >
        <div className="absolute inset-0 bg-gray-900">
          {post.coverImage && (
            <img 
              src={post.coverImage} 
              alt={post.title} 
              className="w-full h-full object-cover opacity-80 transition-transform duration-1000 group-hover:scale-105"
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />
        </div>

        <div className="absolute bottom-0 left-0 w-full p-8 md:p-16 text-white">
          <div className="max-w-3xl">
            <div className="flex items-center gap-3 mb-6">
              <span className="px-3 py-1 bg-white text-black text-[10px] font-bold uppercase tracking-widest rounded-full">
                Featured Story
              </span>
              <span className="text-sm font-medium text-white/70">{date}</span>
            </div>
            
            <h2 className="text-4xl md:text-6xl font-bold font-serif leading-none mb-6 group-hover:underline decoration-2 underline-offset-8">
              {post.title}
            </h2>
            
            <p className="text-lg md:text-xl text-gray-300 line-clamp-2 max-w-2xl font-light mb-8 leading-relaxed">
              {post.summary}
            </p>
            
            <div className="flex items-center text-sm font-bold tracking-widest uppercase">
              Read Article <ArrowUpRight className="ml-2 w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div 
      onClick={() => onClick(post.id)}
      className="group cursor-pointer flex flex-col gap-6"
    >
      <div className="relative aspect-[3/2] w-full overflow-hidden rounded-2xl bg-gray-100">
        {post.coverImage ? (
          <img 
            src={post.coverImage} 
            alt={post.title} 
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-300 bg-gray-50">
            <span className="text-xs uppercase tracking-widest">No Image</span>
          </div>
        )}
        <div className="absolute top-4 left-4 opacity-0 group-hover:opacity-100 transition-opacity">
            <span className="bg-white/90 backdrop-blur px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-gray-900 rounded-full shadow-sm">
                Read
            </span>
        </div>
      </div>
      
      <div className="flex flex-col gap-3">
        <div className="flex items-center text-xs font-bold text-gray-400 uppercase tracking-wider space-x-2">
          <span className="text-purple-600">{post.tags[0] || 'Story'}</span>
          <span>•</span>
          <span>{date}</span>
        </div>
        
        <h3 className="text-2xl font-bold text-gray-900 font-serif leading-tight group-hover:text-gray-600 transition-colors">
          {post.title}
        </h3>
        
        <p className="text-gray-500 text-sm leading-relaxed line-clamp-3">
          {post.summary}
        </p>

        <div className="flex items-center text-black text-xs font-bold uppercase tracking-widest mt-2 group-hover:translate-x-2 transition-transform">
          Read More <ArrowUpRight className="ml-1 w-3 h-3" />
        </div>
      </div>
    </div>
  );
};