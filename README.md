# MEXUS AI CORE - Central de IA Auto-Hospedada

MEXUS AI CORE é uma infraestrutura robusta para rodar, gerenciar e monetizar modelos de IA privados. Desenhada para ecossistemas multi-tenant como Nexus, ImobFlow, WooMed e Gabinete.

## 🚀 Como Iniciar

### Pré-requisitos
- Docker & Docker Compose
- NVIDIA Container Toolkit (Para aceleração por GPU/vLLM)
- Portainer (Recomendado para gestão)

### Instalação Rápida

1. Clone o repositório no seu servidor:
   ```bash
   git clone https://github.com/mexus-core/mexus-ai-core.git
   cd mexus-ai-core
   ```

2. Configure o ambiente:
   ```bash
   cp .env.example .env
   # Edite o .env com suas chaves e endpoints
   ```

3. Suba a infraestrutura:
   ```bash
   docker-compose up -d
   ```

## 🏗️ Arquitetura

- **MEXUS ADMIN**: Painel de gestão de clientes, sistemas, agentes e billing.
- **MEXUS GATEWAY**: Ponto único de entrada para todas as requisições de IA.
- **LiteLLM**: Abstração de modelos compatível com OpenAI.
- **Ollama/vLLM**: Motores de inferência de modelos open-weight.
- **Qdrant**: Banco vetorial de alta performance para RAG.

## 🔑 Endpoints Principais

- **Admin UI**: `http://localhost:3100`
- **AI Gateway**: `http://localhost:3200/api/ai/chat`
- **OpenAI Proxy**: `http://localhost:4000/v1`
- **Qdrant Dashboard**: `http://localhost:6333/dashboard`

## 🛠️ Suporte a Modelos
MEXUS suporta qualquer modelo compatível com Ollama ou vLLM, incluindo Qwen, Llama 3.1, DeepSeek-V3 e R1.

---
© 2024 MEXUS AI CORE - Inteligência Privada.
