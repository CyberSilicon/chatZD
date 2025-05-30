import { Base_URL } from "./constants";

export interface Chat {
  _id: string;
  type: "private" | "group" | "channel";
  title?: string;
  participants: string[];
  admins?: string[];
  createdBy: string;
  lastMessage?: string;
  createdAt: string;
  updatedAt: string;
}

// 1) Lister tous les salons de l’utilisateur
export async function getChats(): Promise<Chat[]> {
  const res = await fetch(`${Base_URL}/chats`, {
    method: "GET",
    credentials: "include",
  });
  if (!res.ok) throw new Error("Impossible de charger les chats");
  const json = await res.json();
  return json.data as Chat[];
}

// 2) Obtenir un salon par son ID
export async function getChat(chatId: string): Promise<Chat> {
  const res = await fetch(`${Base_URL}/chats/${chatId}`, {
    method: "GET",
    credentials: "include",
  });
  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.message || "Impossible de récupérer le chat");
  }
  const json = await res.json();
  return json.data as Chat;
}

// 3) Créer un nouveau salon
export async function createChat(params: {
  type: "private" | "group" | "channel";
  title?: string;
  participants: string[];
}): Promise<Chat> {
  const res = await fetch(`${Base_URL}/chats`, {
    method: "POST",
    credentials: "include",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(params),
  });
  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.message || "Impossible de créer le chat");
  }
  const json = await res.json();
  return json.data as Chat;
}

// 4) Mettre à jour le titre d’un salon
export async function updateChatTitle(chatId: string, title: string): Promise<Chat> {
  const res = await fetch(`${Base_URL}/chats/${chatId}`, {
    method: "PATCH",
    credentials: "include",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ title }),
  });
  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.message || "Impossible de mettre à jour le chat");
  }
  const json = await res.json();
  return json.data as Chat;
}

// 5) Ajouter un participant
export async function addParticipant(chatId: string, userId: string): Promise<Chat> {
  const res = await fetch(`${Base_URL}/chats/${chatId}/participants`, {
    method: "POST",
    credentials: "include",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ userId }),
  });
  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.message || "Impossible d’ajouter le participant");
  }
  const json = await res.json();
  return json.data as Chat;
}

// 6) Retirer un participant
export async function removeParticipant(chatId: string, userId: string): Promise<Chat> {
  const res = await fetch(`${Base_URL}/chats/${chatId}/participants/${userId}`, {
    method: "DELETE",
    credentials: "include",
  });
  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.message || "Impossible de retirer le participant");
  }
  const json = await res.json();
  return json.data as Chat;
}

// 7) Supprimer un salon
export async function deleteChat(chatId: string): Promise<void> {
  const res = await fetch(`${Base_URL}/chats/${chatId}`, {
    method: "DELETE",
    credentials: "include",
  });
  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.message || "Impossible de supprimer le chat");
  }
}
