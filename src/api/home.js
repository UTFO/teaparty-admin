import { API_ENDPOINT } from ".";

export const getHome = async () => {
  const response = await fetch(`${API_ENDPOINT}/home`);
  const data = await response.json();
  return data;
};

export const newHome = async (header, text, image) => {
  console.log(image);
  const response = await fetch(`${API_ENDPOINT}/home`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization":  `Bearer ${sessionStorage.getItem("token")}`
    },
    body: JSON.stringify({
      header: header,
      text: text,
      image: image,
    }),
  });
  const data = await response.json();
  return data;
};

export const updateHome = async (id, header, text, image) => {
  const response = await fetch(`${API_ENDPOINT}/home/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      "Authorization":  `Bearer ${sessionStorage.getItem("token")}`
    },
    body: JSON.stringify({
      header: header,
      text: text,
      image: image,
    }),
  });
  const data = await response.json();
  return data;
};

export const deleteHome = async (id) => {
  const response = await fetch(`${API_ENDPOINT}/home/${id}`, {
    method: "DELETE",
    headers: {
      "Authorization":  `Bearer ${sessionStorage.getItem("token")}`
    }
  });
  const data = await response.json();
  return data;
};
