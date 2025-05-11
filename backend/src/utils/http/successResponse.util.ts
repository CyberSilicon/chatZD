import { Response } from "express";

/**
 * Sends a standardized success response to the client.
 *
 * @param res - The Express `Response` object used to send the response.
 * @param data - The payload to include in the response body. Can be any type.
 * @param message - An optional message describing the success. Defaults to "Succès".
 * @param status - An optional HTTP status code for the response. Defaults to 200.
 *
 * @returns void
 */
export const sendSuccess = (res: Response, data: any, message = "Succès", status = 200) => {
  res.status(status).json({
    status,
    message,
    ...data,
  });
};