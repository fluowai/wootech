import express from "express";
import path from "path";
import cors from "cors";
import axios from "axios";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import { ChatRequest, ChatResponse, LLMModel, AIAgent } from "./src/types";

// --- CONFIGURATION ---
const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY || "",
  httpOptions: {
    headers: {
      'User-Agent': 'aistudio-build',
    }
  }
});

// --- IN-MEMORY MOCK DB (MEXUS CORE) ---
const MOCK_SYSTEMS = [
  { id: "sys_nexus", name: "Nexus Core", slug: "nexus", apiKey: "sk_nexus_845", status: "active" },
  { id: "sys_imob", name: "ImobFlow", slug: "imobflow", apiKey: "sk_imob_721", status: "active" },
  { id: "sys_med", name: "WooMed AI", slug: "woomed", apiKey: "sk_med_102", status: "active" },
  { id: "sys_gab", name: "Gabinete Digital", slug: "gabinete", apiKey: "sk_gab_334", status: "active" },
];

const MOCK_MODELS: LLMModel[] = [
  { 
    id: 'm1', name: 'Qwen 2.5 72B', provider: 'Self-Hosted', engine: 'vllm', endpoint: 'http://vllm-01:8000', 
    modelId: 'qwen-72b', maxContext: 128000, features: { streaming: true, functionCalling: true, image: false, audio: false, embeddings: true },
    internalCost: 0.02, salePrice: 0.05, status: 'online', priority: 1 
  },
  { 
    id: 'm2', name: 'DeepSeek-R1', provider: 'Self-Hosted', engine: 'sglang', endpoint: 'http://sglang-01:3000', 
    modelId: 'deepseek-r1', maxContext: 32000, features: { streaming: true, functionCalling: true, image: false, audio: false, embeddings: false },
    internalCost: 0.05, salePrice: 0.12, status: 'online', priority: 2 
  },
  { 
    id: 'm3', name: 'Flux.1 Dev', provider: 'Self-Hosted', engine: 'vllm', endpoint: 'http://flux-01:8000', 
    modelId: 'flux-dev', maxContext: 0, features: { streaming: false, functionCalling: false, image: true, audio: false, embeddings: false },
    internalCost: 0.50, salePrice: 1.20, status: 'online', priority: 3 
  },
  { 
    id: 'm4', name: 'Stable Diffusion 3.5', provider: 'Self-Hosted', engine: 'external', endpoint: 'https://api.stability.ai', 
    modelId: 'sd-3.5', maxContext: 0, features: { streaming: false, functionCalling: false, image: true, audio: false, embeddings: false },
    internalCost: 0.30, salePrice: 0.80, status: 'online', priority: 4 
  },
  { 
    id: 'm5', name: 'SDXL 1.0', provider: 'Self-Hosted', engine: 'vllm', endpoint: 'http://sdxl-01:8000', 
    modelId: 'sdxl', maxContext: 0, features: { streaming: false, functionCalling: false, image: true, audio: false, embeddings: false },
    internalCost: 0.20, salePrice: 0.50, status: 'online', priority: 5 
  },
  { 
    id: 'm6', name: 'Sana 1.6B', provider: 'Self-Hosted', engine: 'vllm', endpoint: 'http://sana-01:8000', 
    modelId: 'sana', maxContext: 0, features: { streaming: false, functionCalling: false, image: true, audio: false, embeddings: false },
    internalCost: 0.15, salePrice: 0.40, status: 'online', priority: 6 
  }
];

const MOCK_AGENTS: AIAgent[] = [
  { 
    id: "ag_nexus_crm", systemId: "sys_nexus", name: "Agente CRM", slug: "nexus-crm", 
    systemPrompt: "Você é o especialista de CRM do Nexus. Responda de forma humana, breve e direta. Evite textos longos.", modelPreference: "m1", temperature: 0.7, maxTokens: 2000, 
    toolsEnabled: ['crm_access'], status: "active" 
  },
  { 
    id: "ag_imob_corretor", systemId: "sys_imob", name: "Corretor Digital", slug: "imob-broker", 
    systemPrompt: "Você é um corretor imobiliário da ImobFlow. Responda de forma natural e concisa, como em uma conversa de WhatsApp. Vá direto ao ponto.", modelPreference: "m1", temperature: 0.8, maxTokens: 3000, 
    toolsEnabled: ['property_search'], status: "active" 
  }
];

