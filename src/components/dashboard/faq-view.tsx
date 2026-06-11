import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { HelpCircle, ChevronDown, ChevronUp, Search, Sparkles, ShieldAlert } from "lucide-react";

export function FAQView() {
  const [searchQuery, setSearchQuery] = useState("");
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  const faqs = [
    {
      q: "1. Posso usar meu perfil pessoal do Facebook para anunciar?",
      a: "Sim. Ricardo Menezes e Wil confirmam que usam seus próprios perfis e de familiares sem problemas. A recomendação é criar uma Página profissional dentro desse perfil e vinculá-la à sua conta de anúncios (BM).",
      icon: <HelpCircle className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
    },
    {
      q: "2. O que fazer se o robô parar de enviar mensagens ou áudios?",
      a: "Esse é um problema comum relatado com o Bot Pro (especialmente com arquivos pesados e mídias). Se o bot parar de entregar ou não salvar arquivos, a recomendação unânime do grupo é migrar para a plataforma Leona, que oferece 100% de estabilidade para operações de escala.",
      icon: <ShieldAlert className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
    },
    {
      q: "3. É seguro enviar o produto antes do cliente pagar?",
      a: "Sim. Como os produtos são baratos (até R$ 20,00), a confiança gerada ao entregar o arquivo primeiro faz com que a taxa de conversão final no Pix suba para cerca de 40%. O volume de vendas honestas compensa largamente as poucas pessoas que não efetuarem o pagamento.",
      icon: <HelpCircle className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
    },
    {
      q: "4. Minha conta do Facebook é nova. Posso subir anúncio hoje?",
      a: "Não é recomendado. Se a conta for nova, você deve 'aquecê-la' usando-a normalmente como usuário (curtir postagens, assistir vídeos, adicionar amigos) por pelo menos 3 dias antes de criar a BM ou subir anúncios, evitando bloqueios imediatos.",
      icon: <HelpCircle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
    },
    {
      q: "5. O que fazer se o custo por mensagem (CPL) estiver muito alto?",
      a: "Se o custo por lead estiver acima de R$ 3,00 (custo crítico), a recomendação do Wil é pausar a campanha ou o criativo de imediato e testar novos criativos (novos prompts no ChatGPT, novas imagens ou copies). O custo ideal por lead deve ficar abaixo de R$ 1,50.",
      icon: <HelpCircle className="w-4 h-4 text-purple-400 shrink-0 mt-0.5" />
    },
    {
      q: "6. Como evitar problemas com direitos autorais ao minerar produtos?",
      a: "Ao baixar o PDF de um concorrente durante a engenharia reversa do funil, analise o material. Se houver logotipos de terceiros ou registros de marcas, utilize o Canva para alterar toda a identidade visual, cores e textos antes de subir a sua operação.",
      icon: <HelpCircle className="w-4 h-4 text-[#D4AF37] shrink-0 mt-0.5" />
    },
    {
      q: "7. Preciso de um computador para operar?",
      a: "Sim. Embora você consiga acompanhar as vendas e responder clientes pelo celular, o Wil destaca que para configurar a estrutura profissional, criar as BMs e gerenciar as campanhas de tráfego com eficiência no Facebook Ads, é necessário um computador ou notebook.",
      icon: <HelpCircle className="w-4 h-4 text-indigo-400 shrink-0 mt-0.5" />
    },
    {
      q: "8. Quantos produtos devo rodar ao mesmo tempo?",
      a: "Não dependa de apenas um. A estratégia de escala sugere que se um produto não trouxer ROI após 3 dias de teste, ele deve ser pausado para dar lugar a uma nova mineração. Tenha sempre novos produtos e números (chips TIM) na reserva para contingência.",
      icon: <HelpCircle className="w-4 h-4 text-pink-400 shrink-0 mt-0.5" />
    },
    {
      q: "9. Onde encontro os melhores produtos para minerar?",
      a: "A grande 'mina de ouro' é a Biblioteca de Anúncios do Facebook. Faça pesquisas usando termos como 'pdf', 'api', 'ebook', 'receitas' ou 'moldes' associados a valores de ticket baixo (ex: '9,90', '10,00', '12,90') para identificar o que já está vendendo em escala.",
      icon: <HelpCircle className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
    }
  ];

  const toggleExpand = (idx: number) => {
    setExpandedIndex(expandedIndex === idx ? null : idx);
  };

  const filteredFaqs = faqs.filter(
    (faq) =>
      faq.q.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.a.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-8 max-w-4xl mx-auto py-4 px-4 sm:px-0 text-left animate-fadeIn">
      {/* Header */}
      <div>
        <h2 className="text-3xl font-black text-white font-heading tracking-wide uppercase">
          Perguntas Frequentes (FAQ)
        </h2>
        <p className="text-gray-400 text-sm mt-1">
          Respostas rápidas para as principais dúvidas operacionais e erros técnicos relatados pelo grupo.
        </p>
      </div>

      {/* Search Bar */}
      <div className="relative">
        <Search className="absolute left-4 top-3.5 w-4 h-4 text-gray-400" />
        <Input
          type="text"
          placeholder="Pesquisar por palavras-chave (ex: Facebook, Leona, Pix)..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="h-12 pl-12 bg-[#0b1221]/50 border-white/10 focus-visible:ring-[#D4AF37] rounded-xl text-white text-xs w-full"
        />
      </div>

      {/* Accordion List */}
      <div className="space-y-3">
        {filteredFaqs.length === 0 ? (
          <div className="border border-white/5 bg-[#0b1221]/20 rounded-2xl p-12 text-center">
            <HelpCircle className="w-10 h-10 text-gray-500 mx-auto mb-3" />
            <p className="text-gray-400 text-xs">Nenhum resultado encontrado para a sua busca.</p>
          </div>
        ) : (
          filteredFaqs.map((faq, idx) => {
            const isExpanded = expandedIndex === idx;
            return (
              <Card
                key={idx}
                className={`bg-[#0b1221]/30 hover:bg-[#0b1221]/50 border transition-all cursor-pointer rounded-2xl ${
                  isExpanded ? "border-[#D4AF37]/40 bg-[#D4AF37]/2 shadow-[0_0_15px_rgba(212,175,55,0.02)]" : "border-white/5"
                }`}
                onClick={() => toggleExpand(idx)}
              >
                <CardContent className="p-5 flex items-start gap-4 select-none justify-between">
                  <div className="flex gap-3">
                    {faq.icon}
                    <div>
                      <h4 className={`text-xs font-bold transition-colors ${isExpanded ? "text-[#D4AF37]" : "text-white"}`}>
                        {faq.q}
                      </h4>
                      {isExpanded && (
                        <p className="text-[11px] text-gray-300 leading-relaxed mt-3 pt-3 border-t border-white/5 font-light">
                          {faq.a}
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="shrink-0 text-gray-500 group-hover:text-[#D4AF37] pt-0.5">
                    {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  </div>
                </CardContent>
              </Card>
            );
          })
        )}
      </div>

      {/* Gold tip card */}
      <div className="bg-[#D4AF37]/5 border border-[#D4AF37]/15 rounded-2xl p-6 flex gap-4 items-start relative overflow-hidden group">
        <div className="absolute inset-0 bg-gradient-to-r from-[#D4AF37]/5 via-transparent to-transparent pointer-events-none"></div>
        <Sparkles className="w-6 h-6 text-[#D4AF37] shrink-0 mt-0.5 z-10" />
        <div className="z-10 space-y-1">
          <h4 className="text-xs font-bold text-white uppercase tracking-wider">At Glance: Dica de Ouro</h4>
          <p className="text-[11px] text-gray-300 font-bold italic leading-relaxed">
            "Feito é melhor que perfeito". Não espere o momento ideal ou a configuração impecável para subir suas campanhas. Comece mesmo com pouco orçamento (R$ 10,00 ou R$ 15,00/dia) para aprender na prática, e vá ajustando e polindo o funil do robô conforme os dados de CPL e ROI chegam.
          </p>
        </div>
      </div>
    </div>
  );
}
