"use client";

import React, { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";

// Custom components
import { LoginScreen } from "@/components/auth/login-screen";
import { Sidebar } from "@/components/layout/sidebar";
import { Topbar } from "@/components/layout/topbar";
import { CourseCard } from "@/components/dashboard/course-card";
import { ModuleCard } from "@/components/dashboard/module-card";
import { ModuleDetails } from "@/components/dashboard/module-details";
import { CourseDialog } from "@/components/admin/course-dialog";
import { ModuleDialog } from "@/components/admin/module-dialog";
import { CommunityView } from "@/components/dashboard/community-view";
import { FAQView } from "@/components/dashboard/faq-view";

// Progress helper
import { getStudentProgress } from "@/lib/progress";

// Data
import { STATIC_MODULES, STATIC_COURSES } from "@/lib/course-data";

// Icons
import { Layers, Play, RefreshCw, PlusCircle, Award, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";


export default function Page() {
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [activeModule, setActiveModule] = useState<any>(null);
  const [currentTab, setCurrentTab] = useState<string>("Dashboard");
  const [courses, setCourses] = useState<any[]>([]);
  const [selectedCourseId, setSelectedCourseId] = useState<string | null>(null);
  const [modules, setModules] = useState<any[]>([]);
  const [completedLessons, setCompletedLessons] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  // Admin and Modal states
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingModule, setEditingModule] = useState<any>(null);
  const [isCourseModalOpen, setIsCourseModalOpen] = useState(false);
  const [editingCourse, setEditingCourse] = useState<any>(null);

  useEffect(() => {
    const saved = localStorage.getItem("justiceiros_user");
    if (saved) {
      const parsed = JSON.parse(saved);
      setCurrentUser(parsed);
      loadUserData(parsed.username);
    } else {
      setLoading(false);
    }
  }, []);

  const loadUserData = async (username: string) => {
    setLoading(true);
    await fetchCourses();
    await fetchModules();
    await fetchProgress(username);
    setLoading(false);
  };

  const fetchCourses = async () => {
    try {
      const { data, error } = await supabase
        .from("courses")
        .select("*")
        .order("created_at", { ascending: true });
        
      if (error) throw error;
      setCourses(data || []);
    } catch (e) {
      console.error("Error fetching courses:", e);
    }
  };

  const fetchModules = async () => {
    try {
      const { data, error } = await supabase
        .from("modules")
        .select("*")
        .order("order_num", { ascending: true });
        
      if (error) throw error;
      
      if (data) {
        const mapped = data.map((d: any) => ({
          id: d.id,
          title: d.title,
          content: d.content,
          mediaUrl: d.media_url,
          order: d.order_num,
          courseId: d.course_id,
          attachments: d.attachments || []
        }));
        setModules(mapped);
      } else {
        setModules([]);
      }
    } catch (e) {
      console.error("Supabase fetch error:", e);
    }
  };

  const fetchProgress = async (username: string) => {
    try {
      const progress = await getStudentProgress(username);
      setCompletedLessons(progress);
    } catch (e) {
      console.error("Progress fetch error:", e);
    }
  };

  const handleLogin = (user: any) => {
    setCurrentUser(user);
    localStorage.setItem("justiceiros_user", JSON.stringify(user));
    loadUserData(user.username);
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setCompletedLessons([]);
    setActiveModule(null);
    localStorage.removeItem("justiceiros_user");
    if (window.speechSynthesis) {
      window.speechSynthesis.cancel();
    }
  };

  const handleProgressUpdated = async () => {
    if (currentUser) {
      await fetchProgress(currentUser.username);
    }
  };

  // Admin actions
  const handleSaveModule = async (
    title: string,
    content: string,
    order: number,
    courseId: string,
    file: File | null
  ) => {
    let mediaUrl = editingModule?.mediaUrl || "";

    if (file) {
      const fileName = `${Date.now()}_${file.name}`;
      const { data, error } = await supabase.storage
        .from("modules")
        .upload(fileName, file);
      if (error) {
        console.error("Storage upload error:", error);
        throw error;
      }
      
      const { data: publicUrlData } = supabase.storage
        .from("modules")
        .getPublicUrl(fileName);
      mediaUrl = publicUrlData.publicUrl;
    }

    const payload = {
      title,
      content,
      media_url: mediaUrl,
      order_num: order,
      course_id: courseId,
      updated_at: new Date().toISOString(),
    };

    if (editingModule?.id) {
      const { error } = await supabase
        .from("modules")
        .update(payload)
        .eq("id", editingModule.id);
      if (error) throw error;
    } else {
      const { error } = await supabase
        .from("modules")
        .insert({
          ...payload,
          attachments: []
        });
      if (error) throw error;
    }

    setIsModalOpen(false);
    setEditingModule(null);
    await fetchModules();
  };

  const handleDeleteModule = async (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (confirm("Tem certeza que deseja excluir esta aula? Esta ação não pode ser desfeita.")) {
      try {
        const { error } = await supabase
          .from("modules")
          .delete()
          .eq("id", id);
        if (error) throw error;
        
        if (activeModule === id) {
          setActiveModule(null);
        }
        await fetchModules();
      } catch (error) {
        console.error("Error deleting:", error);
      }
    }
  };

  const handleSaveCourse = async (title: string, description: string) => {
    const payload = {
      title,
      description,
      updated_at: new Date().toISOString(),
    };

    try {
      if (editingCourse?.id) {
        const { error } = await supabase
          .from("courses")
          .update(payload)
          .eq("id", editingCourse.id);
        if (error) throw error;
      } else {
        const { error } = await supabase
          .from("courses")
          .insert({
            ...payload,
            created_at: new Date().toISOString()
          });
        if (error) throw error;
      }
      setIsCourseModalOpen(false);
      setEditingCourse(null);
      await fetchCourses();
    } catch (error) {
      console.error("Error saving course:", error);
      throw error;
    }
  };

  const handleDeleteCourse = async (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (confirm("Tem certeza que deseja excluir este curso e todas as suas aulas? Esta ação não pode ser desfeita.")) {
      try {
        const { error } = await supabase
          .from("courses")
          .delete()
          .eq("id", id);
        if (error) throw error;
        
        if (selectedCourseId === id) {
          setSelectedCourseId(null);
        }
        await fetchCourses();
        await fetchModules();
      } catch (error) {
        console.error("Error deleting course:", error);
      }
    }
  };

  const openEditModal = (mod: any, e: React.MouseEvent) => {
    e.stopPropagation();
    setEditingModule(mod);
    setIsModalOpen(true);
  };

  const handleSeedDB = async () => {
    setLoading(true);
    try {
      // 1. Clean up existing tables
      const { error: delModError } = await supabase
        .from("modules")
        .delete()
        .neq("title", "___NON_EXISTENT_TITLE___");
      if (delModError) throw delModError;

      const { error: delCourseError } = await supabase
        .from("courses")
        .delete()
        .neq("title", "___NON_EXISTENT_TITLE___");
      if (delCourseError) throw delCourseError;

      // 2. Seed Courses
      const courseRows = STATIC_COURSES.map((c) => ({
        id: c.id,
        title: c.title,
        description: c.description,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      }));
      const { error: insCourseError } = await supabase
        .from("courses")
        .insert(courseRows);
      if (insCourseError) throw insCourseError;

      // 3. Seed Modules
      const moduleRows = STATIC_MODULES.map((m) => ({
        title: m.title,
        content: m.content,
        media_url: m.mediaUrl,
        order_num: m.order,
        course_id: m.courseId,
        attachments: m.attachments || [],
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      }));
      const { error: insModError } = await supabase
        .from("modules")
        .insert(moduleRows);
      if (insModError) throw insModError;

      await fetchCourses();
      await fetchModules();
      alert("Sucesso! O banco de dados foi populado com os Cursos e Módulos reais!");
    } catch (e) {
      console.error(e);
      alert("Erro ao popular o banco. Verifique as configurações e políticas do Supabase.");
    }
    setLoading(false);
  };

  // Continue Journey helper
  const handleContinueJourney = () => {
    if (modules.length === 0) return;
    
    // Find first incomplete module ID
    const nextIncomplete = modules.find((m) => !completedLessons.includes(m.id));
    if (nextIncomplete) {
      setSelectedCourseId(nextIncomplete.courseId);
      setActiveModule(nextIncomplete.id);
    } else {
      // If all modules are complete, open the first one
      setSelectedCourseId(modules[0].courseId);
      setActiveModule(modules[0].id);
    }
  };

  if (loading && !currentUser) {
    return (
      <div className="min-h-screen bg-[#050914] flex flex-col items-center justify-center text-white">
        <div className="w-12 h-12 border-4 border-[#D4AF37]/30 border-t-[#D4AF37] rounded-full animate-spin mb-4"></div>
        <p className="text-[#D4AF37] font-semibold tracking-wider animate-pulse">
          Autenticando e Inicializando...
        </p>
      </div>
    );
  }

  if (!currentUser) {
    return <LoginScreen onLogin={handleLogin} />;
  }

  const isAdmin = currentUser?.role === "admin";
  const progressPercent = modules.length
    ? Math.round((completedLessons.length / modules.length) * 100)
    : 0;

  return (
    <div className="flex w-full min-h-screen bg-[#050914] bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-blue-950/20 via-[#050914] to-[#050914] text-white">
      {/* Sidebar Navigation */}
      <Sidebar
        activeItem={activeModule ? "Trilha de Aulas" : currentTab}
        onNavigate={(item) => {
          setActiveModule(null);
          setSelectedCourseId(null);
          setCurrentTab(item);
        }}
        onHome={() => {
          setActiveModule(null);
          setSelectedCourseId(null);
          setCurrentTab("Dashboard");
        }}
      />

      {/* Main Container */}
      <div className="flex-1 flex flex-col h-screen overflow-y-auto relative">
        <Topbar
          user={currentUser}
          onLogout={handleLogout}
          progressPercent={progressPercent}
        />

        <main className="flex-1 p-6 sm:p-10">
          {activeModule ? (
            /* Detailed view of the selected lesson */
            <ModuleDetails
              module={modules.find((m) => m.id === activeModule)!}
              currentUser={currentUser}
              isCompleted={completedLessons.includes(activeModule)}
              onBack={() => setActiveModule(null)}
              onProgressUpdated={handleProgressUpdated}
            />
          ) : currentTab === "Comunidade" ? (
            /* Community panel view */
            <CommunityView currentUser={currentUser} />
          ) : currentTab === "FAQ" ? (
            /* FAQ panel view */
            <FAQView />
          ) : (
            /* Dashboard Home Panel */
            <div className="space-y-10 max-w-7xl mx-auto">
              
              {/* Hero Banner Section */}
              <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-[2.2rem] p-8 sm:p-12 flex relative overflow-hidden group">
                <div className="absolute inset-0 bg-gradient-to-br from-[#111A3A]/40 via-transparent to-[#D4AF37]/10 z-0"></div>

                <div className="z-10 max-w-2xl relative space-y-6">
                  <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full border border-white/10 bg-white/5 backdrop-blur-md text-[#D4AF37] text-xs font-bold tracking-widest uppercase shadow-lg">
                    <Award className="w-3.5 h-3.5 text-[#D4AF37]" /> Método Validado
                  </span>
                  
                  <h2 className="text-4xl sm:text-5xl font-black leading-[1.1] text-white font-heading">
                    Domine o funil automático <br />
                    <span className="text-gradient-gold">do WhatsApp X1.</span>
                  </h2>
                  
                  <p className="text-gray-300 text-base sm:text-lg font-light leading-relaxed max-w-xl">
                    Aprenda a moldar ofertas, automatizar atendimentos e escalar seus lucros no Pix. Execute o plano, colha os resultados.
                  </p>

                  <Button
                    onClick={handleContinueJourney}
                    disabled={modules.length === 0}
                    className="h-12 px-8 rounded-xl flex items-center gap-2 text-md btn-gold font-bold uppercase tracking-wider border-0 cursor-pointer"
                  >
                    <Play className="w-4 h-4 fill-current" /> Continuar Jornada
                  </Button>
                </div>

                {/* Decorative golden circle blur */}
                <div className="absolute -bottom-20 -right-20 w-96 h-96 bg-[#D4AF37]/10 rounded-full blur-[120px] group-hover:bg-[#D4AF37]/15 transition-all duration-1000"></div>
              </div>

              {/* Catalog or Lesson Trail Header */}
              {selectedCourseId === null ? (
                /* COURSE CATALOG VIEW */
                <>
                  <div id="trilha-secao" className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-white/5 pb-6">
                    <div>
                      <h3 className="text-2xl sm:text-3xl font-bold text-white font-heading">
                        Catálogo de Cursos
                      </h3>
                      <p className="text-gray-400 text-sm mt-1">
                        Selecione um curso para acessar as aulas e trilhas de aprendizado.
                      </p>
                    </div>

                    {/* Admin controls and Seeding */}
                    {isAdmin && (
                      <div className="flex flex-wrap items-center gap-3">
                        <Button
                          onClick={handleSeedDB}
                          disabled={loading}
                          className="bg-emerald-500/10 border border-emerald-500/30 hover:bg-emerald-500/20 text-emerald-400 font-bold text-xs h-10 px-5 rounded-xl cursor-pointer border-0"
                        >
                          <RefreshCw className="w-3.5 h-3.5 mr-1.5 animate-spin" style={{ animationDuration: '6s' }} />
                          Salvar dados do sistema
                        </Button>
                        <Button
                          onClick={() => {
                            setEditingCourse(null);
                            setIsCourseModalOpen(true);
                          }}
                          className="bg-white/5 border border-white/10 hover:bg-white/10 text-white font-bold text-xs h-10 px-5 rounded-xl cursor-pointer"
                        >
                          <PlusCircle className="w-3.5 h-3.5 mr-1.5 text-[#D4AF37]" />
                          Adicionar Novo Curso
                        </Button>
                      </div>
                    )}
                  </div>

                  {/* Courses Catalog Grid */}
                  {loading ? (
                    <div className="flex flex-col items-center justify-center py-24">
                      <div className="w-10 h-10 border-4 border-[#D4AF37]/20 border-t-[#D4AF37] rounded-full animate-spin mb-4"></div>
                      <p className="text-[#D4AF37] text-xs font-semibold animate-pulse tracking-wide">
                        Carregando Cursos...
                      </p>
                    </div>
                  ) : courses.length === 0 ? (
                    /* Empty state */
                    <div className="border-2 border-dashed border-white/10 bg-white/5 backdrop-blur-md rounded-[2.2rem] p-16 flex flex-col items-center justify-center text-center max-w-2xl mx-auto space-y-6">
                      <div className="w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-[#D4AF37]">
                        <Layers className="w-8 h-8" />
                      </div>
                      <div className="space-y-2">
                        <h4 className="text-lg font-bold text-white">Nenhum curso cadastrado</h4>
                        <p className="text-gray-400 text-xs leading-relaxed">
                          O banco de dados está limpo. {isAdmin ? "Como administrador, clique no botão verde 'Salvar dados do sistema' acima para importar o curso de vendas padrão." : "Solicite ao administrador para carregar a grade de cursos."}
                        </p>
                      </div>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {courses.map((course) => {
                        const modulesCount = modules.filter(m => m.courseId === course.id).length;
                        return (
                          <CourseCard
                            key={course.id}
                            course={{ ...course, modulesCount }}
                            isAdmin={isAdmin}
                            onSelect={(id) => setSelectedCourseId(id)}
                            onEdit={(c, e) => {
                              e.stopPropagation();
                              setEditingCourse(c);
                              setIsCourseModalOpen(true);
                            }}
                            onDelete={handleDeleteCourse}
                          />
                        );
                      })}
                    </div>
                  )}
                </>
              ) : (
                /* COURSE LESSON TRAIL VIEW */
                <>
                  <div id="trilha-secao" className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-white/5 pb-6 text-left">
                    <div>
                      <Button
                        variant="ghost"
                        onClick={() => setSelectedCourseId(null)}
                        className="text-xs font-bold text-gray-400 hover:text-white mb-2 pl-0 hover:bg-transparent cursor-pointer border-0"
                      >
                        ← Voltar ao Catálogo de Cursos
                      </Button>
                      <h3 className="text-2xl sm:text-3xl font-bold text-white font-heading">
                        {courses.find(c => c.id === selectedCourseId)?.title}
                      </h3>
                      <p className="text-gray-400 text-sm mt-1 font-light">
                        Assista às aulas práticas e configure a sua estrutura operacional.
                      </p>
                    </div>

                    {/* Admin controls to add lessons inside this course */}
                    {isAdmin && (
                      <div className="flex flex-wrap items-center gap-3">
                        <Button
                          onClick={() => {
                            setEditingModule(null);
                            setIsModalOpen(true);
                          }}
                          className="bg-white/5 border border-white/10 hover:bg-white/10 text-white font-bold text-xs h-10 px-5 rounded-xl cursor-pointer"
                        >
                          <PlusCircle className="w-3.5 h-3.5 mr-1.5 text-[#D4AF37]" />
                          Adicionar Nova Aula
                        </Button>
                      </div>
                    )}
                  </div>

                  {/* Modules Trail Grid for this Course */}
                  {loading ? (
                    <div className="flex flex-col items-center justify-center py-24">
                      <div className="w-10 h-10 border-4 border-[#D4AF37]/20 border-t-[#D4AF37] rounded-full animate-spin mb-4"></div>
                      <p className="text-[#D4AF37] text-xs font-semibold animate-pulse tracking-wide">
                        Buscando aulas...
                      </p>
                    </div>
                  ) : modules.filter(m => m.courseId === selectedCourseId).length === 0 ? (
                    /* Empty state */
                    <div className="border-2 border-dashed border-white/10 bg-white/5 backdrop-blur-md rounded-[2.2rem] p-16 flex flex-col items-center justify-center text-center max-w-2xl mx-auto space-y-6">
                      <div className="w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-[#D4AF37]">
                        <Play className="w-8 h-8" />
                      </div>
                      <div className="space-y-2">
                        <h4 className="text-lg font-bold text-white">Nenhuma aula cadastrada neste curso</h4>
                        <p className="text-gray-400 text-xs leading-relaxed">
                          {isAdmin ? "Como administrador, clique no botão 'Adicionar Nova Aula' acima para criar a primeira aula desse curso." : "Este curso ainda não possui aulas cadastradas."}
                        </p>
                      </div>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {modules
                        .filter(m => m.courseId === selectedCourseId)
                        .map((mod, index) => (
                          <ModuleCard
                            key={mod.id}
                            module={mod}
                            index={index}
                            isAdmin={isAdmin}
                            isCompleted={completedLessons.includes(mod.id)}
                            onSelect={(id) => setActiveModule(id)}
                            onEdit={openEditModal}
                            onDelete={handleDeleteModule}
                          />
                        ))}
                    </div>
                  )}
                </>
              )}
            </div>
          )}
        </main>
      </div>

      {/* Admin Dialog Form Modal (Modules) */}
      <ModuleDialog
        open={isModalOpen}
        onOpenChange={setIsModalOpen}
        moduleToEdit={editingModule}
        courses={courses}
        onSave={handleSaveModule}
        totalModulesCount={modules.length}
      />

      {/* Admin Dialog Form Modal (Courses) */}
      <CourseDialog
        open={isCourseModalOpen}
        onOpenChange={setIsCourseModalOpen}
        courseToEdit={editingCourse}
        onSave={handleSaveCourse}
      />
    </div>
  );
}
