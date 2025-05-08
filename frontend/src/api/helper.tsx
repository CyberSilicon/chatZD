import { Base_URL } from "./constants";


export const Register = async (username: String, email: String, password: String) => {
    
    const response = await fetch(`${Base_URL}/auth/register`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-type": "application/json"
      },
      body: JSON.stringify({
        username,
        email,
        password
      }),
    });
    if (response.status !== 201) {
      const errorData = await response.json()
      throw new Error(errorData.message || "Something went wrong!")
    }
    const data = await response.json()
    return { status: response.status, data }   // ou carrément return response
};  

