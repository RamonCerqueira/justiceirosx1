import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Volume2, VolumeX, CheckCircle, ArrowLeft, Download, Film, Music, Image as ImageIcon, FileText } from "lucide-react";
import { markLessonComplete, markLessonIncomplete } from "@/lib/progress";

// Custom interactive module components
import Module1Prep from "@/components/modules/module-1-prep";
import Module2Mine from "@/components/modules/module-2-mine";
import Module3Auto from "@/components/modules/module-3-auto";
import Module4Ads from "@/components/modules/module-4-ads";
import Module5Metrics from "@/components/modules/module-5-metrics";

interface ModuleDetailsProps {
  module: {
    id: string;
    title: string;
    content: string;
    order: number;
    mediaUrl?: string;
    attachments?: {
      name: string;
      url: string;
      type: "audio" | "video" | "image" | "file";
    }[];
  };
  currentUser: {
    username: string;
    role: string;
  };
  isCompleted: boolean;
  onBack: () => void;
  onProgressUpdated: () => void;
}

export function ModuleDetails({
  module,
  currentUser,
  isCompleted,
  onBack,
  onProgressUpdated,
}: ModuleDetailsProps) {
  const [isPlayingTTS, setIsPlayingTTS] = useState(false);
  const [localCompleted, setLocalCompleted] = useState(isCompleted);
  const [loadingProgress, setLoadingProgress] = useState(false);

  // Sync state with props when module changes
  useEffect(() => {
    setLocalCompleted(isCompleted);
  }, [isCompleted, module.id]);

  // Clean up SpeechSynthesis when component unmounts or module changes
  useEffect(() => {
    return () => {
      if (window.speechSynthesis) {
        window.speechSynthesis.cancel();
      }
    };
  }, [module.id]);

  const handleTTS = () => {
    if (!window.speechSynthesis) {
      alert("Seu navegador não suporta leitura de texto por voz.");
      return;
    }

    if (isPlayingTTS) {
      window.speechSynthesis.cancel();
      setIsPlayingTTS(false);
      return;
    }

    // Clean up any ongoing speech first
    window.speechSynthesis.cancel();

    const cleanText = module.content.replace(/[#*`_-]/g, "");
    const utterance = new SpeechSynthesisUtterance(cleanText);
    utterance.lang = "pt-BR";
    utterance.rate = 1.05;
    
    utterance.onend = () => {
      setIsPlayingTTS(false);
    };
    utterance.onerror = () => {
      setIsPlayingTTS(false);
    };

    setIsPlayingTTS(true);
    window.speechSynthesis.speak(utterance);
  };

  const handleToggleCompletion = async () => {
    setLoadingProgress(true);
    const newStatus = !localCompleted;
    setLocalCompleted(newStatus);
    
    try {
      if (newStatus) {
        await markLessonComplete(currentUser.username, module.id);
      } else {
        await markLessonIncomplete(currentUser.username, module.id);
      }
      onProgressUpdated();
    } catch (error) {
      console.error("Erro ao alternar progresso:", error);
      setLocalCompleted(!newStatus); // Rollback on error
    } finally {
      setLoadingProgress(false);
    }
  };

  const getMediaType = (url: string) => {
    if (!url) return null;
    const cleanUrl = url.split("?")[0].toLowerCase();
    if (cleanUrl.match(/\.(jpeg|jpg|gif|png|webp|svg)$/i)) return "image";
    if (cleanUrl.match(/\.(mp4|webm|ogg)$/i)) return "video";
    if (cleanUrl.match(/\.(mp3|wav|ogg|opus)$/i)) return "audio";
    return "file";
  };

  const renderModuleContent = () => {
    switch (module.order) {
      case 1:
        return <Module1Prep username={currentUser.username} />;
      case 2:
        return <Module2Mine />;
      case 3:
        return <Module3Auto />;
      case 4:
        return <Module4Ads />;
      case 5:
        return <Module5Metrics />;
      default:
        return (
          <div className="relative z-10 prose prose-invert max-w-none text-gray-300 text-md leading-relaxed whitespace-pre-line font-light">
            {module.content}
          </div>
        );
    }
  };

  const mediaType = getMediaType(module.mediaUrl || "");

  return (
    <div className="max-w-4xl mx-auto w-full py-6">
      {/* Botão de Voltar */}
      <Button
        variant="ghost"
        onClick={() => {
          if (window.speechSynthesis) {
            window.speechSynthesis.cancel();
          }
          onBack();
        }}
        className="mb-6 text-gray-400 hover:text-white flex items-center gap-2 cursor-pointer pl-0 hover:bg-transparent"
      >
        <ArrowLeft className="w-4 h-4" /> Voltar para o Dashboard
      </Button>

      {/* Card da Aula */}
      <div className="bg-[#0b1221]/50 backdrop-blur-xl border border-white/10 rounded-3xl p-6 sm:p-10 shadow-2xl relative overflow-hidden">
        {/* Glow dourado */}
        <div className="absolute -top-32 -right-32 w-64 h-64 bg-[#D4AF37]/10 rounded-full blur-[120px] pointer-events-none"></div>

        {/* Cabeçalho do Detalhe */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-6 border-b border-white/10 relative z-10">
          <div>
            <span className="bg-[#D4AF37]/15 text-[#D4AF37] border border-[#D4AF37]/35 text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider shadow-[0_0_10px_rgba(212,175,55,0.1)] mb-3 inline-block">
              Instruções Práticas
            </span>
            <h1 className="text-2xl sm:text-3xl font-black text-white font-heading leading-tight">
              {module.title}
            </h1>
          </div>

          <Button
            onClick={handleTTS}
            className={`px-5 py-2.5 rounded-xl flex items-center gap-2 font-bold text-xs shrink-0 cursor-pointer ${
              isPlayingTTS
                ? "bg-red-500/10 text-red-400 border border-red-500/20 hover:bg-red-500/20"
                : "btn-gold border-0"
            }`}
          >
            {isPlayingTTS ? (
              <>
                <VolumeX className="w-4 h-4" /> Parar Leitura
              </>
            ) : (
              <>
                <Volume2 className="w-4 h-4" /> Ouvir Aula
              </>
            )}
          </Button>
        </div>

        {/* Exibição Condicional de Mídias Anexas */}
        {module.mediaUrl && mediaType && (
          <div className="mb-8 rounded-2xl overflow-hidden border border-white/10 shadow-2xl bg-black/30 relative z-10">
            {mediaType === "image" && (
              <img
                src={module.mediaUrl}
                alt={module.title}
                className="w-full object-contain max-h-[480px] bg-black/10"
              />
            )}
            {mediaType === "video" && (
              <div className="aspect-video w-full">
                <video
                  controls
                  src={module.mediaUrl}
                  className="w-full h-full bg-black"
                />
              </div>
            )}
            {mediaType === "audio" && (
              <div className="p-6 flex flex-col items-center gap-4 bg-gradient-to-r from-[#0b1221] to-[#121c32]">
                <div className="w-12 h-12 rounded-full bg-[#D4AF37]/10 flex items-center justify-center text-[#D4AF37]">
                  <Music className="w-5 h-5" />
                </div>
                <p className="text-xs font-semibold text-gray-300">Áudio instrutivo anexo</p>
                <audio controls src={module.mediaUrl} className="w-full max-w-lg" />
              </div>
            )}
            {mediaType === "file" && (
              <div className="p-8 flex flex-col sm:flex-row items-center justify-between gap-4 bg-gradient-to-r from-[#0b1221] to-[#121c32]">
                <div className="flex items-center gap-4 text-left">
                  <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 shrink-0">
                    <FileText className="w-6 h-6" />
                  </div>
                  <div>
                    <h5 className="text-sm font-bold text-white">Material Complementar</h5>
                    <p className="text-xs text-gray-400 mt-0.5">Arquivo PDF ou Funil para Download</p>
                  </div>
                </div>
                <a
                  href={module.mediaUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="px-5 py-3 bg-white/5 border border-white/10 hover:bg-[#D4AF37] hover:text-[#050914] text-white hover:border-transparent transition-all rounded-xl text-xs font-bold flex items-center gap-2 cursor-pointer"
                >
                  <Download className="w-4 h-4" /> Baixar Recurso
                </a>
              </div>
            )}
          </div>
        )}

        {/* Conteúdo de Texto Interativo */}
        <div className="relative z-10 max-w-none text-gray-300 text-md leading-relaxed mb-10">
          {renderModuleContent()}
        </div>

        {/* Mídias Originais do WhatsApp (chat.txt) */}
        {module.attachments && module.attachments.length > 0 && (
          <div className="mt-8 pt-8 border-t border-white/10 relative z-10 space-y-5">
            <h3 className="text-lg font-bold text-[#D4AF37] font-heading flex items-center gap-2">
              <Music className="w-5 h-5" /> Mídias Originais do Grupo de WhatsApp
            </h3>
            <p className="text-xs text-gray-400">
              Ouça os áudios e veja os arquivos reais que foram enviados no grupo pelos administradores Ricardo, Wil e Romão Lucas:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {module.attachments.map((att, idx) => (
                <div key={idx} className="bg-black/30 border border-white/5 rounded-xl p-4 flex flex-col justify-between gap-3 shadow-inner">
                  <div className="flex items-center gap-2 text-gray-300 font-semibold text-xs leading-tight">
                    {att.type === "audio" && <Music className="w-3.5 h-3.5 text-[#D4AF37] shrink-0" />}
                    {att.type === "video" && <Film className="w-3.5 h-3.5 text-[#D4AF37] shrink-0" />}
                    {att.type === "image" && <ImageIcon className="w-3.5 h-3.5 text-[#D4AF37] shrink-0" />}
                    <span>{att.name}</span>
                  </div>
                  {att.type === "audio" && (
                    <audio controls src={att.url} className="w-full h-8" />
                  )}
                  {att.type === "video" && (
                    <video controls src={att.url} className="w-full rounded bg-black max-h-[160px]" />
                  )}
                  {att.type === "image" && (
                    <a href={att.url} target="_blank" rel="noreferrer" className="block overflow-hidden rounded border border-white/10">
                      <img src={att.url} alt={att.name} className="w-full object-cover max-h-[120px] hover:scale-105 transition-transform duration-300" />
                    </a>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Rodapé e Ação de Conclusão */}
        <div className="relative z-10 mt-10 pt-8 border-t border-white/10 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-xs text-gray-500 font-semibold uppercase tracking-wider">
            {localCompleted ? "✓ Aula finalizada" : "○ Aula pendente de conclusão"}
          </p>

          <Button
            onClick={handleToggleCompletion}
            disabled={loadingProgress}
            className={`px-8 py-3.5 rounded-xl font-bold text-sm tracking-wide transition-all shadow-md cursor-pointer flex items-center gap-2 border-0 ${
              localCompleted
                ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 hover:bg-emerald-500/30"
                : "btn-gold"
            }`}
          >
            <CheckCircle className="w-4 h-4" />
            {loadingProgress
              ? "Processando..."
              : localCompleted
              ? "Marcar como Incompleta"
              : "Marcar como Concluída"}
          </Button>
        </div>
      </div>
    </div>
  );
}
