export interface KnowledgeDocument {
  id: string;
  title: string;
  text: string;
  category: string;
  updatedAt: string;
  metadata?: Record<string, any>;
}

export interface SearchQueryResult {
  id: string;
  title: string;
  text: string;
  score: number;
  category?: string;
  metadata?: Record<string, any>;
}

export interface SearchResponse {
  query: string;
  latencyMs: number;
  engine: 'moss-cloud' | 'moss-in-process' | 'moss-local-fallback';
  totalResults: number;
  alpha: number;
  results: SearchQueryResult[];
}

export interface AssistantChatRequest {
  message: string;
  topK?: number;
  alpha?: number;
  documentId?: string;
}

export interface Citation {
  documentId: string;
  title: string;
  snippet: string;
  score: number;
}

export interface AssistantChatResponse {
  answer: string;
  retrievalLatencyMs: number;
  generationLatencyMs: number;
  totalLatencyMs: number;
  citations: Citation[];
  grounded: boolean;
  engine: string;
}

export interface SystemStatus {
  status: 'online' | 'degraded' | 'offline';
  mossConfigured: boolean;
  mossConnected: boolean;
  indexLoaded: boolean;
  activeEngine: string;
  indexName: string;
  documentCount: number;
  sub10msReady: boolean;
}
