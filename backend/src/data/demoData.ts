import { KnowledgeDocument } from '../types.js';

export const INITIAL_DEMO_DOCUMENTS: KnowledgeDocument[] = [
  {
    id: 'doc-apex-launch',
    title: 'Project Apex: Product Launch Schedule & Milestones',
    category: 'Product & Planning',
    updatedAt: new Date().toISOString(),
    metadata: {
      team: 'Product Management',
      priority: 'P0',
      confidentiality: 'Internal'
    },
    text: `Our product launch for Project Apex is firmly scheduled for October 15, 2026.
The marketing team owns the campaign rollout across press releases, social channels, and partner announcements.
Critical milestone requirements:
1. The engineering team must complete the core API integration before the public launch window.
2. The QA sign-off cutoff is September 28, 2026.
3. Zero P0 or P1 security vulnerabilities are permitted past code freeze.
4. Executive review by the Steering Committee will occur on October 2, 2026.`
  },
  {
    id: 'doc-eng-arch',
    title: 'Engineering Architecture: Distributed Retrieval & API Dependencies',
    category: 'Engineering',
    updatedAt: new Date().toISOString(),
    metadata: {
      team: 'Core Platform',
      service: 'Search Gateway',
      sla: '< 10ms'
    },
    text: `The engineering platform architecture relies on Moss for in-process, sub-10ms semantic retrieval.
Key engineering dependencies for the API integration include:
1. Migration from legacy REST polling to persistent WebSocket / HTTP/2 streaming connections.
2. Mutual TLS authentication between edge API gateways and the internal retrieval index service.
3. Pre-flight health checks verifying index memory hydration before routing live user traffic.
4. Rate limiting configured at 5,000 requests per minute per tenant.
All API endpoints must maintain a P99 retrieval latency under 10 milliseconds to satisfy our real-time voice and workspace SLA.`
  },
  {
    id: 'doc-mktg-campaign',
    title: 'Marketing Campaign Strategy: Ownership & Channel Execution',
    category: 'Marketing',
    updatedAt: new Date().toISOString(),
    metadata: {
      owner: 'Elena Rostova, VP Marketing',
      budget: '$250,000',
      status: 'Active'
    },
    text: `The marketing team owns the campaign lifecycle from initial teaser announcements through post-launch demand generation.
Campaign ownership matrix:
- Lead Campaign Manager: Elena Rostova (VP Marketing).
- Content & PR: Marcus Vance (Director of Communications).
- Paid Acquisition & Developer Relations: Sarah Chen (Growth Lead).
Channel strategies include:
- Developer spotlight showcase featuring zero-latency AI demos.
- Co-marketing with key AI infrastructure partners.
- Live keynote webinar on October 18, 2026, featuring customer benchmark case studies.`
  },
  {
    id: 'doc-sec-policy',
    title: 'Security & Compliance Policy: Data Handling & Key Rotation Protocols',
    category: 'Security',
    updatedAt: new Date().toISOString(),
    metadata: {
      compliance: 'SOC2 Type II & ISO27001',
      reviewCycle: 'Quarterly'
    },
    text: `Security protocols mandate strict zero-trust operational practices:
1. Secret and API key storage: All production credentials (including Moss project keys and LLM tokens) must reside in secure server environment variables or KMS vaults. Never commit credentials to version control.
2. Key rotation: Automated 90-day rotation for service tokens, with immediate revocation capabilities for compromised keys.
3. Data privacy: User knowledge documents are processed strictly in ephemeral memory buffers during retrieval. No customer query or indexed chunk is used for upstream foundation model training.
4. Client Authentication: Frontend clients must authenticate via short-lived bearer tokens minted by the backend /api/moss-token endpoint rather than possessing raw project keys.`
  },
  {
    id: 'doc-q3-roadmap',
    title: 'Q3-Q4 2026 Executive Roadmap & Strategic Priorities',
    category: 'Strategy',
    updatedAt: new Date().toISOString(),
    metadata: {
      level: 'Board Level',
      quarter: 'Q3-Q4 2026'
    },
    text: `The executive roadmap outlines three overarching strategic objectives for the remainder of 2026:
1. Zero-Latency Intelligence: Deliver instant context retrieval under 10ms for all connected knowledge bases.
2. Offline-First Capability: Ensure critical user notes and cached search indexes remain fully operational even when disconnected from cloud backends.
3. Enterprise Multi-Tenant Workspaces: Enable isolated encrypted indices per team with granular role-based access control.
Milestone gates:
- August 2026: Alpha release of local indexing engine.
- September 2026: Enterprise beta with pilot design partners.
- October 2026: General Availability release alongside Project Apex launch.`
  },
  {
    id: 'doc-sprint-retro',
    title: 'Sprint Retro: Zero-Latency Retrieval & Moss Benchmarking',
    category: 'Engineering Notes',
    updatedAt: new Date().toISOString(),
    metadata: {
      sprint: 'Sprint 34',
      topic: 'Performance'
    },
    text: `Key insights from our latest sprint testing Moss semantic retrieval:
- In-process memory index lookups consistently clocked between 2.4ms and 5.8ms across 10,000 simulated document chunks.
- Hybrid search with alpha=0.8 provided the ideal balance between semantic meaning and precise technical acronym recall.
- Loading the index once into RAM eliminated redundant network roundtrips, reducing overall user interaction latency by over 85% compared to traditional vector database REST calls.
Action items: Implement auto-refresh background polling to hot-swap index updates without user interruption.`
  }
];
