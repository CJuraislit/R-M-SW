export const getRandomElementOfArray = (array) =>
  array[Math.floor(Math.random() * array.length)];

export const getRandomHexColor = () =>
  "#" + Math.floor(Math.random() * 16777215).toString(16);
