import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Copy, Check, Calculator, Sparkles, Terminal, Info, AlertTriangle } from "lucide-react";

export default function Module4Ads() {
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // CBO Calculator states
  const [numCreatives, setNumCreatives] = useState(3);
  const [budgetPerCreative, setBudgetPerCreative] = useState(20);

  const totalDailyBudget = numCreatives * budgetPerCreative;
  const estimatedLeadsMin = Math.round(totalDailyBudget / 1.50); // critical CPL
  const estimatedLeadsMax = Math.round(totalDailyBudget / 0.80); // ideal CPL
  const estimatedSalesMin = Math.round(estimatedLeadsMin * 0.35); // 35% conversion
  const estimatedSalesMax = Math.round(estimatedLeadsMax * 0.45); // 45% conversion

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const prompts = [
    {
      id: "p_img",
      title: "Prompt de IA para Geração de Imagem de Anúncio",
      desc: "Anexe a imagem do anúncio concorrente no ChatGPT e envie este prompt para criar prompts originais em inglês para geradores de imagem por IA (como Midjourney/DALL-E).",
      text: "Quero que você atue como gestor de tráfego e especialista em marketing digital. Analise a imagem anexa de anúncio para WhatsApp X1, identificando seus pontos fortes e fracos de conversão. Com base nisso, crie de 3 a 5 novos roteiros com melhorias claras. Além disso, crie prompts altamente detalhados em inglês para geração de novas imagens correspondentes a cada roteiro, mantendo a persuasão sem copiar."
    },
    {
      id: "p_copy",
      title: "Prompt para Reescrita de Legenda (Copy)",
      desc: "Copie o texto da legenda do concorrente, cole no ChatGPT e use este prompt para reescrevê-lo sem perder os gatilhos persuasivos.",
      text: "Aja como copywriter profissional focado em vendas no WhatsApp. Analise o seguinte texto de legenda de anúncio e reescreva-o de forma original, mantendo a mesma estrutura de quebra de objeções, tom de conversa pessoal e oferta PAD (pagamento após entrega), mas alterando palavras e ganchos para evitar direitos autorais."
    }
  ];

  return (
    <div className="space-y-8">
      {/* AI Prompts Section */}
      <div className="space-y-4">
        <div>
          <h3 className="text-base font-bold text-white flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-[#D4AF37]" /> Prompts do ChatGPT para Criativos
          </h3>
          <p className="text-[11px] text-gray-400 mt-0.5">Use inteligência artificial para ler imagens e textos de concorrentes e criar anúncios exclusivos de alta conversão.</p>
        </div>

        <div className="grid grid-cols-1 gap-4 text-left">
          {prompts.map((prompt) => (
            <Card key={prompt.id} className="bg-[#0b1221]/40 border-white/10 p-5 space-y-3">
              <div>
                <h4 className="text-xs font-bold text-white uppercase tracking-wider">{prompt.title}</h4>
                <p className="text-[11px] text-gray-400 mt-0.5">{prompt.desc}</p>
              </div>
              <div className="relative group">
                <pre className="text-xs text-gray-300 bg-black/45 p-4 rounded-xl border border-white/5 overflow-x-auto whitespace-pre-wrap font-sans select-all leading-normal pr-16 max-h-48 overflow-y-auto">
                  {prompt.text}
                </pre>
                <Button
                  size="icon"
                  variant="ghost"
                  onClick={() => handleCopy(prompt.text, prompt.id)}
                  className="absolute right-3 top-3 w-8 h-8 rounded-lg bg-black/85 hover:bg-[#D4AF37] hover:text-[#050914] text-white border-0 cursor-pointer flex items-center justify-center transition-colors"
                  title="Copiar Prompt"
                >
                  {copiedId === prompt.id ? (
                    <Check className="w-4 h-4 text-emerald-400" />
                  ) : (
                    <Copy className="w-4 h-4" />
                  )}
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* CBO Campaign Budget Calculator */}
      <div className="space-y-4">
        <div>
          <h3 className="text-base font-bold text-white flex items-center gap-2">
            <Calculator className="w-5 h-5 text-[#D4AF37]" /> Planejador de Orçamento CBO
          </h3>
          <p className="text-[11px] text-gray-400 mt-0.5">Calcule o investimento diário necessário para testar criativos no Meta Ads e a projeção estimada de leads e vendas no Pix.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-stretch">
          
          {/* Inputs */}
          <Card className="bg-[#0b1221]/50 border-white/10 p-5 rounded-2xl flex flex-col justify-center space-y-4 text-left">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">Parâmetros de Teste</h4>
            
            <div className="space-y-1.5">
              <label className="text-[10px] uppercase font-bold text-gray-400">Variações de Criativos</label>
              <Input
                type="number"
                min="1"
                max="10"
                value={numCreatives}
                onChange={(e) => setNumCreatives(Math.max(1, parseInt(e.target.value, 10) || 0))}
                className="h-10 bg-black/40 border-white/10 focus:border-[#D4AF37] rounded-xl text-white text-xs w-full text-center"
              />
              <span className="text-[9px] text-gray-500 font-semibold block">Recomendado: 3 a 5 variações</span>
            </div>

            <div className="space-y-1.5">
              <label className="text-[10px] uppercase font-bold text-gray-400">Verba por Criativo (Diária)</label>
              <Input
                type="number"
                min="5"
                max="200"
                value={budgetPerCreative}
                onChange={(e) => setBudgetPerCreative(Math.max(1, parseFloat(e.target.value) || 0))}
                className="h-10 bg-black/40 border-white/10 focus:border-[#D4AF37] rounded-xl text-white text-xs w-full text-center"
              />
              <span className="text-[9px] text-gray-500 font-semibold block">Recomendado: R$ 15,00 a R$ 25,00</span>
            </div>
          </Card>

          {/* Outputs */}
          <Card className="lg:col-span-2 bg-[#0b1221]/30 border-white/5 p-5 rounded-2xl flex flex-col justify-between text-left">
            <div className="space-y-4">
              <div className="flex justify-between items-center border-b border-white/5 pb-3">
                <span className="text-xs font-bold text-gray-300">Investimento Diário Total (CBO)</span>
                <span className="text-sm font-black text-[#D4AF37] font-heading">
                  R$ {totalDailyBudget.toFixed(2)}
                </span>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <span className="text-[10px] uppercase font-bold text-gray-400">Conversas Estimadas</span>
                  <div className="text-lg font-black text-white mt-1">
                    {estimatedLeadsMin} a {estimatedLeadsMax} <span className="text-[10px] font-semibold text-gray-500">leads/dia</span>
                  </div>
                  <span className="text-[9px] text-gray-500 mt-1 block">Com base em CPL de R$0,80 a R$1,50</span>
                </div>

                <div>
                  <span className="text-[10px] uppercase font-bold text-gray-400">Vendas Pix (PAD)</span>
                  <div className="text-lg font-black text-emerald-400 mt-1">
                    {estimatedSalesMin} a {estimatedSalesMax} <span className="text-[10px] font-semibold text-gray-500">vendas/dia</span>
                  </div>
                  <span className="text-[9px] text-gray-500 mt-1 block">Com base em conversão de 35% a 45%</span>
                </div>
              </div>
            </div>

            <div className="bg-yellow-500/5 border border-yellow-500/15 p-3 rounded-xl flex items-center gap-2 mt-4">
              <Info className="w-4 h-4 text-yellow-400 shrink-0" />
              <p className="text-[10px] text-gray-450 leading-relaxed font-semibold">
                Nota: Esta é uma projeção teórica inicial. Seus dados dependerão do nicho escolhido e da atratividade dos seus criativos.
              </p>
            </div>
          </Card>

        </div>
      </div>

      {/* Rael golden rules */}
      <div className="bg-[#0b1221]/30 border border-white/5 rounded-xl p-5 text-left flex gap-3.5 items-start">
        <AlertTriangle className="w-5 h-5 text-[#D4AF37] shrink-0 mt-0.5" />
        <div>
          <h4 className="text-xs font-bold text-white uppercase tracking-wider">A Regra de Ouro do Lançamento</h4>
          <p className="text-[11px] text-gray-400 leading-relaxed mt-1">
            Ao subir sua campanha com os criativos selecionados, <strong>não faça nenhuma intervenção ou edição manual por 24 horas</strong>. O algoritmo da Meta precisa rodar livremente durante o primeiro dia para otimizar os conjuntos de anúncios e definir a melhor distribuição de orçamento (CBO) com base no comportamento dos leads.
          </p>
        </div>
      </div>
    </div>
  );
}
