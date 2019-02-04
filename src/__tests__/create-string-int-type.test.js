import { createGraphQLBigIntType, createGraphQLStringIntType } from '../create-string-int-type';

const MIN = 2n ** 52n;
const MAX = 2n ** 64n;

const TestBigInt = createGraphQLBigIntType('TestBigInt', MIN, MAX);
const TestStringInt = createGraphQLStringIntType('TestStringInt', MIN, MAX);

describe('createGraphQLStringIntType', () => {
  describe('constructor', () => {
    test('throws error for invalid min and max', () => {
      expect(() => createGraphQLBigIntType('TestInt', 'invalid', 'invalid')).toThrow(Error);
    });

    test('throws error for not safe bounds', () => {
      expect(() => createGraphQLBigIntType('TestInt', 0, 2 ** 64)).toThrow(Error);
    });

    test('throws error for min > max', () => {
      expect(() => createGraphQLBigIntType('TestInt', 1, 0)).toThrow(Error);
    });

    test('succeeds for valid bounds', () => {
      createGraphQLStringIntType('TestInt', -MIN, MAX, 'bigint');
    });
  });

  describe('serialize', () => {
    test('throws error for non integer value', () => {
      expect(() => TestBigInt.serialize('cow')).toThrow(TypeError);
    });

    test('throws error for float value', () => {
      expect(() => TestBigInt.serialize(3.3)).toThrow(TypeError);
    });

    test('throws error for value out of bounds', () => {
      expect(() => TestBigInt.serialize(MAX + 1n)).toThrow(TypeError);
    });

    test('succeeds for bigint value in bounds', () => {
      expect(TestBigInt.serialize(BigInt(MAX))).toEqual(`${MAX}`);
    });

    test('succeeds for number value in bounds', () => {
      expect(TestBigInt.serialize(Number(MAX))).toEqual(`${MAX}`);
    });

    test('succeeds for string value in bounds', () => {
      expect(TestBigInt.serialize(`${MAX}`)).toEqual(`${MAX}`);
    });
  });

  describe('parseValue', () => {
    describe('bigint', () => {
      test('throws error for non integer value', () => {
        expect(() => TestBigInt.parseValue('cow')).toThrow(TypeError);
      });

      test('throws error for float value', () => {
        expect(() => TestBigInt.parseValue(`${3.3}`)).toThrow(TypeError);
      });

      test('throws error for value out of bounds', () => {
        expect(() => TestBigInt.parseValue(`${MAX + 1n}`)).toThrow(TypeError);
      });

      test('succeeds for number value in bounds', () => {
        expect(TestBigInt.parseValue(Number(MIN))).toEqual(BigInt(MIN));
      });

      test('succeeds for string value in bounds', () => {
        expect(TestBigInt.parseValue(`${MAX}`)).toEqual(BigInt(MAX));
      });
    });

    describe('string', () => {
      test('throws error for non integer value', () => {
        expect(() => TestStringInt.parseValue('cow')).toThrow(TypeError);
      });

      test('throws error for float value', () => {
        expect(() => TestStringInt.parseValue(`${3.3}`)).toThrow(TypeError);
      });

      test('throws error for value out of bounds', () => {
        expect(() => TestStringInt.parseValue(`${MIN - 1}`)).toThrow(TypeError);
      });

      test('succeeds for number value in bounds', () => {
        expect(TestStringInt.parseValue(Number(MIN))).toEqual(`${MIN}`);
      });

      test('succeeds for string value in bounds', () => {
        expect(TestStringInt.parseValue(`${MAX}`)).toEqual(`${MAX}`);
      });
    });
  });
});
