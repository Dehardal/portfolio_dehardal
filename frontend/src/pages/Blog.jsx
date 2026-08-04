import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Search, Calendar, Clock, BookOpen, ChevronRight } from 'lucide-react';

export default function Blog() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');

  const defaultBlogs = [
    {
      _id: "m-blog-1",
      title: "Designing Highly Resilient Legal CRM Databases in MongoDB",
      summary: "An in-depth look at schema design, optimization rules, and indexing for highly structured workflow tools under massive query volume.",
      category: "SaaS Systems",
      tags: ["MongoDB", "Database Design", "SaaS Architectures"],
      readingTime: "5 min",
      createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000)
    },
    {
      _id: "m-blog-2",
      title: "Building Reliable Headless Web Automation with Puppeteer",
      summary: "How I optimized an AI automation registering engine to operate smoothly under strict government form validations.",
      category: "AI & Automation",
      tags: ["Puppeteer", "Node.js", "AI Automation"],
      readingTime: "4 min",
      createdAt: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000)
    }
  ];

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await fetch('/api/blogs');
        const json = await response.json();
        if (json.success && json.data && json.data.length > 0) {
          setBlogs(json.data);
        } else {
          setBlogs(defaultBlogs);
        }
      } catch (err) {
        setBlogs(defaultBlogs);
      } finally {
        setLoading(false);
      }
    };
    fetchBlogs();
  }, []);

  const categories = ['All', 'SaaS Systems', 'AI & Automation', 'Database Design', 'Workflow Solutions'];

  const filteredBlogs = blogs.filter(b => {
    const matchesSearch = b.title.toLowerCase().includes(search.toLowerCase()) || 
                          b.summary.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = activeCategory === 'All' || b.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
  };

  return (
    <div className="space-y-12 py-4">
      {/* Header Details */}
      <div className="max-w-3xl space-y-4">
        <h2 className="font-display font-extrabold text-3xl sm:text-4xl bg-gradient-to-r from-slate-900 to-slate-900 dark:from-white dark:to-cyan-400 bg-clip-text text-transparent">
          The Engineering Log
        </h2>
        <p className="text-slate-600 dark:text-slate-300 leading-relaxed font-sans text-base">
          Articles on database design, headless automation scripts, smart contract smart hooks, and the product engineering behind workflow SaaS.
        </p>
      </div>

      {/* Operations Bar */}
      <div className="flex flex-col md:flex-row gap-4 items-stretch md:items-center justify-between pb-6 border-b border-slate-200 dark:border-slate-800">
        
        {/* Search */}
        <div className="relative flex-grow max-w-md">
          <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search articles..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-11 pr-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800/80 bg-slate-100/50 dark:bg-slate-900/30 dark:text-white focus:outline-none focus:border-cyan-400 text-sm transition-colors"
          />
        </div>

        {/* Categories filters */}
        <div className="flex flex-wrap items-center gap-1.5">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold uppercase tracking-wider transition-colors ${
                activeCategory === cat
                  ? 'bg-cyan-500/10 text-cyan-500 border border-cyan-500/20'
                  : 'text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-white'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Blogs list showcase */}
      {loading ? (
        <div className="text-center py-20 text-slate-500 font-mono text-sm animate-pulse">Retrieving articles catalog...</div>
      ) : filteredBlogs.length === 0 ? (
        <div className="text-center py-20 text-slate-400 text-sm font-mono glassmorphism rounded-2xl p-8 border border-dashed border-slate-200 dark:border-slate-800">
          No articles matching criteria discovered.
        </div>
      ) : (
        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {filteredBlogs.map((post) => (
            <Link 
              key={post._id}
              to={`/blog/${post._id}`}
              className="glassmorphism rounded-2xl border border-slate-200 dark:border-slate-800/80 p-6 flex flex-col justify-between shadow-sm hover:border-cyan-400 dark:hover:border-cyan-400/40 hover:scale-[1.005] transition-all group text-left"
            >
              <div className="space-y-4">
                {/* Meta details */}
                <div className="flex items-center justify-between text-[11px] font-mono font-medium text-slate-400 dark:text-slate-500">
                  <span className="uppercase text-cyan-600 dark:text-cyan-400 font-bold">{post.category}</span>
                  <div className="flex items-center gap-3">
                    <span className="flex items-center gap-1"><Calendar size={11} /> {formatDate(post.createdAt)}</span>
                    <span className="flex items-center gap-1"><Clock size={11} /> {post.readingTime}</span>
                  </div>
                </div>

                {/* Info titles */}
                <div className="space-y-2">
                  <h3 className="font-display font-bold text-lg dark:text-white group-hover:text-cyan-400 transition-colors leading-snug">
                    {post.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 leading-relaxed font-sans line-clamp-3">
                    {post.summary}
                  </p>
                </div>
              </div>

              {/* Dynamic reading buttons */}
              <div className="flex items-center justify-between mt-6 pt-4 border-t border-slate-200 dark:border-slate-800/60 text-xs font-semibold text-cyan-600 dark:text-cyan-400">
                <div className="flex flex-wrap gap-1">
                  {post.tags && post.tags.slice(0, 2).map((tag, idx) => (
                    <span key={idx} className="text-[9px] font-mono px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-900/65 border border-slate-200 dark:border-slate-800/50">
                      #{tag}
                    </span>
                  ))}
                </div>
                
                <span className="flex items-center gap-0.5 hover:translate-x-0.5 transition-transform">
                  Read Article <ChevronRight size={13} />
                </span>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
