import { useState } from 'react';
import { Zap, Image as ImageIcon, Layout, Sparkles, Wand2, Download, ExternalLink, RefreshCw, Layers, Palette, Type } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios';

export default function VisualStudio() {
  const [prompt, setPrompt] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [generatedHtml, setGeneratedHtml] = useState<string | null>(null);
  const [type, setType] = useState<'image' | 'landing'>('landing');
  const [selectedModel, setSelectedModel] = useState('m3'); // Flux.1 Dev

  const handleGenerate = async () => {
    if (!prompt) return;
    setIsGenerating(true);
    setGeneratedImage(null);
    setGeneratedHtml(null);
    
    try {
      if (type === 'landing') {
        const response = await axios.post('/api/ai/landing/generate', {
          prompt: prompt
        }, {
          headers: { 'x-api-key': 'sk_imob_721' }
        });
        setGeneratedHtml(response.data.html);
      } else {
        const response = await axios.post('/api/ai/media/generate', {
          client_id: 'cli_123',
          prompt: prompt,
          modelId: selectedModel
        }, {
          headers: { 'x-api-key': 'sk_imob_721' }
        });
        setGeneratedImage(response.data.url);
      }
    } catch (err) {
      console.error('Failed to generate', err);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="space-y-8 max-w-5xl mx-auto">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-slate-800 tracking-tight">MEXUS Visual Studio</h2>
          <p className="text-sm text-slate-500 font-medium mt-1">Gere Landing Pages e Ativos Visuais via Prompt</p>
        </div>
        <div className="flex bg-white p-1 rounded-2xl border border-slate-100 shadow-sm">
          <button 
            onClick={() => setType('landing')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${type === 'landing' ? 'bg-indigo-600 text-white shadow-lg' : 'text-slate-400 hover:bg-slate-50'}`}
          >
            <Layout size={14} /> Landing Pages
          </button>
          <button 
            onClick={() => setType('image')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${type === 'image' ? 'bg-indigo-600 text-white shadow-lg' : 'text-slate-400 hover:bg-slate-50'}`}
          >
            <ImageIcon size={14} /> Imagens/Logos
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm space-y-6">
            <div>
              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-3 block">Motor de Geração</label>
              <select 
                value={selectedModel}
                onChange={(e) => setSelectedModel(e.target.value)}
                className="w-full bg-slate-50 border border-slate-100 rounded-xl p-3 text-sm font-bold text-slate-700 outline-none focus:ring-2 focus:ring-indigo-500"
              >
                <option value="m3">Flux.1 Dev (Realismo)</option>
                <option value="m4">Stable Diffusion 3.5 (Design)</option>
              </select>
            </div>

            <div>
              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-3 block">Estilo Visual</label>
              <div className="grid grid-cols-2 gap-2">
                {['Minimalista', 'Futurista', 'Corporativo', 'Retro', 'Clean', 'Bold'].map((style) => (
                  <button key={style} className="p-2 border border-slate-100 rounded-lg text-[10px] font-bold text-slate-500 hover:bg-indigo-50 hover:text-indigo-600 transition-all">
                    {style}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-3 block">Configurações</label>
              <div className="space-y-4">
                <div className="flex justify-between items-center text-[10px] font-bold uppercase tracking-widest text-slate-500">
                  <span>Qualidade</span>
                  <span className="text-indigo-600">Ultra HD</span>
                </div>
                <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
                  <div className="bg-indigo-600 h-full w-[85%]" />
                </div>
              </div>
            </div>
          </div>

          <div className="bg-indigo-600 p-6 rounded-3xl text-white shadow-xl shadow-indigo-200 space-y-4">
            <div className="flex items-center gap-3">
              <Sparkles size={20} />
              <span className="text-sm font-bold uppercase tracking-widest">Dica MEXUS</span>
            </div>
            <p className="text-xs font-medium opacity-80 leading-relaxed">
              Use descrições detalhadas. Ex: "Landing page para imobiliária de luxo, cores dourado e preto, estilo Apple, alta conversão".
            </p>
          </div>
        </div>

        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white p-2 rounded-[2rem] border border-slate-100 shadow-sm flex flex-col h-[500px]">
            <textarea 
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder={type === 'landing' ? "Descreva a Landing Page que deseja criar..." : "Descreva a imagem ou logo..."}
              className="flex-1 p-8 text-lg font-medium text-slate-600 placeholder:text-slate-300 outline-none resize-none bg-transparent"
            />
            <div className="p-4 border-t border-slate-50 flex items-center justify-between bg-slate-50/50 rounded-b-[1.8rem]">
              <div className="flex gap-2">
                 <button className="p-2 text-slate-400 hover:bg-white rounded-lg transition-all"><Palette size={18} /></button>
                 <button className="p-2 text-slate-400 hover:bg-white rounded-lg transition-all"><Type size={18} /></button>
                 <button className="p-2 text-slate-400 hover:bg-white rounded-lg transition-all"><Layers size={18} /></button>
              </div>
              <button 
                onClick={handleGenerate}
                disabled={isGenerating || !prompt}
                className="flex items-center gap-2 bg-indigo-600 text-white px-8 py-3 rounded-2xl font-bold shadow-lg shadow-indigo-200 hover:bg-indigo-700 transition-all disabled:opacity-50"
              >
                {isGenerating ? (
                  <>
                    <RefreshCw size={18} className="animate-spin" />
                    Gerando...
                  </>
                ) : (
                  <>
                    <Wand2 size={18} />
                    {type === 'landing' ? 'Criar Landing Page' : 'Gerar Imagem'}
                  </>
                )}
              </button>
            </div>
          </div>

          <AnimatePresence>
            {(generatedImage || generatedHtml) && (
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white p-6 rounded-[2.5rem] border border-slate-100 shadow-sm overflow-hidden"
              >
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-sm font-bold text-slate-800 uppercase tracking-widest">
                    {generatedHtml ? 'Preview da Landing Page' : 'Resultado da Geração'}
                  </h3>
                  <div className="flex gap-2">
                    <button className="p-2 bg-slate-50 text-slate-400 rounded-xl hover:text-indigo-600 transition-all"><Download size={18} /></button>
                    <button 
                      onClick={() => {
                        if (generatedHtml) {
                          const win = window.open();
                          win?.document.write(generatedHtml);
                          win?.document.close();
                        }
                      }}
                      className="p-2 bg-slate-50 text-slate-400 rounded-xl hover:text-indigo-600 transition-all"
                    >
                      <ExternalLink size={18} />
                    </button>
                  </div>
                </div>
                <div className="bg-slate-50 rounded-3xl border border-slate-100 overflow-hidden relative group">
                  {generatedHtml ? (
                    <div className="w-full h-[600px] bg-white rounded-2xl overflow-hidden shadow-inner">
                      <iframe 
                        srcDoc={generatedHtml} 
                        className="w-full h-full border-none" 
                        title="Landing Page Preview"
                      />
                    </div>
                  ) : (
                    <div className="aspect-video">
                      <img src={generatedImage!} alt="Generated" className="w-full h-full object-cover" />
                      <div className="absolute inset-0 bg-indigo-900/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-sm">
                        <button className="bg-white text-indigo-600 px-6 py-3 rounded-xl font-bold text-sm flex items-center gap-2">
                           <Layout size={18} /> Visualizar Fullscreen
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
