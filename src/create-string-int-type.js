import { GraphQLScalarType, Kind } from 'graphql';

const createGraphQLStringIntTypeInternal = (name, min, max, type) => {
  if (
    (typeof max === 'number' && !Number.isSafeInteger(max)) ||
    (typeof min === 'number' && !Number.isSafeInteger(min))
  ) {
    throw new Error(
      `Min bound "${min}" or max bound "${max}" are outside safe bounds for "number" type. Use "bigint" or "string" type when specifying the bounds to avoid precision loss.`
    );
  }
  try {
    max = BigInt(max);
    min = BigInt(min);
  } catch (err) {
    throw new Error(`Invalid min bound "${min}" or max bound "${max}".`);
  }
  if (min > max) {
    throw new Error(`Min bound "${min}" is greater than max bound "${max}".`);
  }

  const parseValueToBigInt = value => {
    let valueBigInt;
    try {
      valueBigInt = BigInt(value);
    } catch (err) {
      throw new TypeError(`${name} cannot represent non-integer value "${valueBigInt}".`);
    }

    if (valueBigInt < min || valueBigInt > max) {
      throw new TypeError(
        `${name} cannot represent integer value "${valueBigInt}" outside of min bound ${min} and max bound ${max}".`
      );
    }

    return valueBigInt;
  };

  const parseValueToString = value => parseValueToBigInt(value).toString();

  let parseValueToType;
  switch (type) {
    case 'bigint':
      parseValueToType = parseValueToBigInt;
      break;
    case 'string':
      parseValueToType = parseValueToString;
      break;
    default:
      throw new Error(`Invalid type "${type}".`);
  }

  return new GraphQLScalarType({
    name,
    description: `The "${name}" scalar type represents non-fractional whole numeric values between ${min} and ${max}.`,
    serialize: parseValueToString,
    parseValue: parseValueToType,
    parseLiteral: ast => {
      if (ast.kind === Kind.STRING) {
        return parseValueToType(ast.value);
      }
      return undefined;
    },
  });
};

export const createGraphQLBigIntType = (name, min, max) =>
  createGraphQLStringIntTypeInternal(name, min, max, 'bigint');

export const createGraphQLStringIntType = (name, min, max) =>
  createGraphQLStringIntTypeInternal(name, min, max, 'string');
