import { Request, Response, NextFunction } from 'express';
import { updateSessionActivity } from '../../services/session.service'; // ta fonction de service

/**
 * Middleware qui, à chaque requête, :
 * - lit le cookie 'session_id'
 * - appelle le service pour mettre à jour lastActiveAt
 * - ne bloque JAMAIS la requête (on next() quoi qu'il arrive)
 */
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
  } catch (err) {
    // On ne veut pas interrompre le flux si ça plante : on logue seulement
    console.warn('[updateActivity] Impossible de mettre à jour la session:', err);
  } finally {
    // On passe à la suite (routes protégées, etc.)
    next();
  }
};
