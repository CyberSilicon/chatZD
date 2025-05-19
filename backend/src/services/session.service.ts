import { SessionModel } from "../models/session.model";

// Crée une session lors du login
export const createSession = async ({
  userId,
  deviceInfo,
  ipAddress,
}: {
  userId: string;
  deviceInfo: string;
  ipAddress: string;
}) => {
  // On crée la session AVEC les bons champs camelCase
  const session = await SessionModel.create({
    userId,
    deviceInfo,
    ipAddress,
    lastActiveAt: new Date(),
    // sessionId sera auto-généré par le default du schéma
  });
  return session.toObject();
};

// Supprime une session (logout)
export const deleteSession = async (sessionId: string) => {
  return await SessionModel.findOneAndDelete({ sessionId }).lean();
};

// Liste toutes les sessions d’un utilisateur
export const getUserSessions = async (userId: string) => {
  return await SessionModel.find({ userId })
    .sort({ lastActiveAt: -1 })
    .lean();
};

// Met à jour l’activité d’une session (optionnel)
export const updateSessionActivity = async (sessionId: string) => {
  return await SessionModel.findOneAndUpdate(
    { sessionId },
    { lastActiveAt: new Date() },
    { new: true, lean: true }
  );
};
