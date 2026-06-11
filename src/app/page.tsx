"use client";

import React, { useState, useEffect } from "react";

// --- Icons ---
const BookIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20"/></svg>
);
const GridIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="7" height="7" x="3" y="3" rx="1"/><rect width="7" height="7" x="14" y="3" rx="1"/><rect width="7" height="7" x="14" y="14" rx="1"/><rect width="7" height="7" x="3" y="14" rx="1"/></svg>
);
const LayersIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 2 7 12 12 22 7 12 2"/><polyline points="2 12 12 17 22 12"/><polyline points="2 17 12 22 22 17"/></svg>
);
const MonitorPlayIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="14" x="2" y="3" rx="2"/><line x1="8" x2="16" y1="21" y2="21"/><line x1="12" x2="12" y1="17" y2="21"/><polygon points="10 7 15 10 10 13 10 7"/></svg>
);
const FolderIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 20h16a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.93a2 2 0 0 1-1.66-.9l-.82-1.2A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13c0 1.1.9 2 2 2Z"/></svg>
);
const BarChartIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" x2="12" y1="20" y2="10"/><line x1="18" x2="18" y1="20" y2="4"/><line x1="6" x2="6" y1="20" y2="16"/></svg>
);
const TrophyIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"/><path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"/><path d="M4 22h16"/><path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22"/><path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22"/><path d="M18 2H6v7a6 6 0 0 0 12 0V2Z"/></svg>
);
const BellIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"/><path d="M10.3 21a1.94 1.94 0 0 0 3.4 0"/></svg>
);
const PlayIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><polygon points="5 3 19 12 5 21 5 3"/></svg>
);
const SpeakerIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><path d="M15.54 8.46a5 5 0 0 1 0 7.07"/><path d="M19.07 4.93a10 10 0 0 1 0 14.14"/></svg>
);
const CheckIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
);
const ChessIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"><path d="M12 3v4"/><path d="M9 7h6"/><path d="M10 7v3.5a2.5 2.5 0 0 0 4 0V7"/><path d="M12 10.5V17"/><path d="M8 17h8"/><path d="M7 21h10"/><path d="M12 3a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3Z"/></svg>
);

// --- Mocks & Auth ---
const USERS = [
  { id: 1, username: "ricardo", password: "x1", name: "Ricardo Menezes", role: "admin" },
  { id: 2, username: "wil", password: "x1", name: "Wil", role: "admin" },
  { id: 3, username: "romao", password: "x1", name: "Romão Lucas", role: "admin" },
  { id: 4, username: "ramon", password: "x1", name: "Ramon", role: "aluno" },
  { id: 5, username: "ananda", password: "x1", name: "Ananda Tupinamba", role: "aluno" },
  { id: 6, username: "emerson", password: "x1", name: "Emerson Tavares", role: "aluno" },
  { id: 7, username: "andreia", password: "x1", name: "Andréia", role: "aluno" },
  { id: 8, username: "emersonleal", password: "x1", name: "Émerson Leal", role: "aluno" },
  { id: 9, username: "ismael", password: "x1", name: "Ismael", role: "aluno" },
  // Alunos genéricos adicionais para completar 15
  { id: 10, username: "aluno1", password: "x1", name: "Aluno 1", role: "aluno" },
  { id: 11, username: "aluno2", password: "x1", name: "Aluno 2", role: "aluno" },
  { id: 12, username: "aluno3", password: "x1", name: "Aluno 3", role: "aluno" },
  { id: 13, username: "aluno4", password: "x1", name: "Aluno 4", role: "aluno" },
  { id: 14, username: "aluno5", password: "x1", name: "Aluno 5", role: "aluno" },
  { id: 15, username: "aluno6", password: "x1", name: "Aluno 6", role: "aluno" },
];

const MODULES = [
  { id: 1, title: "O Jogo do X1 e o PAD", progress: 100, completed: true, content: "Bem-vindo ao Jogo do X1. Aqui você aprenderá a base da estratégia Pay After Delivery (PAD). O cliente chega pelo anúncio, o robô atende, entrega o produto e depois você recebe o PIX. A conversão média é de 40%." },
  { id: 2, title: "O Arsenal (Estrutura)", progress: 80, completed: false, content: "Para iniciar nas vendas de produtos digitais no automático, precisamos ter: Perfil no Facebook, Whatsapp Business, Conta na Infinite Pay e um funil de atendimento." },
  { id: 3, title: "Garimpando Ouro (Mineração)", progress: 60, completed: false, content: "Encontre produtos milionários na Biblioteca de Anúncios. Pesquise por 'pdf 10,00' ou 'api'. Veja o que a concorrência faz e modele o funil deles." },
  { id: 4, title: "Automação (O Robô)", progress: 30, completed: false, content: "Nós recomendamos o Leona. O BotPro tem apresentado problemas de instabilidade. Configure seu robô para entregar a isca e fechar a venda de forma automática." },
  { id: 5, title: "Tráfego e Escala", progress: 0, completed: false, content: "Subindo suas campanhas no Meta Ads. Comece testando criativos em CBO com R$ 15 a R$ 25. Analise as métricas como Custo por Conversa, ROI e escale os vencedores dobrando o orçamento." },
];

