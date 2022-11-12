import { expect } from '@open-wc/testing';
import { modulo } from './math';

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
