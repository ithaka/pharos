/**
 * Like the modulo operator (%), but works as expected for negative numbers.
 * @param num
 * @param modulus
 */
export const modulo = (num: number, modulus: number): number => {
  return ((num % modulus) + modulus) % modulus;
};
