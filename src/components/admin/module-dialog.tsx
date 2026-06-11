import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { UploadCloud, CheckCircle, AlertCircle } from "lucide-react";

interface ModuleDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  moduleToEdit: any | null;
  courses: any[];
  onSave: (
    title: string,
    content: string,
    order: number,
    courseId: string,
    file: File | null
  ) => Promise<void>;
  totalModulesCount: number;
}

export function ModuleDialog({
  open,
  onOpenChange,
  moduleToEdit,
  courses,
  onSave,
  totalModulesCount,
}: ModuleDialogProps) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [order, setOrder] = useState(1);
  const [courseId, setCourseId] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  // Sync form fields when opening or changing target module
  useEffect(() => {
    if (moduleToEdit) {
      setTitle(moduleToEdit.title || "");
      setContent(moduleToEdit.content || "");
      setOrder(moduleToEdit.order || 1);
      setCourseId(moduleToEdit.courseId || (courses.length > 0 ? courses[0].id : ""));
    } else {
      setTitle("");
      setContent("");
      setOrder(totalModulesCount + 1);
      setCourseId(courses.length > 0 ? courses[0].id : "");
    }
    setFile(null);
    setError("");
  }, [moduleToEdit, open, totalModulesCount, courses]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) {
      setError("Por favor, preencha o título e o conteúdo.");
      return;
    }
    if (!courseId) {
      setError("Por favor, selecione um curso.");
      return;
    }

    setSubmitting(true);
    setError("");

    try {
      await onSave(title.trim(), content.trim(), Number(order), courseId, file);
      onOpenChange(false);
    } catch (err: any) {
      console.error("Error saving in modal:", err);
      setError(err?.message || "Erro ao salvar a aula. Tente novamente.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl bg-[#0b1221]/90 backdrop-blur-xl border border-white/10 text-white rounded-2xl shadow-2xl p-6 sm:p-8 outline-none">
        <DialogHeader>
          <DialogTitle className="text-2xl font-black text-white font-heading tracking-wide">
            {moduleToEdit ? "Forjar Alterações da Aula" : "Forjar Nova Aula"}
          </DialogTitle>
          <DialogDescription className="text-gray-400 text-xs mt-1">
            {moduleToEdit
              ? "Edite as informações da aula. A sincronização com o banco é instantânea."
              : "Crie uma nova aula prática para a trilha de aprendizado do X1."}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-5 mt-4">
          {error && (
            <div className="bg-red-500/10 border border-red-500/30 text-red-400 text-xs font-semibold p-3.5 rounded-xl flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {/* Seletor de Curso */}
          <div className="space-y-1.5 text-left">
            <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block">
              Associar ao Curso
            </label>
            <select
              value={courseId}
              onChange={(e) => setCourseId(e.target.value)}
              className="w-full bg-[#050914] border border-white/10 rounded-xl px-4 h-11 text-white text-xs focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37] outline-none transition-all cursor-pointer"
              required
              disabled={submitting}
            >
              <option value="" disabled className="bg-[#050914] text-gray-500">Selecione um curso...</option>
              {courses.map((course) => (
                <option key={course.id} value={course.id} className="bg-[#050914] text-white">
                  {course.title}
                </option>
              ))}
            </select>
          </div>

          {/* Row: Title & Order */}
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
            <div className="sm:col-span-3 space-y-1.5">
              <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block">
                Título da Aula
              </label>
              <Input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="bg-black/20 border-white/10 text-white placeholder:text-gray-500 focus-visible:ring-[#D4AF37] h-11 rounded-xl"
                placeholder="Ex: Mineração de Produtos Ouro"
                required
                disabled={submitting}
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block">
                Ordem (Nº)
              </label>
              <Input
                type="number"
                min="1"
                value={order}
                onChange={(e) => setOrder(Number(e.target.value))}
                className="bg-black/20 border-white/10 text-white placeholder:text-gray-500 focus-visible:ring-[#D4AF37] h-11 rounded-xl text-center"
                required
                disabled={submitting}
              />
            </div>
          </div>

          {/* Content */}
          <div className="space-y-1.5">
            <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block">
              Conteúdo Detalhado
            </label>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              rows={8}
              className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-gray-500 text-sm focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37] transition-all outline-none resize-y"
              placeholder="Digite o conteúdo da aula..."
              required
              disabled={submitting}
            />
          </div>

          {/* Media upload container */}
          <div className="bg-black/30 border border-white/5 rounded-2xl p-5 space-y-3">
            <div className="flex flex-col gap-1">
              <label className="text-[10px] font-bold text-[#D4AF37] uppercase tracking-widest block">
                Anexar Arquivo de Mídia (Opcional)
              </label>
              <span className="text-[10px] text-gray-400 leading-normal">
                Faça upload de imagem, vídeo, áudio ou documento PDF complementar.
              </span>
            </div>

            <div className="relative">
              <input
                type="file"
                id="file-upload"
                onChange={(e) => setFile(e.target.files ? e.target.files[0] : null)}
                className="hidden"
                disabled={submitting}
              />
              <label
                htmlFor="file-upload"
                className="flex items-center justify-center gap-2 border border-dashed border-white/20 hover:border-[#D4AF37]/50 bg-white/5 hover:bg-[#D4AF37]/5 text-gray-300 hover:text-white transition-all py-3 rounded-xl cursor-pointer text-xs font-bold"
              >
                <UploadCloud className="w-4 h-4" />
                {file ? file.name : "Selecionar Arquivo"}
              </label>
            </div>

            {moduleToEdit?.mediaUrl && !file && (
              <div className="p-3 bg-[#D4AF37]/10 border border-[#D4AF37]/20 rounded-xl text-[10px] text-[#D4AF37] font-semibold flex items-center gap-1.5 leading-normal">
                <CheckCircle className="w-3.5 h-3.5 shrink-0" />
                <span>Mídia pré-existente no Supabase. O arquivo original será preservado.</span>
              </div>
            )}
          </div>

          <DialogFooter className="pt-4 gap-2">
            <Button
              type="button"
              variant="ghost"
              onClick={() => onOpenChange(false)}
              disabled={submitting}
              className="text-gray-400 hover:text-white font-bold h-11 px-6 rounded-xl hover:bg-white/5 cursor-pointer"
            >
              Cancelar
            </Button>
            <Button
              type="submit"
              disabled={submitting}
              className="btn-gold h-11 px-8 rounded-xl font-bold uppercase tracking-wider text-xs border-0 cursor-pointer"
            >
              {submitting ? (
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-[#050914] border-t-transparent rounded-full animate-spin"></div>
                  Sincronizando...
                </div>
              ) : (
                "Salvar Alterações"
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
