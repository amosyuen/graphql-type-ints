import createGraphQLNumberIntType from '../create-number-int-type';

const TestInt = createGraphQLNumberIntType('TestInt', -100, 100);

describe('createGraphQLNumberIntType', () => {
  describe('constructor', () => {
    test('throws error for invalid min and max', () => {
      expect(() => createGraphQLNumberIntType('TestInt', 'invalid', 'invalid')).toThrow(TypeError);
    });

    test('throws error for min > max', () => {
      expect(() => createGraphQLNumberIntType('TestInt', 1, 0)).toThrow(Error);
    });

    test('throws error for unsafe bounds', () => {
      expect(() =>
        createGraphQLNumberIntType('TestInt', Number.MIN_SAFE_INTEGER - 1, Number.MAX_SAFE_INTEGER)
      ).toThrow(Error);
    });

    test('succeeds for safe bounds', () => {
      createGraphQLNumberIntType('TestInt', Number.MIN_SAFE_INTEGER, Number.MAX_SAFE_INTEGER);
    });
  });

  describe('serialize', () => {
    test('throws error for non integer value', () => {
      expect(() => TestInt.serialize('cow')).toThrow(TypeError);
    });

    test('throws error for float value', () => {
      expect(() => TestInt.serialize(3.3)).toThrow(TypeError);
    });

    test('throws error for value out of bounds', () => {
      expect(() => TestInt.serialize(-101)).toThrow(TypeError);
    });

    test('succeeds for number value in bounds', () => {
      expect(TestInt.serialize(-100)).toEqual(-100);
    });
  });

  describe('parseValue', () => {
    test('throws error for non integer value', () => {
      expect(() => TestInt.parseValue('cow')).toThrow(TypeError);
    });

    test('throws error for float value', () => {
      expect(() => TestInt.parseValue(3.3)).toThrow(TypeError);
    });

    test('throws error for value out of bounds', () => {
      expect(() => TestInt.parseValue(-101)).toThrow(TypeError);
    });

    test('succeeds for number value in bounds', () => {
      expect(TestInt.serialize(-100)).toEqual(-100);
    });
  });
});
