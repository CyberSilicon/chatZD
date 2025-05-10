import { Request, Response, NextFunction } from "express";
import { MongoServerError } from "mongodb";

interface CustomError extends Error {
  status?: number;
  code?: number;
  keyValue?: Record<string, any>;
  errors?: any;
}

export const handleGlobalErrors = (
  err: CustomError,
  req: Request,
  res: Response,
  next: NextFunction
): any => {
  let status = 500;
  let message = "Une erreur interne est survenue.";
  const response: Record<string, any> = {};
  switch (true) {
    case err.name === "ValidationError":
      status = 422;
      message = err.message;
      response.errors = err.errors;
      break;

    case (err as MongoServerError).code === 11000:
      status = 409;
      const duplicateKey = Object.keys((err as MongoServerError).keyValue ?? {})[0];
      message =
        duplicateKey === "email"
          ? "Cette adresse email est déjà utilisée."
          : `Le champ "${duplicateKey}" est déjà utilisé.`;
      break;

    case err.name === "JsonWebTokenError":
      status = 401;
      message = "Le token fourni est invalide.";
      break;

    case err.name === "TokenExpiredError":
      status = 401;
      message = "La session a expiré. Veuillez vous reconnecter.";
      break;

    case !!err.status && !!err.message:
      status = err.status!;
      message = err.message;
      break;
  }

  // Optionnel : log en développement
  if (process.env.NODE_ENV === "dev") {
    console.error(`[Error] ${status} - ${message}`, err);
    response.debug = err.message;
  }

  res.status(status).json({
    status,
    message,
    ...response,
  });
};