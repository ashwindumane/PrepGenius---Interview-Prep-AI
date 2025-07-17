const validateEmail = (email) => {
  const regex= /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  return regex.test(email);
};
