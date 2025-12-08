import React from 'react';

interface MarkdownRendererProps {
  content: string;
}

export const MarkdownRenderer: React.FC<MarkdownRendererProps> = ({ content }) => {
  // Simple rendering logic. In a real Next.js app we'd use 'react-markdown'
  // But to ensure this runs without npm install dependencies, we use a basic parser approach
  // or simply inject into the styled markdown container.
  
  // Since we have a specific CSS class .markdown-body in index.html, 
  // we can parse simple things or just render text blocks.
  
  // For this demo, let's do a basic split and render to allow the CSS to do work,
  // but a safer bet for "Any Markdown" is usually a library. 
  // Given constraints, let's use a very lightweight manual render for key elements.
  
  const renderLine = (line: string, index: number) => {
    if (line.startsWith('# ')) return <h1 key={index}>{line.slice(2)}</h1>;
    if (line.startsWith('## ')) return <h2 key={index}>{line.slice(3)}</h2>;
    if (line.startsWith('### ')) return <h3 key={index}>{line.slice(4)}</h3>;
    if (line.startsWith('- ')) return <li key={index}>{line.slice(2)}</li>;
    if (line.trim() === '') return <div key={index} className="h-4" />;
    return <p key={index}>{line}</p>;
  };

  // However, `react-markdown` is standard. 
  // If we can't use it, we can fallback to a "dangerouslySetInnerHTML" if we trust the source (our AI).
  // Let's do a clean HTML conversion for the generated markdown.
  
  // Basic Converter
  const htmlContent = content
    .replace(/^### (.*$)/gim, '<h3>$1</h3>')
    .replace(/^## (.*$)/gim, '<h2>$1</h2>')
    .replace(/^# (.*$)/gim, '<h1>$1</h1>')
    .replace(/^\> (.*$)/gim, '<blockquote>$1</blockquote>')
    .replace(/\*\*(.*)\*\*/gim, '<strong>$1</strong>')
    .replace(/\*(.*)\*/gim, '<em>$1</em>')
    .replace(/!\[(.*?)\]\((.*?)\)/gim, "<img alt='$1' src='$2' />")
    .replace(/\[(.*?)\]\((.*?)\)/gim, "<a href='$2'>$1</a>")
    .replace(/\n/gim, '<br />');

  return (
    <div 
        className="markdown-body"
        dangerouslySetInnerHTML={{ __html: htmlContent }} 
    />
  );
};
