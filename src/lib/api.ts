import axios from 'axios';

export const api = axios.create({
  baseURL: '/api',
});

export const adminApi = {
  getStats: () => api.get('/admin/stats').then(res => res.data),
  getSystems: () => api.get('/admin/systems').then(res => res.data),
  getAgents: () => api.get('/admin/agents').then(res => res.data),
  getClients: () => api.get('/admin/clients').then(res => res.data),
  getWhatsApp: () => Promise.resolve([
    { id: 'inst_1', name: 'WhatsApp ImobFlow', status: 'connected', quality: 'high', mps: '2.5 msg/s' },
    { id: 'inst_2', name: 'WhatsApp WooMed', status: 'connected', quality: 'high', mps: '1.2 msg/s' },
    { id: 'inst_3', name: 'WhatsApp Gabinete', status: 'disconnected', quality: 'none', mps: '0 msg/s' },
  ])
};
