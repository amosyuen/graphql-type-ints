import { GraphQLScalarType, Kind } from 'graphql';

const createGraphQLNumberIntType = (name, min, max) => {
  max = Number(max);
  min = Number(min);
  if (Number.isNaN(min) || Number.isNaN(max)) {
    throw new TypeError(`Invalid min bound "${min}" or max bound "${max}".`);
  }
  if (min > max) {
    throw new Error(`Min bound "${min}" is greater than max bound "${max}".`);
  }
  if (min < Number.MIN_SAFE_INTEGER || max > Number.MAX_SAFE_INTEGER) {
    throw new Error(
      `Min bound "${min}" or max bound "${max}" are outside safe bounds for "number" type. Use "bigint" or "string" type to avoid precision loss.`
    );
  }

  const parseValueToInt = value => {
    let valueInt;
    try {
      valueInt = Number(value);
    } catch (err) {
      throw new TypeError(`${name} cannot represent non-integer value "${value}".`);
    }

    if (!Number.isInteger(valueInt)) {
      throw new TypeError(`${name} cannot represent non-integer value "${valueInt}".`);
    }

    if (valueInt < min || valueInt > max) {
      throw new TypeError(
        `${name} cannot represent integer value "${valueInt}" outside of min bound ${min} and max bound ${max}".`
      );
    }

    return valueInt;
  };

  return new GraphQLScalarType({
    name,
    description: `The "${name}" scalar type represents non-fractional whole numeric values between ${min} and ${max}.`,
    serialize: parseValueToInt,
    parseValue: parseValueToInt,
    parseLiteral: ast => {
      if (ast.kind === Kind.INT) {
        return parseValueToInt(ast.value);
      }
      return undefined;
    },
  });
};

export default createGraphQLNumberIntType;
