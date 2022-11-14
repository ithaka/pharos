/**
 * Like the modulo operator (%), but works as expected for negative numbers.
 * @param num
 * @param modulus
 */
export const modulo = (num: number, modulus: number): number => {
  return ((num % modulus) + modulus) % modulus;
};

interface FilterFunction {
  (item: any): boolean;
}

/**
 * Given an array of items and an iteration direction, return the next index in that direction when looping is allowed.
 * @param items
 * @param currentItemFilterFunction
 * @param moveForward
 */
export const loopWrapIndex = (
  items: Array<any>,
  currentItemFilterFunction: FilterFunction,
  moveForward: boolean
): number => {
  let index = items.findIndex(currentItemFilterFunction);
  index = moveForward ? index : Math.max(index, 0);
  return modulo(index + (moveForward ? 1 : -1), items.length);
};