export default function Dashboard() {
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [activeModule, setActiveModule] = useState<number | null>(null);
  const [isPlayingTTS, setIsPlayingTTS] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("justiceiros_user");
    if (saved) setCurrentUser(JSON.parse(saved));
  }, []);

  const handleLogin = (user: any) => {
    setCurrentUser(user);
    localStorage.setItem("justiceiros_user", JSON.stringify(user));
  };

  const handleLogout = () => {
    setCurrentUser(null);
    localStorage.removeItem("justiceiros_user");
    window.speechSynthesis.cancel();
  };

  if (!currentUser) {
    return <LoginScreen onLogin={handleLogin} />;
  }

  // --- Funções TTS ---
  const handleTTS = (text: string) => {
    if (isPlayingTTS) {
      window.speechSynthesis.cancel();
      setIsPlayingTTS(false);
      return;
    }
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "pt-BR";
    utterance.rate = 1.0;
    utterance.onend = () => setIsPlayingTTS(false);
    
    setIsPlayingTTS(true);
    window.speechSynthesis.speak(utterance);
  };

  // --- Telas ---
  if (activeModule) {
    const mod = MODULES.find((m) => m.id === activeModule);
    return (
      <div className="flex w-full min-h-screen bg-[#F3F4F6] text-[#0A1128] font-sans">
        <Sidebar activeItem="Aulas" onHome={() => setActiveModule(null)} />
        <main className="flex-1 flex flex-col p-8 h-screen overflow-y-auto">
          <button 
            onClick={() => {
              window.speechSynthesis.cancel();
              setIsPlayingTTS(false);
              setActiveModule(null);
            }} 
            className="mb-6 text-sm font-semibold text-gray-500 hover:text-navy"
          >
            &larr; Voltar para o Dashboard
          </button>
          
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 max-w-4xl mx-auto w-full">
            <h1 className="text-3xl font-bold text-[#0A1128] mb-2">Módulo {mod?.id}: {mod?.title}</h1>
            <div className="flex items-center gap-4 mb-8">
              <span className="bg-green-100 text-green-700 text-xs font-bold px-3 py-1 rounded-full uppercase">
                {mod?.completed ? "Concluído" : "Em Progresso"}
              </span>
              <span className="text-sm text-gray-400">Progresso: {mod?.progress}%</span>
            </div>

            <div className="bg-[#0A1128] text-white p-6 rounded-xl shadow-inner mb-6 relative">
              <button 
                onClick={() => handleTTS(mod?.content || "")}
                className="absolute top-4 right-4 bg-[#D4AF37] text-[#0A1128] px-4 py-2 rounded-lg font-bold flex items-center gap-2 hover:bg-[#F3C623] transition-all"
              >
                <SpeakerIcon />
                {isPlayingTTS ? "Parar Áudio" : "Ouvir Aula"}
              </button>
              <h2 className="text-xl font-semibold mb-4 text-[#D4AF37]">Transcrição da Aula</h2>
              <p className="text-gray-300 leading-relaxed text-lg max-w-2xl">
                {mod?.content}
              </p>
            </div>

            <button className="bg-[#0A1128] text-white px-8 py-3 rounded-xl font-bold hover:bg-[#111A3A] transition-all">
              Marcar como Concluída
            </button>
          </div>
        </main>
      </div>
    );
  }

  // --- Dashboard Principal ---
  return (
    <div className="flex w-full min-h-screen bg-[#F3F4F6] font-sans">
      <Sidebar activeItem="Dashboard" onHome={() => setActiveModule(null)} />
      
      <div className="flex-1 flex flex-col h-screen overflow-y-auto">
        <Topbar user={currentUser} onLogout={handleLogout} />
        
        <main className="flex-1 p-8 pt-6 flex gap-8">
          {/* Conteúdo Central */}
          <div className="flex-1 flex flex-col gap-8">
            
            {/* Hero Section */}
            <div className="bg-[#0B1221] rounded-2xl p-10 flex relative overflow-hidden shadow-lg border border-[#111A3A]">
              <div className="z-10 max-w-md relative">
                <h2 className="text-white text-4xl font-bold leading-tight mb-4">
                  Seu caminho para dominar<br />o mercado de X1.
                </h2>
                <p className="text-gray-400 mb-8 text-lg">
                  Siga o método. Execute com consistência.<br />Transforme conhecimento em resultados.
                </p>
                <button className="bg-[#D4AF37] text-[#0A1128] px-6 py-3 rounded-lg font-bold flex items-center gap-2 hover:bg-[#F3C623] transition-all">
                  <PlayIcon /> Continuar Aprendendo
                </button>
                
                <div className="mt-12">
                  <div className="flex justify-between text-sm text-gray-400 mb-2 font-medium">
                    <span>Seu progresso geral</span>
                    <span>75% concluído</span>
                  </div>
                  <div className="h-2 w-full bg-[#1A2652] rounded-full overflow-hidden">
                    <div className="h-full bg-[#D4AF37] w-[75%] rounded-full shadow-[0_0_10px_#D4AF37]"></div>
                  </div>
                </div>
              </div>
              {/* Fake Image Background */}
              <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-transparent to-[#0B1221] z-0"></div>
              <div className="absolute top-0 right-0 w-1/2 h-full opacity-40 bg-[url('https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80')] bg-cover bg-center"></div>
            </div>

            {/* Modules Grid */}
            <div>
              <div className="flex justify-between items-end mb-4">
                <h3 className="text-[#0B1221] text-xl font-bold">Seus Módulos</h3>
                <button className="text-sm font-semibold text-gray-500 hover:text-[#0B1221]">Ver todos os módulos &rarr;</button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                {MODULES.map((mod) => (
                  <div key={mod.id} className="bg-[#0B1221] border border-[#1A2652] rounded-2xl p-5 flex flex-col justify-between shadow-md hover:-translate-y-1 transition-transform cursor-pointer" onClick={() => setActiveModule(mod.id)}>
                    <div>
                      <p className="text-xs text-gray-400 font-bold uppercase tracking-wider mb-1">Módulo 0{mod.id}</p>
                      <h4 className="text-white font-bold leading-tight min-h-[40px]">{mod.title}</h4>
                      <div className="my-6 text-[#D4AF37] flex justify-center opacity-80">
                        {/* Fake Module Icon */}
                        <ChessIcon />
                      </div>
                    </div>
                    
                    <div>
                      <div className="flex justify-between text-xs text-gray-400 mb-1 font-medium">
                        <span>{mod.progress}%</span>
                      </div>
                      <div className="h-1.5 w-full bg-[#1A2652] rounded-full mb-4 overflow-hidden">
                        <div className="h-full bg-[#D4AF37] rounded-full" style={{ width: `${mod.progress}%` }}></div>
                      </div>
                      
                      {mod.completed ? (
                        <button className="w-full py-2 rounded-lg border border-green-500/30 text-green-400 font-semibold text-sm flex items-center justify-center gap-2 bg-green-500/10">
                          Concluído <CheckIcon />
                        </button>
                      ) : mod.progress === 0 ? (
                        <button className="w-full py-2 rounded-lg border border-[#23315E] text-white font-semibold text-sm hover:bg-[#1A2652]">
                          Começar
                        </button>
                      ) : (
                        <button className="w-full py-2 rounded-lg bg-[#D4AF37] text-[#0A1128] font-bold text-sm hover:bg-[#F3C623]">
                          Continuar
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Continue de onde parou */}
            <div>
              <h3 className="text-[#0B1221] text-xl font-bold mb-4">Continue de onde parou</h3>
              <div className="bg-white border border-gray-200 rounded-2xl p-4 flex items-center gap-6 shadow-sm">
                <div className="w-32 h-20 bg-gray-200 rounded-xl overflow-hidden">
                  <img src="https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?auto=format&fit=crop&q=80" alt="Aula thumbnail" className="w-full h-full object-cover" />
                </div>
                <div className="flex-1">
                  <p className="text-xs text-gray-500 font-bold mb-1">Módulo 2: O Arsenal (Estrutura)</p>
                  <h4 className="text-[#0B1221] font-bold">Aula 4: Configurando sua Conta na InfinitePay</h4>
                  <div className="flex items-center gap-4 mt-3">
                    <div className="h-1.5 w-48 bg-gray-200 rounded-full overflow-hidden">
                      <div className="h-full bg-[#D4AF37] w-[65%] rounded-full"></div>
                    </div>
                    <span className="text-xs text-gray-400 font-medium">65% concluído</span>
                  </div>
                </div>
                <div className="flex flex-col items-end gap-2 border-l border-gray-100 pl-6">
                  <button className="bg-[#D4AF37] text-[#0A1128] px-5 py-2 rounded-lg font-bold flex items-center gap-2 hover:bg-[#F3C623]">
                    <PlayIcon /> Continuar Aula
                  </button>
                  <span className="text-xs text-gray-400">Último acesso: Hoje, 14:30</span>
                </div>
              </div>
            </div>

          </div>

          {/* Right Panel */}
          <div className="w-[320px] flex flex-col gap-6">
            
            {/* Progresso Widget */}
            <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
              <h3 className="text-[#0B1221] font-bold mb-6">Seu Progresso</h3>
              <div className="flex justify-center mb-6 relative">
                <svg width="120" height="120" viewBox="0 0 120 120">
                  <circle cx="60" cy="60" r="50" fill="none" stroke="#F3F4F6" strokeWidth="12" />
                  <circle cx="60" cy="60" r="50" fill="none" stroke="#0B1221" strokeWidth="12" strokeDasharray="314" strokeDashoffset="78.5" className="origin-center -rotate-90 transition-all duration-1000" />
                  {/* Gold part */}
                  <circle cx="60" cy="60" r="50" fill="none" stroke="#D4AF37" strokeWidth="12" strokeDasharray="314" strokeDashoffset="280" className="origin-center -rotate-90 transition-all duration-1000" />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-2xl font-bold text-[#0B1221]">75%</span>
                  <span className="text-xs text-gray-500">Concluído</span>
                </div>
              </div>
              <div className="flex flex-col gap-3 text-sm mb-6">
                <div className="flex justify-between">
                  <span className="text-gray-500">Módulos concluídos</span>
                  <span className="font-semibold text-[#0B1221]">2/5</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Aulas concluídas</span>
                  <span className="font-semibold text-[#0B1221]">18/24</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Horas de estudo</span>
                  <span className="font-semibold text-[#0B1221]">12h 45m</span>
                </div>
              </div>
              <button className="w-full py-2 rounded-lg border border-gray-300 text-gray-600 font-semibold text-sm hover:bg-gray-50">
                Ver meu progresso completo
              </button>
            </div>

            {/* Upcoming Classes */}
            <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
              <h3 className="text-[#0B1221] font-bold mb-4">Próximas Aulas</h3>
              <div className="flex flex-col gap-4 mb-6">
                {[
                  { m: "2", a: "5", t: "Criando Links de Pagamento" },
                  { m: "2", a: "6", t: "Configurações Avançadas" },
                  { m: "3", a: "1", t: "Introdução à Mineração" },
                ].map((item, i) => (
                  <div key={i} className="flex gap-3 items-center group cursor-pointer">
                    <div className="w-8 h-8 rounded-full bg-[#D4AF37]/20 text-[#D4AF37] flex items-center justify-center group-hover:bg-[#D4AF37] group-hover:text-white transition-colors">
                      <PlayIcon />
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 font-bold">Módulo {item.m} - Aula {item.a}</p>
                      <p className="text-sm font-semibold text-[#0B1221]">{item.t}</p>
                    </div>
                  </div>
                ))}
              </div>
              <button className="w-full py-2 rounded-lg border border-gray-300 text-gray-600 font-semibold text-sm hover:bg-gray-50">
                Ver todas as aulas
              </button>
            </div>

          </div>
        </main>
      </div>
    </div>
  );
}

// --- Componentes Compartilhados ---

function Sidebar({ activeItem, onHome }: { activeItem: string, onHome: () => void }) {
  const menuItems = [
    { name: "Dashboard", icon: <GridIcon /> },
    { name: "Módulos", icon: <LayersIcon /> },
    { name: "Aulas", icon: <MonitorPlayIcon /> },
    { name: "Materiais Extras", icon: <FolderIcon /> },
    { name: "Meu Progresso", icon: <BarChartIcon /> },
    { name: "Certificados", icon: <TrophyIcon /> },
  ];

  return (
    <div className="w-64 bg-[#0B1221] flex flex-col justify-between py-6 border-r border-[#111A3A] text-gray-300">
      <div>
        <div className="px-6 mb-8 cursor-pointer" onClick={onHome}>
          <h1 className="text-xl font-black text-white flex items-center gap-2">
            <ShieldIcon /> JUSTICEIROS
          </h1>
          <p className="text-[#D4AF37] text-xs font-bold tracking-[0.2em] ml-8 mt-1">ACADEMY</p>
        </div>
        
        <nav className="flex flex-col gap-1 px-3">
          {menuItems.map((item) => (
            <button
              key={item.name}
              onClick={item.name === "Dashboard" ? onHome : undefined}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all ${
                activeItem === item.name 
                ? "bg-[#D4AF37] text-[#0A1128] shadow-md shadow-[#D4AF37]/20" 
                : "hover:bg-[#111A3A] hover:text-white"
              }`}
            >
              {item.icon}
              {item.name}
            </button>
          ))}
        </nav>
      </div>

      <div className="px-6">
        <div className="bg-[#111A3A] rounded-xl p-5 border border-[#1A2652]">
          <span className="text-[#D4AF37] text-2xl font-serif leading-none">"</span>
          <p className="text-sm font-medium text-white mb-2 leading-relaxed">
            Disciplina hoje,<br/>liberdade amanhã.
          </p>
          <p className="text-xs text-gray-500">— Justiceiros do X1</p>
        </div>
      </div>
    </div>
  );
}

function Topbar({ user, onLogout }: { user: any, onLogout: () => void }) {
  const initials = user?.name ? user.name.substring(0, 2).toUpperCase() : "AJ";
  
  return (
    <header className="h-20 bg-[#0B1221] border-b border-[#111A3A] px-8 flex items-center justify-between text-white sticky top-0 z-20">
      <div>
        <h2 className="font-bold text-lg">Bem-vindo(a), {user?.name || "Aluno"}</h2>
        <p className="text-xs text-gray-400">Foque no processo, o resultado é consequência.</p>
      </div>
      
      <div className="flex items-center gap-6">
        <button className="relative text-gray-400 hover:text-white transition-colors">
          <BellIcon />
          <span className="absolute -top-1 -right-1 bg-[#D4AF37] text-[#0A1128] text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center border-2 border-[#0B1221]">3</span>
        </button>
        
        <div className="flex items-center gap-3 cursor-pointer pl-6 border-l border-[#1A2652]" onClick={onLogout} title="Clique para sair">
          <div className="w-10 h-10 rounded-full bg-[#D4AF37] text-[#0A1128] flex items-center justify-center font-bold text-lg">
            {initials}
          </div>
          <span className="font-medium text-sm">{user?.name} &darr;</span>
        </div>
      </div>
    </header>
  );
}

// --- Tela de Login ---
function LoginScreen({ onLogin }: { onLogin: (user: any) => void }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const foundUser = USERS.find(u => u.username === username.toLowerCase() && u.password === password);
    if (foundUser) {
      onLogin(foundUser);
    } else {
      setError("Usuário ou senha incorretos.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0B1221] bg-[url('https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80')] bg-cover bg-center">
      <div className="absolute inset-0 bg-[#0B1221]/90 backdrop-blur-sm"></div>
      
      <div className="relative z-10 bg-[#111A3A] p-10 rounded-3xl shadow-2xl border border-[#1A2652] max-w-md w-full mx-4">
        <div className="flex flex-col items-center mb-8">
          <ShieldIcon />
          <h1 className="text-2xl font-black text-white mt-4 tracking-wider">JUSTICEIROS</h1>
          <p className="text-[#D4AF37] text-xs font-bold tracking-[0.3em]">ACADEMY</p>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          {error && <p className="text-red-400 text-sm text-center font-medium bg-red-400/10 py-2 rounded-lg">{error}</p>}
          
          <div>
            <label className="text-sm font-semibold text-gray-400 mb-1 block">Usuário</label>
            <input 
              type="text" 
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full bg-[#0B1221] border border-[#1A2652] rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#D4AF37] transition-colors"
              placeholder="Ex: ramon"
            />
          </div>
          
          <div>
            <label className="text-sm font-semibold text-gray-400 mb-1 block">Senha</label>
            <input 
              type="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-[#0B1221] border border-[#1A2652] rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#D4AF37] transition-colors"
              placeholder="Sua senha (x1)"
            />
          </div>

          <button 
            type="submit"
            className="w-full bg-[#D4AF37] text-[#0A1128] font-bold text-lg py-3 rounded-xl mt-4 hover:bg-[#F3C623] transition-all shadow-[0_0_15px_rgba(212,175,55,0.3)]"
          >
            Acessar Plataforma
          </button>
        </form>
        
        <p className="text-center text-xs text-gray-500 mt-6">
          Acesso exclusivo para os 15 membros.<br/>Senha padrão: <strong>x1</strong>
        </p>
      </div>
    </div>
  );
}

const ShieldIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#D4AF37" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
);
