import { supabase } from "./supabase";

/**
 * Gets the list of completed lesson IDs for a student.
 */
export async function getStudentProgress(username: string): Promise<string[]> {
  if (!username) return [];
  const normalizedUser = username.toLowerCase();
  const localKey = `justiceiros_progress_${normalizedUser}`;
  
  // Read local first as immediate fallback
  let localData: string[] = [];
  if (typeof window !== "undefined") {
    const saved = localStorage.getItem(localKey);
    if (saved) {
      try {
        localData = JSON.parse(saved);
      } catch (e) {
        localData = [];
      }
    }
  }

  try {
    const { data, error } = await supabase
      .from("progress")
      .select("completed_lessons")
      .eq("username", normalizedUser)
      .maybeSingle();

    if (error) throw error;

    if (data) {
      const dbLessons = data.completed_lessons || [];
      // Sync local storage with DB data if DB has newer/more progress
      if (typeof window !== "undefined" && dbLessons.length >= localData.length) {
        localStorage.setItem(localKey, JSON.stringify(dbLessons));
        return dbLessons;
      }
    }
  } catch (error) {
    console.warn("Supabase offline ou erro. Usando progresso local:", error);
  }
  
  return localData;
}

/**
 * Marks a lesson as completed for a student.
 */
export async function markLessonComplete(username: string, lessonId: string): Promise<void> {
  if (!username || !lessonId) return;
  const normalizedUser = username.toLowerCase();
  const localKey = `justiceiros_progress_${normalizedUser}`;

  // Update local storage first
  let localData: string[] = [];
  if (typeof window !== "undefined") {
    const saved = localStorage.getItem(localKey);
    if (saved) {
      try {
        localData = JSON.parse(saved);
      } catch (e) {}
    }
    if (!localData.includes(lessonId)) {
      localData.push(lessonId);
      localStorage.setItem(localKey, JSON.stringify(localData));
    }
  }

  // Sync with Supabase
  try {
    const { data, error } = await supabase
      .from("progress")
      .select("completed_lessons")
      .eq("username", normalizedUser)
      .maybeSingle();

    if (error) throw error;

    const current = data?.completed_lessons || [];
    if (!current.includes(lessonId)) {
      const updated = [...current, lessonId];
      const { error: upsertError } = await supabase
        .from("progress")
        .upsert({
          username: normalizedUser,
          completed_lessons: updated,
          updated_at: new Date().toISOString()
        });
      if (upsertError) throw upsertError;
    }
  } catch (error) {
    console.warn("Erro ao salvar progresso no Supabase (offline):", error);
  }
}

/**
 * Marks a lesson as incomplete (uncompleted) for a student.
 */
export async function markLessonIncomplete(username: string, lessonId: string): Promise<void> {
  if (!username || !lessonId) return;
  const normalizedUser = username.toLowerCase();
  const localKey = `justiceiros_progress_${normalizedUser}`;

  // Update local storage
  if (typeof window !== "undefined") {
    const saved = localStorage.getItem(localKey);
    if (saved) {
      try {
        let localData: string[] = JSON.parse(saved);
        localData = localData.filter(id => id !== lessonId);
        localStorage.setItem(localKey, JSON.stringify(localData));
      } catch (e) {}
    }
  }

  // Sync with Supabase
  try {
    const { data, error } = await supabase
      .from("progress")
      .select("completed_lessons")
      .eq("username", normalizedUser)
      .maybeSingle();

    if (error) throw error;

    if (data) {
      const current = data.completed_lessons || [];
      const updated = current.filter((id: string) => id !== lessonId);
      const { error: upsertError } = await supabase
        .from("progress")
        .upsert({
          username: normalizedUser,
          completed_lessons: updated,
          updated_at: new Date().toISOString()
        });
      if (upsertError) throw upsertError;
    }
  } catch (error) {
    console.warn("Erro ao desmarcar progresso no Supabase (offline):", error);
  }
}
