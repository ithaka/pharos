import type { Procedure } from '../typings/procedure';

/**
 * @param callback The callback function to wrap.
 * @param time The timeout in ms.
 * @returns A version of the function that will postpone execution until after the time has elapsed since last invoked.
 */
const debounce = (callback: Procedure, time: number): Procedure => {
  let timer: number;

  return (...args: Parameters<Procedure>): number => {
    clearTimeout(timer);
    timer = window.setTimeout(() => callback(...args), time);
    return timer;
  };
};

export default debounce;
