import React from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Layers, Edit3, Trash2, ArrowRight } from "lucide-react";

interface CourseCardProps {
  course: {
    id: string;
    title: string;
    description: string;
    modulesCount?: number;
  };
  isAdmin: boolean;
  onSelect: (id: string) => void;
  onEdit: (course: any, e: React.MouseEvent) => void;
  onDelete: (id: string, e: React.MouseEvent) => void;
}

export function CourseCard({
  course,
  isAdmin,
  onSelect,
  onEdit,
  onDelete,
}: CourseCardProps) {
  return (
    <Card
      onClick={() => onSelect(course.id)}
      className="bg-white/5 backdrop-blur-xl border border-white/10 hover:border-[#D4AF37]/50 rounded-[1.8rem] p-6 flex flex-col justify-between hover:-translate-y-1.5 hover:shadow-[0_12px_30px_rgba(0,0,0,0.5)] transition-all duration-300 cursor-pointer group relative overflow-hidden text-left"
    >
      {/* Internal Hover Glow */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#D4AF37]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>

      {/* Admin Quick Buttons */}
      {isAdmin && (
        <div className="absolute top-5 right-5 flex gap-1.5 z-20 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-1 group-hover:translate-y-0">
          <Button
            size="icon"
            variant="ghost"
            onClick={(e) => onEdit(course, e)}
            className="w-8 h-8 rounded-lg bg-black/50 hover:bg-[#D4AF37] hover:text-[#050914] text-white transition-colors border-0 cursor-pointer"
            title="Editar Curso"
          >
            <Edit3 className="w-4 h-4" />
          </Button>
          <Button
            size="icon"
            variant="ghost"
            onClick={(e) => onDelete(course.id, e)}
            className="w-8 h-8 rounded-lg bg-black/50 hover:bg-red-500 hover:text-white text-white transition-colors border-0 cursor-pointer"
            title="Excluir Curso"
          >
            <Trash2 className="w-4 h-4" />
          </Button>
        </div>
      )}

      {/* Card Content */}
      <div className="relative z-10 flex-1 flex flex-col">
        <div className="flex justify-between items-start mb-5">
          <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-[#D4AF37] group-hover:scale-105 transition-transform shadow-[0_0_15px_rgba(212,175,55,0.1)]">
            <Layers className="w-5 h-5" />
          </div>

          <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest bg-white/5 px-2.5 py-1 rounded-lg border border-white/5">
            {course.modulesCount || 0} {course.modulesCount === 1 ? "aula" : "aulas"}
          </span>
        </div>

        <h4 className="text-xl font-bold text-white leading-snug mb-3 group-hover:text-[#D4AF37] transition-colors font-heading min-h-[56px] line-clamp-2">
          {course.title}
        </h4>
        
        <p className="text-gray-400 text-xs leading-relaxed line-clamp-3 mb-6">
          {course.description || "Sem descrição adicional para este curso."}
        </p>
      </div>

      <div className="mt-auto relative z-10">
        <Button
          variant="outline"
          className="w-full py-5 rounded-xl border-white/10 text-white font-bold text-xs group-hover:bg-[#D4AF37] group-hover:text-[#050914] group-hover:border-transparent transition-all h-auto cursor-pointer"
        >
          Entrar no Curso <ArrowRight className="w-3.5 h-3.5 ml-1.5 transition-transform group-hover:translate-x-1" />
        </Button>
      </div>
    </Card>
  );
}
