export const getDashboardHtml = (): string => {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>RecallOS — Moss Database & Semantic Engine</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500;600&display=swap" rel="stylesheet">
  <style>
    :root {
      --bg: #090d16;
      --card-bg: rgba(22, 27, 34, 0.7);
      --card-border: rgba(255, 255, 255, 0.08);
      --card-border-hover: rgba(56, 189, 248, 0.3);
      --primary: #38bdf8;
      --primary-glow: rgba(56, 189, 248, 0.15);
      --accent: #818cf8;
      --success: #34d399;
      --text: #f1f5f9;
      --text-muted: #94a3b8;
      --font-sans: 'Inter', system-ui, -apple-system, sans-serif;
      --font-mono: 'JetBrains Mono', monospace;
    }

    * { box-sizing: border-box; margin: 0; padding: 0; }

    body {
      background-color: var(--bg);
      background-image: 
        radial-gradient(circle at 15% 15%, rgba(56, 189, 248, 0.08) 0%, transparent 40%),
        radial-gradient(circle at 85% 85%, rgba(129, 140, 248, 0.08) 0%, transparent 40%);
      color: var(--text);
      font-family: var(--font-sans);
      min-height: 100vh;
      display: flex;
      flex-direction: column;
    }

    header {
      border-bottom: 1px solid var(--card-border);
      background: rgba(13, 17, 23, 0.85);
      backdrop-filter: blur(12px);
      position: sticky;
      top: 0;
      z-index: 50;
      padding: 1rem 2rem;
      display: flex;
      justify-content: space-between;
      align-items: center;
      flex-wrap: wrap;
      gap: 1rem;
    }

    .brand {
      display: flex;
      align-items: center;
      gap: 0.75rem;
    }

    .logo-badge {
      background: linear-gradient(135deg, #0284c7, #6366f1);
      width: 36px;
      height: 36px;
      border-radius: 10px;
      display: grid;
      place-items: center;
      font-weight: 700;
      font-size: 1.1rem;
      color: white;
      box-shadow: 0 0 16px rgba(56, 189, 248, 0.4);
    }

    .title-group h1 {
      font-size: 1.15rem;
      font-weight: 700;
      letter-spacing: -0.02em;
    }

    .title-group p {
      font-size: 0.75rem;
      color: var(--text-muted);
    }

    .status-bar {
      display: flex;
      align-items: center;
      gap: 0.75rem;
      font-size: 0.8rem;
    }

    .pill {
      display: inline-flex;
      align-items: center;
      gap: 0.4rem;
      padding: 0.3rem 0.75rem;
      border-radius: 9999px;
      border: 1px solid var(--card-border);
      background: rgba(255, 255, 255, 0.03);
      font-family: var(--font-mono);
      font-size: 0.75rem;
    }

    .pill-green {
      border-color: rgba(52, 211, 153, 0.3);
      color: #6ee7b7;
      background: rgba(52, 211, 153, 0.08);
    }

    .pill-blue {
      border-color: rgba(56, 189, 248, 0.3);
      color: #7dd3fc;
      background: rgba(56, 189, 248, 0.08);
    }

    .dot {
      width: 7px;
      height: 7px;
      border-radius: 50%;
      background: currentColor;
      box-shadow: 0 0 8px currentColor;
    }

    main {
      flex: 1;
      max-width: 1200px;
      width: 100%;
      margin: 0 auto;
      padding: 2rem 1.5rem;
      display: flex;
      flex-direction: column;
      gap: 2rem;
    }

    .tabs {
      display: flex;
      gap: 0.5rem;
      border-bottom: 1px solid var(--card-border);
      padding-bottom: 0.75rem;
    }

    .tab-btn {
      background: transparent;
      border: 1px solid transparent;
      color: var(--text-muted);
      padding: 0.5rem 1rem;
      border-radius: 8px;
      cursor: pointer;
      font-size: 0.875rem;
      font-weight: 500;
      transition: all 0.2s;
    }

    .tab-btn:hover {
      color: var(--text);
      background: rgba(255, 255, 255, 0.03);
    }

    .tab-btn.active {
      color: var(--primary);
      background: var(--primary-glow);
      border-color: rgba(56, 189, 248, 0.3);
    }

    .tab-panel {
      display: none;
      flex-direction: column;
      gap: 1.5rem;
    }

    .tab-panel.active {
      display: flex;
    }

    .card {
      background: var(--card-bg);
      border: 1px solid var(--card-border);
      border-radius: 12px;
      padding: 1.5rem;
      backdrop-filter: blur(8px);
      box-shadow: 0 4px 20px rgba(0, 0, 0, 0.25);
    }

    .card-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 1rem;
    }

    .card-title {
      font-size: 1.05rem;
      font-weight: 600;
    }

    .search-bar-wrapper {
      display: flex;
      flex-direction: column;
      gap: 1rem;
    }

    .input-row {
      display: flex;
      gap: 0.75rem;
    }

    input[type="text"], textarea, select {
      flex: 1;
      background: rgba(15, 23, 42, 0.6);
      border: 1px solid var(--card-border);
      color: var(--text);
      padding: 0.75rem 1rem;
      border-radius: 8px;
      font-size: 0.95rem;
      font-family: inherit;
      outline: none;
      transition: border-color 0.2s;
    }

    input[type="text"]:focus, textarea:focus, select:focus {
      border-color: var(--primary);
      box-shadow: 0 0 0 2px var(--primary-glow);
    }

    .btn {
      background: var(--primary);
      color: #031726;
      border: none;
      padding: 0.75rem 1.5rem;
      border-radius: 8px;
      font-weight: 600;
      font-size: 0.9rem;
      cursor: pointer;
      display: inline-flex;
      align-items: center;
      gap: 0.5rem;
      transition: all 0.2s;
    }

    .btn:hover {
      background: #7dd3fc;
      box-shadow: 0 0 16px rgba(56, 189, 248, 0.4);
    }

    .btn-secondary {
      background: rgba(255, 255, 255, 0.06);
      color: var(--text);
      border: 1px solid var(--card-border);
    }

    .btn-secondary:hover {
      background: rgba(255, 255, 255, 0.1);
      box-shadow: none;
    }

    .tuning-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
      gap: 1rem;
      padding: 1rem;
      background: rgba(0, 0, 0, 0.2);
      border-radius: 8px;
      border: 1px solid rgba(255, 255, 255, 0.04);
    }

    .tune-item {
      display: flex;
      flex-direction: column;
      gap: 0.4rem;
    }

    .tune-label {
      font-size: 0.8rem;
      color: var(--text-muted);
      display: flex;
      justify-content: space-between;
    }

    .tune-val {
      font-family: var(--font-mono);
      color: var(--primary);
    }

    input[type="range"] {
      accent-color: var(--primary);
      cursor: pointer;
    }

    .latency-pill {
      font-family: var(--font-mono);
      font-size: 0.85rem;
      padding: 0.25rem 0.6rem;
      border-radius: 6px;
      background: rgba(52, 211, 153, 0.15);
      border: 1px solid rgba(52, 211, 153, 0.3);
      color: #6ee7b7;
      display: inline-flex;
      align-items: center;
      gap: 0.35rem;
    }

    .results-container {
      display: flex;
      flex-direction: column;
      gap: 1rem;
      margin-top: 1rem;
    }

    .result-card {
      background: rgba(15, 23, 42, 0.5);
      border: 1px solid var(--card-border);
      border-radius: 8px;
      padding: 1.25rem;
      display: flex;
      flex-direction: column;
      gap: 0.6rem;
      transition: all 0.2s;
    }

    .result-card:hover {
      border-color: var(--card-border-hover);
      transform: translateY(-2px);
    }

    .result-header {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      gap: 1rem;
    }

    .result-title {
      font-size: 1rem;
      font-weight: 600;
      color: #e2e8f0;
    }

    .match-badge {
      font-family: var(--font-mono);
      font-size: 0.75rem;
      padding: 0.2rem 0.5rem;
      border-radius: 4px;
      background: rgba(56, 189, 248, 0.12);
      color: var(--primary);
      border: 1px solid rgba(56, 189, 248, 0.25);
    }

    .result-body {
      font-size: 0.875rem;
      color: #cbd5e1;
      line-height: 1.6;
      white-space: pre-wrap;
    }

    .result-category {
      font-size: 0.75rem;
      color: var(--accent);
      text-transform: uppercase;
      letter-spacing: 0.05em;
      font-weight: 600;
    }

    .doc-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
      gap: 1rem;
    }

    .doc-card {
      background: rgba(15, 23, 42, 0.5);
      border: 1px solid var(--card-border);
      border-radius: 8px;
      padding: 1.25rem;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      gap: 1rem;
    }

    .doc-card h3 {
      font-size: 0.95rem;
      margin-bottom: 0.4rem;
    }

    .doc-snippet {
      font-size: 0.825rem;
      color: var(--text-muted);
      line-height: 1.5;
      display: -webkit-box;
      -webkit-line-clamp: 3;
      -webkit-box-orient: vertical;
      overflow: hidden;
    }

    .code-block {
      background: #040810;
      border: 1px solid rgba(255, 255, 255, 0.06);
      border-radius: 8px;
      padding: 1rem;
      font-family: var(--font-mono);
      font-size: 0.825rem;
      color: #a5f3fc;
      overflow-x: auto;
      line-height: 1.5;
    }

    footer {
      border-top: 1px solid var(--card-border);
      padding: 1.5rem;
      text-align: center;
      font-size: 0.8rem;
      color: var(--text-muted);
    }
  </style>
