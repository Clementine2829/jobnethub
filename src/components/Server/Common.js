import { contactUs } from "./apiConstants";

const performContatusUs = async (firstname, lastname, email, message) => {
  const response = await fetch(contactUs, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      firstName: firstname,
      lastName: lastname,
      email,
      message,
    }),
  });

  console.log("response ok", response.ok);
  if (!response.ok) {
    // throw new Error("Registration failed");
  }

  return await response.json();
};
export { performContatusUs };
