import React, { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Users, Search, GraduationCap, TrendingUp, DollarSign, Activity, AlertTriangle } from "lucide-react";

interface StudentCRMProps {
  totalModulesCount: number;
}

export function StudentCRM({ totalModulesCount }: StudentCRMProps) {
  const [students, setStudents] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);

  // Global Class Stats
  const [stats, setStats] = useState({
    totalStudents: 0,
    totalFaturamento: 0,
    totalInvestido: 0,
    totalLucro: 0,
    avgCpl: 0
  });

  useEffect(() => {
    fetchCRMData();
  }, []);

  const fetchCRMData = async () => {
    setLoading(true);
    try {
      // 1. Fetch all student profiles
      const { data: users, error: userErr } = await supabase
        .from("users")
        .select("username, name, role")
        .eq("role", "aluno");

      if (userErr) throw userErr;

      // 2. Fetch progress data
      const { data: progressList } = await supabase
        .from("progress")
        .select("username, completed_lessons");

      // 3. Fetch operations data
      const { data: operationsList } = await supabase
        .from("operations")
        .select("username, entries");

      // Map profiles with stats
      const mapped = (users || []).map((u) => {
        const studentProgress = progressList?.find((p) => p.username === u.username);
        const completedLessons = studentProgress?.completed_lessons || [];
        const progressPct = totalModulesCount 
          ? Math.round((completedLessons.length / totalModulesCount) * 100)
          : 0;

        const studentOps = operationsList?.find((o) => o.username === u.username);
        const entries = studentOps?.entries || [];

        // Aggregate financial KPIs
        let invest = 0;
        let leads = 0;
        let sales = 0;
        let faturamento = 0;

        entries.forEach((e: any) => {
          invest += Number(e.invest || 0);
          leads += Number(e.leads || 0);
          sales += Number(e.sales || 0);
          faturamento += Number(e.faturamento || 0);
        });

        const profit = faturamento - invest;
        const roi = invest > 0 ? Math.round((profit / invest) * 100) : 0;
        const cpl = leads > 0 ? (invest / leads) : 0;
        const conversion = leads > 0 ? Math.round((sales / leads) * 100) : 0;

        return {
          ...u,
          progressPct,
          completedCount: completedLessons.length,
          invest,
          leads,
          sales,
          faturamento,
          profit,
          roi,
          cpl,
          conversion
        };
      });

      setStudents(mapped);

      // Compute global stats
      let globalFaturamento = 0;
      let globalInvestido = 0;
      let totalLeads = 0;

      mapped.forEach((s) => {
        globalFaturamento += s.faturamento;
        globalInvestido += s.invest;
      });

      // Fetch class CPL
      const classProfit = globalFaturamento - globalInvestido;

      setStats({
        totalStudents: mapped.length,
        totalFaturamento: globalFaturamento,
        totalInvestido: globalInvestido,
        totalLucro: classProfit,
        avgCpl: mapped.filter(s => s.cpl > 0).reduce((acc, s) => acc + s.cpl, 0) / (mapped.filter(s => s.cpl > 0).length || 1)
      });

    } catch (e) {
      console.error("Error fetching CRM details:", e);
    } finally {
      setLoading(false);
    }
  };

  const filteredStudents = students.filter(
    (s) =>
      s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.username.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-8 max-w-7xl mx-auto py-4 text-left animate-fadeIn">
      {/* Header */}
      <div>
        <h2 className="text-3xl font-black text-white font-heading tracking-wide uppercase">
          Alunos & Metas (CRM)
        </h2>
        <p className="text-gray-400 text-sm mt-1">
          Acompanhe o progresso de aulas e o faturamento real das operações dos alunos do grupo.
        </p>
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <Card className="bg-[#0b1221]/40 border-white/5 shadow-xl">
          <CardContent className="p-6 flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400">
              <Users className="w-6 h-6" />
            </div>
            <div>
              <p className="text-gray-400 text-[10px] uppercase font-bold tracking-wider">Total de Alunos</p>
              <h3 className="text-2xl font-black text-white mt-1">{stats.totalStudents}</h3>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-[#0b1221]/40 border-white/5 shadow-xl">
          <CardContent className="p-6 flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
              <DollarSign className="w-6 h-6" />
            </div>
            <div>
              <p className="text-gray-400 text-[10px] uppercase font-bold tracking-wider">Pix Faturado (Total)</p>
              <h3 className="text-2xl font-black text-emerald-400 mt-1">
                R$ {stats.totalFaturamento.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
              </h3>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-[#0b1221]/40 border-white/5 shadow-xl">
          <CardContent className="p-6 flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400">
              <TrendingUp className="w-6 h-6" />
            </div>
            <div>
              <p className="text-gray-400 text-[10px] uppercase font-bold tracking-wider">Investimento Total</p>
              <h3 className="text-2xl font-black text-white mt-1">
                R$ {stats.totalInvestido.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
              </h3>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-[#0b1221]/40 border-white/5 shadow-xl">
          <CardContent className="p-6 flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-[#D4AF37]/10 border border-[#D4AF37]/20 flex items-center justify-center text-[#D4AF37]">
              <Activity className="w-6 h-6" />
            </div>
            <div>
              <p className="text-gray-400 text-[10px] uppercase font-bold tracking-wider">CPL Médio da Turma</p>
              <h3 className="text-2xl font-black text-[#D4AF37] mt-1">
                R$ {stats.avgCpl.toFixed(2)}
              </h3>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Search Bar */}
      <div className="relative">
        <Search className="absolute left-4 top-3.5 w-4 h-4 text-gray-400" />
        <Input
          type="text"
          placeholder="Pesquisar aluno por nome ou usuário..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="h-12 pl-12 bg-[#0b1221]/50 border-white/10 focus-visible:ring-[#D4AF37] rounded-xl text-white text-xs w-full"
        />
      </div>

      {/* Grid List */}
      {loading ? (
        <div className="flex flex-col items-center justify-center py-20">
          <div className="w-10 h-10 border-4 border-[#D4AF37]/20 border-t-[#D4AF37] rounded-full animate-spin mb-4"></div>
          <p className="text-[#D4AF37] text-xs font-semibold animate-pulse">Carregando painel de controle...</p>
        </div>
      ) : filteredStudents.length === 0 ? (
        <div className="border border-white/5 bg-[#0b1221]/20 rounded-2xl p-16 text-center">
          <Users className="w-10 h-10 text-gray-600 mx-auto mb-3" />
          <p className="text-gray-400 text-xs">Nenhum aluno encontrado.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredStudents.map((student) => {
            // CPL status alert color
            let cplAlertColor = "text-[#D4AF37]";
            if (student.cpl > 3) cplAlertColor = "text-red-400";
            else if (student.cpl > 0 && student.cpl <= 1.5) cplAlertColor = "text-emerald-400";

            return (
              <Card 
                key={student.username} 
                className="bg-[#0b1221]/30 hover:bg-[#0b1221]/50 border border-white/5 transition-all rounded-2xl overflow-hidden group flex flex-col justify-between"
              >
                <div>
                  <div className="p-6 border-b border-white/5 bg-gradient-to-r from-white/2 to-transparent">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="text-sm font-bold text-white group-hover:text-[#D4AF37] transition-colors">{student.name}</h4>
                        <span className="text-[10px] text-gray-500 font-mono">@{student.username}</span>
                      </div>
                      <div className="px-3 py-1 bg-white/5 rounded-full border border-white/10 flex items-center gap-1">
                        <GraduationCap className="w-3.5 h-3.5 text-[#D4AF37]" />
                        <span className="text-[9px] text-[#D4AF37] font-bold">{student.progressPct}%</span>
                      </div>
                    </div>

                    {/* Progress Bar */}
                    <div className="mt-4">
                      <div className="flex justify-between text-[9px] text-gray-400 mb-1">
                        <span>Aulas Concluídas</span>
                        <span>{student.completedCount}/{totalModulesCount}</span>
                      </div>
                      <div className="w-full bg-white/5 h-1.5 rounded-full overflow-hidden">
                        <div 
                          className="bg-gradient-to-r from-[#D4AF37] to-[#F3C623] h-full rounded-full transition-all duration-500"
                          style={{ width: `${student.progressPct}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>

                  {/* Financial Stats */}
                  <div className="p-6 space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <span className="text-[9px] text-gray-500 uppercase tracking-wider block">Faturamento</span>
                        <span className="text-xs font-bold text-white">
                          R$ {student.faturamento.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
                        </span>
                      </div>
                      <div>
                        <span className="text-[9px] text-gray-500 uppercase tracking-wider block">Investimento</span>
                        <span className="text-xs font-bold text-gray-300">
                          R$ {student.invest.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
                        </span>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <span className="text-[9px] text-gray-500 uppercase tracking-wider block">Resultado (Líquido)</span>
                        <span className={`text-xs font-extrabold ${student.profit >= 0 ? "text-emerald-400" : "text-red-400"}`}>
                          R$ {student.profit.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
                        </span>
                      </div>
                      <div>
                        <span className="text-[9px] text-gray-500 uppercase tracking-wider block">ROI Obtido</span>
                        <span className={`text-xs font-bold ${student.roi >= 0 ? "text-emerald-400" : "text-red-400"}`}>
                          {student.roi > 0 ? `+${student.roi}%` : `${student.roi}%`}
                        </span>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4 pt-2 border-t border-white/5">
                      <div>
                        <span className="text-[9px] text-gray-500 uppercase tracking-wider block">Custo por Lead (CPL)</span>
                        <span className={`text-xs font-bold ${cplAlertColor}`}>
                          {student.cpl > 0 ? `R$ ${student.cpl.toFixed(2)}` : "Sem dados"}
                        </span>
                      </div>
                      <div>
                        <span className="text-[9px] text-gray-500 uppercase tracking-wider block">Conversão X1</span>
                        <span className="text-xs font-bold text-blue-400">
                          {student.conversion > 0 ? `${student.conversion}%` : "Sem dados"}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Conditional Alerts */}
                {student.cpl > 3 && (
                  <div className="mx-6 mb-6 p-3 bg-red-500/10 border border-red-500/20 rounded-xl flex gap-2 items-start">
                    <AlertTriangle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
                    <p className="text-[9px] text-red-300 leading-normal">
                      <strong>CPL Crítico:</strong> O custo por mensagem está acima de R$ 3,00. O aluno necessita pausar o anúncio e testar novos criativos.
                    </p>
                  </div>
                )}
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
}
