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
import { AlertCircle } from "lucide-react";

interface CourseDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  courseToEdit: any | null;
  onSave: (title: string, description: string) => Promise<void>;
}

export function CourseDialog({
  open,
  onOpenChange,
  courseToEdit,
  onSave,
}: CourseDialogProps) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  // Sync fields when modal opens or shifts target course
  useEffect(() => {
    if (courseToEdit) {
      setTitle(courseToEdit.title || "");
      setDescription(courseToEdit.description || "");
    } else {
      setTitle("");
      setDescription("");
    }
    setError("");
  }, [courseToEdit, open]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !description.trim()) {
      setError("Por favor, preencha o título e a descrição.");
      return;
    }

    setSubmitting(true);
    setError("");

    try {
      await onSave(title.trim(), description.trim());
      onOpenChange(false);
    } catch (err: any) {
      console.error("Error saving course:", err);
      setError(err?.message || "Erro ao salvar o curso. Tente novamente.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md bg-[#0b1221]/90 backdrop-blur-xl border border-white/10 text-white rounded-2xl shadow-2xl p-6 sm:p-8 outline-none">
        <DialogHeader>
          <DialogTitle className="text-2xl font-black text-white font-heading tracking-wide">
            {courseToEdit ? "Editar Curso" : "Criar Novo Curso"}
          </DialogTitle>
          <DialogDescription className="text-gray-400 text-xs mt-1">
            {courseToEdit
              ? "Edite as informações do curso abaixo. As alterações serão refletidas no catálogo."
              : "Cadastre um novo curso para a plataforma."}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-5 mt-4">
          {error && (
            <div className="bg-red-500/10 border border-red-500/30 text-red-400 text-xs font-semibold p-3.5 rounded-xl flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {/* Title */}
          <div className="space-y-1.5 text-left">
            <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block">
              Título do Curso
            </label>
            <Input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="bg-black/20 border-white/10 text-white placeholder:text-gray-500 focus-visible:ring-[#D4AF37] h-11 rounded-xl"
              placeholder="Ex: Tráfego Pago Avançado"
              required
              disabled={submitting}
            />
          </div>

          {/* Description */}
          <div className="space-y-1.5 text-left">
            <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block">
              Descrição Curta
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={4}
              className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-gray-500 text-sm focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37] transition-all outline-none resize-none"
              placeholder="Descreva brevemente o objetivo e público-alvo do curso..."
              required
              disabled={submitting}
            />
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
                "Salvar Curso"
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
