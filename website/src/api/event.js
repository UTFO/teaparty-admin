import { API_ENDPOINT } from ".";
export const getEvent = async () => {
  const response = await fetch(`${API_ENDPOINT}/event`);
  const data = await response.json();
  return data;
};

export const newEvent = async (title, type, date, address) => {
  const response = await fetch(`${API_ENDPOINT}/event`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization":  `Bearer ${sessionStorage.getItem("token")}`
    },
    body: JSON.stringify({
      title: title,
      date: date,
      type: type,
      address: address
    }),
  });
  const data = await response.json();
  return data;
};

export const updateEvent = async (id, title, type, date, address) => {
  const response = await fetch(`${API_ENDPOINT}/event/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      "Authorization":  `Bearer ${sessionStorage.getItem("token")}`
    },
    body: JSON.stringify({
      title: title,
      date: date,
      type: type,
      address: address
    }),
  });
  const data = await response.json();
  return data;
};

export const deleteEvent = async (id) => {
  const response = await fetch(`${API_ENDPOINT}/event/${id}`, {
    method: "DELETE",
    headers: {
      "Authorization":  `Bearer ${sessionStorage.getItem("token")}`
    }
  });
  const data = await response.json();
  return data;
};
