import React from "react";
import { LayoutDashboard, BookOpen, Users, Shield, Trophy, HelpCircle, GraduationCap, X } from "lucide-react";

interface SidebarProps {
  activeItem: string;
  onNavigate: (item: string) => void;
  onHome: () => void;
  isAdmin?: boolean;
  isOpen?: boolean;
  onClose?: () => void;
}

export function Sidebar({ activeItem, onNavigate, onHome, isAdmin, isOpen, onClose }: SidebarProps) {
  const menuItems = [
    { name: "Dashboard", icon: <LayoutDashboard className="w-5 h-5" /> },
    { name: "Trilha de Aulas", icon: <BookOpen className="w-5 h-5" /> },
    { name: "Comunidade", icon: <Users className="w-5 h-5" /> },
    { name: "FAQ", icon: <HelpCircle className="w-5 h-5" /> },
  ];

  if (isAdmin) {
    menuItems.push({ name: "Alunos (CRM)", icon: <GraduationCap className="w-5 h-5" /> });
  }

  return (
    <>
      {/* Mobile Sidebar Overlay Backdrop */}
      {isOpen && (
        <div 
          onClick={onClose} 
          className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm lg:hidden transition-opacity duration-300 cursor-pointer"
        />
      )}

      {/* Sidebar Container */}
      <div 
        className={`fixed lg:sticky top-0 bottom-0 left-0 z-50 lg:z-30 w-72 bg-[#0A1128]/95 lg:bg-[#0A1128]/60 backdrop-blur-2xl border-r border-white/5 flex flex-col justify-between py-8 h-screen shrink-0 transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        }`}
      >
        <div>
          {/* Logo & Header */}
          <div className="px-6 sm:px-8 mb-12 cursor-pointer flex items-center justify-between group">
            <div className="flex items-center gap-3" onClick={onHome}>
              <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-[#D4AF37] group-hover:rotate-12 transition-transform duration-500 shadow-[0_0_15px_rgba(212,175,55,0.1)]">
                <Shield className="w-5 h-5" />
              </div>
              <div>
                <h1 className="text-lg font-black text-white tracking-wide font-heading uppercase leading-none">
                  JUSTICEIROS
                </h1>
                <p className="text-[#D4AF37] text-[8px] font-bold tracking-[0.4em] mt-1 opacity-90 leading-none">
                  ACADEMY
                </p>
              </div>
            </div>

            {/* Mobile Close Button */}
            {onClose && (
              <button 
                type="button"
                onClick={onClose}
                className="lg:hidden w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:text-white cursor-pointer shrink-0 border-0"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Menu Navigation */}
          <nav className="flex flex-col gap-1.5 px-3">
            {menuItems.map((item) => {
              const isActive = activeItem === item.name;
              return (
                <button
                  key={item.name}
                  onClick={() => {
                    onNavigate(item.name);
                  }}
                  className={`flex items-center gap-4 px-5 py-3.5 rounded-xl font-semibold transition-all duration-300 w-full text-left text-xs sm:text-sm cursor-pointer ${
                    isActive
                      ? "bg-gradient-to-r from-[#D4AF37]/20 to-transparent text-[#D4AF37] border-l-2 border-[#D4AF37]"
                      : "hover:bg-white/5 text-gray-400 hover:text-white border-l-2 border-transparent"
                  }`}
                >
                  {item.icon}
                  {item.name}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Motivational widget */}
        <div className="px-4 sm:px-6">
          <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-5 relative overflow-hidden group">
            <div className="absolute -right-4 -top-6 text-7xl text-white/5 font-serif select-none pointer-events-none group-hover:scale-110 transition-transform">
              “
            </div>
            <div className="flex items-center gap-2 mb-2">
              <Trophy className="w-3.5 h-3.5 text-[#D4AF37]" />
              <span className="text-[9px] text-[#D4AF37] font-bold uppercase tracking-wider">
                Regra de Ouro do X1
              </span>
            </div>
            <p className="text-[11px] font-medium text-gray-300 mb-2 leading-relaxed relative z-10">
              A consistência no tráfego bate o talento na conversa. Suba sua campanha e deixe a automação rodar.
            </p>
            <p className="text-[9px] text-gray-550 font-bold tracking-wider uppercase">
              — Admins do X1
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
