import express from "express";
import {
  getSessions,
  startSession,
  endSession,
  updateActivity,
} from "../controllers/session.controller";
import { isAuthenticated } from "../middlewares/auth/auth.middleware";

const router = express.Router();

router.use(updateActivity);

router.get("/session", isAuthenticated, getSessions);
router.post("/session", isAuthenticated, startSession);
router.delete("session/:id", isAuthenticated, endSession);

export default router;
