import { API_ENDPOINT } from ".";
export const checkPasscode = async (passcode) => {
  const response = await fetch(`${API_ENDPOINT}/passcode`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      passcode: passcode,
    }),
  });
  const data = await response.json();
  return data;
};
