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

router.get("/session", getSessions);
router.post("/session",  startSession);
router.delete("session/:id", endSession);

export default router;
