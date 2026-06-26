import axios from 'axios';

const QDRANT_URL = process.env.QDRANT_URL || 'http://localhost:6333';

export class KnowledgeService {
  /**
   * Index a text chunk into Qdrant for a specific client knowledge base
   */
  static async indexText(kbId: string, text: string, metadata: any = {}) {
    try {
      // In a real implementation, we'd generate embeddings first (e.g., via OpenAI or Gemini)
      // For this example, we'll assume a local embedding service or LiteLLM embedding endpoint
      const embedding = await this.generateEmbedding(text);
      
      const pointId = Math.random().toString(36).substring(7);
      
      await axios.put(`${QDRANT_URL}/collections/${kbId}/points`, {
        points: [
          {
            id: pointId,
            vector: embedding,
            payload: {
              text,
              ...metadata,
              indexed_at: new Date().toISOString()
            }
          }
        ]
      });
      
      return pointId;
    } catch (error: any) {
      console.error('Error indexing knowledge:', error.message);
      throw error;
    }
  }

  /**
   * Search for relevant context in a knowledge base
   */
  static async search(kbId: string, query: string, limit: number = 3) {
    try {
      const embedding = await this.generateEmbedding(query);
      
      const response = await axios.post(`${QDRANT_URL}/collections/${kbId}/points/search`, {
        vector: embedding,
        limit,
        with_payload: true
      });
      
      return response.data.result.map((hit: any) => hit.payload.text).join('\n\n');
    } catch (error: any) {
      console.warn('Search failed or collection does not exist:', error.message);
      return '';
    }
  }

  private static async generateEmbedding(text: string) {
    // Mock embedding - in production use LiteLLM /embedding endpoint or @google/genai
    // For now, returning a dummy vector of 1536 dims (OpenAI standard)
    return Array.from({ length: 1536 }, () => Math.random());
  }

  static async createCollection(kbId: string) {
    try {
      await axios.put(`${QDRANT_URL}/collections/${kbId}`, {
        vectors: {
          size: 1536,
          distance: 'Cosine'
        }
      });
    } catch (error: any) {
      // Ignore if already exists
    }
  }
}
