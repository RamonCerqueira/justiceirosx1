import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Copy, Check, Terminal, ExternalLink, ShieldAlert, Sparkles, Download } from "lucide-react";

export default function Module2Mine() {
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const searchTerms = [
    { term: '"pdf" "10,00"', desc: "Encontrar funis vendendo e-books a R$10.00" },
    { term: '"api" "10,00"', desc: "Encontrar integradores e funis PAD" },
    { term: '"pdf" "receitas"', desc: "Nicho de alimentação saudável e receitas" },
    { term: '"pdf" "moldes"', desc: "Nicho de costura criativa e artesanato" },
    { term: '"pdf" "brigadeiro gourmet"', desc: "Nicho de doces e confeitaria" },
    { term: '"pdf" "introdução alimentar"', desc: "Nicho de maternidade e bebês" }
  ];

  const extensions = [
    { name: "GG SPY", desc: "A melhor extensão para baixar imagens e vídeos de anúncios diretamente da Biblioteca de Anúncios do Meta." },
    { name: "AdsSparo", desc: "Excelente para espionar criativos concorrentes e ver o histórico de tempo de veiculação." },
    { name: "Copycat", desc: "Clona páginas de vendas e estruturas de funil com alta fidelidade." }
  ];

  return (
    <div className="space-y-8">
      {/* Intro Box */}
      <div className="bg-[#0b1221]/40 border border-white/5 rounded-2xl p-6">
        <h3 className="text-lg font-bold text-white mb-2 flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-[#D4AF37]" /> A Mina de Ouro: Biblioteca de Anúncios
        </h3>
        <p className="text-xs text-gray-300 leading-relaxed">
          Você não precisa inventar um produto ou um texto do zero. O segredo da nossa escala é a modelagem de funis que já estão vendendo na Biblioteca de Anúncios do Meta. Pesquisamos concorrentes, entramos no WhatsApp deles, baixamos o PDF entregue e a conversa do robô, e então moldamos com nossa identidade e novos áudios.
        </p>
      </div>

      {/* Search Helper */}
      <div className="space-y-4">
        <div>
          <h3 className="text-base font-bold text-white flex items-center gap-2">
            <Terminal className="w-5 h-5 text-[#D4AF37]" /> Termos de Pesquisa Rápidos
          </h3>
          <p className="text-[11px] text-gray-400 mt-0.5">Clique para copiar as aspas e os termos exatos para pesquisar na Biblioteca de Anúncios do Facebook.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {searchTerms.map((item, idx) => (
            <Card 
              key={idx}
              className="bg-[#0b1221]/30 border-white/5 p-4 rounded-xl flex items-center justify-between gap-3"
            >
              <div className="text-left">
                <code className="text-xs font-bold text-[#D4AF37] block bg-black/45 px-2 py-1 rounded border border-white/5 w-fit">
                  {item.term}
                </code>
                <span className="text-[10px] text-gray-450 mt-1 block">{item.desc}</span>
              </div>
              <Button
                size="xs"
                variant="ghost"
                onClick={() => handleCopy(item.term, `term_${idx}`)}
                className="h-8 w-8 rounded-lg hover:bg-[#D4AF37] hover:text-[#050914] text-white border border-white/5 cursor-pointer flex items-center justify-center shrink-0"
              >
                {copiedId === `term_${idx}` ? (
                  <Check className="w-4 h-4 text-emerald-400" />
                ) : (
                  <Copy className="w-4 h-4" />
                )}
              </Button>
            </Card>
          ))}
        </div>
      </div>

      {/* Espionagem Estratégica */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Extensões */}
        <Card className="bg-[#0b1221]/50 border-white/10 p-6 rounded-2xl space-y-4 text-left">
          <div>
            <h4 className="text-sm font-bold text-white">Extensões Recomendadas (Wil)</h4>
            <p className="text-[10px] text-gray-450 mt-0.5">Instale no seu Google Chrome para ajudar no mapeamento.</p>
          </div>
          
          <div className="space-y-3">
            {extensions.map((ext, idx) => (
              <div key={idx} className="border-b border-white/5 pb-2.5 last:border-0 last:pb-0">
                <span className="font-bold text-xs text-white block uppercase tracking-wider">{ext.name}</span>
                <p className="text-[11px] text-gray-400 mt-1 leading-normal">{ext.desc}</p>
              </div>
            ))}
          </div>
        </Card>

        {/* Mapeamento de Funil Card */}
        <Card className="bg-[#0b1221]/50 border-white/10 p-6 rounded-2xl flex flex-col justify-between text-left">
          <div className="space-y-4">
            <h4 className="text-sm font-bold text-white">Como Mapear o Concorrente</h4>
            <ul className="space-y-2.5 text-[11px] text-gray-300 list-disc pl-4 leading-relaxed">
              <li>Use a Biblioteca de Anúncios e filtre por anúncios ativos há mais de 30 dias.</li>
              <li>Clique no botão do anúncio ("Saiba Mais" ou "Enviar Mensagem") para abrir o WhatsApp.</li>
              <li>Mande a mensagem inicial de interesse ("Olá, tenho interesse").</li>
              <li>Deixe o robô dele enviar os áudios e o arquivo PDF.</li>
              <li>Salve os áudios no seu celular e copie os textos para um bloco de notas.</li>
            </ul>
          </div>
          
          <div className="pt-4 border-t border-white/5 mt-4">
            <a 
              href="https://www.facebook.com/ads/library/" 
              target="_blank" 
              rel="noreferrer"
              className="w-full block"
            >
              <Button className="w-full h-11 bg-[#D4AF37] hover:bg-[#D4AF37]/90 text-[#050914] font-bold rounded-xl text-xs flex items-center justify-center gap-1.5 border-0 cursor-pointer">
                Acessar Biblioteca de Anúncios <ExternalLink className="w-3.5 h-3.5" />
              </Button>
            </a>
          </div>
        </Card>
      </div>

      {/* Minimax Audio Warn */}
      <div className="bg-blue-500/5 border border-blue-500/15 rounded-2xl p-5 flex gap-4 items-start text-left">
        <ShieldAlert className="w-5 h-5 text-blue-400 shrink-0 mt-0.5" />
        <div>
          <h4 className="text-xs font-bold text-white uppercase tracking-wider">Modelagem de Voz: Minimax Audio</h4>
          <p className="text-[11px] text-gray-300 leading-relaxed mt-1">
            Para evitar que sua conta seja bloqueada por reclamação de direitos autorais ou uso indevido de criativos concorrentes, recomendamos recriar todos os áudios no <strong>Minimax Audio</strong>. Use vozes sintéticas ultra realistas para ler a cópia adaptada do funil de vendas, soando como áudios gravados na hora.
          </p>
        </div>
      </div>
    </div>
  );
}
