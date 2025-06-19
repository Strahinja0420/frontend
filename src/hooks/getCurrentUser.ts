import type { User } from "../types/types";

export const fetchCurrentUser = async (): Promise<User> => {
  const token = localStorage.getItem("token");
  console.log(localStorage);

  const response = await fetch("http://localhost:5000/users/me", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  const data = await response.json();
  console.log(data);
  return data;
};