const MOCK_CLIENTS = [
  { id: "cli_123", systemId: "sys_imob", name: "Imobiliária Silva", creditBalance: 42500, status: "active", plan: "Pro" }
];

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(cors());
  app.use(express.json());

  // --- MIDDLEWARE: MEXUS API AUTH ---
  const authenticateSystem = (req: express.Request, res: express.Response, next: express.NextFunction) => {
    const apiKey = req.headers["x-api-key"] || req.headers["authorization"]?.replace("Bearer ", "");
    const system = MOCK_SYSTEMS.find(s => s.apiKey === apiKey);
    
    if (!system) return res.status(401).json({ error: "Invalid MEXUS API Key" });
    (req as any).system = system;
    next();
  };

  // --- MAIN CHAT GATEWAY (MEXUS AI CORE) ---
  app.post("/api/ai/chat", authenticateSystem, async (req, res) => {
    const { client_id, message, agent: agentSlug, model: modelId } = req.body as ChatRequest;
    const system = (req as any).system;

    const client = MOCK_CLIENTS.find(c => c.id === client_id && c.systemId === system.id);
    if (!client) return res.status(404).json({ error: "Cliente MEXUS não encontrado para este sistema" });
    if (client.creditBalance <= 0) return res.status(402).json({ error: "Saldo de créditos MEXUS insuficiente" });

    const agent = MOCK_AGENTS.find(a => a.slug === agentSlug && a.systemId === system.id);
    const selectedModel = MOCK_MODELS.find(m => m.id === (modelId || agent?.modelPreference)) || MOCK_MODELS[0];

    const startTime = Date.now();

    // Se o modelo for de imagem, retornar resposta especial para simular geração
    if (selectedModel.features.image) {
      const creditsUsed = selectedModel.salePrice;
      client.creditBalance -= creditsUsed;

      return res.json({
        success: true,
        response: `[IMAGE_GEN] Gerando imagem para: ${message}. Clique no botão 'Visualizar' para ver o resultado.`,
        usage: {
          model: selectedModel.name,
          provider: "MEXUS Visual Node",
          tokens: 0,
          credits: creditsUsed
        }
      });
    }

    try {
      // Prompt mestre do MEXUS AI
      const systemPrompt = agent?.systemPrompt || "Você é o MEXUS AI Core, operando em infraestrutura privada. Responda em português brasileiro.";

      const interaction = await ai.interactions.create({
        model: "gemini-3.5-flash",
        input: message,
        system_instruction: systemPrompt
      });
      
      const completion = interaction.output_text || "";
      
      const endTime = Date.now();
      const latency = endTime - startTime;

      // Cálculo de billing MEXUS
      const tokensGenerated = (completion.length + message.length) / 4;
      let creditsUsed = Math.ceil(tokensGenerated / 100);
      
      if (message.length > 500) creditsUsed *= 3; 

      client.creditBalance -= creditsUsed;

      res.json({
        success: true,
        response: completion,
        usage: {
          model: selectedModel.name,
          provider: "MEXUS Core",
          tokens: Math.round(tokensGenerated),
          credits: creditsUsed
        }
      });
    } catch (error) {
      console.error("Gemini Error:", error);
      res.status(500).json({ error: "Falha na inferência neural" });
    }
  });

  // --- LANDING PAGE GENERATION ENDPOINT ---
  app.post("/api/ai/landing/generate", authenticateSystem, async (req, res) => {
    const { prompt } = req.body;
    
    try {
      const interaction = await ai.interactions.create({ 
        model: "gemini-3.1-pro-preview",
        system_instruction: "Você é um mestre em design de landing pages e desenvolvimento web. Gere o código HTML completo de uma landing page moderna, profissional e responsiva usando Tailwind CSS via CDN. Inclua seções de Hero, Features, Testemunhos e Contato. Use imagens do Unsplash para placeholders. Retorne APENAS o código HTML bruto, sem blocos de markdown ou explicações.",
        input: prompt
      });

      let html = interaction.output_text || "";
      if (html.includes("```html")) {
        html = html.split("```html")[1].split("```")[0];
      } else if (html.includes("```")) {
        const parts = html.split("```");
        html = parts.length > 1 ? parts[1] : parts[0];
      }
      html = html.trim();

      res.json({ success: true, html });
    } catch (error) {
      console.error("Landing Gen Error:", error);
      res.status(500).json({ error: "Falha ao gerar landing page" });
    }
  });

  // --- IMAGE GENERATION ENDPOINT ---
  app.post("/api/ai/media/generate", authenticateSystem, async (req, res) => {
    const { client_id, prompt, modelId } = req.body;
    const system = (req as any).system;

    const client = MOCK_CLIENTS.find(c => c.id === client_id && c.systemId === system.id);
    if (!client) return res.status(404).json({ error: "Cliente não encontrado" });

    const model = MOCK_MODELS.find(m => m.id === modelId) || MOCK_MODELS[2];
    
    // Simulação de delay de GPU
    setTimeout(() => {
      const creditsUsed = model.salePrice;
      client.creditBalance -= creditsUsed;

      res.json({
        success: true,
        url: `https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1000&auto=format&fit=crop`,
        model: model.name,
        creditsUsed
      });
    }, 3000);
  });

  // --- ADMIN API ---
  app.get("/api/admin/stats", (req, res) => {
    res.json({
      total_messages: 1245000,
      total_tokens: 845200000,
      active_clients: MOCK_CLIENTS.length,
      active_systems: MOCK_SYSTEMS.length,
      revenue_est: 12840.00,
      latency_avg: "42ms"
    });
  });

  app.get("/api/admin/systems", (req, res) => res.json(MOCK_SYSTEMS));
  app.get("/api/admin/agents", (req, res) => res.json(MOCK_AGENTS));
  app.get("/api/admin/models", (req, res) => res.json(MOCK_MODELS));
  app.get("/api/admin/clients", (req, res) => res.json(MOCK_CLIENTS));

  // --- VITE MIDDLEWARE ---
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`MEXUS AI CORE active on port ${PORT}`);
  });
}

startServer();
