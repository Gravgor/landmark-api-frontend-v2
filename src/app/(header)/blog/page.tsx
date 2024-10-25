//@ts-nocheck
"use client"

import React, { useState } from 'react';
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { 
  ThumbsUp, 
  MessageSquare, 
  Share2, 
  Code, 
  Terminal, 
  Copy, 
  Search,
  Book,
  Video,
  FileText,
  Bookmark,
  ChevronLeft,
  Eye
} from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { atomDark } from 'react-syntax-highlighter/dist/cjs/styles/prism';

const CustomCodeBlock = ({ language, code }) => {
    const [copied, setCopied] = useState(false);
    
    const copyCode = () => {
      navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    };
    
    return (
      <div className="relative mt-6 mb-6">
        <div className="flex justify-between items-center mb-2 bg-gray-800 rounded-t-lg px-4 py-2">
          <div className="flex items-center gap-2">
            <Terminal className="w-4 h-4 text-blue-400" />
            <span className="text-sm text-blue-400">{language}</span>
          </div>
          <Button
            size="sm"
            variant="ghost"
            className="text-gray-400 hover:text-blue-400"
            onClick={copyCode}
          >
            {copied ? 'Copied!' : <Copy className="w-4 h-4" />}
          </Button>
        </div>
        <SyntaxHighlighter
          language={language}
          style={atomDark}
          customStyle={{
            margin: 0,
            borderTopLeftRadius: 0,
            borderTopRightRadius: 0,
            borderBottomLeftRadius: '0.5rem',
            borderBottomRightRadius: '0.5rem',
          }}
        >
          {code}
        </SyntaxHighlighter>
      </div>
    );
  };

const PostContent = ({ isFullPost, isExpanded, content }) => {
    return (
      <div className="prose prose-invert prose-pre:p-0 prose-pre:bg-transparent prose-pre:overflow-hidden max-w-none">
        <ReactMarkdown
          components={{
            h1: ({ children }) => (
              <h1 className="text-3xl font-bold text-white mt-8 mb-4">{children}</h1>
            ),
            h2: ({ children }) => (
              <h2 className="text-2xl font-bold text-white mt-6 mb-3">{children}</h2>
            ),
            h3: ({ children }) => (
              <h3 className="text-xl font-bold text-white mt-5 mb-2">{children}</h3>
            ),
            p: ({ children }) => (
              <p className="text-gray-300 leading-relaxed mb-4">{children}</p>
            ),
            ul: ({ children }) => (
              <ul className="list-disc list-inside space-y-2 mb-4 text-gray-300">{children}</ul>
            ),
            ol: ({ children }) => (
              <ol className="list-decimal list-inside space-y-2 mb-4 text-gray-300">{children}</ol>
            ),
            li: ({ children }) => (
              <li className="text-gray-300">{children}</li>
            ),
            blockquote: ({ children }) => (
              <blockquote className="border-l-4 border-blue-500 pl-4 italic my-4 text-gray-400">
                {children}
              </blockquote>
            ),
            code: ({ inline, className, children }) => {
              const match = /language-(\w+)/.exec(className || '');
              const language = match ? match[1] : 'text';
              
              if (inline) {
                return (
                  <code className="bg-gray-800 text-blue-300 px-1.5 py-0.5 rounded text-sm">
                    {children}
                  </code>
                );
              }
              
              return (
                <CustomCodeBlock 
                  language={language} 
                  code={String(children).replace(/\n$/, '')} 
                />
              );
            },
            table: ({ children }) => (
              <div className="overflow-x-auto mb-4">
                <table className="min-w-full border border-gray-700 text-gray-300">
                  {children}
                </table>
              </div>
            ),
            th: ({ children }) => (
              <th className="bg-gray-800 px-4 py-2 border-b border-gray-700 font-semibold">
                {children}
              </th>
            ),
            td: ({ children }) => (
              <td className="px-4 py-2 border-b border-gray-700">{children}</td>
            ),
            a: ({ children, href }) => (
              <a 
                href={href} 
                className="text-blue-400 hover:text-blue-300 underline"
                target="_blank" 
                rel="noopener noreferrer"
              >
                {children}
              </a>
            ),
            hr: () => (
              <hr className="border-gray-700 my-6" />
            ),
          }}
        >
          {content}
        </ReactMarkdown>
      </div>
    );
  };

