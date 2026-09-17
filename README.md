# RecallOS — Your Knowledge. Retrieved Instantly.

> **RecallOS** is a zero-latency AI knowledge workspace powered by the official **[Moss](https://www.moss.dev/?utm_source=hidevshackathon&utm_medium=resources&utm_campaign=zero_latency_builder_sprint)** semantic retrieval engine for the **Moss Zero-Latency Builder Sprint**.

---

## 1. Project Overview

RecallOS transforms how users interact with their personal and organizational knowledge bases. Instead of submitting queries to slow remote vector databases with multi-hundred millisecond roundtrips, RecallOS loads the Moss semantic index directly in-process into RAM. 

By querying vector graphs directly in memory, semantic search operations complete in **sub-10ms** (typically 2–5ms). This sub-10ms retrieval enables real-time fluid UI typing, instant conversational question-answering with zero perceived latency, and offline-first availability.

---

## 2. Problem Statement

AI assistants become sluggish and frustrating when they must search through large volumes of documentation. Traditional vector search architectures introduce:
- **Network Roundtrips**: 50–250ms per search query across external cloud vector databases.
- **Database Connection Latency**: DNS lookups, TLS negotiations, and API serialization.
- **Infrastructure Complexity**: Managing clusters, shards, replicas, and external vector services.
- **Cloud Dependency**: Complete failure of search capabilities when temporarily disconnected.

Users expect instant, focused context retrieval that feels native to the application.

---

## 3. The Solution: RecallOS + Moss

RecallOS solves these bottlenecks by leveraging **Moss** as an in-process semantic retrieval runtime:
1. **Instant Knowledge Ingestion**: Upload documents, markdown files, notes, and policies.
2. **In-Process Index Hydration**: Load the Moss index into application memory once.
3. **Sub-10ms Semantic Lookup**: Search by meaning rather than rigid keywords in 2–5ms.
4. **Grounded AI Context Assistant**: Automatically injects retrieved passages into LLM prompts with exact source citations.
5. **Performance Lab**: A built-in telemetry suite demonstrating real, non-fabricated latency measurements and hybrid search parameter tuning ($\alpha$).
6. **Offline-First Resilience**: Memory-hydrated search continues operating seamlessly without cloud connectivity.

---

## 4. Architecture

```mermaid
flowchart TD
    subgraph Client [Frontend: React + Vite + TypeScript]
        UI[Obsidian Signal Interface]
        Tabs[Overview / Vault / Search / Assistant / Lab / Settings]
    end

    subgraph Backend [Backend Service: Node.js + Express]
        API[Express API Gateway]
        TokenEndpoint[/api/moss-token - Custom Authenticator/]
        Assistant[Grounded Context Synthesizer]
        PerfTimer[performance.now Precision Timer]
    end

    subgraph MossEngine [Moss Semantic Runtime]
        MossSDK[@moss-js/moss Client]
        RAM[(In-Memory Index Hydration)]
        HybridEngine[Vector + Lexical Hybrid Engine]
    end

    UI -->|Natural Language Search & Chat| API
    API --> TokenEndpoint
    API --> PerfTimer
    API -->|loadIndex / query / addDocs| MossSDK
    MossSDK --> RAM
    RAM --> HybridEngine
    HybridEngine -->|Sub-10ms Results| Assistant
    Assistant -->|Grounded Answers + Citations| UI
```

---

## 5. Core Features

### A. Knowledge Vault & Document Management
- Preloaded with realistic project documents (Product launch schedule, engineering architecture, marketing campaign ownership, security policies, project roadmap).
- Manual rich note editor.
- Multi-file text & markdown upload.
- Live document metadata tagging and inspection.
- Rebuild and rehydrate index on demand.

### B. Semantic Search Studio
- Natural-language queries understanding intent and meaning.
- Real-time measured retrieval latency badge (e.g. `2.84 ms`).
- Result cards displaying similarity match percentages, title, category, and matching passages.
- Interactive tuning for:
  - **$\alpha$ (Alpha)**: Hybrid search balance (from $0.0$ pure lexical to $1.0$ pure dense vector; default $0.8$).
  - **topK**: Control maximum retrieved candidate documents ($1$ to $10$).

### C. Grounded AI Context Assistant
- Conversational chat interface grounded strictly in retrieved knowledge documents.
- Clear separation of timing metrics: **Retrieval Latency (ms)** vs **Generation Latency (ms)** vs **Total (ms)**.
- Inline citation cards linking directly to the source documents.
- Helpful fallback when no matching context is present in the vault.

### D. Performance Lab
- Dedicated benchmarking suite with execution stopwatch.
- Real measured latency distribution.
- Architecture breakdown comparing in-process Moss lookups vs traditional cloud vector databases.
- Query history log tracking past retrieval speeds.

### E. Settings & Diagnostics
- Runtime status of Moss SDK (`@moss-js/moss`).
- Status of backend token-minting custom authenticator (`/api/moss-token`).
- Zero-trust credential isolation: all keys remain securely server-side.

---

## 6. Tech Stack

- **Frontend**: React 18, Vite, TypeScript, Tailwind CSS, Lucide React
- **Design System**: *Obsidian Signal* (Linear/Raycast dark graphite aesthetic)
- **Backend**: Node.js v24, Express, TypeScript, CORS, Dotenv
- **Retrieval Engine**: Official Moss JavaScript SDK (`@moss-js/moss`)
- **Benchmarking**: Node `perf_hooks` with microsecond-level accuracy

---

## 7. Installation & Quick Start

### Prerequisites
- Node.js 20.4+ (Node v24 recommended)
- npm or pnpm

### Step 1: Clone or Navigate to Project
```bash
cd d:/MOSS
```

### Step 2: Install Dependencies
Run the install command to install both backend and frontend packages:
```bash
npm.cmd run install:all
```

### Step 3: Configure Environment Variables
Copy `.env.example` to `.env`:
```bash
cp .env.example .env
```

Contents of `.env`:
```env
PORT=3001
NODE_ENV=development

# Moss Credentials (Optional for local testing; required for live Moss cloud)
MOSS_PROJECT_ID=your_moss_project_id_here
MOSS_PROJECT_KEY=your_moss_project_key_here
MOSS_INDEX_NAME=recallos-workspace

# Optional LLM Key for Assistant Synthesis
GEMINI_API_KEY=
```
> **Note**: RecallOS includes a zero-config local fallback engine out-of-the-box. If `MOSS_PROJECT_ID` is not yet configured, the app automatically starts in zero-latency local mode so you can immediately explore and demo the app. Once valid credentials are provided, it automatically connects to live Moss cloud!

### Step 4: Run Application
Start both backend and frontend concurrently:
```bash
npm.cmd run dev
```

- **Frontend Application**: `http://localhost:5173`
- **Backend API**: `http://localhost:3001`

---

## 8. Testing Semantic Search

Try asking these demo questions in the **Semantic Search Studio** or **AI Assistant**:
1. *"Who owns the campaign and what must happen before launch?"*
   - Returns both the **Marketing Campaign Strategy** (Elena Rostova ownership) and the **Project Launch Schedule** (engineering API integration dependency).
2. *"What is the launch deadline and key milestones?"*
   - Matches **Project Apex Launch Schedule** (October 15, 2026, QA cutoff Sept 28).
3. *"What are the engineering dependencies for the API integration?"*
   - Matches **Engineering Architecture** (WebSocket migration, mTLS, pre-flight hydration).
4. *"What security protocols govern key rotation?"*
   - Matches **Security & Compliance Policy** (90-day rotation, backend env isolation).
5. *"Summarize the project roadmap."*
   - Matches **Q3-Q4 Executive Roadmap**.

---

## 9. How Offline-First Retrieval Works

1. When the backend or client loads the index via `loadIndex(indexName)`, the entire vector graph is hydrated into memory.
2. Subsequent semantic search queries do **not** trigger external HTTP network requests.
3. If internet connectivity drops, in-memory searches continue executing with full sub-10ms speed.
4. When connectivity resumes, updates can be synchronized to the cloud index with `syncIndex()`.

---

## 10. Security Notes

- **Zero-Trust Token Pattern**: In accordance with the [Moss Custom Authenticator](https://docs.moss.dev/docs/reference/js/custom-authenticator.md) specification, frontend clients never possess the master `MOSS_PROJECT_KEY`. 
- **Ephemeral Processing**: Query inputs and document chunks are processed in memory and never used for upstream foundation model training.
- **Environment Isolation**: Production credentials remain exclusively server-side.

---

## 11. Official Moss Documentation Links

- **Moss Website**: [https://www.moss.dev](https://www.moss.dev/?utm_source=hidevshackathon&utm_medium=resources&utm_campaign=zero_latency_builder_sprint)
- **Moss JavaScript API Reference**: [https://docs.moss.dev/docs/reference/js/api](https://docs.moss.dev/docs/reference/js/api?utm_source=hidevshackathon&utm_medium=resources&utm_campaign=zero_latency_builder_sprint)
- **Sub-10ms Knowledge Retrieval**: [https://docs.moss.dev/docs/build/offline-first-search](https://docs.moss.dev/docs/build/offline-first-search?utm_source=hidevshackathon&utm_medium=resources&utm_campaign=zero_latency_builder_sprint)
- **Custom Authenticator Pattern**: [https://docs.moss.dev/docs/reference/js/custom-authenticator.md](https://docs.moss.dev/docs/reference/js/custom-authenticator.md)
- **Moss CLI**: [https://docs.moss.dev/docs/integrations/moss-cli](https://docs.moss.dev/docs/integrations/moss-cli?utm_source=hidevshackathon&utm_medium=resources&utm_campaign=zero_latency_builder_sprint)

---

## 12. License & Hackathon Submission
Built for the **Moss Zero-Latency Builder Sprint** (September 2026).
MIT License.
