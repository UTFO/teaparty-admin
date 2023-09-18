import { API_ENDPOINT } from ".";
export const getAbout = async () => {
  const response = await fetch(`${API_ENDPOINT}/about`);
  const data = await response.json();
  return data;
};

export const newAbout = async (name, text) => {
  const response = await fetch(`${API_ENDPOINT}/about`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization":  `Bearer ${sessionStorage.getItem("token")}`
    },
    body: JSON.stringify({
      name: name,
      text: text,
    }),
  });
  const data = await response.json();
  return data;
};

export const updateAbout = async (id, name, text) => {
  const response = await fetch(`${API_ENDPOINT}/about/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      "Authorization":  `Bearer ${sessionStorage.getItem("token")}`
    },
    body: JSON.stringify({
      name: name,
      text: text,
    }),
  });
  const data = await response.json();
  return data;
};

export const deleteAbout = async (id) => {
  const response = await fetch(`${API_ENDPOINT}/about/${id}`, {
    method: "DELETE",
    headers: {
      "Authorization":  `Bearer ${sessionStorage.getItem("token")}`
    }
  });
  const data = await response.json();
  return data;
};
