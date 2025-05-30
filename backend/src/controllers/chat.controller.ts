import { Request, Response, NextFunction } from "express";
import { ChatService } from "../services/chat.service";
import { sendSuccess } from "../utils/http/successResponse.util";

// Crée un salon
export const createChat = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { type, title, participants } = req.body;
    const createdBy = (req as any).user.id; // Injecté par isAuthenticated

    const chat = await ChatService.createChat({
      type,
      title,
      participants,
      createdBy,
    });

    sendSuccess(res, chat, "Chat created", 201);
  } catch (err) {
    next(err);
  }
};

// Récupère tous les salons pour l'utilisateur
export const getChats = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userId = (req as any).user.id;
    const chats = await ChatService.getChatsForUser(userId);
    sendSuccess(res, chats, "Chats fetched", 200);
  } catch (err) {
    next(err);
  }
};

// Récupère un salon spécifique
export const getChat = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const chatId = req.params.id;
    const chat = await ChatService.getChatById(chatId);
    if (!chat) return res.status(404).json({ message: "Chat not found" });
    sendSuccess(res, chat, "Chat fetched", 200);
  } catch (err) {
    next(err);
  }
};

// Met à jour le titre d'un salon
export const updateChat = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const chatId = req.params.id;
    const { title } = req.body;
    const chat = await ChatService.updateChatTitle(chatId, title);
    if (!chat) return res.status(404).json({ message: "Chat not found" });
    sendSuccess(res, chat, "Chat updated", 200);
  } catch (err) {
    next(err);
  }
};

// Ajoute un participant
export const addParticipant = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const chatId = req.params.id;
    const { userId } = req.body;
    const chat = await ChatService.addParticipant(chatId, userId);
    if (!chat) return res.status(404).json({ message: "Chat not found" });
    sendSuccess(res, chat, "Participant added", 200);
  } catch (err) {
    next(err);
  }
};

// Retire un participant
export const removeParticipant = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const chatId = req.params.id;
    const userId = req.params.userId;
    const chat = await ChatService.removeParticipant(chatId, userId);
    if (!chat) return res.status(404).json({ message: "Chat not found" });
    sendSuccess(res, chat, "Participant removed", 200);
  } catch (err) {
    next(err);
  }
};

// Supprime un salon
export const deleteChat = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const chatId = req.params.id;
    await ChatService.deleteChat(chatId);
    sendSuccess(res, null, "Chat deleted", 200);
  } catch (err) {
    next(err);
  }
};
