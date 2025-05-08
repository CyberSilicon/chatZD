import { Register } from "@/api/helper";

export const SubmitNewUser = async (username: String, email: String, password: String) => {
    try {
     const res = await Register( username, email, password);
     console.log(res)
        if (res.status === 201) {
        return res
        } else {
        throw new Error("Error creating user")
        }

    } catch (error) {
      console.log(error)
    }
}
