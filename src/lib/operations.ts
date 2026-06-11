import { supabase } from "./supabase";

export interface OperationEntry {
  id: string;
  date: string;
  spend: number;
  leads: number;
  sales: number;
  revenue: number;
}

/**
 * Gets the list of operation entries for a student.
 */
export async function getStudentOperations(username: string): Promise<OperationEntry[]> {
  if (!username) return [];
  const normalizedUser = username.toLowerCase();
  const localKey = `justiceiros_operations_${normalizedUser}`;
  
  // Read local first as immediate fallback
  let localData: OperationEntry[] = [];
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
      .from("operations")
      .select("entries")
      .eq("username", normalizedUser)
      .maybeSingle();

    if (error) throw error;

    if (data) {
      const dbEntries = data.entries || [];
      // Sync local storage with DB data if DB exists
      if (typeof window !== "undefined") {
        localStorage.setItem(localKey, JSON.stringify(dbEntries));
        return dbEntries;
      }
    }
  } catch (error) {
    console.warn("Supabase offline ou erro. Usando operações locais:", error);
  }
  
  return localData;
}

/**
 * Adds an operation entry for a student.
 */
export async function addStudentOperationEntry(
  username: string, 
  entry: Omit<OperationEntry, "id">
): Promise<OperationEntry[]> {
  if (!username) return [];
  const normalizedUser = username.toLowerCase();
  const localKey = `justiceiros_operations_${normalizedUser}`;
  
  const newEntry: OperationEntry = {
    ...entry,
    id: `op_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
  };

  // Get current
  let currentEntries: OperationEntry[] = [];
  if (typeof window !== "undefined") {
    const saved = localStorage.getItem(localKey);
    if (saved) {
      try {
        currentEntries = JSON.parse(saved);
      } catch (e) {}
    }
  }
  
  const updatedEntries = [newEntry, ...currentEntries];
  
  // Update local storage
  if (typeof window !== "undefined") {
    localStorage.setItem(localKey, JSON.stringify(updatedEntries));
  }

  // Sync with Supabase
  try {
    const { error } = await supabase
      .from("operations")
      .upsert({
        username: normalizedUser,
        entries: updatedEntries,
        updated_at: new Date().toISOString()
      });
    if (error) throw error;
  } catch (error) {
    console.warn("Erro ao salvar operação no Supabase (offline):", error);
  }

  return updatedEntries;
}

/**
 * Deletes an operation entry for a student.
 */
export async function deleteStudentOperationEntry(
  username: string, 
  entryId: string
): Promise<OperationEntry[]> {
  if (!username || !entryId) return [];
  const normalizedUser = username.toLowerCase();
  const localKey = `justiceiros_operations_${normalizedUser}`;

  // Get current
  let currentEntries: OperationEntry[] = [];
  if (typeof window !== "undefined") {
    const saved = localStorage.getItem(localKey);
    if (saved) {
      try {
        currentEntries = JSON.parse(saved);
      } catch (e) {}
    }
  }

  const updatedEntries = currentEntries.filter(entry => entry.id !== entryId);
  
  // Update local storage
  if (typeof window !== "undefined") {
    localStorage.setItem(localKey, JSON.stringify(updatedEntries));
  }

  // Sync with Supabase
  try {
    const { error } = await supabase
      .from("operations")
      .upsert({
        username: normalizedUser,
        entries: updatedEntries,
        updated_at: new Date().toISOString()
      });
    if (error) throw error;
  } catch (error) {
    console.warn("Erro ao deletar operação no Supabase (offline):", error);
  }

  return updatedEntries;
}
