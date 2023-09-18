import { API_ENDPOINT } from ".";
export const getTeam = async () => {
  const response = await fetch(`${API_ENDPOINT}/team`);
  const data = await response.json();
  return data;
};

export const newTeam = async (
  name,
  role,
  image,
  message,
  linkedin="",
  instagram="",
  
) => {
  const response = await fetch(`${API_ENDPOINT}/team`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization":  `Bearer ${sessionStorage.getItem("token")}`
    },
    body: JSON.stringify({
      name: name,
      role: role,
      linkedin: linkedin,
      instagram: instagram,
      image: image,
      message: message,
    }),
  });
  const data = await response.json();
  return data;
};

export const updateTeam = async (
  id,
  name,
  role,
  image,
  message,
  linkedin="",
  instagram="",
) => {
  const response = await fetch(`${API_ENDPOINT}/team/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      "Authorization":  `Bearer ${sessionStorage.getItem("token")}`
    },
    body: JSON.stringify({
      name: name,
      role: role,
      linkedin: linkedin,
      instagram: instagram,
      image: image,
      message: message,
    }),
  });
  const data = await response.json();
  return data;
};

export const deleteTeam = async (id) => {
  const response = await fetch(`${API_ENDPOINT}/team/${id}`, {
    method: "DELETE",
    headers: {
      "Authorization":  `Bearer ${sessionStorage.getItem("token")}`
    }
  });
  const data = await response.json();
  return data;
};
