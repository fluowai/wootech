/**
 * Mock WhatsApp Service integration via WhatsMeow
 * In production, this would communicate with a Go service running WhatsMeow
 */
export class WhatsAppService {
  static async sendResponse(instanceId: string, leadId: string, message: string) {
    console.log(`[WhatsApp] Enviando resposta para ${leadId} via instância ${instanceId}: ${message}`);
    // Proxy call to WhatsMeow internal API
    return { success: true, messageId: `msg_${Date.now()}` };
  }

  static async getInstances() {
    return [
      { id: 'imobflow_cliente_123', name: 'ImobFlow - Matriz', status: 'connected', messagesToday: 450 },
      { id: 'woomed_clinica_456', name: 'WooMed - Unidade 1', status: 'connected', messagesToday: 120 },
      { id: 'nexus_vendas_789', name: 'Nexus - Vendas', status: 'disconnected', messagesToday: 0 }
    ];
  }
}
