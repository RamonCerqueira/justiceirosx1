import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Bell,
  ExternalLink,
  Copy,
  Check,
  Terminal,
  Wrench,
  ShieldAlert,
  TrendingUp,
  TrendingDown,
  Plus,
  Trash2,
  BookOpen,
  DollarSign,
  Users,
  Percent,
  MessageSquare,
  ArrowUpRight,
  ArrowDownRight,
  Calendar,
  AlertCircle,
  Activity
} from "lucide-react";
import { getStudentOperations, addStudentOperationEntry, deleteStudentOperationEntry, OperationEntry } from "@/lib/operations";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogTrigger } from "@/components/ui/dialog";
import { WhatsAppAudioPlayer } from "@/components/ui/whatsapp-audio-player";

interface CommunityViewProps {
  currentUser: {
    username: string;
    name: string;
    role: string;
  };
}

export function CommunityView({ currentUser }: CommunityViewProps) {
  const [activeTab, setActiveTab] = useState<"operations" | "library" | "notices">("operations");
  const [copiedItemId, setCopiedItemId] = useState<string | null>(null);

  // Private Operations State
  const [entries, setEntries] = useState<OperationEntry[]>([]);
  const [loadingOps, setLoadingOps] = useState(true);

  // Form State
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [formDate, setFormDate] = useState(() => {
    const today = new Date();
    const tzOffset = today.getTimezoneOffset() * 60000;
    const localISODate = new Date(today.getTime() - tzOffset).toISOString().split("T")[0];
    return localISODate;
  });
  const [formSpend, setFormSpend] = useState("");
  const [formLeads, setFormLeads] = useState("");
  const [formSales, setFormSales] = useState("");
  const [formRevenue, setFormRevenue] = useState("");
  const [formError, setFormError] = useState("");

  // Load user operations
  useEffect(() => {
    if (currentUser?.username) {
      loadOperations();
    }
  }, [currentUser]);

  const loadOperations = async () => {
    setLoadingOps(true);
    try {
      const data = await getStudentOperations(currentUser.username);
      setEntries(data);
    } catch (e) {
      console.error("Error loading operations:", e);
    }
    setLoadingOps(false);
  };

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedItemId(id);
    setTimeout(() => setCopiedItemId(null), 2000);
  };

  const handleAddEntry = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError("");

    const spendVal = parseFloat(formSpend);
    const leadsVal = parseInt(formLeads, 10);
    const salesVal = parseInt(formSales, 10);
    const revenueVal = parseFloat(formRevenue);

    if (!formDate) {
      setFormError("A data é obrigatória.");
      return;
    }
    if (isNaN(spendVal) || spendVal < 0) {
      setFormError("O valor investido deve ser maior ou igual a 0.");
      return;
    }
    if (isNaN(leadsVal) || leadsVal < 0) {
      setFormError("A quantidade de leads deve ser maior ou igual a 0.");
      return;
    }
    if (isNaN(salesVal) || salesVal < 0) {
      setFormError("A quantidade de vendas deve ser maior ou igual a 0.");
      return;
    }
    if (isNaN(revenueVal) || revenueVal < 0) {
      setFormError("O faturamento deve ser maior ou igual a 0.");
      return;
    }

    try {
      const updated = await addStudentOperationEntry(currentUser.username, {
        date: formDate,
        spend: spendVal,
        leads: leadsVal,
        sales: salesVal,
        revenue: revenueVal
      });
      setEntries(updated);

      // Reset form
      setFormSpend("");
      setFormLeads("");
      setFormSales("");
      setFormRevenue("");
      setIsDialogOpen(false);
    } catch (e) {
      setFormError("Ocorreu um erro ao salvar o registro.");
    }
  };

  const handleDeleteEntry = async (id: string) => {
    if (confirm("Deseja realmente excluir este registro diário?")) {
      try {
        const updated = await deleteStudentOperationEntry(currentUser.username, id);
        setEntries(updated);
      } catch (e) {
        console.error("Error deleting entry:", e);
      }
    }
  };

  // Metrics calculations
  const totalSpend = entries.reduce((acc, curr) => acc + curr.spend, 0);
  const totalRevenue = entries.reduce((acc, curr) => acc + curr.revenue, 0);
  const totalLeads = entries.reduce((acc, curr) => acc + curr.leads, 0);
  const totalSales = entries.reduce((acc, curr) => acc + curr.sales, 0);

  const netProfit = totalRevenue - totalSpend;
  const generalROI = totalSpend > 0 ? Math.round((netProfit / totalSpend) * 100) : 0;
  const generalROAS = totalSpend > 0 ? (totalRevenue / totalSpend).toFixed(2) : "0.00";
  const avgCPL = totalLeads > 0 ? (totalSpend / totalLeads) : 0;
  const avgCPA = totalSales > 0 ? (totalSpend / totalSales) : 0;
  const conversionRate = totalLeads > 0 ? (totalSales / totalLeads) * 100 : 0;

  // Real data products extracted from chat.txt
  const sharedProducts = [
    {
      id: "p_gluten",
      title: "Guia de Receitas Saudáveis & Sem Glúten",
      niche: "E-book PDF",
      ticket: "R$ 9,90",
      description: "E-book diagramado com 50 receitas práticas sem glúten e sem lactose. Excelente aceitação e apelo emocional para o público feminino acima de 30 anos no tráfego frio.",
      stats: "Conversão Média: 40% no Pix (Método PAD)",
      downloadUrl: "/chat-media/Receitas_Saudaveis_Sem_Gluten_Modelo.pdf",
      copy: `Olá, tudo bem? Aqui é a Amanda! Conforme combinado lá na nossa conversa do Facebook, acabei de liberar o seu Guia Completo de Receitas Saudáveis e Sem Glúten! 🧑‍🍳

[Arquivo PDF Anexo: Receitas_Sem_Gluten.pdf]

Como explicamos, nós entregamos o produto primeiro para você ver a qualidade antes de pagar. Se você gostar do material, o valor de incentivo é de apenas R$ 9,90 e você faz o Pix diretamente para a nossa chave abaixo:

Chave Pix: seu-pix-da-infinitepay@exemplo.com

Qualquer dúvida no preparo das receitas, pode me chamar aqui! Bons pratos!`,
      audios: [
        { step: "Áudio 1 (Apresentação)", text: "Oi! Tudo bem? Sou a Amanda. Olha, vi que você se interessou pelo nosso guia de receitas sem glúten, já separei o arquivo em PDF aqui no meu celular e vou te mandar em seguida, tá bom?" },
        { step: "Áudio 2 (Confiança e Entrega)", text: "Acabei de te enviar o e-book, dá uma olhada aí se abriu certinho na sua tela! Como a gente trabalha num modelo de confiança, você pode ler primeiro, e se você gostar e achar que vale a pena, faz o Pix de R$ 9,90 pra gente continuar postando mais receitas. A chave Pix tá logo ali embaixo, viu? Muito obrigada!" }
      ]
    },
    {
      id: "p_feltro",
      title: "Super Pacote com 100+ Moldes de Feltro",
      niche: "Arquivos para Costura",
      ticket: "R$ 12,90",
      description: "Mais de 100 moldes vetorizados em tamanho real para impressão em folha A4 comum. Focado em artesãs, costureiras e mães que fazem lembrancinhas de festas infantis.",
      stats: "Conversão Média: 38% no Pix (Método PAD)",
      downloadUrl: "/chat-media/Super_Pacote_Moldes_Feltro.pdf",
      copy: `Olá! Aqui é a Beatriz! Conforme combinamos, acabei de liberar o seu arquivo PDF contendo mais de 100 moldes infantis e de bichinhos em tamanho real prontos para imprimir e costurar! 🧵

[Arquivo PDF Anexo: Pacote_Moldes_Feltro.pdf]

O arquivo já está formatado para folha A4 comum, sem complicações. Como adotamos o formato Confiança (PAD), você recebe os moldes primeiro e só realiza o pagamento de R$ 12,90 se gostar do material.

Chave Pix: seu-pix-da-infinitepay@exemplo.com

Muito obrigada pela confiança e boas costuras!`,
      audios: [
        { step: "Áudio 1 (Boas-vindas)", text: "Oi, tudo bem? Sou a Beatriz do Clube do Feltro! Tô passando pra te dizer que já organizei os seus moldes aqui no computador e tô te mandando em formato PDF agora mesmo!" },
        { step: "Áudio 2 (Orientação de Impressão)", text: "Prontinho! Dá uma olhada no arquivo aí em cima... Recomendo imprimir em folha de papel normal, impressora comum mesmo, que os tamanhos já vêm perfeitinhos pra você cortar e costurar. Se gostar de tudo, depois faz o Pix de R$ 12,90 pra ajudar a gente a lançar o próximo kit, tá?" }
      ]
    },
    {
      id: "p_introducao",
      title: "Guia de Introdução Alimentar de 6 a 12 meses",
      niche: "Maternidade / Papinhas",
      ticket: "R$ 10,00",
      description: "Tabela e cronograma de introdução de frutas, papinhas e texturas para bebês. Produto de altíssimo apelo persuasivo para mães de primeira viagem.",
      stats: "Conversão Média: 40% no Pix (Método PAD)",
      downloadUrl: "/chat-media/Guia_Introducao_Alimentar.pdf",
      copy: `Olá, mamãe! Aqui é a Amanda, consultora infantil! Como prometido nas mensagens anteriores, aqui está o seu Guia Prático de Introdução Alimentar de 6 a 12 meses! 👶🥦

[Arquivo PDF Anexo: Guia_Introducao_Alimentar.pdf]

Nele tem o cronograma de introdução, consistências e receitas seguras para cada semana do seu bebê. Leia e avalie o material primeiro. Se gostar do guia, faça o pagamento de R$ 10,00 na nossa chave Pix abaixo:

Chave Pix: seu-pix-da-infinitepay@exemplo.com

Que o momento das refeições seja maravilhoso e saudável para o seu bebê!`,
      audios: [
        { step: "Áudio 1 (Empatia de Mãe)", text: "Olá! Tudo bem? Aqui é a Amanda. Olha, eu sei bem como essa fase de introdução alimentar dá um friozinho na barriga da gente... mas fica tranquila que preparei um guia muito simples e prático pra te ajudar. Vou te mandar o PDF aqui..." },
        { step: "Áudio 2 (Explicando o Pix)", text: "Prontinho, enviei o arquivo do guia pra você! Dá uma olhadinha nele depois. Tem os horários certos, o que dar em cada mês e receitinhas. Se você gostar e achar que vai facilitar a sua rotina com o neném, você faz a transferência de R$ 10,00 no Pix que enviei aqui embaixo. Obrigada e boa sorte nessa jornada!" }
      ]
    },
    {
      id: "p_chips",
      title: "Lote de Chips TIM Virgens para Contingência",
      niche: "Fornecedor Shopee",
      ticket: "R$ 55,00 (Kit com 5 unidades)",
      description: "Chips pré-pagos virgens recomendados pelo Wil no chat para contingência. Indispensável para ter números reservas caso o chip principal do bot caia.",
      stats: "Preço unitário médio: R$ 11,00",
      downloadUrl: "https://shopee.com.br", // Link genérico
      copy: `Recomendação de contingência (Wil):
1. Compre o kit de chips da TIM virgens.
2. Cadastre em CPFs válidos e ative o WhatsApp Business.
3. Aqueça o número: mande mensagens para amigos, interaja em grupos e salve contatos na agenda por 2 a 3 dias.
4. Conecte no robô Leona e inicie os anúncios gradualmente para evitar bloqueio rápido por atividade suspeita.`,
      audios: []
    }
  ];

  const announcements = [
    {
      id: "a1",
      title: "⚠️ ALERTA DE AUTOMAÇÃO: Instabilidade no BotPro",
      author: "Ricardo Menezes (Admin)",
      date: "09/06/2026",
      type: "critical",
      content: "Testamos o BotPro extensivamente nos últimos dias e ele realmente não está disparando mensagens de forma consistente, nem salvando áudios e vídeos. Evitem perder tempo e dinheiro com ele. Migrem imediatamente para o LEONA."
    },
    {
      id: "a2",
      title: "💡 DICA DE CONVERSÃO: Nomes Femininos em Páginas",
      author: "Romão Lucas (Admin)",
      date: "10/06/2026",
      type: "tip",
      content: "Criar páginas no Facebook utilizando nomes e fotos de mulheres reais (ex: 'Amanda Consultora', 'Beatriz Receitas') converte em média 30% mais cliques e conversas no WhatsApp do que páginas com nomes genéricos ou logotipos frios."
    },
    {
      id: "a3",
      title: "🛒 MINERAÇÃO: Lote de Chips TIM na Shopee",
      author: "Ananda Tupinamba",
      date: "11/06/2026",
      type: "info",
      content: "Achei chips virgens da TIM na Shopee saindo a menos de R$ 12 cada (kit com 5 unidades por R$ 55). Já comprei dois kits para rodar contingência. Recomendo pegarem também para deixar instâncias na reserva."
    }
  ];

  const tools = [
    { name: "Leona Solutions", category: "Automação/WhatsApp", desc: "Plataforma de bot de automação oficial do grupo.", url: "https://app.leonasolutions.io/register?via=romao" },
    { name: "InfinitePay", category: "Meio de Pagamento", desc: "Receber Pix automático e criar cartões virtuais.", url: "https://infinitepay.onelink.me/IGWD/x1pix" },
    { name: "Biblioteca de Anúncios", category: "Mineração", desc: "Pesquisar criativos ativos de concorrentes no Meta.", url: "https://www.facebook.com/ads/library/" },
    { name: "Minimax Audio", category: "Vozes por IA", desc: "Criar áudios ultra realistas com vozes sintéticas.", url: "https://youtube.com/@leonardoleite2025" }
  ];

  const extensions = [
    { name: "GG SPY", desc: "Extensão para baixar vídeos e imagens de anúncios da biblioteca." },
    { name: "AdsSparo", desc: "Extensão para espionar criativos e histórico de concorrência." },
    { name: "Copycat", desc: "Extensão para clonar páginas e copies de alta conversão." }
  ];

  return (
    <div className="space-y-8 max-w-7xl mx-auto py-4">
      {/* Title Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-black text-white font-heading tracking-wide uppercase">
            Central de Operações & Recursos
          </h2>
          <p className="text-gray-400 text-sm mt-1">
            Espaço de ferramentas, biblioteca de funis prontos e controle financeiro privado da sua operação.
          </p>
        </div>

        {/* Sub-tab Navigation Buttons */}
        <div className="flex flex-wrap md:flex-nowrap bg-white/5 border border-white/10 p-1.5 rounded-2xl gap-1 w-full md:w-auto">
          <Button
            variant="ghost"
            onClick={() => setActiveTab("operations")}
            className={`h-10 px-3 sm:px-4 rounded-xl text-[10px] sm:text-xs font-bold uppercase tracking-wider border-0 cursor-pointer transition-all flex-1 md:flex-initial justify-center items-center flex ${activeTab === "operations"
                ? "bg-[#D4AF37] text-[#050914] hover:bg-[#D4AF37] hover:text-[#050914]"
                : "text-gray-400 hover:text-white hover:bg-white/5"
              }`}
          >
            <TrendingUp className="w-3.5 h-3.5 mr-1" />
            Minha Operação
          </Button>
          <Button
            variant="ghost"
            onClick={() => setActiveTab("library")}
            className={`h-10 px-3 sm:px-4 rounded-xl text-[10px] sm:text-xs font-bold uppercase tracking-wider border-0 cursor-pointer transition-all flex-1 md:flex-initial justify-center items-center flex ${activeTab === "library"
                ? "bg-[#D4AF37] text-[#050914] hover:bg-[#D4AF37] hover:text-[#050914]"
                : "text-gray-400 hover:text-white hover:bg-white/5"
              }`}
          >
            <BookOpen className="w-3.5 h-3.5 mr-1" />
            Funis & PDFs
          </Button>
          <Button
            variant="ghost"
            onClick={() => setActiveTab("notices")}
            className={`h-10 px-3 sm:px-4 rounded-xl text-[10px] sm:text-xs font-bold uppercase tracking-wider border-0 cursor-pointer transition-all flex-1 md:flex-initial justify-center items-center flex ${activeTab === "notices"
                ? "bg-[#D4AF37] text-[#050914] hover:bg-[#D4AF37] hover:text-[#050914]"
                : "text-gray-400 hover:text-white hover:bg-white/5"
              }`}
          >
            <Bell className="w-3.5 h-3.5 mr-1" />
            Mural do Grupo
          </Button>
        </div>
      </div>

      {/* Content Render Conditional on Tab Selection */}

      {/* TAB 1: OPERATIONS (PRIVATE GESTION PANEL) */}
      {activeTab === "operations" && (
        <div className="space-y-8 animate-fadeIn">
          {/* Information banner */}
          <div className="bg-blue-500/10 border border-blue-500/20 p-5 rounded-2xl flex items-start gap-4">
            <div className="w-8 h-8 rounded-lg bg-blue-500/20 border border-blue-500/35 flex items-center justify-center text-blue-400 shrink-0">
              <AlertCircle className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-white">🔒 Seus dados estão protegidos e privados</h4>
              <p className="text-xs text-gray-300 leading-relaxed mt-1">
                Conforme as diretrizes dos Justiceiros do X1, lucros, gastos e conversões são confidenciais. As informações cadastradas neste painel pertencem única e exclusivamente à sua conta e são salvas no seu perfil de forma particular. Nenhum outro aluno ou membro pode vê-las.
              </p>
            </div>
          </div>

          {/* KPI Dashboard Cards Grid */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            <Card className="bg-[#0b1221]/50 backdrop-blur-xl border-white/10 shadow-xl p-5 relative overflow-hidden">
              <div className="absolute right-4 top-4 text-gray-700 opacity-20"><DollarSign className="w-10 h-10" /></div>
              <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">Faturamento Total</span>
              <h3 className="text-2xl font-black text-white mt-2 font-heading">
                R$ {totalRevenue.toLocaleString("pt-BR", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </h3>
              <p className="text-[10px] text-emerald-400 font-bold mt-1.5 flex items-center gap-0.5">
                <ArrowUpRight className="w-3.5 h-3.5" /> Vendas Pix
              </p>
            </Card>

            <Card className="bg-[#0b1221]/50 backdrop-blur-xl border-white/10 shadow-xl p-5 relative overflow-hidden">
              <div className="absolute right-4 top-4 text-gray-700 opacity-20"><TrendingDown className="w-10 h-10" /></div>
              <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">Investimento Ads</span>
              <h3 className="text-2xl font-black text-white mt-2 font-heading">
                R$ {totalSpend.toLocaleString("pt-BR", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </h3>
              <p className="text-[10px] text-red-400 font-bold mt-1.5 flex items-center gap-0.5">
                <ArrowDownRight className="w-3.5 h-3.5" /> Facebook Ads (Meta)
              </p>
            </Card>

            <Card className="bg-[#0b1221]/50 backdrop-blur-xl border-white/10 shadow-xl p-5 relative overflow-hidden">
              <div className="absolute right-4 top-4 text-gray-700 opacity-20"><TrendingUp className="w-10 h-10" /></div>
              <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">Lucro Líquido</span>
              <h3 className={`text-2xl font-black mt-2 font-heading ${netProfit >= 0 ? "text-emerald-400" : "text-red-400"}`}>
                R$ {netProfit.toLocaleString("pt-BR", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </h3>
              <p className="text-[10px] text-gray-400 font-bold mt-1.5">
                Margem real pós-tráfego
              </p>
            </Card>

            <Card className="bg-[#0b1221]/50 backdrop-blur-xl border-white/10 shadow-xl p-5 relative overflow-hidden">
              <div className="absolute right-4 top-4 text-gray-700 opacity-20"><Percent className="w-10 h-10" /></div>
              <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">ROI / ROAS</span>
              <h3 className="text-2xl font-black text-[#D4AF37] mt-2 font-heading">
                {generalROI}% <span className="text-xs text-gray-400 font-normal">/ {generalROAS}x</span>
              </h3>
              <p className="text-[10px] text-[#D4AF37] font-bold mt-1.5">
                Multiplicador de anúncios
              </p>
            </Card>
          </div>

          {/* Operational Secondary metrics */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="bg-[#0b1221]/30 border-white/5 p-4 flex items-center justify-between">
              <div>
                <span className="text-[10px] text-gray-400 font-bold uppercase">Conversão X1</span>
                <h4 className="text-lg font-bold text-white mt-1">{conversionRate.toFixed(1)}%</h4>
              </div>
              <div className="text-[10px] text-gray-500 font-bold bg-white/5 border border-white/10 px-2.5 py-1 rounded-lg">
                Meta: 40%
              </div>
            </Card>

            <Card className="bg-[#0b1221]/30 border-white/5 p-4 flex items-center justify-between">
              <div>
                <span className="text-[10px] text-gray-400 font-bold uppercase">CPL Médio (Custo por Lead)</span>
                <h4 className="text-lg font-bold text-white mt-1">
                  R$ {avgCPL.toLocaleString("pt-BR", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </h4>
              </div>
              <div className={`text-[10px] font-bold px-2.5 py-1 rounded-lg border ${avgCPL <= 1.00 ? "text-emerald-400 bg-emerald-500/10 border-emerald-500/20" :
                  avgCPL <= 1.50 ? "text-yellow-400 bg-yellow-500/10 border-yellow-500/20" :
                    "text-red-400 bg-red-500/10 border-red-500/20"
                }`}>
                {avgCPL <= 1.00 ? "Ideal" : avgCPL <= 1.50 ? "Aceitável" : "Crítico"}
              </div>
            </Card>

            <Card className="bg-[#0b1221]/30 border-white/5 p-4 flex items-center justify-between">
              <div>
                <span className="text-[10px] text-gray-400 font-bold uppercase">CPA Médio (Custo por Venda)</span>
                <h4 className="text-lg font-bold text-white mt-1">
                  R$ {avgCPA.toLocaleString("pt-BR", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </h4>
              </div>
              <div className="text-[10px] text-gray-500 font-bold bg-white/5 border border-white/10 px-2.5 py-1 rounded-lg">
                Ticket: {totalSales > 0 ? `R$ ${(totalRevenue / totalSales).toFixed(2)}` : "-"}
              </div>
            </Card>
          </div>

          {/* Gráfico de Evolução SVG */}
          {entries.length > 0 && (
            <Card className="bg-[#0b1221]/45 border-white/10 p-6 rounded-2xl text-left">
              <h4 className="text-sm font-bold text-white mb-2 flex items-center gap-2">
                <Activity className="w-5 h-5 text-[#D4AF37]" /> Evolução Financeira (Últimos 7 Lançamentos)
              </h4>
              <p className="text-xs text-gray-400 mb-6">Comparativo diário de investimento em anúncios versus faturamento no Pix.</p>

              <div className="w-full overflow-hidden">
                {(() => {
                  const chartData = [...entries]
                    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
                    .slice(-7);
                  const maxVal = Math.max(...chartData.map(d => Math.max(d.spend, d.revenue)), 100) * 1.1;

                  return (
                    <svg viewBox="0 0 600 220" className="w-full h-auto text-gray-400">
                      {/* Grid Lines */}
                      {[0, 0.25, 0.5, 0.75, 1].map((ratio, idx) => {
                        const y = 20 + (1 - ratio) * 140;
                        const val = Math.round(maxVal * ratio);
                        return (
                          <g key={idx} className="opacity-40">
                            <line x1="50" y1={y} x2="570" y2={y} stroke="rgba(255,255,255,0.08)" strokeDasharray="3,3" />
                            <text x="10" y={y + 4} className="text-[10px] fill-gray-500 font-mono">R$ {val}</text>
                          </g>
                        );
                      })}

                      {/* Bars */}
                      {chartData.map((data, idx) => {
                        const x = 75 + idx * 70;
                        const spendHeight = (data.spend / maxVal) * 140;
                        const revenueHeight = (data.revenue / maxVal) * 140;
                        const spendY = 160 - spendHeight;
                        const revenueY = 160 - revenueHeight;

                        let shortDate = data.date;
                        try {
                          const dObj = new Date(data.date + "T12:00:00");
                          shortDate = dObj.toLocaleDateString("pt-BR", { day: '2-digit', month: '2-digit' });
                        } catch (e) { }

                        return (
                          <g key={data.id}>
                            <rect
                              x={x}
                              y={spendY}
                              width="18"
                              height={spendHeight}
                              fill="rgba(239, 68, 68, 0.65)"
                              rx="4"
                              className="transition-all hover:fill-red-500 cursor-pointer"
                            />
                            <rect
                              x={x + 22}
                              y={revenueY}
                              width="18"
                              height={revenueHeight}
                              fill="rgba(212, 175, 55, 0.85)"
                              rx="4"
                              className="transition-all hover:fill-[#e5c158] cursor-pointer"
                            />
                            <text x={x + 20} y="180" textAnchor="middle" className="text-[9px] fill-gray-400 font-mono">{shortDate}</text>
                          </g>
                        );
                      })}

                      <line x1="50" y1="160" x2="570" y2="160" stroke="rgba(255,255,255,0.15)" strokeWidth="1.5" />
                    </svg>
                  );
                })()}
              </div>

              <div className="flex gap-4 items-center justify-center mt-4 text-[10px] text-gray-400">
                <div className="flex items-center gap-1.5">
                  <div className="w-3 h-3 bg-red-500/60 border border-red-500/30 rounded-md"></div>
                  <span>Investido (Ads)</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <div className="w-3 h-3 bg-[#D4AF37]/80 border border-[#D4AF37]/20 rounded-md"></div>
                  <span>Faturamento (Pix)</span>
                </div>
              </div>
            </Card>
          )}

          {/* Add Entry & History Section */}
          <div className="space-y-4">
            <div className="flex items-center justify-between border-b border-white/5 pb-4">
              <div>
                <h3 className="text-lg font-bold text-white">Histórico de Campanhas & Vendas</h3>
                <p className="text-xs text-gray-400 mt-0.5">Listagem cronológica dos registros diários da sua operação.</p>
              </div>

              {/* Dialog Modal to Add New Entry */}
              <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogTrigger render={
                  <Button className="h-10 px-5 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-xs uppercase tracking-wider flex items-center gap-1.5 cursor-pointer border-0">
                    <Plus className="w-4 h-4" /> Registrar Dia
                  </Button>
                } />
                <DialogContent className="bg-[#0A1128]/95 border-white/10 backdrop-blur-2xl text-white max-w-md p-6 rounded-2xl">
                  <DialogHeader>
                    <DialogTitle className="text-lg font-bold text-white uppercase tracking-wider font-heading">
                      Registrar Dados do Dia
                    </DialogTitle>
                    <DialogDescription className="text-xs text-gray-400 leading-normal">
                      Insira os resultados das métricas de anúncios e vendas geradas no dia para calcular o ROI e a conversão.
                    </DialogDescription>
                  </DialogHeader>

                  <form onSubmit={handleAddEntry} className="space-y-4 pt-4">
                    {formError && (
                      <div className="bg-red-500/10 border border-red-500/20 p-3 rounded-xl text-xs text-red-400 font-bold flex items-center gap-2">
                        <AlertCircle className="w-4 h-4 shrink-0" /> {formError}
                      </div>
                    )}

                    <div className="space-y-1.5">
                      <label className="text-[10px] uppercase font-bold text-gray-400">Data de Análise</label>
                      <div className="relative">
                        <Calendar className="absolute left-3.5 top-3.5 w-4 h-4 text-gray-400 pointer-events-none" />
                        <Input
                          type="date"
                          value={formDate}
                          onChange={(e) => setFormDate(e.target.value)}
                          className="h-11 pl-11 bg-black/40 border-white/10 focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37] rounded-xl text-white text-xs w-full"
                          required
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <label className="text-[10px] uppercase font-bold text-gray-400">Investimento (Ads)</label>
                        <Input
                          type="number"
                          step="0.01"
                          placeholder="R$ 0,00"
                          value={formSpend}
                          onChange={(e) => setFormSpend(e.target.value)}
                          className="h-11 bg-black/40 border-white/10 focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37] rounded-xl text-white text-xs w-full"
                          required
                        />
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-[10px] uppercase font-bold text-gray-400">Leads no WhatsApp</label>
                        <Input
                          type="number"
                          placeholder="0"
                          value={formLeads}
                          onChange={(e) => setFormLeads(e.target.value)}
                          className="h-11 bg-black/40 border-white/10 focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37] rounded-xl text-white text-xs w-full"
                          required
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <label className="text-[10px] uppercase font-bold text-gray-400">Vendas Concluídas</label>
                        <Input
                          type="number"
                          placeholder="0"
                          value={formSales}
                          onChange={(e) => setFormSales(e.target.value)}
                          className="h-11 bg-black/40 border-white/10 focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37] rounded-xl text-white text-xs w-full"
                          required
                        />
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-[10px] uppercase font-bold text-gray-400">Faturamento Pix</label>
                        <Input
                          type="number"
                          step="0.01"
                          placeholder="R$ 0,00"
                          value={formRevenue}
                          onChange={(e) => setFormRevenue(e.target.value)}
                          className="h-11 bg-black/40 border-white/10 focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37] rounded-xl text-white text-xs w-full"
                          required
                        />
                      </div>
                    </div>

                    <div className="flex gap-3 pt-3">
                      <Button
                        type="button"
                        variant="ghost"
                        onClick={() => setIsDialogOpen(false)}
                        className="flex-1 h-11 rounded-xl text-xs font-bold uppercase tracking-wider text-gray-400 hover:text-white hover:bg-white/5 border border-white/5 cursor-pointer"
                      >
                        Cancelar
                      </Button>
                      <Button
                        type="submit"
                        className="flex-1 h-11 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-xs uppercase tracking-wider border-0 cursor-pointer"
                      >
                        Salvar Registro
                      </Button>
                    </div>
                  </form>
                </DialogContent>
              </Dialog>
            </div>

            {/* Operations list table */}
            {loadingOps ? (
              <div className="flex flex-col items-center justify-center py-12">
                <div className="w-8 h-8 border-4 border-[#D4AF37]/20 border-t-[#D4AF37] rounded-full animate-spin mb-3"></div>
                <p className="text-gray-400 text-xs animate-pulse">Buscando planilhas salvas...</p>
              </div>
            ) : entries.length === 0 ? (
              <div className="border border-white/5 bg-[#0b1221]/20 rounded-2xl p-12 text-center max-w-xl mx-auto space-y-4">
                <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-[#D4AF37] mx-auto">
                  <TrendingUp className="w-6 h-6" />
                </div>
                <div className="space-y-1">
                  <h4 className="text-sm font-bold text-white">Nenhum registro diário cadastrado</h4>
                  <p className="text-xs text-gray-450 leading-relaxed">
                    Comece a mapear o desempenho de sua contingência e o faturamento do WhatsApp. Clique no botão "Registrar Dia" acima para lançar sua primeira entrada de faturamento e anúncios.
                  </p>
                </div>
              </div>
            ) : (
              <div className="border border-white/10 bg-[#0b1221]/30 backdrop-blur-xl rounded-2xl overflow-hidden shadow-2xl">
                <div className="overflow-x-auto w-full">
                  <table className="w-full text-left text-xs border-collapse">
                    <thead>
                      <tr className="bg-white/5 border-b border-white/10 text-[10px] uppercase font-bold text-gray-400 tracking-wider">
                        <th className="p-4 sm:p-5">Data</th>
                        <th className="p-4 sm:p-5">Investido Ads</th>
                        <th className="p-4 sm:p-5">Leads / CPL</th>
                        <th className="p-4 sm:p-5">Vendas / Conversão</th>
                        <th className="p-4 sm:p-5">Faturamento Pix</th>
                        <th className="p-4 sm:p-5">Lucro Líquido</th>
                        <th className="p-4 sm:p-5">ROI / ROAS</th>
                        <th className="p-4 sm:p-5 text-center">Ações</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                      {entries.map((entry) => {
                        const rowProfit = entry.revenue - entry.spend;
                        const rowCPL = entry.leads > 0 ? entry.spend / entry.leads : 0;
                        const rowConversion = entry.leads > 0 ? (entry.sales / entry.leads) * 100 : 0;
                        const rowROI = entry.spend > 0 ? Math.round((rowProfit / entry.spend) * 100) : 0;
                        const rowROAS = entry.spend > 0 ? (entry.revenue / entry.spend).toFixed(2) : "0.00";

                        // Format local date representation
                        let formattedDate = entry.date;
                        try {
                          const dateObj = new Date(entry.date + "T12:00:00");
                          formattedDate = dateObj.toLocaleDateString("pt-BR", { day: '2-digit', month: '2-digit', year: 'numeric' });
                        } catch (e) { }

                        return (
                          <tr key={entry.id} className="hover:bg-white/2 transition-colors">
                            <td className="p-4 sm:p-5 font-semibold text-white whitespace-nowrap">
                              {formattedDate}
                            </td>
                            <td className="p-4 sm:p-5 text-gray-300">
                              R$ {entry.spend.toFixed(2)}
                            </td>
                            <td className="p-4 sm:p-5">
                              <div className="font-medium text-white">{entry.leads} leads</div>
                              <div className="text-[10px] text-gray-400">CPL: R$ {rowCPL.toFixed(2)}</div>
                            </td>
                            <td className="p-4 sm:p-5">
                              <div className="font-medium text-white">{entry.sales} vendas</div>
                              <div className="text-[10px] text-gray-400">Taxa: {rowConversion.toFixed(1)}%</div>
                            </td>
                            <td className="p-4 sm:p-5 font-semibold text-white">
                              R$ {entry.revenue.toFixed(2)}
                            </td>
                            <td className={`p-4 sm:p-5 font-bold ${rowProfit >= 0 ? "text-emerald-400" : "text-red-400"}`}>
                              R$ {rowProfit.toFixed(2)}
                            </td>
                            <td className="p-4 sm:p-5">
                              <span className={`font-semibold ${rowProfit >= 0 ? "text-emerald-400" : "text-red-400"}`}>{rowROI}%</span>
                              <span className="text-gray-500 text-[10px] block">ROAS: {rowROAS}x</span>
                            </td>
                            <td className="p-4 sm:p-5 text-center">
                              <Button
                                size="icon"
                                variant="ghost"
                                onClick={() => handleDeleteEntry(entry.id)}
                                className="w-8 h-8 rounded-lg hover:bg-red-500/10 text-gray-450 hover:text-red-400 border-0 cursor-pointer transition-colors"
                                title="Excluir Registro"
                              >
                                <Trash2 className="w-4 h-4" />
                              </Button>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* TAB 2: SHARED MINED PRODUCTS LIBRARY */}
      {activeTab === "library" && (
        <div className="space-y-6 animate-fadeIn">
          <div>
            <h3 className="text-lg font-bold text-white">Biblioteca de Funis & PDFs Minerados</h3>
            <p className="text-xs text-gray-450 mt-0.5">Funnels completos validados na Biblioteca de Anúncios da Meta pela equipe, contendo material de entrega, cópia e scripts de áudios.</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {sharedProducts.map((prod) => (
              <Card key={prod.id} className="bg-[#0b1221]/50 backdrop-blur-xl border-white/10 shadow-2xl p-6 flex flex-col justify-between">
                <div className="space-y-4">
                  {/* Top Metadata */}
                  <div className="flex justify-between items-start gap-3 flex-wrap">
                    <div>
                      <span className="px-2.5 py-1 rounded-lg border border-[#D4AF37]/20 bg-[#D4AF37]/5 text-[#D4AF37] text-[10px] font-bold uppercase tracking-wider">
                        {prod.niche}
                      </span>
                      <h4 className="text-base font-bold text-white font-heading mt-2">{prod.title}</h4>
                    </div>
                    <div className="text-right">
                      <span className="text-[10px] text-gray-400 block font-bold uppercase tracking-wider">Preço Sugerido</span>
                      <span className="text-sm font-black text-white font-heading mt-0.5 block">{prod.ticket}</span>
                    </div>
                  </div>

                  <p className="text-xs text-gray-300 leading-normal">{prod.description}</p>

                  <div className="text-[10px] text-gray-400 font-semibold border-l-2 border-[#D4AF37] pl-2 py-0.5">
                    {prod.stats}
                  </div>

                  {/* Copy Script Container */}
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-[10px] uppercase font-bold text-gray-400 flex items-center gap-1.5">
                        <Terminal className="w-3.5 h-3.5 text-[#D4AF37]" /> Mensagem de Funil (Entrega PAD)
                      </span>
                      <Button
                        size="xs"
                        variant="ghost"
                        onClick={() => handleCopy(prod.copy, `${prod.id}_copy`)}
                        className="h-7 px-2.5 rounded-lg hover:bg-[#D4AF37] hover:text-[#050914] text-xs font-semibold text-white border border-white/5 cursor-pointer flex items-center gap-1 transition-colors"
                      >
                        {copiedItemId === `${prod.id}_copy` ? (
                          <><Check className="w-3 h-3 text-emerald-400" /> Copiado</>
                        ) : (
                          <><Copy className="w-3 h-3" /> Copiar Copy</>
                        )}
                      </Button>
                    </div>
                    <pre className="text-[11px] text-gray-300 bg-black/45 p-3 rounded-xl border border-white/5 overflow-x-auto whitespace-pre-wrap font-sans select-all leading-normal max-h-40 overflow-y-auto">
                      {prod.copy}
                    </pre>
                  </div>

                  {/* Audios scripts section */}
                  {prod.audios.length > 0 && (
                    <div className="space-y-3">
                      <span className="text-[10px] uppercase font-bold text-gray-400 block">Áudios para Voz Sintética (Minimax Audio)</span>
                      <div className="space-y-4 max-h-96 overflow-y-auto pr-1">
                        {prod.audios.map((aud, index) => (
                          <div key={index} className="bg-white/3 border border-white/5 p-3 rounded-lg text-xs relative group space-y-2">
                            <div className="flex justify-between items-center">
                              <span className="font-bold text-[10px] text-[#D4AF37] uppercase">{aud.step}</span>
                              <Button
                                size="icon"
                                variant="ghost"
                                onClick={() => handleCopy(aud.text, `${prod.id}_aud_${index}`)}
                                className="w-6 h-6 rounded-md hover:bg-[#D4AF37] hover:text-[#050914] text-white border-0 cursor-pointer"
                                title="Copiar Texto para Voz IA"
                              >
                                {copiedItemId === `${prod.id}_aud_${index}` ? (
                                  <Check className="w-3 h-3 text-emerald-400" />
                                ) : (
                                  <Copy className="w-3 h-3" />
                                )}
                              </Button>
                            </div>
                            <p className="text-[11px] text-gray-355 leading-normal font-light mb-2">{aud.text}</p>
                            <WhatsAppAudioPlayer
                              textTranscript={aud.text}
                              senderName={prod.title.includes("Receitas") ? "Amanda" : "Beatriz"}
                            />
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* Download PDF & Link Buttons */}
                <div className="mt-6 flex gap-3">
                  <a
                    href={prod.downloadUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="flex-1"
                  >
                    <Button
                      disabled={prod.downloadUrl === "#"}
                      className="w-full h-11 bg-white/5 hover:bg-white/10 text-white font-bold rounded-xl text-xs flex items-center justify-center gap-1.5 border border-white/10 cursor-pointer transition-colors"
                    >
                      Baixar PDF de Teste <ExternalLink className="w-3.5 h-3.5" />
                    </Button>
                  </a>
                  {prod.id === "p_chips" && (
                    <a
                      href="https://shopee.com.br"
                      target="_blank"
                      rel="noreferrer"
                      className="flex-1"
                    >
                      <Button className="w-full h-11 bg-[#D4AF37] hover:bg-[#D4AF37]/90 text-[#050914] font-bold rounded-xl text-xs flex items-center justify-center gap-1.5 border-0 cursor-pointer transition-colors">
                        Comprar na Shopee <ExternalLink className="w-3.5 h-3.5" />
                      </Button>
                    </a>
                  )}
                </div>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* TAB 3: ADMIN ANNOUNCEMENTS & SUPORTS MURAL */}
      {activeTab === "notices" && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 animate-fadeIn">
          {/* Left Col: Avisos e Mural */}
          <div className="lg:col-span-2 space-y-6">
            <Card className="bg-[#0b1221]/50 backdrop-blur-xl border-white/10 shadow-2xl p-6">
              <CardHeader className="p-0 pb-6 border-b border-white/5 flex flex-row items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#D4AF37]/10 border border-[#D4AF37]/25 flex items-center justify-center text-[#D4AF37]">
                  <Bell className="w-5 h-5" />
                </div>
                <div>
                  <CardTitle className="text-lg font-bold text-white">Quadro de Avisos dos Justiceiros</CardTitle>
                  <CardDescription className="text-xs text-gray-400">Mensagens operacionais importantes enviadas no grupo de WhatsApp.</CardDescription>
                </div>
              </CardHeader>
              <CardContent className="p-0 pt-6 space-y-5">
                {announcements.map((ann) => (
                  <div
                    key={ann.id}
                    className={`p-5 rounded-2xl border text-sm leading-relaxed ${ann.type === "critical"
                        ? "bg-red-500/5 border-red-500/20"
                        : ann.type === "tip"
                          ? "bg-[#D4AF37]/5 border-[#D4AF37]/20"
                          : "bg-white/5 border-white/5"
                      }`}
                  >
                    <div className="flex justify-between items-start gap-4 mb-2 flex-wrap">
                      <h4 className={`font-bold text-xs uppercase tracking-wider ${ann.type === "critical"
                          ? "text-red-400"
                          : ann.type === "tip"
                            ? "text-[#D4AF37]"
                            : "text-blue-400"
                        }`}>
                        {ann.title}
                      </h4>
                      <span className="text-[10px] text-gray-500 font-semibold">{ann.date}</span>
                    </div>
                    <p className="text-xs text-gray-300 leading-normal">{ann.content}</p>
                    <div className="mt-3 text-[10px] text-gray-500 font-bold uppercase tracking-wider">
                      Enviado por: {ann.author}
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Right Col: Ferramentas, Extensões e links de suporte */}
          <div className="space-y-6">

            {/* Suporte Chat Card */}
            <Card className="bg-[#0b1221]/50 backdrop-blur-xl border-white/10 p-6 flex flex-col justify-between h-[210px] relative overflow-hidden group">
              <div className="absolute -right-10 -top-10 w-28 h-28 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none"></div>

              <div className="space-y-3 relative z-10">
                <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
                  <MessageSquare className="w-5 h-5" />
                </div>
                <h3 className="text-base font-bold text-white font-heading leading-tight">Grupo de Suporte X1</h3>
                <p className="text-gray-400 text-[11px] leading-relaxed">
                  Grupo oficial no WhatsApp para contato direto com o Ricardo, Wil e Romão para suporte da operação.
                </p>
              </div>

              <a
                href="https://wa.me/5571988165535"
                target="_blank"
                rel="noreferrer"
                className="relative z-10 w-full"
              >
                <Button className="w-full h-11 bg-emerald-500 hover:bg-emerald-600 text-white font-bold rounded-xl flex items-center justify-center gap-1.5 border-0 cursor-pointer text-xs uppercase tracking-wider">
                  Acessar Grupo <ExternalLink className="w-3.5 h-3.5" />
                </Button>
              </a>
            </Card>

            {/* Tools list */}
            <Card className="bg-[#0b1221]/50 backdrop-blur-xl border-white/10 p-6 space-y-5">
              <div>
                <h4 className="text-sm font-bold text-white font-heading flex items-center gap-1.5">
                  <Wrench className="w-4 h-4 text-[#D4AF37]" /> Links de Acesso Rápido
                </h4>
                <p className="text-[10px] text-gray-450 mt-0.5 font-medium">Ferramentas oficiais citadas no chat.</p>
              </div>

              <div className="space-y-4">
                {tools.map((tool, idx) => (
                  <div key={idx} className="border-b border-white/5 pb-3.5 last:border-0 last:pb-0">
                    <div className="flex justify-between items-center">
                      <span className="text-xs font-bold text-white">{tool.name}</span>
                      <a
                        href={tool.url}
                        target="_blank"
                        rel="noreferrer"
                        className="text-[#D4AF37] hover:underline text-[10px] font-bold flex items-center gap-0.5"
                      >
                        Acessar <ExternalLink className="w-3 h-3" />
                      </a>
                    </div>
                    <p className="text-[10px] text-[#D4AF37] font-semibold mt-0.5">{tool.category}</p>
                    <p className="text-[11px] text-gray-300 mt-1.5 leading-normal">{tool.desc}</p>
                  </div>
                ))}
              </div>
            </Card>

            {/* Recommended Extensions */}
            <Card className="bg-[#0b1221]/50 backdrop-blur-xl border-white/10 p-6 space-y-4">
              <div>
                <h4 className="text-sm font-bold text-white font-heading flex items-center gap-1.5">
                  <ShieldAlert className="w-4 h-4 text-blue-400" /> Extensões Chrome (Espionagem)
                </h4>
                <p className="text-[10px] text-gray-450 mt-0.5 font-medium">Ferramentas de navegador recomendadas pelo Wil.</p>
              </div>

              <div className="space-y-3.5">
                {extensions.map((ext, idx) => (
                  <div key={idx} className="text-xs">
                    <span className="font-bold text-white uppercase tracking-wider text-[10px] block">{ext.name}</span>
                    <p className="text-[11px] text-gray-350 mt-1 leading-normal">{ext.desc}</p>
                  </div>
                ))}
              </div>
            </Card>

          </div>
        </div>
      )}

    </div>
  );
}
