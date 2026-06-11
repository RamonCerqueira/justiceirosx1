import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { WhatsAppAudioPlayer } from "@/components/ui/whatsapp-audio-player";
import { Button } from "@/components/ui/button";
import { Copy, Check, MessageSquare, ShieldAlert, Sparkles, Send, HelpCircle } from "lucide-react";

export default function Module3Auto() {
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [activeStep, setActiveStep] = useState<number>(0);

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const steps = [
    {
      title: "1. Apresentação",
      sub: "Explicar o produto",
      desc: "Mensagem inicial do robô ao receber o lead interessado do Facebook Ads.",
      message: "Olá, tudo bem? Aqui é a Amanda! Vi que você se interessou pelo nosso Guia Completo de Receitas Saudáveis Sem Glúten. Vou te enviar o material agora mesmo para você conferir a qualidade dele!",
      hint: "Esta mensagem deve ser curta e simpática. Crie empatia imediata."
    },
    {
      title: "2. O Diferencial",
      sub: "Modelo PAD (Confiança)",
      desc: "Quebrar a objeção principal. O cliente percebe que não corre nenhum risco de golpe.",
      message: "Aqui na nossa equipe nós trabalhamos com base na confiança. Eu te envio o arquivo PDF completo primeiro. Você abre, lê, e se você gostar e ver que realmente vai te ajudar, você faz o pagamento depois. Que tal?",
      hint: "Esse é o gatilho principal. Reduz a desconfiança a zero."
    },
    {
      title: "3. A Permissão",
      sub: "Pergunta crucial",
      desc: "Forçar o cliente a interagir com um 'Sim' antes de disparar o arquivo PDF.",
      message: "Posso enviar o arquivo em PDF para você agora?",
      hint: "Nunca envie o PDF sem a permissão. O 'Sim' faz com que o cliente se sinta comprometido a pagar após receber."
    },
    {
      title: "4. Entrega e Chave Pix",
      sub: "Fechamento da venda",
      desc: "Disparo automático do arquivo PDF do produto digital seguido do Pix de cobrança.",
      message: "[Disparo do arquivo PDF: Receitas_Sem_Gluten.pdf]\n\nProntinho! Acabei de enviar o material. Se você gostar e ver que agregou valor para você, o valor de incentivo é de apenas R$ 9,90 e você pode fazer a transferência direta no Pix abaixo:\n\nChave Pix: seu-pix-da-infinitepay@exemplo.com",
      hint: "O robô deve enviar o PDF primeiro e a mensagem com a chave Pix de 2 a 5 segundos logo em seguida."
    }
  ];

  return (
    <div className="space-y-8">
      {/* BotPro Warning */}
      <div className="bg-red-500/5 border border-red-500/15 rounded-2xl p-5 flex gap-4 items-start text-left">
        <ShieldAlert className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
        <div>
          <h4 className="text-xs font-bold text-white uppercase tracking-wider">⚠️ RECOMENDAÇÃO CRÍTICA DE AUTOMAÇÃO</h4>
          <p className="text-[11px] text-gray-300 leading-relaxed mt-1">
            Os administradores Ricardo e Romão alertaram extensivamente no grupo sobre a instabilidade no <strong>Bot Pro</strong>. Ele costuma falhar no disparo de mídias pesadas (como áudios gravados e PDFs de produtos) ou parar de responder os clientes no meio do fluxo. Utilize a plataforma <strong>LEONA</strong> para garantir 100% de estabilidade e taxa de entrega.
          </p>
        </div>
      </div>

      {/* Funnel Flow Visualizer */}
      <div className="space-y-4">
        <div>
          <h3 className="text-base font-bold text-white flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-[#D4AF37]" /> Fluxo Interativo do Funil PAD
          </h3>
          <p className="text-[11px] text-gray-400 mt-0.5">Navegue pelas etapas do roteiro de mensagens automáticas que converte 40% das conversas em Pix pago.</p>
        </div>

        {/* Horizontal step indicators */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
          {steps.map((step, idx) => (
            <button
              key={idx}
              onClick={() => setActiveStep(idx)}
              className={`p-3 rounded-xl border text-left cursor-pointer transition-all ${
                activeStep === idx 
                  ? "bg-[#D4AF37]/10 border-[#D4AF37] text-white shadow-[0_0_15px_rgba(212,175,55,0.05)]" 
                  : "bg-[#0b1221]/20 border-white/5 text-gray-400 hover:border-white/10 hover:text-white"
              }`}
            >
              <div className="text-[10px] font-bold uppercase tracking-wider text-[#D4AF37]">{step.title}</div>
              <div className="text-xs font-semibold mt-0.5 truncate">{step.sub}</div>
            </button>
          ))}
        </div>

        {/* Selected Step content */}
        <Card className="bg-[#0b1221]/40 border-white/10 p-6 rounded-2xl">
          <div className="flex flex-col md:flex-row gap-6 justify-between items-start text-left">
            
            {/* Simulation Preview */}
            <div className="flex-1 space-y-4 w-full">
              <div>
                <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">Descrição Técnica</span>
                <p className="text-xs text-gray-300 mt-0.5 leading-relaxed">{steps[activeStep].desc}</p>
              </div>

              {/* Chat bubble simulator */}
              <div className="space-y-2">
                <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">Mensagem no WhatsApp (Leona)</span>
                <div className="bg-[#0b1424] border border-white/5 rounded-2xl p-4 relative max-w-lg shadow-inner">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 shrink-0">
                      <MessageSquare className="w-4 h-4" />
                    </div>
                    <div className="flex-1 text-left space-y-3">
                      <pre className="text-xs text-gray-200 font-sans whitespace-pre-wrap leading-normal select-all mb-4">
                        {steps[activeStep].message}
                      </pre>
                      <WhatsAppAudioPlayer 
                        textTranscript={steps[activeStep].message}
                        senderName="Amanda" 
                      />
                    </div>
                  </div>
                  
                  {/* Floating copy button */}
                  <Button
                    size="xs"
                    variant="ghost"
                    onClick={() => handleCopy(steps[activeStep].message, `step_msg_${activeStep}`)}
                    className="absolute right-3.5 bottom-3.5 h-8 px-2.5 rounded-lg bg-black/85 hover:bg-[#D4AF37] hover:text-[#050914] text-white border border-white/10 cursor-pointer flex items-center gap-1 transition-colors text-xs font-semibold"
                  >
                    {copiedId === `step_msg_${activeStep}` ? (
                      <><Check className="w-3.5 h-3.5 text-emerald-400" /> Copiado</>
                    ) : (
                      <><Copy className="w-3.5 h-3.5" /> Copiar Texto</>
                    )}
                  </Button>
                </div>
              </div>
            </div>

            {/* Instruction box */}
            <div className="w-full md:w-72 bg-white/2 border border-white/5 p-4 rounded-xl space-y-2 shrink-0">
              <h5 className="text-xs font-bold text-[#D4AF37] uppercase tracking-wider flex items-center gap-1">
                <Send className="w-3.5 h-3.5" /> Instrução de Envio
              </h5>
              <p className="text-[11px] text-gray-300 leading-normal">{steps[activeStep].hint}</p>
            </div>

          </div>
        </Card>
      </div>

      {/* Tech Setup Tip */}
      <div className="bg-[#0b1221]/30 border border-white/5 rounded-xl p-5 text-left">
        <h4 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-1">
          <HelpCircle className="w-4 h-4 text-blue-400" /> Como configurar no Leona?
        </h4>
        <p className="text-[11px] text-gray-400 leading-relaxed mt-1.5">
          Dentro do painel do Leona, você deve criar um fluxo de palavras-chave. Associe a palavra de entrada (ex: <i>"Tenho Interesse"</i> ou <i>"Olá"</i>) ao Passo 1 e configure atrasos (delay) de 3 a 5 segundos entre as mensagens para simular digitação humana e evitar bloqueios. O PDF do produto digital deve ser anexado como arquivo de mídia na mensagem final.
        </p>
      </div>
    </div>
  );
}
