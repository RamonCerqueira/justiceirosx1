import React from "react";
import { LogOut, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";

interface TopbarProps {
  user: any;
  onLogout: () => void;
  progressPercent: number;
  onMenuOpen?: () => void;
}

export function Topbar({ user, onLogout, progressPercent, onMenuOpen }: TopbarProps) {
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
    <header className="h-24 px-4 sm:px-10 flex items-center justify-between sticky top-0 z-40 backdrop-blur-md bg-[#050914]/50 border-b border-white/5 w-full shrink-0">
      <div className="flex items-center gap-3 overflow-hidden">
        {/* Hamburger Menu on Mobile */}
        <Button
          variant="ghost"
          size="icon"
          onClick={onMenuOpen}
          className="lg:hidden w-10 h-10 rounded-xl bg-white/5 border border-white/10 text-gray-400 hover:text-white shrink-0 cursor-pointer"
        >
          <Menu className="w-5 h-5" />
        </Button>

        <div className="text-left overflow-hidden">
          <h2 className="font-bold text-sm sm:text-lg text-white flex items-center gap-2 font-heading leading-tight whitespace-nowrap">
            <span className="truncate max-w-[100px] xs:max-w-[140px] sm:max-w-none">
              Oi, {user?.name || "Aluno"}
            </span>
            {isAdmin && (
              <span className="text-[8px] sm:text-[9px] bg-gradient-to-r from-[#D4AF37] to-[#F3C623] text-[#050914] px-2 py-0.5 rounded-full uppercase tracking-widest font-black shrink-0 shadow-[0_0_8px_rgba(212,175,55,0.2)]">
                Admin
              </span>
            )}
          </h2>
          <p className="text-[10px] sm:text-xs text-gray-405 mt-0.5 truncate leading-none">
            {isAdmin 
              ? "Painel de controle liberado." 
              : `Progresso: ${progressPercent}% da trilha.`}
          </p>
        </div>
      </div>

      <div className="flex items-center gap-4 sm:gap-6 shrink-0">
        {/* Progress bar in header for students */}
        {!isAdmin && (
          <div className="hidden md:flex flex-col items-end gap-1 w-32">
            <span className="text-[9px] text-gray-400 font-bold uppercase tracking-wider">
              Progresso
            </span>
            <div className="w-full h-1 bg-white/10 rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-[#D4AF37] to-[#F3C623] rounded-full transition-all duration-500"
                style={{ width: `${progressPercent}%` }}
              ></div>
            </div>
          </div>
        )}

        {/* User Badge & Logout button */}
        <div className="flex items-center gap-2 sm:gap-3">
          <div className="w-9 h-9 sm:w-11 sm:h-11 rounded-full bg-gradient-to-br from-[#D4AF37] to-[#F3C623] text-[#050914] flex items-center justify-center font-black text-xs sm:text-sm shadow-md border border-white/10 select-none shrink-0">
            {initials}
          </div>
          
          <Button
            variant="ghost"
            size="icon"
            onClick={onLogout}
            className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-white/5 border border-white/10 hover:bg-red-500/20 hover:text-red-400 hover:border-red-500/30 text-gray-450 transition-colors cursor-pointer shrink-0"
            title="Sair do Sistema"
          >
            <LogOut className="w-4 h-4 sm:w-5 sm:h-5" />
          </Button>
        </div>
      </div>
    </header>
  );
}
