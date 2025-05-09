import { Login } from "@/api/helper";

export const LoginUser = async (email: String, password: String) => {
  try {
    const res = await Login(email, password);
    return res;
  } catch (error: any) {
    throw new Error(error.message);
  }
}
