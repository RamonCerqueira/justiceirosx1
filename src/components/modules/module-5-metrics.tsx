import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Percent, TrendingUp, DollarSign, Users, AlertCircle, Sparkles, HelpCircle } from "lucide-react";

export default function Module5Metrics() {
  const [activeDay, setActiveDay] = useState<number>(0);

  const glossary = [
    {
      term: "X1",
      formula: "Venda direta",
      desc: "Venda direta 'um a um' no WhatsApp para gerar confiança com o cliente.",
      icon: <HelpCircle className="w-4 h-4 text-blue-400" />
    },
    {
      term: "ROI (Retorno sobre Investimento)",
      formula: "ROI = Lucro ÷ Investimento",
      desc: "Retorno sobre o investimento obtido com base nas vendas Pix e os gastos de anúncios.",
      icon: <TrendingUp className="w-4 h-4 text-emerald-400" />
    },
    {
      term: "ROAS (Retorno sobre Gasto em Anúncios)",
      formula: "ROAS = Vendas ÷ Investimento",
      desc: "Retorno sobre o gasto com anúncios (quantas vezes as vendas superaram os anúncios).",
      icon: <DollarSign className="w-4 h-4 text-indigo-400" />
    },
    {
      term: "CPL (Custo por Lead)",
      formula: "CPL = Investimento ÷ Conversas",
      desc: "Custo por Lead (mensagem recebida no WhatsApp).",
      icon: <Users className="w-4 h-4 text-purple-400" />
    },
    {
      term: "CPA (Custo por Aquisição)",
      formula: "CPA = Investimento ÷ Vendas",
      desc: "Custo por Aquisição (quanto custou de anúncio para cada venda Pix realizada).",
      icon: <Percent className="w-4 h-4 text-amber-500" />
    },
    {
      term: "CTR (Click Through Rate)",
      formula: "CTR = Cliques ÷ Impressões * 100",
      desc: "Taxa de cliques no anúncio; indica se o seu criativo de imagem/vídeo é atrativo para o público.",
      icon: <Percent className="w-4 h-4 text-red-400" />
    }
  ];

  const scaleTimeline = [
    {
      day: "Dia 1: O Teste Inicial",
      title: "Validação pura",
      desc: "Configurar campanhas separadas (CBO) de R$ 15,00 a R$ 25,00 por criativo. Rodar por 24h sem nenhuma intervenção. Monitorar o CPL (Custo por conversa) buscando valores abaixo de R$ 1,50."
    },
    {
      day: "Dia 2: Dobrar Orçamento",
      title: "Identificar ROI positivo",
      desc: "Na virada do dia (meia-noite), identifique quais anúncios trouxeram vendas e ROI positivo. Adicione R$ 10,00 adicionais na campanha ou dobre o orçamento diário do criativo vencedor."
    },
    {
      day: "Dia 3: Escala & Teto",
      title: "Duplicar verba",
      desc: "Se o criativo mantiver a consistência de vendas e o ROI positivo do Dia 2, duplique novamente a verba (ex: R$25 -> R$35 -> R$70). Defina um teto máximo de R$100/dia por criativo na fase inicial para evitar saturação."
    }
  ];

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Visual scale timeline */}
      <div className="space-y-4">
        <div>
          <h3 className="text-base font-bold text-white flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-[#D4AF37]" /> Ciclo da Escala Progressiva (3 Dias)
          </h3>
          <p className="text-[11px] text-gray-400 mt-0.5">Entenda as regras operacionais de tráfego para escalar orçamentos sem perder margem de lucro.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {scaleTimeline.map((item, idx) => (
            <Card 
              key={idx}
              onClick={() => setActiveDay(idx)}
              className={`bg-[#0b1221]/30 hover:bg-[#0b1221]/50 border transition-all cursor-pointer p-5 rounded-2xl flex flex-col justify-between text-left ${
                activeDay === idx ? "border-[#D4AF37] shadow-[0_0_15px_rgba(212,175,55,0.05)]" : "border-white/5"
              }`}
            >
              <div className="space-y-3">
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#D4AF37] block">
                  {item.day}
                </span>
                <h4 className="text-xs font-bold text-white uppercase">{item.title}</h4>
                <p className="text-[11px] text-gray-400 leading-relaxed font-light">{item.desc}</p>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Metrics Glossary and Parameter Checks */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 text-left">
        
        {/* KPI glossary */}
        <Card className="bg-[#0b1221]/50 border-white/10 p-6 rounded-2xl space-y-4">
          <div>
            <h4 className="text-sm font-bold text-white">Dicionário do Gestor X1</h4>
            <p className="text-[10px] text-gray-450 mt-0.5 font-medium">As principais métricas que você deve acompanhar diariamente.</p>
          </div>

          <div className="space-y-4">
            {glossary.map((item, idx) => (
              <div key={idx} className="border-b border-white/5 pb-3 last:border-0 last:pb-0 flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center shrink-0 mt-0.5">
                  {item.icon}
                </div>
                <div>
                  <span className="font-bold text-xs text-white block">{item.term}</span>
                  <code className="text-[9px] text-gray-500 font-bold block mt-0.5">{item.formula}</code>
                  <p className="text-[11px] text-gray-400 mt-1 leading-normal font-light">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Cost control rules */}
        <Card className="bg-[#0b1221]/50 border-white/10 p-6 rounded-2xl flex flex-col justify-between">
          <div className="space-y-4">
            <div>
              <h4 className="text-sm font-bold text-white">Parâmetros de Custo & Corte (Wil)</h4>
              <p className="text-[10px] text-gray-450 mt-0.5 font-medium">Regras de corte para otimizar orçamentos diários.</p>
            </div>

            <div className="space-y-3.5">
              <div className="bg-emerald-500/5 border border-emerald-500/10 p-3.5 rounded-xl text-left">
                <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-400 block">Custo Ideal (CPL)</span>
                <p className="text-xs text-white mt-1">Abaixo de R$ 1,00 por conversa no WhatsApp.</p>
                <p className="text-[10px] text-gray-450 mt-1 font-semibold leading-normal">O anúncio é muito atrativo e os criativos devem ser mantidos ativos com orçamento escalado.</p>
              </div>

              <div className="bg-yellow-500/5 border border-yellow-500/10 p-3.5 rounded-xl text-left">
                <span className="text-[10px] font-bold uppercase tracking-wider text-yellow-400 block">Custo Aceitável (CPL)</span>
                <p className="text-xs text-white mt-1">Até R$ 1,50 por conversa no WhatsApp.</p>
                <p className="text-[10px] text-gray-450 mt-1 font-semibold leading-normal">Está nos parâmetros comuns. Monitore a taxa de conversão final para certificar ROI positivo.</p>
              </div>

              <div className="bg-red-500/5 border border-red-500/10 p-3.5 rounded-xl text-left">
                <span className="text-[10px] font-bold uppercase tracking-wider text-red-400 block">Custo Crítico & Corte</span>
                <p className="text-xs text-white mt-1">Acima de R$ 3,00 por conversa no WhatsApp.</p>
                <p className="text-[10px] text-gray-450 mt-1 font-semibold leading-normal">Desative o anúncio ou conjunto de imediato se não houver vendas Pix para pagar a verba em 24h.</p>
              </div>
            </div>
          </div>
        </Card>
      </div>

      {/* Critial Insight - Feito é melhor que perfeito */}
      <div className="bg-[#D4AF37]/5 border border-[#D4AF37]/15 rounded-2xl p-6 text-left flex gap-4 items-start relative overflow-hidden group">
        <div className="absolute inset-0 bg-gradient-to-r from-[#D4AF37]/5 via-transparent to-transparent pointer-events-none"></div>
        <AlertCircle className="w-6 h-6 text-[#D4AF37] shrink-0 mt-0.5 z-10" />
        <div className="z-10 space-y-1">
          <h4 className="text-xs font-bold text-white uppercase tracking-wider">Insight Crítico de Ricardo Menezes</h4>
          <p className="text-[11px] text-gray-300 font-bold italic">
            "Feito é melhor que perfeito. Não espere o momento ideal; comece com o que tem, ajuste o funil conforme os dados chegam e escale apenas o que traz lucro real."
          </p>
          <p className="text-[10px] text-gray-500 font-bold tracking-wider uppercase pt-2">
            Regra de 3 Dias: Se um produto não trouxer ROI após 3 dias de testes, descarte-o de imediato e reinicie a mineração.
          </p>
        </div>
      </div>
    </div>
  );
}
