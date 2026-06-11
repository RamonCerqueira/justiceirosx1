import React from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BookOpen, Edit3, Trash2, CheckCircle2, Play } from "lucide-react";

interface ModuleCardProps {
  module: {
    id: string;
    title: string;
    content: string;
    order: number;
    mediaUrl?: string;
  };
  index: number;
  isAdmin: boolean;
  isCompleted: boolean;
  onSelect: (id: string) => void;
  onEdit: (mod: any, e: React.MouseEvent) => void;
  onDelete: (id: string, e: React.MouseEvent) => void;
}

export function ModuleCard({
  module,
  index,
  isAdmin,
  isCompleted,
  onSelect,
  onEdit,
  onDelete,
}: ModuleCardProps) {
  // Strip markdown or newlines to show a clean short preview
  const previewText = module.content
    ? module.content.replace(/[#*`_-]/g, "").substring(0, 100) + "..."
    : "Sem descrição adicional.";

  return (
    <Card
      onClick={() => onSelect(module.id)}
      className="bg-white/5 backdrop-blur-xl border border-white/10 hover:border-[#D4AF37]/50 rounded-[1.8rem] p-6 flex flex-col justify-between hover:-translate-y-1.5 hover:shadow-[0_12px_30px_rgba(0,0,0,0.5)] transition-all duration-300 cursor-pointer group relative overflow-hidden"
    >
      {/* Internal Hover Glow */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#D4AF37]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>

      {/* Admin Quick Buttons */}
      {isAdmin && (
        <div className="absolute top-5 right-5 flex gap-1.5 z-20 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-1 group-hover:translate-y-0">
          <Button
            size="icon"
            variant="ghost"
            onClick={(e) => onEdit(module, e)}
            className="w-8 h-8 rounded-lg bg-black/50 hover:bg-[#D4AF37] hover:text-[#050914] text-white transition-colors"
            title="Editar Aula"
          >
            <Edit3 className="w-4 h-4" />
          </Button>
          <Button
            size="icon"
            variant="ghost"
            onClick={(e) => onDelete(module.id, e)}
            className="w-8 h-8 rounded-lg bg-black/50 hover:bg-red-500 hover:text-white text-white transition-colors"
            title="Excluir Aula"
          >
            <Trash2 className="w-4 h-4" />
          </Button>
        </div>
      )}

      {/* Card Content */}
      <div className="relative z-10 flex-1 flex flex-col">
        <div className="flex justify-between items-start mb-5">
          <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-[#D4AF37] group-hover:scale-105 transition-transform shadow-[0_0_15px_rgba(212,175,55,0.1)]">
            <BookOpen className="w-5 h-5" />
          </div>

          <div className="flex items-center gap-2">
            {isCompleted && (
              <span className="flex items-center gap-1.5 text-[9px] bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 px-2 py-0.5 rounded-full uppercase tracking-wider font-bold">
                <CheckCircle2 className="w-3 h-3" /> Concluído
              </span>
            )}
            <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">
              Módulo {index + 1}
            </span>
          </div>
        </div>

        <h4 className="text-xl font-bold text-white leading-snug mb-3 group-hover:text-[#D4AF37] transition-colors font-heading min-h-[56px] line-clamp-2">
          {module.title}
        </h4>
        
        <p className="text-gray-400 text-xs leading-relaxed line-clamp-3 mb-6">
          {previewText}
        </p>
      </div>

      <div className="mt-auto relative z-10">
        <Button
          variant="outline"
          className="w-full py-5 rounded-xl border-white/10 text-white font-bold text-xs group-hover:bg-[#D4AF37] group-hover:text-[#050914] group-hover:border-transparent transition-all h-auto cursor-pointer"
        >
          <Play className="w-3.5 h-3.5 fill-current mr-1.5" /> Acessar Conteúdo
        </Button>
      </div>
    </Card>
  );
}
