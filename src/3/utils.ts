export const isSymbol = (char: string) => /^[^.0-9]$|^[\d]{2,}$/.test(char);
export const isNumber = (char: string) => !isNaN(Number(char));
