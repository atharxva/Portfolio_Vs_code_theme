import { ProjectSection } from "@/lib/types";

export const PROJECT_SECTIONS: ProjectSection[] = [
  {
    id: "professional",
    title: "Professional",
    description: "Built as part of company / internship work.",
    dotColor: "bg-emerald-400",
    projects: [
      {
        id: "trading-app",
        title: "Investment Trading App (US Market)",
        description:
          "Implemented secure and regulation-compliant onboarding workflows for a US-based investment platform.",
        tags: ["React", "Node.js", "Compliance", "System Design"],
        gradient: "from-sky-500/30 via-blue-600/20 to-slate-900",
        isClosedSource: true,
        closedSourceReason: "Proprietary financial tech codebase governed by confidentiality agreements and US market regulatory compliance standards.",
        technicalContributions: [
          "Architected end-to-end KYC and verification onboarding microservices with zero-dropoff design.",
          "Constructed asynchronous transactional email dispatcher with fallback queuing for high-reliability message delivery.",
          "Built a secure ephemeral branch deployment preview system enabling non-technical compliance officers to verify releases before staging.",
        ],
        architecture: {
          architectureType: "Distributed Microservices with Event-Driven Email Queue",
          components: [
            "React Onboarding Frontend (Step-wise state machine)",
            "Node.js API Gateway (Auth & Regulatory Validation)",
            "Notification Microservice (Async BullMQ & Redis)",
            "PostgreSQL (Encrypted User Credentials & Audit Trail)",
          ],
          dataFlow: [
            "Client submits identity payload over TLS with zero-knowledge tokenization",
            "Gateway validates US regulatory checks against third-party compliance brokers",
            "Microservice generates verifiable magic links & onboarding confirmations asynchronously",
          ],
          securityOrOptimization: [
            "Strict CORS, rate limiting, and end-to-end payload sanitization",
            "Zero PII logged in plaintext across all distributed logs",
          ],
        },
      },
      {
        id: "script-trimmer",
        title: "Script Trimmer",
        description:
          "Proprietary Python-based automation software engineered for automated video/audio trimming and rapid content repurposing from long-form educational sessions.",
        tags: ["Python", "Automation", "AWS S3", "FFmpeg"],
        gradient: "from-fuchsia-500/30 via-purple-600/20 to-slate-900",
        isClosedSource: true,
        closedSourceReason: "Proprietary internal company tooling engineered for automated production workflows; source code and internal pipelines are closed-source.",
        technicalContributions: [
          "Developed automated keyframe-accurate media splitting engine utilizing Python and FFmpeg.",
          "Implemented intelligent topic boundary detection reducing manual audio/video editing time by 80%.",
          "Automated cloud media ingestion and delivery pipeline connecting directly to AWS S3 storage buckets.",
        ],
        architecture: {
          architectureType: "Cloud Media Processing & Automated Content Slicing Pipeline",
          components: [
            "Whisper ASR Speech-to-Text Transcription Engine",
            "Python Semantic Segmenter (Topic boundary detection)",
            "FFmpeg Hardware-Accelerated Video Slicing Engine",
            "AWS S3 Cloud Storage Bucket for media ingest & egress",
          ],
          dataFlow: [
            "Long-form lecture audio stream pulled into memory from S3 or internal media URL",
            "Timestamped transcription generated with sentence-level confidence vectors",
            "Topic segmentation triggers FFmpeg keyframe-accurate cuts without re-encoding overhead",
          ],
          securityOrOptimization: [
            "80% reduction in video processing time via copy-stream FFmpeg flags",
            "Ephemeral local file cleanup ensuring zero disk bloat",
          ],
        },
      },
    ],
  },
  {
    id: "personal",
    title: "Personal Projects",
    description: "Built independently and for fun.",
    dotColor: "bg-violet-400",
    projects: [
      {
        id: "weather-prediction",
        title: "Weather Rain Prediction ML Web App",
        description:
          "End-to-end Machine Learning web application predicting next-day rain probability worldwide using FastAPI, Scikit-learn, Open-Meteo real-time atmospheric APIs, and interactive dark-mode UI.",
        tags: ["Machine Learning", "FastAPI", "Python", "Scikit-learn"],
        codeUrl: "https://github.com/atharxva/Weather_prediction",
        liveUrl: "https://weather-prediction-beryl-eight.vercel.app/",
        gradient: "from-cyan-500/30 via-blue-600/20 to-slate-900",
        sandboxType: "weather-ml",
        architecture: {
          architectureType: "ML Inference Microservice + Modern Reactive Frontend",
          components: [
            "Trained Random Forest Classifier (Scikit-learn / joblib)",
            "FastAPI REST Backend with automated CORS & OpenAPI docs",
            "Open-Meteo Global Atmospheric Reanalysis Data Pipeline",
            "Next.js / Tailwind CSS Dynamic Glassmorphic Frontend",
          ],
          dataFlow: [
            "User inputs geolocation coordinates or atmospheric parameters (Humidity, Pressure, Temp)",
            "FastAPI endpoint normalizes inputs using pre-fitted StandardScaler",
            "Inference pipeline computes rain probability score, feature importances, and classification confidence",
          ],
          securityOrOptimization: [
            "Sub-15ms model inference response time via in-memory warm model instances",
            "Client-side input clamping to prevent atmospheric anomalies",
          ],
        },
      },
      {
        id: "kindle-extractor",
        title: "Kindle Books Extractor",
        description:
          "Automated e-book text extraction system for personal knowledge management.",
        tags: ["Python", "Automation", "PKM"],
        codeUrl: "https://github.com/atharxva",
        gradient: "from-amber-500/30 via-orange-600/20 to-slate-900",
        architecture: {
          architectureType: "Local Document Parsing & Markdown Synthesis CLI",
          components: [
            "DRM-Free Kindle / Mobipocket Binary Parser",
            "HTML Sanitizer & AST Transformer",
            "Obsidian / Markdown Vault Export Engine",
          ],
          dataFlow: [
            "User supplies Kindle document or highlights clipping file",
            "Regex parser extracts annotations, timestamps, and chapter hierarchies",
            "Structured Markdown created with backlinked metadata",
          ],
          securityOrOptimization: [
            "Strictly client-side local execution; no book content dispatched over the wire",
          ],
        },
      },
      {
        id: "sight-shop",
        title: "Sight Shop",
        description:
          "E-commerce platform with a full product catalog and a secure checkout flow.",
        tags: ["React", "Node.js", "MongoDB"],
        codeUrl: "https://github.com/atharxva",
        gradient: "from-rose-500/30 via-red-600/20 to-slate-900",
        architecture: {
          architectureType: "Full-Stack E-Commerce Architecture (MERN)",
          components: [
            "React.js Single Page Application (Catalog, Cart, Orders)",
            "Node.js Express Server with JWT Authentication",
            "MongoDB Atlas (Flexible schema for product variants & inventory)",
          ],
          dataFlow: [
            "Client executes optimistic cart updates with local persistence",
            "Checkout triggers atomic inventory validation against MongoDB",
            "Payment webhook confirms order & generates tracking IDs",
          ],
          securityOrOptimization: [
            "Bcrypt salted password hashing & HttpOnly cookie session security",
          ],
        },
      },
      {
        id: "ai-pipeline",
        title: "AI Content Automation Pipeline",
        description:
          "Automated article scraping, summarization, and blog-ready content generation using n8n, Firecrawl, Whisper API, and OpenAI — removing the manual work of writing and posting content.",
        tags: ["n8n", "OpenAI", "Whisper API", "Firecrawl"],
        codeUrl: "https://github.com/atharxva",
        gradient: "from-teal-500/30 via-emerald-600/20 to-slate-900",
        architecture: {
          architectureType: "Orchestrated Multi-Agent Autonomous Content Engine",
          components: [
            "n8n Self-Hosted Workflow Orchestrator",
            "Firecrawl Web Scraping Engine with Markdown extraction",
            "OpenAI GPT-4o Content Summarizer & SEO Tag Generator",
            "Automated CMS Publisher with Webhook notifications",
          ],
          dataFlow: [
            "Webhooks ingest target article URL or podcast audio stream",
            "Firecrawl cleans DOM noise into structured Markdown semantics",
            "LLM synthesizes key takeaways, meta descriptions, and social snippets",
          ],
          securityOrOptimization: [
            "Idempotency tokens prevent duplicate posting to destination platforms",
          ],
        },
      },
    ],
  },
];
