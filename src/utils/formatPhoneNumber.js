export const formatPhoneNumber = (value) => {
  let numericValue = value.replace(/\D/g, ""); // Remove tudo que não for número

  // Limita o número de dígitos para 10
  if (numericValue.length > 10) {
    numericValue = numericValue.substring(0, 10);
  }

  // Aplica a máscara (xx) xxxx-xxxx
  if (numericValue.length > 6) {
    return `(${numericValue.substring(0, 2)}) ${numericValue.substring(
      2,
      6
    )}-${numericValue.substring(6)}`;
  } else if (numericValue.length > 2) {
    return `(${numericValue.substring(0, 2)}) ${numericValue.substring(2)}`;
  } else if (numericValue.length > 0) {
    return `(${numericValue}`;
  }

  return numericValue;
};