</head>
<body>

  <header>
    <div class="brand">
      <div class="logo-badge">M</div>
      <div class="title-group">
        <h1>RecallOS — Moss Database Explorer</h1>
        <p>In-Process Zero-Latency Semantic Vector Engine</p>
      </div>
    </div>
    <div class="status-bar">
      <span class="pill pill-green"><span class="dot"></span> Database Online</span>
      <span class="pill pill-blue">⚡ Sub-10ms RAM Hydrated</span>
      <span class="pill" id="headerDocCount">📚 6 Documents</span>
    </div>
  </header>

  <main>
    <nav class="tabs">
      <button class="tab-btn active" onclick="switchTab('queryTab')">🔍 Semantic Search</button>
      <button class="tab-btn" onclick="switchTab('vaultTab')">📚 Knowledge Vault</button>
      <button class="tab-btn" onclick="switchTab('addTab')">➕ Insert Document</button>
      <button class="tab-btn" onclick="switchTab('apiTab')">⚡ REST Endpoints</button>
    </nav>

    <!-- Tab 1: Semantic Search -->
    <div id="queryTab" class="tab-panel active">
      <div class="card">
        <div class="card-header">
          <span class="card-title">Run In-Process Vector & Hybrid Query</span>
          <span id="latencyDisplay" class="latency-pill" style="display: none;">
            ⚡ <span id="latencyNum">0.00</span> ms
          </span>
        </div>

        <div class="search-bar-wrapper">
          <div class="input-row">
            <input type="text" id="queryInput" placeholder="Try 'launch schedule', 'security credentials', or 'marketing strategy'..." />
            <button class="btn" onclick="performQuery()">Search</button>
          </div>

          <div class="tuning-grid">
            <div class="tune-item">
              <label class="tune-label">
                <span>Hybrid Balance (&alpha;)</span>
                <span class="tune-val" id="alphaVal">0.80</span>
              </label>
              <input type="range" id="alphaSlider" min="0" max="1" step="0.05" value="0.8" oninput="document.getElementById('alphaVal').innerText = parseFloat(this.value).toFixed(2)" />
              <span style="font-size: 0.7rem; color: var(--text-muted);">0.0 = Keyword only &bull; 1.0 = Pure Semantic Vector</span>
            </div>

            <div class="tune-item">
              <label class="tune-label">
                <span>Top K Candidates</span>
                <span class="tune-val" id="topKVal">4</span>
              </label>
              <input type="range" id="topKSlider" min="1" max="10" step="1" value="4" oninput="document.getElementById('topKVal').innerText = this.value" />
              <span style="font-size: 0.7rem; color: var(--text-muted);">Max retrieved matches</span>
            </div>
          </div>
        </div>

        <div id="resultsContainer" class="results-container">
          <!-- Results will be populated dynamically -->
        </div>
      </div>
    </div>

    <!-- Tab 2: Knowledge Vault -->
    <div id="vaultTab" class="tab-panel">
      <div class="card">
        <div class="card-header">
          <span class="card-title">Stored Knowledge Documents</span>
          <button class="btn btn-secondary" onclick="loadDocuments()">↻ Refresh</button>
        </div>
        <div id="docGrid" class="doc-grid">
          <p style="color: var(--text-muted)">Loading documents...</p>
        </div>
      </div>
    </div>

    <!-- Tab 3: Insert Document -->
    <div id="addTab" class="tab-panel">
      <div class="card">
        <div class="card-header">
          <span class="card-title">Add New Document to Moss Index</span>
        </div>
        <div style="display: flex; flex-direction: column; gap: 1rem;">
          <div>
            <label style="font-size: 0.8rem; color: var(--text-muted); display: block; margin-bottom: 0.3rem;">Document Title</label>
            <input type="text" id="docTitle" placeholder="e.g. Q4 Financial Highlights" />
          </div>
          <div>
            <label style="font-size: 0.8rem; color: var(--text-muted); display: block; margin-bottom: 0.3rem;">Category</label>
            <input type="text" id="docCategory" placeholder="e.g. Finance, Architecture, HR" />
          </div>
          <div>
            <label style="font-size: 0.8rem; color: var(--text-muted); display: block; margin-bottom: 0.3rem;">Content / Passages</label>
            <textarea id="docText" rows="6" placeholder="Type document body. This will be automatically indexed into vector memory..."></textarea>
          </div>
          <button class="btn" style="align-self: flex-start;" onclick="saveDocument()">Save & Index Document</button>
        </div>
      </div>
    </div>

    <!-- Tab 4: API Reference -->
    <div id="apiTab" class="tab-panel">
      <div class="card">
        <div class="card-header">
          <span class="card-title">Direct Backend API Endpoints</span>
        </div>
        <div style="display: flex; flex-direction: column; gap: 1.5rem;">
          <div>
            <h4 style="margin-bottom: 0.5rem; font-size: 0.9rem;">1. Semantic Query (POST /api/moss/query)</h4>
            <div class="code-block">curl -X POST http://localhost:3001/api/moss/query \\
  -H "Content-Type: application/json" \\
  -d '{"query": "launch schedule", "topK": 3, "alpha": 0.8}'</div>
          </div>
          <div>
            <h4 style="margin-bottom: 0.5rem; font-size: 0.9rem;">2. List All Documents (GET /api/documents)</h4>
            <div class="code-block">curl http://localhost:3001/api/documents</div>
          </div>
          <div>
            <h4 style="margin-bottom: 0.5rem; font-size: 0.9rem;">3. Grounded AI Assistant (POST /api/assistant/chat)</h4>
            <div class="code-block">curl -X POST http://localhost:3001/api/assistant/chat \\
  -H "Content-Type: application/json" \\
  -d '{"message": "Who owns the marketing campaign?"}'</div>
          </div>
        </div>
      </div>
    </div>
  </main>

  <footer>
    RecallOS &bull; Zero-Latency Semantic Knowledge Engine powered by Moss &bull; Running on port 3001
  </footer>

  <script>
    function switchTab(tabId) {
      document.querySelectorAll('.tab-panel').forEach(p => p.classList.remove('active'));
      document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
      document.getElementById(tabId).classList.add('active');
      event.target.classList.add('active');
      if (tabId === 'vaultTab') loadDocuments();
    }

    async function performQuery() {
      const q = document.getElementById('queryInput').value.trim();
      if (!q) return;

      const alpha = parseFloat(document.getElementById('alphaSlider').value);
      const topK = parseInt(document.getElementById('topKSlider').value, 10);

      const res = await fetch('/api/moss/query', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: q, alpha, topK })
      });
      const data = await res.json();

      document.getElementById('latencyDisplay').style.display = 'inline-flex';
      document.getElementById('latencyNum').innerText = data.latencyMs;

      const container = document.getElementById('resultsContainer');
      container.innerHTML = '';

      if (!data.results || data.results.length === 0) {
        container.innerHTML = '<p style="color: var(--text-muted); padding: 1rem;">No matching documents found.</p>';
        return;
      }

      data.results.forEach(item => {
        const div = document.createElement('div');
        div.className = 'result-card';
        div.innerHTML = \`
          <div class="result-header">
            <div>
              <span class="result-category">\${item.category || 'General'}</span>
              <h3 class="result-title">\${item.title}</h3>
            </div>
            <span class="match-badge">Match: \${(item.score * 100).toFixed(1)}%</span>
          </div>
          <div class="result-body">\${item.text}</div>
        \`;
        container.appendChild(div);
      });
    }

    document.getElementById('queryInput').addEventListener('keydown', (e) => {
      if (e.key === 'Enter') performQuery();
    });

    async function loadDocuments() {
      const res = await fetch('/api/documents');
      const data = await res.json();
      document.getElementById('headerDocCount').innerText = '📚 ' + data.count + ' Documents';
      const grid = document.getElementById('docGrid');
      grid.innerHTML = '';
      data.documents.forEach(doc => {
        const card = document.createElement('div');
        card.className = 'doc-card';
        card.innerHTML = \`
          <div>
            <span class="result-category">\${doc.category || 'General'}</span>
            <h3>\${doc.title}</h3>
            <div class="doc-snippet">\${doc.text}</div>
          </div>
          <div style="font-size: 0.75rem; color: var(--text-muted); display: flex; justify-content: space-between; align-items: center;">
            <span>ID: \${doc.id}</span>
            <button class="btn btn-secondary" style="padding: 0.2rem 0.5rem; font-size: 0.75rem;" onclick="deleteDoc('\${doc.id}')">Delete</button>
          </div>
        \`;
        grid.appendChild(card);
      });
    }

    async function saveDocument() {
      const title = document.getElementById('docTitle').value.trim();
      const category = document.getElementById('docCategory').value.trim();
      const text = document.getElementById('docText').value.trim();

      if (!title || !text) {
        alert('Title and Content are required!');
        return;
      }

      const res = await fetch('/api/documents', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, category, text })
      });

      if (res.ok) {
        document.getElementById('docTitle').value = '';
        document.getElementById('docCategory').value = '';
        document.getElementById('docText').value = '';
        alert('Document saved and indexed into Moss successfully!');
        switchTab('vaultTab');
      } else {
        alert('Error saving document.');
      }
    }

    async function deleteDoc(id) {
      if (!confirm('Are you sure you want to delete this document?')) return;
      const res = await fetch('/api/documents/' + id, { method: 'DELETE' });
      if (res.ok) {
        loadDocuments();
      }
    }

    // Auto load initial query
    document.getElementById('queryInput').value = 'Project launch schedule';
    performQuery();
  </script>
</body>
</html>
`;
};
