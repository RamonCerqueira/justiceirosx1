import React, { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle2, Circle, HelpCircle, ShieldAlert, Smartphone, CreditCard, ScanFace, UserCheck, Flame } from "lucide-react";

interface Module1PrepProps {
  username: string;
}

export default function Module1Prep({ username }: Module1PrepProps) {
  const localKey = `justiceiros_checklists_m1_${username.toLowerCase()}`;

  const [checklist, setChecklist] = useState<Record<string, boolean>>({
    infinitepay: false,
    whatsapp_chip: false,
    facebook_profile: false,
    facebook_page: false,
    facebook_bm: false,
    credit_card: false,
    warming: false,
  });

  useEffect(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem(localKey);
      if (saved) {
        try {
          setChecklist(JSON.parse(saved));
        } catch (e) { }
      }
    }
  }, [localKey]);

  const toggleItem = (id: string) => {
    const updated = { ...checklist, [id]: !checklist[id] };
    setChecklist(updated);
    if (typeof window !== "undefined") {
      localStorage.setItem(localKey, JSON.stringify(updated));
    }
  };

  const checklistItems = [
    {
      id: "infinitepay",
      title: "Contas Digitais (InfinitePay)",
      desc: "Criar conta na InfinitePay ou similar para gerar múltiplos cartões virtuais e receber via Pix instantâneo.",
      icon: <CreditCard className="w-5 h-5 text-blue-400" />
    },
    {
      id: "whatsapp_chip",
      title: "WhatsApp Business Dedicado",
      desc: "Comprar chips novos e exclusivos, ativá-los e instalar o aplicativo WhatsApp Business separadamente do seu pessoal.",
      icon: <Smartphone className="w-5 h-5 text-emerald-400" />
    },
    {
      id: "facebook_profile",
      title: "Facebook (Perfil Pessoal ou Contingência)",
      desc: "Garantir o acesso a um perfil do Facebook maduro e ativo para ser a base das campanhas de tráfego.",
      icon: <ScanFace className="w-5 h-5 text-blue-500" />
    },
    {
      id: "facebook_page",
      title: "Páginas Profissionais no Facebook",
      desc: "Criar uma página vinculada ao perfil. Recomendação: Usar fotos e nomes de mulheres reais para aumentar a conversão de cliques.",
      icon: <UserCheck className="w-5 h-5 text-[#D4AF37]" />
    },
    {
      id: "facebook_bm",
      title: "Gerenciador de Negócios (BM)",
      desc: "Criar a conta empresarial (Business Manager) dentro do gerenciador de negócios do Facebook.",
      icon: <HelpCircle className="w-5 h-5 text-purple-400" />
    },
    {
      id: "credit_card",
      title: "Vincular Cartão de Crédito",
      desc: "Gerar um cartão virtual na InfinitePay, adicionar um saldo inicial (ex: R$50) e cadastrá-lo como meio de pagamento na BM.",
      icon: <CreditCard className="w-5 h-5 text-amber-500" />
    },
    {
      id: "warming",
      title: "Aquecimento de Conta (3 dias)",
      desc: "Se a conta for nova ou recém-configurada, use o Facebook normalmente por 3 dias antes de subir anúncios para evitar bloqueios.",
      icon: <Flame className="w-5 h-5 text-red-500" />
    }
  ];

  const completedCount = Object.values(checklist).filter(Boolean).length;
  const progressPercent = Math.round((completedCount / checklistItems.length) * 100);

  return (
    <div className="space-y-8">
      {/* Intro Box */}
      <div className="bg-[#0b1221]/40 border border-white/5 rounded-2xl p-6 relative overflow-hidden">
        <h3 className="text-lg font-bold text-white mb-2">Mentalidade de Venda: Pay After Delivery (PAD)</h3>
        <p className="text-xs text-gray-300 leading-relaxed">
          Nós vendemos na modalidade <strong>Pagamento após a entrega do produto</strong>.
          Como nossos produtos digitais (PDFs de Receitas, Moldes, etc.) são muito baratos (no máximo R$20,00), nós eliminamos totalmente o medo do cliente enviando o produto antes do pagamento direto na conversa.
          Ao comprovar que o produto é real, a taxa de retorno voluntário no Pix chega a <strong>40%</strong>! Esse gatilho de confiança explode a escala de tráfego.
        </p>
      </div>

      {/* Checklist section */}
      <div className="space-y-4">
        <div className="flex justify-between items-end">
          <div>
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-[#D4AF37]" /> Lista de Preparação de Estrutura
            </h3>
            <p className="text-[11px] text-gray-400 mt-0.5">Marque cada etapa que você concluir para organizar o lançamento de sua operação.</p>
          </div>
          <div className="text-right">
            <span className="text-xs font-bold text-[#D4AF37]">{progressPercent}% Concluído</span>
            <div className="text-[10px] text-gray-400 mt-0.5">{completedCount} de {checklistItems.length} etapas</div>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-white/5 border border-white/5 rounded-full h-2 overflow-hidden">
          <div
            className="bg-[#D4AF37] h-full transition-all duration-500"
            style={{ width: `${progressPercent}%` }}
          />
        </div>

        {/* List items */}
        <div className="grid grid-cols-1 gap-3 pt-2">
          {checklistItems.map((item) => {
            const isChecked = checklist[item.id];
            return (
              <Card
                key={item.id}
                onClick={() => toggleItem(item.id)}
                className={`bg-[#0b1221]/30 hover:bg-[#0b1221]/60 border transition-all cursor-pointer rounded-xl p-4 flex items-center justify-between gap-4 select-none ${isChecked ? "border-[#D4AF37]/30 bg-[#D4AF37]/2" : "border-white/5"
                  }`}
              >
                <div className="flex items-center gap-3.5">
                  <div className="shrink-0">{item.icon}</div>
                  <div className="text-left">
                    <h4 className={`text-xs font-bold transition-colors ${isChecked ? "text-[#D4AF37]" : "text-white"}`}>
                      {item.title}
                    </h4>
                    <p className="text-[11px] text-gray-400 leading-normal mt-0.5 max-w-2xl">{item.desc}</p>
                  </div>
                </div>

                <div className="shrink-0 text-gray-400 hover:text-[#D4AF37] transition-colors">
                  {isChecked ? (
                    <CheckCircle2 className="w-5 h-5 text-[#D4AF37]" />
                  ) : (
                    <Circle className="w-5 h-5 opacity-40" />
                  )}
                </div>
              </Card>
            );
          })}
        </div>
      </div>

      {/* Motorola Pasta Segura Guide */}
      <div className="bg-blue-500/5 border border-blue-500/15 rounded-2xl p-5 flex gap-4 items-start">
        <ShieldAlert className="w-5 h-5 text-blue-400 shrink-0 mt-0.5" />
        <div className="text-left">
          <h4 className="text-xs font-bold text-white uppercase tracking-wider">Dica de Hardware: Pasta Segura (Motorola)</h4>
          <p className="text-[11px] text-gray-300 leading-relaxed mt-1">
            Se você utiliza aparelhos da Motorola com recurso de Pasta Segura, pode criar instâncias clonadas adicionais dos aplicativos. Dessa forma, você consegue rodar até 8 instâncias do WhatsApp Business em um mesmo celular físico, facilitando a contingência inicial sem gastar em múltiplos aparelhos.
          </p>
        </div>
      </div>
    </div>
  );
}
