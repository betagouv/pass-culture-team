function upChar(c) {
    return c.toUpperCase();
  }

export const readableSnakeCase = (snakeCase) => snakeCase.replace(/_/g, ' ');
export const capitalize = (words) => words && words.toLowerCase().replace(/(^[a-z])|\s([a-z])/g, upChar).replace(/De\s/g, "de ").replace(/D'/g, "d'").replace(/Du\s/, "du ");
