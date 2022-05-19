const isValidEmail = email => typeof email === "string" && email.trim() !== "" && email.includes("@");
const isValidPassword = password => typeof password === "string" && password.trim() !== "" && password.length > 5;
const isValidUsername = username => typeof username === "string" && username.trim() !== "" && username.length > 3;

export const validSignupUser = (
    email,
    password,
    username
  ) =>  isValidEmail(email) && isValidPassword(password) && isValidUsername(username);

export const validLoginUser = (email, password) => isValidEmail(email) && isValidPassword(password)