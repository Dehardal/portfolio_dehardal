// Central data store — all project data for the portfolio
// Import and use across Projects page, Home page, and ProjectCta

export const PROJECTS = [
  {
    id: 'career-atlas',
    label: '01 // CAREER & EDUCATION PLATFORM',
    title: 'Career Atlas',
    tagline: 'Navigate Your Educational & Career Pathways',
    desc: 'An interactive platform helping students and professionals map out dynamic education pathways, track career milestones, and make data-driven career choices.',
    problem: 'Students and career switchers struggle to visualize complex education pathways and milestone prerequisites, leading to decision paralysis and misaligned skill development.',
    solution: 'Engineered Career Atlas — a web platform featuring interactive roadmaps, degree-to-role mappings, and real-time guidance tools to navigate career trajectories.',
    highlights: [
      { icon: 'map', text: 'Dynamic Pathway Mapping: Visualize educational milestones, degree prerequisites, and career progression routes.' },
      { icon: 'explore', text: 'Interactive Career Guidance: Data-driven recommendations tailored to individual skill gaps and career goals.' },
      { icon: 'view_kanban', text: 'Milestone Tracker: Progress logging to help candidates monitor certified skills and degree accomplishments.' },
      { icon: 'bolt', text: 'Live Cloud Deployment: Deployed on Render with high availability and optimized responsive layout.' },
    ],
    tech: ['React', 'TypeScript', 'Tailwind CSS', 'Node.js', 'Express', 'Vite'],
    architecture: ['Interactive Pathway Graphs', 'Career Guidance Engine', 'Responsive Web Client', 'Render Cloud Deployment'],
    status: 'Live',
    domain: 'Career & EdTech',
    github: 'https://github.com/Dehardal/Career-Atlas---Nextstep',
    live: 'https://career-atlas-nextstep.onrender.com/',
    iframeUrl: 'https://career-atlas-nextstep.onrender.com/',
    color: '#3b82f6',
    helixLabels: ['CLIENT', 'GRAPHS', 'ENGINE', 'CLOUD'],
    gallery: [
      'https://images.unsplash.com/photo-1501504905252-473c47e087f8?auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&q=80'
    ]
  },
  {
    id: 'sales-crm',
    label: '02 // SAAS SYSTEMS',
    title: 'Sales CRM',
    tagline: 'High-performance sales pipeline & customer relations desk',
    desc: 'A robust sales CRM platform helping organizations manage pipelines, track customer relationships, sync calendars, and automate sales follow-ups.',
    problem: 'Sales teams struggle with chaotic pipeline tracking, lead leakages, disjointed communication channels, and manual reporting systems.',
    solution: 'Engineered a robust, real-time Sales CRM featuring custom deal boards, client profile hubs, interactive conversion analytics, and automatic lead status updates.',
    highlights: [
      { icon: 'analytics', text: 'Pipeline Visualization: Track deal stages, conversion values, and pipeline health in real time.' },
      { icon: 'group', text: 'Client Profiles Hub: Comprehensive customer profiles capturing deal histories, contact details, and logs.' },
      { icon: 'bolt', text: 'Live Cloud Host: Deployed on Render with full database replication and responsive design.' },
      { icon: 'verified_user', text: 'Secure Role Authentication: Encrypted user sessions with role-based access for sales reps and managers.' },
    ],
    tech: ['React', 'Node.js', 'Express', 'MongoDB', 'Tailwind CSS', 'Vite'],
    architecture: ['React Dashboard Interface', 'Express REST API', 'MongoDB Atlas Storage', 'Render Cloud Host'],
    status: 'Live',
    domain: 'SaaS Systems',
    github: 'https://github.com/Dehardal/Sales-CRM',
    live: 'https://sales-crm-fkw9.onrender.com/',
    iframeUrl: 'https://sales-crm-fkw9.onrender.com/',
    color: '#ec4899',
    helixLabels: ['CLIENT', 'DATABASE', 'SERVER', 'HOST'],
    gallery: [
      'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?auto=format&fit=crop&q=80'
    ]
  },
  {
    id: 'pequire',
    label: '03 // ENTERPRISE PLATFORM',
    title: 'Pequire Ecosystem',
    tagline: 'Enterprise talent acquisition & business collaboration desk',
    desc: 'A comprehensive enterprise-grade platform streamlining recruitment workflows, employee profiling, talent analytics, and cross-organization collaborations.',
    problem: 'Organizations face challenges aligning talent acquisition with business objectives, managing external resource pools, and tracking compliance across divisions.',
    solution: 'Engineered a robust, real-time enterprise collaboration desk featuring advanced talent filters, compliance validation panels, and secure organization workspaces.',
    highlights: [
      { icon: 'hub', text: 'Central Ecosystem Hub: Manage business divisions, compliance pipelines, and partner networks in a single workspace.' },
      { icon: 'psychology', text: 'AI-assisted Matching: Intelligently screen profiles against technical job requisitions with precision mapping.' },
      { icon: 'lock', text: 'Secure Compliance Desk: AES-256 encrypted verification systems matching enterprise compliance protocols.' },
      { icon: 'bolt', text: 'Live Cloud Host: Deployed on secure scalable cloud nodes with high-availability replication.' },
    ],
    tech: ['React', 'Node.js', 'Express', 'MongoDB', 'Tailwind CSS', 'Vite'],
    architecture: ['React Dashboard Interface', 'Express REST API', 'MongoDB Atlas Storage', 'Render Cloud Host'],
    status: 'Live',
    domain: 'Enterprise SaaS',
    github: 'https://github.com/pequireinfo-cloud/Ecosystem',
    live: 'https://pequire.com',
    iframeUrl: 'https://pequire.com',
    color: '#14b8a6',
    helixLabels: ['PORTAL', 'DATABASE', 'API', 'CLUSTER'],
    gallery: [
      'https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&q=80'
    ]
  },
  {
    id: 'qrspooler',
    label: '04 // SAAS SYSTEMS',
    title: 'Cafe System',
    tagline: 'QR-based print billing & transaction checkout SaaS',
    desc: 'Print Spooler billing SaaS integrating local printers with UPI QR checkout logs to prevent cyber cafe payment leaks and streamline touchless print workflows.',
    problem: 'Cyber cafe customers struggle with sharing documents via pendrives or WhatsApp, while owners face payment leakage for printed files.',
    solution: 'Created a touchless printer integration. Customers scan a unique QR code, upload their files, pay via UPI, and the system triggers the printer automatically.',
    highlights: [
      { icon: 'qr_code_2', text: 'Unique QR session per customer — direct document upload without any physical media transfer.' },
      { icon: 'payments', text: 'UPI webhook payment gateway — real-time confirmation triggers automatic printer spooling.' },
      { icon: 'print', text: 'Dynamic Node.js printer driver integration — supports multiple local network printers simultaneously.' },
      { icon: 'receipt_long', text: 'Automated billing ledger — logs all sessions with timestamps, page counts, and payment status.' },
    ],
    tech: ['React', 'Node.js', 'Express', 'MongoDB', 'UPI API', 'Socket.io'],
    architecture: ['Unique QR Session Mapping', 'UPI Webhook Notifications', 'Dynamic Node Printer Integrations', 'Session Billing Ledger'],
    status: 'Live',
    domain: 'SaaS Systems',
    github: 'https://github.com/Dehardal/Cafe-System',
    live: 'https://cafe-system-frontend.onrender.com/',
    iframeUrl: 'https://cafe-system-frontend.onrender.com/',
    color: '#10b981',
    helixLabels: ['SESSION', 'PRINTER', 'UPI API', 'BILLING'],
    gallery: [
      'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&q=80'
    ]
  },
  {
    id: 'vakilcrm',
    label: '05 // SAAS SYSTEMS',
    title: 'Vakil System',
    tagline: 'Legal court hearings scheduler & notifications desk',
    desc: 'Advocate hearings scheduling planner featuring automatic calendar syncing, automated client SMS alerts, encrypted deposition storage, and billing ledgers.',
    problem: 'Law firms struggle with paper-bound court hearing schedules, client case documentation, and billing tracking.',
    solution: 'Developed a MERN SaaS CRM custom-built for lawyers to track hearings, store securely encrypted depositions, issue automated SMS court warnings, and manage billing ledgers.',
    highlights: [
      { icon: 'gavel', text: 'Court hearing scheduler with calendar sync — never miss a hearing date with automated alerts.' },
      { icon: 'sms', text: 'Automated SMS client notifications triggered by upcoming hearing dates via cron scheduler.' },
      { icon: 'lock', text: 'AES-encrypted deposition & case file storage — confidential documents secured at rest.' },
      { icon: 'account_balance_wallet', text: 'Billing ledger with invoice generation — tracks fees, retainers, and payment status per client.' },
    ],
    tech: ['React', 'Express', 'Node.js', 'MongoDB', 'JWT Auth', 'Twilio SMS'],
    architecture: ['Role JWT Authentication', 'MongoDB Hearing Indexes', 'Automated SMS Cron Triggers', 'Encrypted Document Storage'],
    status: 'Live',
    domain: 'SaaS Systems',
    github: 'https://github.com/Dehardal/Vakil-System',
    live: 'https://vakil-system.onrender.com/login',
    iframeUrl: 'https://vakil-system.onrender.com/login',
    color: '#f59e0b',
    helixLabels: ['AUTH', 'DATABASE', 'CRON', 'STORAGE'],
    gallery: [
      'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1505664159858-80a6d0e7d592?auto=format&fit=crop&q=80'
    ]
  },
  {
    id: 'quickserve',
    label: '06 // RESTAURANT SAAS',
    title: 'Quickserve',
    tagline: 'QR-based digital menu & live order dispatch platform',
    desc: 'A full-stack restaurant QR SaaS platform empowering diners to scan table QR codes, browse rich visual menus, and place instant digital orders, while giving restaurant owners real-time kitchen order dispatch and catalog management.',
    problem: 'Traditional restaurant paper menus incur repetitive printing costs for daily price updates, slow down ordering during rush hours, and introduce manual order error bottlenecks between waitstaff and the kitchen.',
    solution: 'Engineered an end-to-end touchless QR dining engine. Patrons access real-time table menus with zero app downloads, while restaurant operators manage categories, dishes with Cloudinary media hosting, and receive instantaneous incoming order feeds over WebSockets.',
    highlights: [
      { icon: 'qr_code_scanner', text: 'Dynamic Table QR Resolution: Instant customer access to digital restaurant menus without installing native apps.' },
      { icon: 'table_restaurant', text: 'Real-Time Kitchen Dispatch: Live order synchronization powered by Socket.io for immediate food prep alerts.' },
      { icon: 'restaurant_menu', text: 'Dish & Category Studio: Comprehensive owner dashboard with Cloudinary image hosting and availability toggles.' },
      { icon: 'bolt', text: 'Live Cloud Host: Deployed on Render with secured JWT sessions, responsive UI, and persistent MongoDB storage.' },
    ],
    tech: ['React', 'Node.js', 'Express', 'MongoDB', 'Socket.io', 'Tailwind CSS', 'Cloudinary', 'Vite'],
    architecture: ['Dynamic QR Session Mapping', 'Socket.io Event Dispatch', 'Cloudinary Media Vault', 'Render Cloud Deployment'],
    status: 'Live',
    domain: 'Restaurant Tech',
    github: 'https://github.com/Dehardal/Quickserve---Restaurant-QR-menu',
    live: 'https://quickserve-restaurant-qr-menu.onrender.com',
    iframeUrl: 'https://quickserve-restaurant-qr-menu.onrender.com',
    color: '#f97316',
    helixLabels: ['QR CODE', 'MENU', 'SOCKETS', 'KITCHEN'],
    gallery: [
      'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1552566626-52f8b828add9?auto=format&fit=crop&q=80'
    ]
  },
  {
    id: 'nexusreach-crm',
    label: '07 // OUTREACH ENGINE',
    title: 'NexusReach CRM',
    tagline: 'Multichannel outreach engine & distributed mailbox CRM',
    desc: 'An open-source, scalable multichannel CRM and automated cold outreach engine featuring multi-mailbox round-robin rotation, Hostinger Agentic Mail API integration, WhatsApp Web messaging, and AI lead scoring.',
    problem: 'Commercial CRM and outreach platforms charge hundreds of dollars per seat, strictly limit mailbox connections and contact volumes, lack native WhatsApp integration, and lock enterprise data into proprietary silos.',
    solution: 'Architected a self-hosted outreach engine with unlimited mailbox pools, intelligent round-robin deliverability controls, drag-and-drop Kanban pipelines, automated WhatsApp communication, and local/cloud LLM lead classification.',
    highlights: [
      { icon: 'mark_email_unread', text: 'Distributed Mailbox Pool: Unlimited mailbox rotation across Hostinger Agentic Mail, Google Workspace, and custom SMTP.' },
      { icon: 'view_kanban', text: 'Interactive Kanban Pipeline: Drag-and-drop lead lifecycle management with customizable stages and full audit logs.' },
      { icon: 'chat', text: 'Multichannel Outreach & WhatsApp: Integrated WhatsApp Web engine alongside unified two-way email reply synchronization.' },
      { icon: 'psychology', text: 'AI Lead Intelligence: Engagement heat scoring (Hot/Warm/Cold) and smart response drafting powered by local/cloud LLMs.' },
    ],
    tech: ['React 19', 'Node.js', 'Express', 'MongoDB', 'Socket.io', 'Tailwind CSS', 'Vite 7'],
    architecture: ['Round-Robin SMTP Balancer', 'Agentic Mail API Adapter', 'WhatsApp Web Engine', 'Render Cloud Host'],
    status: 'Live',
    domain: 'SaaS & Automation',
    github: 'https://github.com/Dehardal/NexusReach-CRM',
    live: 'https://nexusreach-crm.onrender.com',
    iframeUrl: 'https://nexusreach-crm.onrender.com',
    color: '#6366f1',
    helixLabels: ['ROTATION', 'PIPELINE', 'AGENTIC', 'OUTREACH'],
    gallery: [
      'https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&q=80'
    ]
  },
];

export default PROJECTS;