const BlogPost = ({ post, isFullPost = false, onReadMore }) => {
  const [isExpanded, setIsExpanded] = useState(isFullPost);
  const [likes, setLikes] = useState(post.likes);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [views, setViews] = useState(post.views);
  
  const handleShare = async () => {
    try {
      await navigator.share({
        title: post.title,
        text: post.description,
        url: window.location.href,
      });
    } catch (err) {
      console.log('Error sharing:', err);
    }
  };

  return (
    <Card className="mb-6 bg-gray-900 border-gray-800 group hover:border-blue-500/50 transition-all">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            {post.type === 'tutorial' && <Book className="w-5 h-5 text-green-400" />}
            {post.type === 'video' && <Video className="w-5 h-5 text-red-400" />}
            {post.type === 'documentation' && <FileText className="w-5 h-5 text-blue-400" />}
            <h2 className="text-2xl font-bold text-blue-400">{post.title}</h2>
            {post.isNew && (
              <Badge variant="default" className="bg-green-500/20 text-green-300 mr-2">
                NEW
              </Badge>
            )}
          </div>
          <span className="text-sm text-gray-400">{post.date}</span>
        </div>
        <div className="flex flex-wrap gap-2 mt-2">
          {post.tags.map((tag) => (
            <Badge 
              key={tag}
              variant="outline" 
              className="bg-blue-500/10 border-blue-500/20 text-blue-300"
            >
              {tag}
            </Badge>
          ))}
        </div>
        <div className="flex gap-4 text-sm text-gray-400">
          <span className="flex items-center gap-1">
            <Eye className="w-4 h-4" /> {views} views
          </span>
        </div>
      </CardHeader>
      <CardContent>
        <div className={`prose prose-invert max-w-none ${!isExpanded && !isFullPost && 'line-clamp-3'}`}>
          <p className="text-white">{post.description}</p>
          {(isExpanded || isFullPost) && (
            <>
              <PostContent content={post.content} />
              {post.codeExample && (
                <CustomCodeBlock code={post.codeExample} language={post.codeLanguage} />
              )}
            </>
          )}
        </div>
        <div className="mt-4 flex justify-between items-center">
          {!isFullPost && (
            <Button 
              variant="ghost" 
              className="text-blue-400 hover:text-blue-300 hover:bg-blue-500/10"
              onClick={() => onReadMore(post.id)}
            >
              Read full post
            </Button>
          )}
          <div className="flex space-x-2">
            <Button 
              size="sm" 
              variant="ghost" 
              className="text-gray-400 hover:text-green-400"
              onClick={handleShare}
            >
              <Share2 className="w-4 h-4" />
            </Button>
            <Button
              size="sm"
              variant="ghost"
              className={`${isBookmarked ? 'text-yellow-400' : 'text-gray-400'} hover:text-yellow-400`}
              onClick={() => setIsBookmarked(!isBookmarked)}
            >
              <Bookmark className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

const FilterBar = ({ onFilterChange, onSearch }) => {
  return (
    <div className="mb-6 space-y-4">
      <div className="relative">
        <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
        <Input 
          placeholder="Search posts..." 
          className="pl-10 bg-gray-800 border-gray-700 text-white"
          onChange={(e) => onSearch(e.target.value)}
        />
      </div>
      <div className="flex gap-2 overflow-x-auto pb-2">
        <Button 
          size="sm"
          variant="outline" 
          className="bg-blue-500/10 border-blue-500/20 text-blue-400 hover:bg-blue-500/20"
          onClick={() => onFilterChange('all')}
        >
          All Posts
        </Button>
        <Button 
          size="sm"
          variant="outline" 
          className="bg-green-500/10 border-green-500/20 text-green-400 hover:bg-green-500/20"
          onClick={() => onFilterChange('tutorial')}
        >
          Tutorials
        </Button>
        <Button 
          size="sm"
          variant="outline" 
          className="bg-red-500/10 border-red-500/20 text-red-400 hover:bg-red-500/20"
          onClick={() => onFilterChange('video')}
        >
          Video Content
        </Button>
        <Button 
          size="sm"
          variant="outline" 
          className="bg-purple-500/10 border-purple-500/20 text-purple-400 hover:bg-purple-500/20"
          onClick={() => onFilterChange('documentation')}
        >
          Documentation
        </Button>
      </div>
    </div>
  );
};

const Blog = () => {
  const [currentPage, setCurrentPage] = useState('list');
  const [selectedPost, setSelectedPost] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState('all');

  const posts = [
    {
      id: 1,
      title: "Landmark API Alpha v1.0 Launch - A New Era of Real-Time Landmark Data",
        date: "October 26, 2024",
        type: "announcement",
        tags: ["Release", "API", "Alpha", "Landmarks"],
        isNew: true,
        comments: 15,
        likes: 55,
        views: 1624,
        description: "The official release of Landmark API Alpha v1.0 - Built to redefine how developers and travel platforms interact with landmark data.",
      content: `
  We’re thrilled to announce the official launch of **Landmark API Alpha v1.0**! As the founder and CEO, I'm excited to introduce this platform built with developers, travelers, and tourism businesses in mind. Our mission is to provide access to real-time, detailed landmark data to power the next generation of travel, AR, and location-based apps.
      
  ### 🚀 What’s Inside Landmark API Alpha v1.0?
 Our Alpha release lays the groundwork for an API that will evolve to include every data point and feature that travel tech and location-based applications need. Here’s a breakdown of the core features available in this first release:
      
  ### 1. **Single API Key Authentication**
  - Say goodbye to complex setups. With Alpha v1.0, authentication is straightforward: each user has one API key for secure access, simplifying onboarding.
      
   ### 2. **Real-Time Landmark Data**
- Access live updates on landmarks worldwide. Developers can pull data on current visitor count, live weather, and transportation details nearby. Real-time data allows for dynamic experiences, whether you’re building a travel guide, AR app, or real-time dashboard.
      
  ### 3. **Enhanced Caching with Redis**
- We've optimized our caching to improve response times and reduce redundant requests, maximizing efficiency. Redis-powered caching means faster access to high-demand landmarks and optimal usage of rate limits, especially for high-traffic applications.
      
### 4. **AWS S3 Image Integration**
 - Multiple images per landmark are now available, stored seamlessly in AWS S3. This allows developers to bring richer visual content to their users.
      
      
## 🛠️ Developer-Centric Roadmap
      
**Our roadmap is built with developers in mind, and here’s what you can expect next:**
      
1. **Booking Integration**:
        - By Beta v1.0, we plan to connect our API with flight, hotel, and ticket booking services, allowing seamless booking capabilities for landmarks directly through our API.
      
2. **Expanded Real-Time Features**:
         - More real-time data like visitor demographics, crowd density predictions, and event schedules. We're working to give you deeper insights into landmark activity in real-time.
      
      
3. **GraphQL Support**:
         - Query precisely what you need. A GraphQL endpoint is on the horizon, allowing more flexibility and customization for developers.
      
4. **Enhanced Developer Tools and SDKs**:
     - Language-specific SDKs, detailed documentation, and examples for common use cases to make integration seamless.
      
      ---
      
      ## 🌐 Why Landmark API? A Message from the CEO
      
      Hello! I'm **Marceli Borowczak**, founder and CEO of Landmark API. Building this API has been both a technical and personal journey. Having spent years as a developer myself, I know the frustration of working with fragmented, outdated data sources. With Landmark API, my team and I aim to make landmark data accessible, real-time, and reliable. We envision a future where this API powers AR experiences, next-gen travel guides, and even live-streamed landmark events.
      
      As we launch this Alpha, we’re committed to an open, developer-first approach. Your feedback will directly shape future versions.
      
      ---
      
      ## ⚠️ Challenges We Faced
      
      Building the Landmark API Alpha wasn’t without its hurdles. Here’s a look at some of the challenges we encountered:
      
      1. **Real-Time Data Scaling**:
         - Handling live data streams from multiple sources and maintaining low-latency updates across our API was a major technical challenge. Our solution involved Redis caching, optimized connection pooling, and advanced rate-limiting to ensure consistent performance.
      
      2. **Data Consistency and Reliability**:
         - Integrating multiple data sources (weather, crowd metrics, transportation) meant that we had to develop strong validation and error-handling mechanisms to ensure data accuracy. Our Alpha release is a result of countless hours of testing and data validation.
      
      3. **Storage Optimization**:
         - Storing images and multimedia content for thousands of landmarks required robust infrastructure planning. AWS S3 integration allowed us to scale with confidence while ensuring high-speed access to landmark images.
      
      4. **Feedback Integration**:
         - We’re launching Alpha with a built-in feedback system to hear directly from our developer community. Your feedback will help us identify pain points and prioritize new features.
      
      ---
      
      
      ## 🌍 Commitment to Environmental Responsibility
      
      We’re also committed to minimizing the environmental footprint of our API. By implementing efficient caching, data optimization, and choosing eco-friendly infrastructure solutions, we aim to make Landmark API both powerful and sustainable.
      
      
      
      ## ❓ FAQs
      
      **Q: Who is Landmark API for?**
         - Landmark API is designed for developers building travel, tourism, AR, and location-based applications. It’s also valuable for businesses needing real-time landmark data for analytics and decision-making.
      
      **Q: How do I start?**
         - Sign up at [landmark-api.com](https://landmark-api.com), generate your API key, and start building with our comprehensive documentation and code examples.
      
      **Q: What feedback do you need?**
         - We’re looking for feedback on performance, data accuracy, and feature requests. Our goal is to create an API that meets the real-world needs of developers and end-users.
      
      **Q: Is Landmark API Alpha free?**
         - Yes, our Alpha is free for developers who sign up now. Pricing tiers will be introduced in later versions, with Pro and Enterprise plans for higher limits and additional features.
      
      ---
      
      ## Join the Community
      
      Connect with us on [Twitter](https://twitter.com/landmarkapi), share your feedback in our [Slack channel](https://landmark-api.com/slack), or shoot us an email. Let’s build the future of travel tech together.
      
      To get started, visit [landmark-api.com](https://landmark-api.com) and explore the possibilities with **Landmark API Alpha v1.0**.
      
      Happy coding, and thank you for being part of our journey!
      
      `
    },
      
  ];

  const filteredPosts = posts
  .filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        post.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filter === 'all' || post.type === filter;
    return matchesSearch && matchesFilter;
  });

const handleReadMore = (postId) => {
  const post = posts.find(p => p.id === postId);
  setSelectedPost(post);
  setCurrentPage('post');
};

const handleBack = () => {
  setCurrentPage('list');
  setSelectedPost(null);
};

if (currentPage === 'post' && selectedPost) {
  return (
    <div className="min-h-screen bg-gray-950 p-6">
      <div className="max-w-4xl mx-auto">
        <Button
          variant="ghost"
          className="mb-4 text-gray-400 hover:text-white"
          onClick={handleBack}
        >
          <ChevronLeft className="w-4 h-4 mr-2" />
          Back to Posts
        </Button>
        <BlogPost post={selectedPost} isFullPost={true} />
        
        <div className="mt-8">
          <h3 className="text-xl font-bold text-white mb-4">Related Posts</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {posts
              .filter(post => 
                post.id !== selectedPost.id && 
                post.tags.some(tag => selectedPost.tags.includes(tag))
              )
              .slice(0, 2)
              .map(post => (
                <Card key={post.id} className="bg-gray-900 border-gray-800">
                  <CardHeader>
                    <h4 className="text-lg font-bold text-blue-400">{post.title}</h4>
                    <div className="flex gap-2 mt-2">
                      {post.tags.slice(0, 2).map(tag => (
                        <Badge 
                          key={tag}
                          variant="outline" 
                          className="bg-blue-500/10 border-blue-500/20 text-blue-300"
                        >
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-400 line-clamp-2">{post.description}</p>
                    <Button
                      variant="ghost"
                      className="mt-4 text-blue-400 hover:text-blue-300"
                      onClick={() => handleReadMore(post.id)}
                    >
                      Read more
                    </Button>
                  </CardContent>
                </Card>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}

return (
  <div className="min-h-screen bg-gray-950 p-6">
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold mb-2">
          <span className="text-blue-400">Landmark API</span>{' '}
          <span className="text-white">Dev Blog</span>
        </h1>
        <p className="text-gray-400 mb-4">
          Technical updates, tutorials, and best practices for the Landmark API
        </p>
        <div className="flex justify-center gap-4">
          <Button 
            variant="outline" 
            className="bg-blue-500/10 border-blue-500/20 text-blue-400 hover:bg-blue-500/20"
          >
            <Code className="w-4 h-4 mr-2" />
            API Reference
          </Button>
          <Button 
            variant="outline" 
            className="bg-purple-500/10 border-purple-500/20 text-purple-400 hover:bg-purple-500/20"
          >
            <Terminal className="w-4 h-4 mr-2" />
            Quick Start
          </Button>
          <Button 
            variant="outline" 
            className="bg-green-500/10 border-green-500/20 text-green-400 hover:bg-green-500/20"
          >
            <Book className="w-4 h-4 mr-2" />
            Documentation
          </Button>
        </div>
      </div>

      <FilterBar 
        onFilterChange={setFilter}
        onSearch={setSearchTerm}
      />

      <ScrollArea className="h-[800px] pr-4">
        {filteredPosts.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-400">No posts found matching your criteria.</p>
          </div>
        ) : (
          filteredPosts.map(post => (
            <BlogPost 
              key={post.id} 
              post={post} 
              onReadMore={handleReadMore}
            />
          ))
        )}
      </ScrollArea>
    </div>
  </div>
);
};

export default Blog;