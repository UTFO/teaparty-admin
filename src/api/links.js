import { API_ENDPOINT } from ".";
export const getLinks = async () => {
  const response = await fetch(`${API_ENDPOINT}/links`);
  const data = await response.json();
  return data;
};
export const updateLinks = async (id, signup, email, instagram) => {
  const response = await fetch(`${API_ENDPOINT}/links/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      "Authorization":  `Bearer ${sessionStorage.getItem("token")}`
    },
    body: JSON.stringify({
      signup: signup,
      email: email,
      instagram: instagram,
    }),
  });
  const data = await response.json();
  return data;
};
