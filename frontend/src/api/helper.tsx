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
  return await response.json();
};

export const Login = async (email: String, password: String) => {
  const response = await fetch(`${Base_URL}/auth/login`, {
    method: "POST",
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

