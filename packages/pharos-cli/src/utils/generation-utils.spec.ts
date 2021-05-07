import { capitalizeText, titleCaseText, camelCaseText } from './generation-utils';

describe('generation-utils', () => {
  it('capitalizeText correctly transforms text', () => {
    const singleWordResult = capitalizeText('stuff');
    const multipleWordResult = capitalizeText('stuff-things');

    expect(singleWordResult).toBe('Stuff');
    expect(multipleWordResult).toBe('Stuff-things');
  });

  it('titleCaseText correctly transforms text', () => {
    const singleWordResult = titleCaseText('stuff');
    const twoWordResult = titleCaseText('stuff-things');
    const threeWordResult = titleCaseText('stuff-and-things');

    expect(singleWordResult).toBe('Stuff');
    expect(twoWordResult).toBe('StuffThings');
    expect(threeWordResult).toBe('StuffAndThings');
  });

  it('camelCaseText correctly transforms text', () => {
    const singleWordResult = camelCaseText('stuff');
    const twoWordResult = camelCaseText('stuff-things');
    const threeWordResult = camelCaseText('stuff-and-things');

    expect(singleWordResult).toBe('stuff');
    expect(twoWordResult).toBe('stuffThings');
    expect(threeWordResult).toBe('stuffAndThings');
  });
});
