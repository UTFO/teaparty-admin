
import { API_ENDPOINT } from ".";
export const getFaq = async () => {
  const response = await fetch(`${API_ENDPOINT}/faq`);
  const data = await response.json();
  console.log(data);
  return data;
};

export const newFaq = async (question, answer) => {
  const response = await fetch(`${API_ENDPOINT}/faq`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization":  `Bearer ${sessionStorage.getItem("token")}`
    },
    body: JSON.stringify({
      question: question,
      answer: answer,
    }),
  });
  const data = await response.json();
  return data;
};

export const updateFaq = async (id, question, answer) => {
  const response = await fetch(`${API_ENDPOINT}/faq/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      "Authorization":  `Bearer ${sessionStorage.getItem("token")}`
    },
    body: JSON.stringify({
      question: question,
      answer: answer,
    }),
  });
  const data = await response.json();
  return data;
};

export const deleteFaq = async (id) => {
  const response = await fetch(`${API_ENDPOINT}/faq/${id}`, {
    method: "DELETE",
    headers: {
      "Authorization":  `Bearer ${sessionStorage.getItem("token")}`
    }
  });
  const data = await response.json();
  return data;
};
