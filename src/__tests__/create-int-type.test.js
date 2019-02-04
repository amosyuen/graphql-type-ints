import { deriveTypeForIntRange } from '../create-int-type';

describe('deriveTypeForIntRange', () => {
  test('returns "number" for safe integer range', () => {
    expect(deriveTypeForIntRange(Number.MIN_SAFE_INTEGER, Number.MAX_SAFE_INTEGER)).toEqual(
      'number'
    );
  });

  test('returns "bigint" for outside safe integer range', () => {
    expect(deriveTypeForIntRange(Number.MIN_SAFE_INTEGER - 1, Number.MAX_SAFE_INTEGER)).toEqual(
      'bigint'
    );
  });
});
