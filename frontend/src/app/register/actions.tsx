import { Register } from "@/api/helper";

export const SubmitNewUser = async (username: String, email: String, password: String) => {
  try {
    const res = await Register(username, email, password);
    return res;
  } catch (error: any) {
    throw new Error(error.message);
  }
}
