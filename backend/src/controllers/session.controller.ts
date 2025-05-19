import { Request, Response, NextFunction } from 'express';
import {
  createSession,
  getUserSessions,
  deleteSession,
  updateSessionActivity,
} from '../services/session.service';

// 1) Démarrer une session
export const startSession = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = (req as any).user.id;              // ✓ userId
    const ipAddress = req.ip || 'unknown';            // ✓ ipAddress
    const deviceInfo = req.headers['user-agent'] || 'unknown'; // ✓ deviceInfo

    const session = await createSession({
      userId,
      ipAddress,
      deviceInfo: deviceInfo as string,
    });

    res.status(201).json({
      success: true,
      message: 'Session started',
      session,  // contient sessionId, userId, ipAddress, deviceInfo, createdAt, lastActiveAt
    });
  } catch (error) {
    next(error);
  }
};

// 2) Lister toutes les sessions
export const getSessions = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = (req as any).user.id;
    const sessions = await getUserSessions(userId);

    res.status(200).json({
      success: true,
      message: 'Active sessions fetched',
      sessions, // tableau d’objets avec les 6 champs
    });
  } catch (error) {
    next(error);
  }
};

// 3) Terminer (supprimer) une session
export const endSession = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const sessionId = req.params.id;  // ici : sessionId
    await deleteSession(sessionId);
    res.status(200).json({
      success: true,
      message: 'Session ended',
    });
  } catch (error) {
    next(error);
  }
};

// 4) Middleware pour rafraîchir lastActiveAt
export const updateActivity = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const sessionId = req.cookies?.session_id;
    if (sessionId) {
      await updateSessionActivity(sessionId as string);
    }
  } catch {
    // ignore
  } finally {
    next();
  }
};
