import { Response } from "express";

export const sendSuccess = (res: Response, data: any, message = "Succès", status = 200) => {
  res.status(status).json({
    status,
    message,
    ...data,
  });
};

export const sendError = (res: Response, error: any) => {
  let status = 500;
  let message = "Erreur interne du serveur";
  const response: any = {};
    
  if (error.name === "ValidationError") {
    status = 422;
    message = "Erreur de validation, vérifiez les champs";
    response.errors = error.errors;
  } else if (error.code === 11000) {
    status = 409;
    const key = Object.keys(error.keyValue)[0];
    message = key === "email" ? "Adresse email déjà enregistrée" : `${key} déjà utilisé`;
  } else if (error.name === "JsonWebTokenError") {
    status = 401;
    message = "Token invalide.";
  } else if (error.name === "TokenExpiredError") {
    status = 401;
    message = "Token expiré.";
  } 
  // else if (password.length < 6) {
  //   status = 401;
  //   message = "Password must be at least 6 characters";
  // } 
  else if (error.status && error.message) {
    status = error.status;
    message = error.message;
  } else {
    status = 500;
    message = "Erreur interne du serveur";
  }
  res.status(status).json({
    status,
    message,
    ...response,
    ...(process.env.NODE_ENV === "dev" && { debug: error.message }),
  });
};
