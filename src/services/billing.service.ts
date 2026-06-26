export class BillingService {
  /**
   * Calculate credits based on model and token usage
   */
  static calculateCredits(model: string, promptTokens: number, completionTokens: number) {
    let multiplier = 1.0;
    
    // Logic based on provider/model
    if (model.includes('gpt-4')) multiplier = 20.0;
    else if (model.includes('gemini-pro')) multiplier = 5.0;
    else if (model.includes('local') || model.includes('qwen')) multiplier = 1.0;
    
    const baseCost = (promptTokens + completionTokens) / 1000;
    return Math.max(1, Math.ceil(baseCost * multiplier));
  }

  /**
   * Check if client has enough credits
   */
  static async hasSufficientCredits(client: any, estimatedCost: number = 1) {
    return client.creditBalance >= estimatedCost;
  }
}
