import createGraphQLNumberIntType from './create-number-int-type';
import createGraphQLStringIntType from './create-string-int-type';

export const deriveTypeForIntRange = (min, max) => {
  return BigInt(min) >= BigInt(Number.MIN_SAFE_INTEGER) &&
    BigInt(max) <= BigInt(Number.MAX_SAFE_INTEGER)
    ? 'number'
    : 'bigint';
};

const createGraphQLIntType = (name, min, max, type) => {
  if (!type) {
    type = deriveTypeForIntRange(min, max);
  }

  switch (type) {
    case 'number':
      return createGraphQLNumberIntType(name, min, max);
    case 'bigint':
    case 'string':
      return createGraphQLStringIntType(name, min, max, type);
    default:
      throw new Error(`Invalid type "${type}".`);
  }
};

export default createGraphQLIntType;
