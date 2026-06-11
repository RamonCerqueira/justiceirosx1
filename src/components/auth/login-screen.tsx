import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Shield, Lock, User } from "lucide-react";
import { USERS } from "@/lib/course-data";

interface LoginScreenProps {
  onLogin: (user: any) => void;
}

export function LoginScreen({ onLogin }: LoginScreenProps) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    setTimeout(() => {
      const foundUser = USERS.find(
        (u) => u.username === username.trim().toLowerCase() && u.password === password
      );

      if (foundUser) {
        onLogin(foundUser);
      } else {
        setError("Credenciais inválidas. O acesso é restrito.");
      }
      setLoading(false);
    }, 600);
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-[#050914] relative overflow-hidden text-white p-4 sm:p-6">
      {/* Background Graphic & Texture Overlay */}
      <div 
        className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1639322537228-f710d846310a?auto=format&fit=crop&q=80')] bg-cover bg-center opacity-10 mix-blend-overlay pointer-events-none"
      ></div>
      <div className="absolute inset-0 bg-gradient-to-tr from-[#050914] via-[#050914]/95 to-transparent pointer-events-none"></div>

      {/* Decorative Glows */}
      <div className="absolute top-1/4 left-1/4 w-[250px] sm:w-[450px] h-[250px] sm:h-[450px] bg-[#D4AF37]/10 rounded-full blur-[100px] sm:blur-[160px] animate-pulse pointer-events-none"></div>
      <div className="absolute bottom-10 right-10 w-[300px] sm:w-[500px] h-[300px] sm:h-[500px] bg-blue-900/10 rounded-full blur-[100px] sm:blur-[160px] pointer-events-none"></div>

      {/* Login Box Centered Container */}
      <div className="w-full max-w-[440px] relative z-10 flex flex-col items-center">
        
        {/* Header Branding */}
        <div className="flex flex-col items-center mb-8 text-center group">
          <div className="w-16 h-16 rounded-2xl bg-white/5 backdrop-blur-md border border-white/10 flex items-center justify-center mb-4 shadow-[0_0_35px_rgba(212,175,55,0.15)] ring-2 ring-[#D4AF37]/25 transition-transform duration-500 group-hover:rotate-6">
            <Shield className="w-8 h-8 text-[#D4AF37]" />
          </div>
          <h1 className="text-2xl font-black tracking-wider text-white font-heading uppercase leading-none">
            Justiceiros
          </h1>
          <p className="text-[#D4AF37] text-[10px] font-bold tracking-[0.4em] mt-1 ml-1 opacity-90 leading-none">
            ACADEMY
          </p>
        </div>

        {/* Form Card */}
        <Card className="w-full bg-[#0b1221]/60 backdrop-blur-2xl border-white/10 shadow-[0_0_50px_rgba(0,0,0,0.6)] rounded-[2rem] overflow-hidden">
          <CardHeader className="space-y-1 pb-5 pt-8 px-6 sm:px-8">
            <CardTitle className="text-xl font-bold text-center text-white">Acesso Exclusivo</CardTitle>
            <CardDescription className="text-center text-gray-400 text-xs">
              Entre com sua conta autorizada para prosseguir
            </CardDescription>
          </CardHeader>
          <CardContent className="px-6 sm:px-8 pb-8">
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              {error && (
                <div className="bg-red-500/10 border border-red-500/30 text-red-400 text-xs text-center font-semibold py-3 px-4 rounded-xl backdrop-blur-sm">
                  {error}
                </div>
              )}

              <div className="space-y-2">
                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block">
                  Nome de Usuário
                </label>
                <div className="relative">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <Input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="pl-11 bg-black/30 border-white/10 text-white placeholder:text-gray-500 focus-visible:ring-[#D4AF37] h-11 rounded-xl text-xs"
                    placeholder="Seu usuário (ex: ricardo)"
                    required
                    disabled={loading}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block">
                  Senha de Acesso
                </label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <Input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="pl-11 bg-black/30 border-white/10 text-white placeholder:text-gray-500 focus-visible:ring-[#D4AF37] h-11 rounded-xl text-xs"
                    placeholder="••••••••"
                    required
                    disabled={loading}
                  />
                </div>
              </div>

              <Button
                type="submit"
                disabled={loading}
                className="w-full h-11 rounded-xl text-xs font-bold mt-4 btn-gold uppercase tracking-wider border-0 cursor-pointer"
              >
                {loading ? (
                  <div className="flex items-center justify-center gap-2">
                    <div className="w-4 h-4 border-2 border-[#050914] border-t-transparent rounded-full animate-spin"></div>
                    Autenticando...
                  </div>
                ) : (
                  "Acessar Plataforma"
                )}
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Quote below the Card */}
        <div className="mt-8 text-center px-6 max-w-sm">
          <p className="text-[11px] italic text-gray-400 font-light leading-relaxed">
            "A disciplina é a ponte entre o seu objetivo e a sua realização."
          </p>
          <div className="h-[1px] w-12 bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent mx-auto mt-2.5 opacity-40"></div>
        </div>

        {/* Security Warning Footer */}
        <div className="mt-8 text-center pt-5 border-t border-white/5 w-full">
          <p className="text-[9px] text-gray-500 font-semibold leading-none uppercase tracking-[0.2em]">
            Ambiente Restrito • 15 Membros Fundadores
          </p>
        </div>

      </div>
    </div>
  );
}
