export function filterUniqueNonEmpty(array) {
  return Array.from(
    new Set(array.filter((item) => item && item.trim() !== ""))
  );
}

export const validatePassword = (password) => {
  if (password == null || typeof password === "undefined") {
    return false;
  }
  const lengthValid = password.length >= 8;
  const hasUpperCase = /[A-Z]/.test(password);
  const hasLowerCase = /[a-z]/.test(password);
  const hasNumber = /[0-9]/.test(password);

  const errorMessages = [];

  if (!lengthValid) {
    errorMessages.push("En az 8 karakter");
  }

  if (!hasUpperCase) {
    errorMessages.push("En az 1 büyük harf");
  }

  if (!hasLowerCase) {
    errorMessages.push("En az 1 küçük harf");
  }

  if (!hasNumber) {
    errorMessages.push("En az 1 rakam");
  }

  return {
    errors: errorMessages,
  };
};
