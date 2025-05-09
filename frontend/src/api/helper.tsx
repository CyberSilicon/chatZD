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
  const data = await response.json();
  if (response.status !== 201) {
    throw new Error(data.message || "Something went wrong!")
  }
  return data;
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
  const data = await response.json();
  if (response.status !== 200) {
    throw new Error(data.message || "Something went wrong!")
  }
  return data;
};

