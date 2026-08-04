import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Calendar, Clock, BookOpen, User, Tag } from 'lucide-react';

export default function BlogDetail() {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [scrollProgress, setScrollProgress] = useState(0);

  const defaultBlogs = [
    {
      _id: "m-blog-1",
      title: "Designing Highly Resilient Legal CRM Databases in MongoDB",
      summary: "An in-depth look at schema design, optimization rules, and indexing for highly structured workflow tools under massive query volume.",
      content: `MongoDB is often praised for its flexible, schemaless nature. However, when building critical workflow applications like the **Advocate Case Management System**, schema flexibility can become a liability if not properly managed. In legal CRMs, we need to track hearings, depositions, invoices, and multi-tenant access safely.

## The Core Strategy: Document Embedding vs. Referencing

When structuring legal data, we have two primary options:
1. **Embedding**: Placing child elements directly inside the parent document.
2. **Referencing**: Creating distinct documents and using MongoDB ObjectIds to link them.

For case logs that grow continuously, referencing is critical to prevent hitting MongoDB's 16MB document size limit.

### Indexing for Court Hearings

\`\`\`javascript
const CaseSchema = new mongoose.Schema({
  caseNumber: { type: String, unique: true, index: true },
  title: String,
  hearings: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Hearing' }],
  createdAt: Date
});
\`\`\`

By indexing the \`caseNumber\` and setting a compound index on \`advocateId\` and \`nextHearingDate\`, search speeds improved by **150%** during client testing.

## Summary

When crafting scalable SaaS workflow systems, your schemas should match your primary query paths. Plan indices early, leverage DB refs carefully, and secure every route via custom validation hooks!`,
      category: "SaaS Systems",
      tags: ["MongoDB", "Database Design", "SaaS Architectures"],
      readingTime: "5 min",
      author: "Deepankar Dayal",
      createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000)
    },
    {
      _id: "m-blog-2",
      title: "Building Reliable Headless Web Automation with Puppeteer",
      summary: "How I optimized an AI automation registering engine to operate smoothly under strict government form validations.",
      content: `Automating form submissions on government portals is notoriously difficult. Legacy designs, custom JavaScript blockages, and inconsistent page loads can cause standard headless browser scripts to fail repeatedly.

## Solving Timeout Issues

The standard Puppeteer \`page.click()\` command is prone to breaking if standard scripts trigger loading blocks. To make the **Government Exam Auto Registration System** resilient, we built an event-waiting abstraction:

\`\`\`javascript
async function smartClick(page, selector) {
  await page.waitForSelector(selector, { visible: true });
  await Promise.all([
    page.click(selector),
    page.waitForNavigation({ waitUntil: 'networkidle0' }).catch(() => {})
  ]);
}
\`\`\`

This wait pattern guarantees that subsequent form fields won't fail because the preceding script hasn't completed loading.

## Conclusion

Automating web portals isn't just about scripting inputs. It requires anticipating unpredictable network patterns and building custom, fail-safe waiting routines.`,
      category: "AI & Automation",
      tags: ["Puppeteer", "Node.js", "AI Automation"],
      readingTime: "4 min",
      author: "Deepankar Dayal",
      createdAt: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000)
    }
  ];

  // Track viewport reading scroll progress percentage
  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      if (totalScroll > 0) {
        const scrolled = (window.scrollY / totalScroll) * 100;
        setScrollProgress(scrolled);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const fetchBlogDetails = async () => {
      try {
        const response = await fetch(`/api/blogs/${id}`);
        const json = await response.json();
        if (json.success && json.data) {
          setBlog(json.data);
        } else {
          const match = defaultBlogs.find(b => b._id === id);
          setBlog(match || defaultBlogs[0]);
        }
      } catch (err) {
        const match = defaultBlogs.find(b => b._id === id);
        setBlog(match || defaultBlogs[0]);
      } finally {
        setLoading(false);
      }
    };
    fetchBlogDetails();
  }, [id]);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
  };

  // Quick helper to render simple markdown blocks beautifully
  const renderContent = (markdownText) => {
    if (!markdownText) return '';
    
    // Split into paragraphs / lines
    const lines = markdownText.split('\n');
    let codeBlockActive = false;
    let codeContent = [];

    return lines.map((line, idx) => {
      // Toggle Code Blocks
      if (line.trim().startsWith('```')) {
        if (codeBlockActive) {
          codeBlockActive = false;
          const finishedBlock = codeContent.join('\n');
          codeContent = [];
          return (
            <pre key={idx} className="bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-4 rounded-xl overflow-x-auto font-mono text-xs text-slate-800 dark:text-cyan-400 my-4 text-left select-text">
              <code>{finishedBlock}</code>
            </pre>
          );
        } else {
          codeBlockActive = true;
          return null;
        }
      }

      if (codeBlockActive) {
        codeContent.push(line);
        return null;
      }

      // H2 Headings
      if (line.startsWith('## ')) {
        return (
          <h3 key={idx} className="text-xl sm:text-2xl font-display font-bold dark:text-white mt-8 mb-4 text-left">
            {line.replace('## ', '')}
          </h3>
        );
      }

      // H3 Headings
      if (line.startsWith('### ')) {
        return (
          <h4 key={idx} className="text-lg font-display font-bold dark:text-white mt-6 mb-3 text-left">
            {line.replace('### ', '')}
          </h4>
        );
      }

      // Bold lists items
      if (line.startsWith('- ')) {
        const cleaned = line.replace('- ', '');
        return (
          <li key={idx} className="list-disc pl-4 text-sm text-slate-600 dark:text-slate-300 leading-relaxed text-left">
            {cleaned}
          </li>
        );
      }

      // Paragraphs
      if (line.trim() === '') return <div key={idx} className="h-3"></div>;

      return (
        <p key={idx} className="text-sm sm:text-base leading-relaxed text-slate-600 dark:text-slate-300 font-sans my-4 text-left select-text">
          {line}
        </p>
      );
    });
  };

  return (
    <div className="py-4 max-w-3xl mx-auto space-y-8 relative">
      
      {/* 1. Viewport Scroll Indicator */}
      <div 
        className="fixed top-0 left-0 h-1 bg-gradient-to-r from-cyan-400 to-purple-600 z-[999] transition-all duration-75"
        style={{ width: `${scrollProgress}%` }}
      />

      {/* 2. Nav Header back button */}
      <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-4">
        <Link 
          to="/blog" 
          className="text-xs font-semibold text-slate-500 hover:text-cyan-500 flex items-center gap-1 transition-colors cursor-pointer"
        >
          <ArrowLeft size={14} /> Back to engineering logs
        </Link>
        <span className="text-[10px] font-mono text-slate-400">ENGINEERING LOG DIAL</span>
      </div>

      {loading ? (
        <div className="text-center py-20 text-slate-500 font-mono text-sm animate-pulse">De-compressing article logs...</div>
      ) : !blog ? (
        <div className="text-center py-20 text-red-500">Failed to render article file.</div>
      ) : (
        <article className="space-y-6">
          
          {/* Header Metadata */}
          <div className="space-y-4 text-left">
            <span className="text-[10px] uppercase font-mono font-bold tracking-widest text-cyan-600 dark:text-cyan-400 bg-cyan-500/10 px-2.5 py-1 rounded">
              {blog.category}
            </span>
            <h2 className="font-display font-extrabold text-2xl sm:text-4xl dark:text-white leading-snug">
              {blog.title}
            </h2>
            <div className="flex flex-wrap gap-4 text-xs font-mono text-slate-400 dark:text-slate-500 pt-2">
              <span className="flex items-center gap-1"><User size={13} /> By {blog.author}</span>
              <span className="flex items-center gap-1"><Calendar size={13} /> {formatDate(blog.createdAt)}</span>
              <span className="flex items-center gap-1"><Clock size={13} /> {blog.readingTime} Reading</span>
            </div>
          </div>

          {/* Intro Summary card */}
          <div className="p-5 rounded-2xl bg-slate-100 dark:bg-slate-900/30 border border-slate-200 dark:border-slate-800/60 text-left font-sans italic text-sm text-slate-500 dark:text-slate-400">
            {blog.summary}
          </div>

          {/* Render parsed article paragraphs */}
          <div className="pt-4 space-y-4">
            {renderContent(blog.content)}
          </div>

          {/* Footer tags */}
          <div className="flex flex-wrap items-center gap-2 pt-10 border-t border-slate-200 dark:border-slate-800/80 mt-12 text-left">
            <Tag size={13} className="text-slate-400" />
            {blog.tags && blog.tags.map((tag, idx) => (
              <span key={idx} className="text-xs font-mono px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 dark:text-slate-300">
                #{tag}
              </span>
            ))}
          </div>

        </article>
      )}

    </div>
  );
}
