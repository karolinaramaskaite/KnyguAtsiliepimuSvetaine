export const getItem = name => {
  return localStorage.getItem(name);
};

export const setItem = (name, value) => {
  localStorage.setItem(name, value);
};

export const resetItem = name => {
  localStorage.setItem(name, null);
};

export const resetAll = () => {
  localStorage.clear();
};
