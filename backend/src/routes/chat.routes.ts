import { Router } from "express";
import { 
  createChat,
  getChats,
  getChat,
  updateChat,
  addParticipant,
  removeParticipant,
  deleteChat
} from "../controllers/chat.controller";
import { RequestHandler } from "express";
import { isAuthenticated } from "../middlewares/auth/auth.middleware";

const router = Router();

// Toutes les routes de ce fichier sont protégées
router.use(isAuthenticated);

// POST /api/v1/chats       → Créer un chat
router.post("/chats", createChat);

// GET  /api/v1/chats       → Récupérer tous les chats de l’utilisateur
router.get("/chats", getChats);

router.get("/chats/:id", getChat as RequestHandler);

// PATCH /api/v1/chats/:id  → Mettre à jour un chat (titre)
router.patch("/chats/:id", updateChat as RequestHandler);

// POST  /api/v1/chats/:id/participants   → Ajouter un participant
router.post("/chats/:id/participants", addParticipant as RequestHandler);

// DELETE /api/v1/chats/:id/participants/:userId → Retirer un participant
router.delete("/chats/:id/participants/:userId", removeParticipant as RequestHandler);

router.delete("/chats/:id", deleteChat);

export default router;