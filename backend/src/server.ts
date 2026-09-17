import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { mossService } from './services/mossService.js';
import { assistantService } from './services/assistantService.js';
import { getDashboardHtml } from './dashboardHtml.js';

// Load environment variables from .env
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json({ limit: '10mb' }));

// 0. Root route: Moss Database Explorer UI
app.get('/', (req, res) => {
  res.send(getDashboardHtml());
});

// 1. Health check
app.get('/api/health', (req, res) => {
  res.json({
    service: 'RecallOS Backend API',
    status: 'online',
    timestamp: new Date().toISOString(),
    version: '1.0.0'
  });
});

// 2. Moss Status
app.get('/api/moss/status', async (req, res) => {
  try {
    const status = await mossService.getStatus();
    res.json(status);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

// 3. Rebuild / Refresh Index
app.post('/api/moss/rebuild', async (req, res) => {
  try {
    const result = await mossService.rebuildIndex();
    res.json(result);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

// 4. Document CRUD
app.get('/api/documents', async (req, res) => {
  try {
    const docs = await mossService.getDocuments();
    res.json({ documents: docs, count: docs.length });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

app.get('/api/documents/:id', async (req, res) => {
  try {
    const doc = await mossService.getDocumentById(req.params.id);
    if (!doc) {
      return res.status(404).json({ error: 'Document not found' });
    }
    res.json(doc);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/api/documents', async (req, res) => {
  try {
    const { title, text, category, metadata, id } = req.body;
    if (!title || !text) {
      return res.status(400).json({ error: 'Title and text are required' });
    }
    const savedDoc = await mossService.addOrUpdateDocument({
      id,
      title,
      text,
      category: category || 'General',
      metadata: metadata || {}
    });
    res.status(201).json(savedDoc);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

app.delete('/api/documents/:id', async (req, res) => {
  try {
    const deleted = await mossService.deleteDocument(req.params.id);
    if (!deleted) {
      return res.status(404).json({ error: 'Document not found' });
    }
    res.json({ success: true, id: req.params.id });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

// 5. Semantic / Hybrid Query
app.post('/api/moss/query', async (req, res) => {
  try {
    const { query, topK, alpha, category } = req.body;
    if (!query || typeof query !== 'string') {
      return res.status(400).json({ error: 'Query string is required' });
    }

    const response = await mossService.query(query, {
      topK: topK ? Number(topK) : 4,
      alpha: alpha !== undefined ? Number(alpha) : 0.8,
      category
    });

    res.json(response);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

// 6. Grounded AI Assistant Chat
app.post('/api/assistant/chat', async (req, res) => {
  try {
    const { message, topK, alpha } = req.body;
    if (!message) {
      return res.status(400).json({ error: 'Message is required' });
    }

    const response = await assistantService.generateAnswer({
      message,
      topK: topK ? Number(topK) : 3,
      alpha: alpha !== undefined ? Number(alpha) : 0.8
    });

    res.json(response);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

// 7. Custom Authenticator Token Endpoint (Moss official pattern)
app.get('/api/moss-token', async (req, res) => {
  try {
    const tokenPayload = await mossService.getAuthToken();
    res.json(tokenPayload);
  } catch (err: any) {
    res.status(500).json({ error: 'Failed to mint Moss auth token: ' + err.message });
  }
});

app.listen(PORT, () => {
  console.log(`=========================================`);
  console.log(`🚀 RecallOS Backend API Running`);
  console.log(`📍 Port: http://localhost:${PORT}`);
  console.log(`⚡ Moss Zero-Latency Semantic Search Engine Ready`);
  console.log(`=========================================`);
});
