import { Register } from "@/api/helper";

export const SubmitNewUser = async (username: String, email: String, password: String) => {
  try {
    return await Register(username, email, password);
  } catch (error: any) {
    throw new Error(error.message);
  }
}
