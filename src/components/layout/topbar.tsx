import React from "react";
import { LogOut, User } from "lucide-react";
import { Button } from "@/components/ui/button";

interface TopbarProps {
  user: any;
  onLogout: () => void;
  progressPercent: number;
}

export function Topbar({ user, onLogout, progressPercent }: TopbarProps) {
  const initials = user?.name
    ? user.name
        .split(" ")
        .map((n: string) => n[0])
        .join("")
        .substring(0, 2)
        .toUpperCase()
    : "AJ";

  const isAdmin = user?.role === "admin";

  return (
    <header className="h-24 px-10 flex items-center justify-between sticky top-0 z-40 backdrop-blur-md bg-[#050914]/50 border-b border-white/5 w-full shrink-0">
      <div>
        <h2 className="font-bold text-xl text-white flex items-center gap-3 font-heading">
          Bem-vindo de volta, {user?.name || "Aluno"}
          {isAdmin && (
            <span className="text-[9px] bg-gradient-to-r from-[#D4AF37] to-[#F3C623] text-[#050914] px-3 py-1 rounded-full uppercase tracking-widest font-black shadow-[0_0_10px_rgba(212,175,55,0.3)]">
              Admin
            </span>
          )}
        </h2>
        <p className="text-xs text-gray-400 mt-1">
          {isAdmin 
            ? "Você está logado como Administrador. Painel de forja liberado." 
            : `Você concluiu ${progressPercent}% da sua trilha automatizada.`}
        </p>
      </div>

      <div className="flex items-center gap-6">
        {/* Progress bar in header for students */}
        {!isAdmin && (
          <div className="hidden md:flex flex-col items-end gap-1.5 w-40">
            <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">
              Progresso
            </span>
            <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-[#D4AF37] to-[#F3C623] rounded-full transition-all duration-500"
                style={{ width: `${progressPercent}%` }}
              ></div>
            </div>
          </div>
        )}

        {/* User Badge & Logout button */}
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#D4AF37] to-[#F3C623] text-[#050914] flex items-center justify-center font-black text-sm shadow-md border border-white/10">
            {initials}
          </div>
          
          <Button
            variant="ghost"
            size="icon"
            onClick={onLogout}
            className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 hover:bg-red-500/20 hover:text-red-400 hover:border-red-500/30 text-gray-400 transition-colors"
            title="Sair do Sistema"
          >
            <LogOut className="w-5 h-5" />
          </Button>
        </div>
      </div>
    </header>
  );
}
