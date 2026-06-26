export type SystemRole = 'ADMIN' | 'OPERATOR';

export interface User {
  id: string;
  name: string;
  email: string;
  role: SystemRole;
}

export interface AISystem {
  id: string;
  name: string;
  slug: string;
  apiKey: string;
  status: 'active' | 'inactive';
}

export interface Client {
  id: string;
  systemId: string;
  name: string;
  document: string;
  email: string;
  status: 'active' | 'blocked';
  creditBalance: number;
}

export interface Plan {
  id: string;
  name: string;
  monthlyPrice: number;
  includedCredits: number;
  overagePrice: number;
}

export interface AIAgent {
  id: string;
  systemId: string;
  clientId?: string;
  name: string;
  slug: string;
  systemPrompt: string;
  securityPrompt?: string;
  modelPreference: string;
  fallbackModel?: string;
  temperature: number;
  maxTokens: number;
  toolsEnabled: string[];
  kbId?: string;
  costPerExecution?: number;
  usageLimit?: number;
  status: 'active' | 'inactive';
}

export interface LLMModel {
  id: string;
  name: string;
  provider: string;
  engine: 'ollama' | 'vllm' | 'llama.cpp' | 'tgi' | 'sglang' | 'external';
  endpoint: string;
  modelId: string;
  maxContext: number;
  features: {
    streaming: boolean;
    functionCalling: boolean;
    image: boolean;
    audio: boolean;
    embeddings: boolean;
  };
  internalCost: number;
  salePrice: number;
  status: 'online' | 'offline';
  priority: number;
  fallbackId?: string;
}

export interface BillingPlan {
  id: string;
  name: string;
  monthlyPrice: number;
  includedCredits: number;
  limitMessages: number;
  limitTokens: number;
  limitAgents: number;
  limitDocs: number;
  overagePrice: number;
}

export interface UsageLog {
  id: string;
  clientId: string;
  systemId: string;
  agentId: string;
  modelUsed: string;
  promptTokens: number;
  completionTokens: number;
  totalTokens: number;
  creditsUsed: number;
  latencyMs: number;
  createdAt: string;
}

export interface ChatRequest {
  system: string;
  client_id: string;
  user_id: string;
  agent: string;
  channel: string;
  model?: string;
  message: string;
  context?: Record<string, any>;
}

export interface ChatResponse {
  success: boolean;
  response: string;
  usage: {
    model: string;
    provider: string;
    tokens: number;
    credits: number;
  };
}

export interface KnowledgeBase {
  id: string;
  clientId: string;
  name: string;
  description: string;
  status: 'active' | 'inactive';
  documentCount: number;
}

export interface KnowledgeDocument {
  id: string;
  kbId: string;
  fileName: string;
  fileType: string;
  status: 'indexed' | 'processing' | 'error';
  createdAt: string;
}
