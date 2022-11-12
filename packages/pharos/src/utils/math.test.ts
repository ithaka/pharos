import { expect } from '@open-wc/testing';
import { loopWrapIndex, modulo } from './math';

describe('modulo', () => {
  it('rolls over to zero at the modulus', () => {
    expect(modulo(13, 13)).to.equal(0);
  });

  it('maintains its value when less than the modulus', () => {
    expect(modulo(5, 13)).to.equal(5);
  });

  it('maintains its value when zero', () => {
    expect(modulo(0, 13)).to.equal(0);
  });

  it('removes multiples of the modulus when more than the modulus', () => {
    expect(modulo(13, 5)).to.equal(3);
  });

  it('works for negative numbers', () => {
    expect(modulo(-3, 17)).to.equal(14);
  });
});

describe('loopWrapIndex', () => {
  it('returns the last item if moving backward from first item', () => {
    expect(loopWrapIndex([0, 1, 2], (i) => i === 0, false)).to.equal(2);
  });

  it('returns the last item if moving backward and no current index', () => {
    expect(loopWrapIndex([0, 1, 2], (i) => i === 42, false)).to.equal(2);
  });

  it('returns the first item if moving forward from last item', () => {
    expect(loopWrapIndex([0, 1, 2], (i) => i === 2, true)).to.equal(0);
  });

  it('returns the first item if moving forward and no current index', () => {
    expect(loopWrapIndex([0, 1, 2], (i) => i === 42, true)).to.equal(0);
  });
});
