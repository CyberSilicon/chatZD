import { Base_URL } from "./constants";

export const Register = async (username: String, email: String, password: String) => {
  const response = await fetch(`${Base_URL}/auth/register`, {
    method: "POST",
    credentials: "include",
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
  const data = await response.json();
  if (response.status !== 201 && response.status !== 200) { 
    throw new Error(data.message || "Something went wrong!")
  }
  return data;
}

export const Login = async (email: String, password: String) => {
  const response = await fetch(`${Base_URL}/auth/login`, {
    method: "POST",
    credentials: "include",
    headers: {
      Accept: "application/json",
      "Content-type": "application/json"
    },
    body: JSON.stringify({
      email,
      password
    }),
  });
  return await response.json();
};

export const Logout = async () => {
  const response = await fetch(`${Base_URL}/auth/logout`, {
    method: "POST",
    credentials: "include",
    headers: {
      Accept: "application/json",
      "Content-type": "application/json"
    },
  });
  const data = await response.json();
  return data;
}

// export const getSessions = async () => {
//   const response = await fetch(`${Base_URL}/session`, {
//     method: "GET",
//     credentials: "include",         // ← pour que cookie soit envoyé
//     headers: { "Content-Type": "application/json" },
//   });
//   // if (!response.ok) {
//   //   throw new Error("Impossible de récupérer les sessions");
//   // }
//   const sessionData = await response.json();
//   return sessionData;  
// };