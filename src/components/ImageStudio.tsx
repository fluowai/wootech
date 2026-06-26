import { useState } from 'react';
import { Sparkles, Wand2, RefreshCw, Settings2, Image as ImageIcon, Download, Maximize2, Share2, Info, Palette, Sliders, Hash } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios';

export default function ImageStudio() {
  const [prompt, setPrompt] = useState('');
  const [negativePrompt, setNegativePrompt] = useState('low quality, blurry, distorted');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  
  // Advanced Parameters
  const [model, setModel] = useState('m3'); // Flux.1 Dev
  const [resolution, setResolution] = useState('1024x1024');
  const [seed, setSeed] = useState('-1');
  const [steps, setSteps] = useState(30);
  const [cfgScale, setCfgScale] = useState(7.5);
  const [style, setStyle] = useState('Cinematic');

  const resolutions = [
    { label: 'Quadrado (1:1)', value: '1024x1024' },
    { label: 'Landing Hero (16:9)', value: '1920x1080' },
    { label: 'Mobile (9:16)', value: '1080x1920' },
    { label: 'Portrait (3:4)', value: '768x1024' },
  ];

  const styles = ['Cinematic', 'Realistic', 'Digital Art', 'Cyberpunk', 'Minimalist', 'Anime', 'Oil Painting', 'Sketch'];

  const handleGenerate = async () => {
    if (!prompt) return;
    setIsGenerating(true);
    try {
      const response = await axios.post('/api/ai/media/generate', {
        client_id: 'cli_123',
        prompt: `${style} style: ${prompt}`,
        negative_prompt: negativePrompt,
        modelId: model,
        params: {
          resolution,
          seed: seed === '-1' ? Math.floor(Math.random() * 1000000) : parseInt(seed),
          steps,
          cfgScale
        }
      }, {
        headers: { 'x-api-key': 'sk_imob_721' }
      });
      setGeneratedImage(response.data.url);
    } catch (err) {
      console.error('Generation failed', err);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="grid grid-cols-1 xl:grid-cols-12 gap-8 max-w-[1600px] mx-auto">
      {/* Control Panel */}
      <div className="xl:col-span-4 space-y-6">
        <div className="bg-white rounded-[2.5rem] p-8 border border-slate-100 shadow-sm space-y-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-indigo-600 rounded-xl text-white">
              <Settings2 size={20} />
            </div>
            <h3 className="text-lg font-bold text-slate-800">Parâmetros de Geração</h3>
          </div>

          <div className="space-y-6">
            {/* Model Selection */}
            <div>
              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-3 block flex items-center gap-2">
                <Sparkles size={12} /> Modelo Base
              </label>
              <select 
                value={model}
                onChange={(e) => setModel(e.target.value)}
                className="w-full bg-slate-50 border border-slate-100 rounded-2xl p-4 text-sm font-bold text-slate-700 outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
              >
                <option value="m3">Flux.1 Dev (Ultra Realismo)</option>
                <option value="m4">Stable Diffusion 3.5 (Design)</option>
                <option value="m5">SDXL 1.0 (Versátil)</option>
                <option value="m6">Sana 1.6B (Performance)</option>
              </select>
            </div>

            {/* Resolution Selection */}
            <div>
              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-3 block">Resolução / Aspect Ratio</label>
              <div className="grid grid-cols-2 gap-2">
                {resolutions.map((res) => (
                  <button
                    key={res.value}
                    onClick={() => setResolution(res.value)}
                    className={`p-3 rounded-xl border text-[10px] font-bold transition-all ${
                      resolution === res.value 
                        ? 'bg-indigo-600 border-indigo-600 text-white shadow-lg' 
                        : 'bg-white border-slate-100 text-slate-500 hover:border-indigo-200'
                    }`}
                  >
                    {res.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Seed & Steps */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-3 block flex items-center gap-2">
                  <Hash size={12} /> Seed
                </label>
                <input 
                  type="text" 
                  value={seed}
                  onChange={(e) => setSeed(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-100 rounded-xl p-3 text-xs font-bold text-slate-600"
                />
              </div>
              <div>
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-3 block flex items-center gap-2">
                  <Sliders size={12} /> Passos
                </label>
                <input 
                  type="number" 
                  value={steps}
                  onChange={(e) => setSteps(parseInt(e.target.value))}
                  className="w-full bg-slate-50 border border-slate-100 rounded-xl p-3 text-xs font-bold text-slate-600"
                />
              </div>
            </div>

            {/* Style Presets */}
            <div>
              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-3 block flex items-center gap-2">
                <Palette size={12} /> Engenharia de Estilo
              </label>
              <div className="flex flex-wrap gap-2">
                {styles.map((s) => (
                  <button
                    key={s}
                    onClick={() => setStyle(s)}
                    className={`px-3 py-1.5 rounded-full border text-[10px] font-bold transition-all ${
                      style === s 
                        ? 'bg-indigo-50 border-indigo-200 text-indigo-600' 
                        : 'bg-white border-slate-100 text-slate-400 hover:bg-slate-50'
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="bg-emerald-50 rounded-3xl p-6 border border-emerald-100">
          <div className="flex items-center gap-3 text-emerald-700 mb-2">
            <Info size={16} />
            <span className="text-xs font-bold uppercase tracking-widest">Dica Visual</span>
          </div>
          <p className="text-[11px] text-emerald-600 font-medium leading-relaxed">
            Para landing pages, use resoluções 16:9 e mencione "high quality interface design, UI/UX, website header" no seu prompt.
          </p>
        </div>
      </div>

      {/* Generation Area */}
      <div className="xl:col-span-8 space-y-6">
        <div className="bg-white rounded-[2.5rem] p-8 border border-slate-100 shadow-sm space-y-6">
          <div className="space-y-4">
            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block">Prompt Positivo</label>
            <textarea 
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="Descreva o que deseja gerar (ex: Landing page moderna para SaaS de IA, minimalista, cores azul e branco...)"
              className="w-full h-32 bg-slate-50 border border-slate-100 rounded-2xl p-6 text-slate-700 font-medium outline-none focus:ring-2 focus:ring-indigo-500 resize-none transition-all"
            />
          </div>

          <div className="space-y-4">
            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block">Prompt Negativo (O que evitar)</label>
            <input 
              type="text"
              value={negativePrompt}
              onChange={(e) => setNegativePrompt(e.target.value)}
              className="w-full bg-slate-50 border border-slate-100 rounded-2xl p-4 text-sm font-medium text-slate-400 outline-none"
            />
          </div>

          <button 
            onClick={handleGenerate}
            disabled={isGenerating || !prompt}
            className="w-full bg-indigo-600 text-white p-5 rounded-2xl font-bold text-lg shadow-xl shadow-indigo-600/20 hover:bg-indigo-700 transition-all flex items-center justify-center gap-3 disabled:opacity-50"
          >
            {isGenerating ? (
              <>
                <RefreshCw size={24} className="animate-spin" />
                Processando na GPU MEXUS...
              </>
            ) : (
              <>
                <Wand2 size={24} />
                Gerar Obra de Arte Visual
              </>
            )}
          </button>
        </div>

        {/* Preview Area */}
        <div className="bg-white rounded-[2.5rem] p-8 border border-slate-100 shadow-sm min-h-[500px] flex flex-col">
          <div className="flex justify-between items-center mb-8">
            <h3 className="text-sm font-bold text-slate-800 uppercase tracking-widest flex items-center gap-2">
              <ImageIcon size={16} className="text-indigo-600" />
              Canvas de Visualização
            </h3>
            {generatedImage && (
              <div className="flex gap-2">
                <button className="p-3 bg-slate-50 text-slate-400 rounded-xl hover:text-indigo-600 transition-all"><Download size={20} /></button>
                <button className="p-3 bg-slate-50 text-slate-400 rounded-xl hover:text-indigo-600 transition-all"><Share2 size={20} /></button>
              </div>
            )}
          </div>

          <div className="flex-1 rounded-3xl border border-slate-100 bg-slate-50 flex items-center justify-center overflow-hidden relative group">
            <AnimatePresence mode="wait">
              {generatedImage ? (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="w-full h-full relative"
                >
                  <img src={generatedImage} alt="Generated" className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-indigo-900/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-sm">
                    <button className="bg-white text-indigo-600 px-8 py-4 rounded-2xl font-bold shadow-2xl flex items-center gap-2 transform translate-y-4 group-hover:translate-y-0 transition-all">
                      <Maximize2 size={20} /> Tela Cheia
                    </button>
                  </div>
                </motion.div>
              ) : isGenerating ? (
                <div className="text-center space-y-4">
                  <div className="w-24 h-24 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin mx-auto" />
                  <p className="text-slate-400 font-bold uppercase tracking-widest text-[10px]">Alocando Memória VRAM...</p>
                </div>
              ) : (
                <div className="text-center space-y-6 max-w-xs px-6">
                  <div className="w-20 h-20 bg-white rounded-[2.5rem] shadow-sm flex items-center justify-center mx-auto text-slate-200">
                    <ImageIcon size={40} />
                  </div>
                  <p className="text-slate-400 text-sm font-medium">Aguardando prompt para iniciar a renderização neural.</p>
                </div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}
