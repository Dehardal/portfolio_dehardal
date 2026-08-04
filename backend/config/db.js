const mongoose = require('mongoose');

let isMockMode = false;
let mockDb = {
  projects: [],
  blogs: [],
  skills: [],
  admins: []
};

// Seed initial projects to ensure mock database starts with rich visual content
const seedMockData = () => {
  mockDb.projects = [
    {
      _id: "m-proj-1",
      title: "ARTHUB",
      description: "Blockchain Enabled ODOP Platform with Improved Supply Chain System",
      problem: "Traditional artisan clusters suffer from lack of supply chain transparency, leading to massive margins taken by middlemen and difficulties in identifying authentic One District One Product (ODOP) goods.",
      solution: "Implemented a blockchain-based product authentication tracking ledger combined with a MERN e-commerce layout. This transparent supply chain lets users trace handicrafts directly to regional artisans.",
      features: "Blockchain verification ledger, Smart contract verification, Real-time tracking interface, Multi-role dashboard.",
      architecture: "React frontend communicating with Express backend, Web3 provider integration, IPFS storage nodes, MongoDB cluster.",
      techStack: ["React", "Express", "Node.js", "MongoDB", "Blockchain", "Solidity", "Tailwind CSS"],
      status: "Completed",
      domain: "Blockchain",
      githubUrl: "https://github.com/deepankardayal/arthub",
      liveUrl: "https://arthub-odop.example.com",
      futureScope: "Integration of native tokens for regional artisan rewards and automated smart contracts for instant escrow payouts.",
      createdAt: new Date()
    },
    {
      _id: "m-proj-2",
      title: "Government Exam Auto Registration System",
      description: "AI-assisted government exam workflow and application automation",
      problem: "Aspirants have to fill complicated forms on sluggish government websites repeatedly. Manual text entry errors frequently lead to application rejection.",
      solution: "Developed an OCR and AI-assisted automation profile that securely processes candidate documents once, then uses headless browser protocols to auto-submit fields to official government portals with 99.8% field accuracy.",
      features: "Intelligent document OCR, Auto-fill automation, Error-proofing pre-checks, Bulk registration dispatch.",
      architecture: "Node.js server executing form scripts, React status dashboard, OCR server integrations.",
      techStack: ["Node.js", "Express", "React", "AI", "Puppeteer", "OCR"],
      status: "In Progress",
      domain: "AI & Automation",
      githubUrl: "https://github.com/deepankardayal/exam-autoreg",
      liveUrl: "",
      futureScope: "Expansion to secure face-matching confirmation to verify candidate registration identity in line with government standards.",
      createdAt: new Date()
    },
    {
      _id: "m-proj-3",
      title: "Cyber Cafe QR Printing Platform",
      description: "QR-based SaaS print management and billing system",
      problem: "Customers at cyber cafes struggle with transferring documents (using pendrives or WhatsApp) and cafe owners face payment leakage for printed files.",
      solution: "Created a touchless printer integration. Customers scan a unique QR code on the cafe wall, upload their files, make UPI payments, and the system triggers the printer automatically, ensuring secure direct checkout.",
      features: "QR terminal generation, Secure instant upload, Automated print queue server, UPI Webhook billing.",
      architecture: "Express server integrated with local print spoolers, React client client portal, secure payment webhooks.",
      techStack: ["React", "Node.js", "Express", "MongoDB", "QR API", "SaaS Workflow"],
      status: "Completed",
      domain: "SaaS Systems",
      githubUrl: "https://github.com/deepankardayal/qr-print-cafe",
      liveUrl: "https://qrprint.example.com",
      futureScope: "Adding a dynamic document editor in-browser before checkout and supporting multiple cyber cafe franchise dashboard integrations.",
      createdAt: new Date()
    },
    {
      _id: "m-proj-4",
      title: "Advocate Case Management System",
      description: "Legal workflow and client management platform for advocates",
      problem: "Law firms struggle with paper-bound court hearing schedules, client case documentation, and billing tracking.",
      solution: "Developed a MERN SaaS CRM custom-built for lawyers to track hearings, store securely encrypted depositions, issue automated SMS court warnings, and handle billing ledgers.",
      features: "Hearings scheduling board, OCR document parser, Automated notification reminders, Client payment ledger.",
      architecture: "Secure JWT express routing, React state management dashboard, MongoDB schema optimization for relational case queries.",
      techStack: ["React", "Express", "Node.js", "MongoDB", "Tailwind CSS", "JWT"],
      status: "Completed",
      domain: "SaaS Systems",
      githubUrl: "https://github.com/deepankardayal/vakil-system",
      liveUrl: "",
      futureScope: "Integrating legal AI summarizers to digest long PDFs and automatically generate short case outlines for judges.",
      createdAt: new Date()
    },
    {
      _id: "m-proj-5",
      title: "Pequire Ecosystem",
      description: "AI-powered home appliance service and repair ecosystem",
      problem: "Getting home appliances serviced is fragmented, expensive, and insecure due to unreliable local repair agents.",
      solution: "Developed a smart unified services platform connecting home owners with certified repair service technicians. Incorporates AI auto-matching, real-time tracking, and automated service guarantee certifications.",
      features: "Technician match-algorithm, Interactive map tracking, MERN backend workflow, Automated appliance diagnostic database.",
      architecture: "Redux-fueled React dashboards, Node backend controller, technician status polling, MongoDB queries.",
      techStack: ["React", "Node.js", "Express", "MongoDB", "AI Matching", "Tailwind CSS"],
      status: "Research",
      domain: "AI & Automation",
      githubUrl: "https://github.com/deepankardayal/pequire-app",
      liveUrl: "",
      futureScope: "IoT integration to auto-detect device errors and book repair workers before the homeowner even notices the issue.",
      createdAt: new Date()
    },
    {
      _id: "m-proj-6",
      title: "Prits IT Solutions Website",
      description: "Professional corporate IT services website",
      problem: "Prits IT Solutions needed an optimized, high-fidelity platform to showcase services, handle corporate inquiries, and showcase real-client projects.",
      solution: "Engineered a rapid modern showcase using clean structures, fluid CSS animations, fully optimized contact forms, and custom content administration systems.",
      features: "Dynamic portfolio showcase, SEO scoring parameters, Interactive inquiries board, Analytics panels.",
      architecture: "Single-page React bundle, minimal high-speed Node routing, dynamic schema listings.",
      techStack: ["React", "Node.js", "Express", "MongoDB", "Tailwind CSS", "SEO Tuning"],
      status: "Completed",
      domain: "Web Development",
      githubUrl: "https://github.com/deepankardayal/prits-corporate",
      liveUrl: "https://prits.example.com",
      futureScope: "Adding a customer live-chat support hub running fully client-side using WebSockets.",
      createdAt: new Date()
    },
    {
      _id: "m-proj-7",
      title: "CRM for Sales Team",
      description: "Sales workflow automation and lead management system",
      problem: "Sales representatives lose deals because they forget leads, lack integrated call summaries, and use complex, overwhelming legacy CRM spreadsheets.",
      solution: "Built a sleek, high-performing lead management panel. Representatives get automated alerts, follow-up timelines, analytics pipelines, and clear dashboard pipelines.",
      features: "Pipeline board, Quick-lead injection, Daily schedule notification, Performance counters.",
      architecture: "React state system, authenticated Express controllers, relational indexing in MongoDB databases.",
      techStack: ["React", "Express", "Node.js", "MongoDB", "JWT Auth", "SaaS Workflow"],
      status: "Working",
      domain: "SaaS Systems",
      githubUrl: "https://github.com/deepankardayal/sales-crm",
      liveUrl: "",
      futureScope: "Email API integration to send automated follow-up sequences based on drag-and-drop pipeline stages.",
      createdAt: new Date()
    },
    {
      _id: "m-proj-8",
      title: "Placement Tracker System",
      description: "Recruitment and candidate workflow tracking system",
      problem: "Academic institutions struggle with managing thousands of candidate profiles, placement eligibility, and company feedback cycles manually.",
      solution: "Created an automated university recruiting portal. Candidates upload resumes which are parsed into database entries, eligibility checks are automatic, and companies filter applicants instantly.",
      features: "Automated resume parsing, Eligibility filters, Multi-role login portals, Direct interview schedulers.",
      architecture: "JWT role system, express database routers, file-hosting integration, React forms.",
      techStack: ["React", "Express", "Node.js", "MongoDB", "Tailwind CSS", "Workflow Automation"],
      status: "Completed",
      domain: "SaaS Systems",
      githubUrl: "https://github.com/deepankardayal/placement-tracker",
      liveUrl: "",
      futureScope: "Adding automated interview code compilers inside the portal for quick technical screening.",
      createdAt: new Date()
    }
  ];

  mockDb.blogs = [
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
      status: "Published",
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
      status: "Published",
      author: "Deepankar Dayal",
      createdAt: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000)
    }
  ];

  mockDb.skills = [
    { _id: "m-skill-1", name: "React", category: "Frontend", level: 85 },
    { _id: "m-skill-2", name: "Tailwind CSS", category: "Frontend", level: 90 },
    { _id: "m-skill-3", name: "JavaScript", category: "Frontend", level: 85 },
    { _id: "m-skill-4", name: "Responsive UI/UX", category: "Frontend", level: 88 },
    
    { _id: "m-skill-5", name: "Node.js", category: "Backend", level: 82 },
    { _id: "m-skill-6", name: "Express.js", category: "Backend", level: 85 },
    { _id: "m-skill-7", name: "REST APIs", category: "Backend", level: 90 },
    { _id: "m-skill-8", name: "Authentication Systems", category: "Backend", level: 88 },
    
    { _id: "m-skill-9", name: "MongoDB", category: "Database", level: 80 },
    { _id: "m-skill-10", name: "Firebase", category: "Database", level: 75 },
    
    { _id: "m-skill-11", name: "Flutter", category: "Mobile Development", level: 70 },
    
    { _id: "m-skill-12", name: "Workflow Automation", category: "AI & Automation", level: 85 },
    { _id: "m-skill-13", name: "AI System Concepts", category: "AI & Automation", level: 80 },
    { _id: "m-skill-14", name: "Process Optimization", category: "AI & Automation", level: 85 },
    
    { _id: "m-skill-15", name: "SaaS Systems", category: "Product & Innovation", level: 92 },
    { _id: "m-skill-16", name: "Product Thinking", category: "Product & Innovation", level: 90 },
    { _id: "m-skill-17", name: "Workflow Architecture", category: "Product & Innovation", level: 88 },
    { _id: "m-skill-18", name: "System Design", category: "Product & Innovation", level: 85 }
  ];

  // Default credentials for the admin dashboard:
  // Username: admin, Password: adminPassword123 (hashed in production, plain in mock for easy access)
  mockDb.admins = [
    {
      _id: "m-admin-1",
      username: process.env.ADMIN_USER || "admin",
      password: process.env.ADMIN_PASSWORD || "adminPassword123"
    }
  ];
};

const connectDB = async () => {
  const mongoUri = process.env.MONGO_URI;
  if (!mongoUri) {
    console.warn("⚠️  [WARNING] MONGO_URI is missing from backend env. Swapping to memory DB fallback!");
    isMockMode = true;
    seedMockData();
    return;
  }

  try {
    await mongoose.connect(mongoUri, {
      serverSelectionTimeoutMS: 5000
    });
    console.log("🔥 [SUCCESS] MongoDB client connected successfully to regional cluster.");
  } catch (error) {
    console.error(`⚠️  [ERROR] MongoDB connection failed: ${error.message}`);
    console.log("➡️  Falling back to fully operational in-memory JSON datastore for preview.");
    isMockMode = true;
    seedMockData();
  }
};

const getDb = () => {
  return {
    isMock: isMockMode,
    data: mockDb
  };
};

module.exports = { connectDB, getDb };
