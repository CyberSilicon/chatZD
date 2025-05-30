import { ChatModel, IChat } from "../models/chat.model";
import { Types } from "mongoose";

// Service métier pour les chats
export class ChatService {
  /**
   * Crée un nouveau salon de discussion
   */
  static async createChat(data: {
    type: "private" | "group" | "channel";
    title?: string;
    participants: string[];
    admins?: string[];
    createdBy: string;
  }): Promise<IChat> {
    // On transforme les string IDs en ObjectId
    const doc = await ChatModel.create({
      type: data.type,
      title: data.title,
      participants: data.participants.map(id => new Types.ObjectId(id)),
      admins: data.admins?.map(id => new Types.ObjectId(id)),
      createdBy: new Types.ObjectId(data.createdBy),
    });
    return doc;
  }

  /**
   * Récupère tous les salons d'un utilisateur, triés par date de mise à jour
   */
  static async getChatsForUser(userId: string): Promise<IChat[]> {
    return ChatModel.find({
      participants: new Types.ObjectId(userId)
    })
      .sort({ updatedAt: -1 })
      .populate("participantUsers", "username email") // popup participants
      .exec();
  }

  /**
   * Récupère un salon par son ID
   */
  static async getChatById(chatId: string): Promise<IChat | null> {
    return ChatModel.findById(new Types.ObjectId(chatId))
      .populate("participantUsers", "username email")
      .exec();
  }

  /**
   * Met à jour le titre d'un salon (utile pour les groupes/channels)
   */
  static async updateChatTitle(chatId: string, title: string): Promise<IChat | null> {
    return ChatModel.findByIdAndUpdate(
      new Types.ObjectId(chatId),
      { title },
      { new: true }
    ).exec();
  }

  /**
   * Ajoute un participant à un salon
   */
  static async addParticipant(chatId: string, userId: string): Promise<IChat | null> {
    return ChatModel.findByIdAndUpdate(
      new Types.ObjectId(chatId),
      { $addToSet: { participants: new Types.ObjectId(userId) } },
      { new: true }
    ).exec();
  }

  /**
   * Retire un participant d'un salon
   */
  static async removeParticipant(chatId: string, userId: string): Promise<IChat | null> {
    return ChatModel.findByIdAndUpdate(
      new Types.ObjectId(chatId),
      { $pull: { participants: new Types.ObjectId(userId) } },
      { new: true }
    ).exec();
  }

  /**
   * Supprime un salon
   */
  static async deleteChat(chatId: string): Promise<void> {
    await ChatModel.findByIdAndDelete(new Types.ObjectId(chatId)).exec();
  }
}
