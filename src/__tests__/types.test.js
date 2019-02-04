import * as types from '../types';

const calculateRangeFromName = name => {
  const bitsMatches = name.match(/\d+/g);
  expect(bitsMatches).toHaveLength(1);

  const signMatches = name.match(/(Natural|U(Big|String)?Int)/g);
  expect(signMatches === null || signMatches.length <= 1).toBe(true);

  const bits = BigInt(bitsMatches[0]);
  // Jest doesn't support bigints for number comparisons
  expect(bits >= 1).toEqual(true);

  let max;
  let min;
  if (signMatches === null) {
    max = 2n ** (bits - 1n) - 1n;
    min = -(2n ** (bits - 1n));
  } else {
    max = 2n ** bits - 1n;
    min = signMatches[0] === 'Natural' ? 1n : 0n;
  }
  // Jest doesn't support bigints for number comparisons
  expect(max > min).toEqual(true);

  return { max, min };
};

describe('types', () => {
  Object.keys(types).forEach(key => {
    if (!key.startsWith('GraphQL')) {
      return;
    }
    // eslint-disable-next-line jest/valid-describe
    describe(key, () => {
      const { max, min } = calculateRangeFromName(key);
      const Type = types[key];

      test('serialized max value', () => {
        expect(`${Type.serialize(max)}`).toEqual(`${max}`);
      });

      test('serialized min value', () => {
        expect(`${Type.serialize(min)}`).toEqual(`${min}`);
      });

      test('throw error for max + 1 value', () => {
        expect(() => `${Type.serialize(max + 1n)}`).toThrow(TypeError);
      });

      test('throw error for min - 1 value', () => {
        expect(() => `${Type.serialize(min - 1n)}`).toThrow(TypeError);
      });
    });
  });
});
