import toast from "react-hot-toast";
import { Base_URL } from "./constants";


export const Register = async (username: String, email: String, password: String) => {
  const response = await fetch(`${Base_URL}/auth/register`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      credientials: "include",
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
    headers: {
      Accept: "application/json",
      credentials: "include",
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
