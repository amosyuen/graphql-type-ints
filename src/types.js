import createGraphQLNumberIntType from './create-number-int-type';
import { createGraphQLBigIntType, createGraphQLStringIntType } from './create-string-int-type';

export const UINT_MIN = 0;
export const NATURAL_INT_MIN = 1;
export const UINT8_MAX = 2 ** 8 - 1;
export const INT8_MAX = 2 ** 7 - 1;
export const INT8_MIN = -(2 ** 7);

export const UINT16_MAX = 2 ** 16 - 1;
export const INT16_MAX = 2 ** 15 - 1;
export const INT16_MIN = -(2 ** 15);

export const UINT32_MAX = 2 ** 32 - 1;
export const INT32_MAX = 2 ** 31 - 1;
export const INT32_MIN = -(2 ** 31);

export const UINT64_MAX = 2n ** 64n - 1n;
export const INT64_MAX = 2n ** 63n - 1n;
export const INT64_MIN = -(2n ** 63n);

export const GraphQLInt8 = createGraphQLNumberIntType('GraphQLInt8', INT8_MIN, INT8_MAX);
export const GraphQLUInt8 = createGraphQLNumberIntType('GraphQLUInt8', UINT_MIN, UINT8_MAX);
export const GraphQLNaturalInt8 = createGraphQLNumberIntType(
  'GraphQLNaturalInt8',
  NATURAL_INT_MIN,
  UINT8_MAX
);

export const GraphQLInt16 = createGraphQLNumberIntType('GraphQLInt16', INT16_MIN, INT16_MAX);
export const GraphQLUInt16 = createGraphQLNumberIntType('GraphQLUInt16', UINT_MIN, UINT16_MAX);
export const GraphQLNaturalInt16 = createGraphQLNumberIntType(
  'GraphQLNaturalInt16',
  NATURAL_INT_MIN,
  UINT16_MAX
);

export const GraphQLInt32 = createGraphQLNumberIntType('GraphQLInt32', INT32_MIN, INT32_MAX);
export const GraphQLUInt32 = createGraphQLNumberIntType('GraphQLUInt32', UINT_MIN, UINT32_MAX);
export const GraphQLNaturalInt32 = createGraphQLNumberIntType(
  'GraphQLNaturalInt32',
  NATURAL_INT_MIN,
  UINT32_MAX
);

export const GraphQLBigInt64 = createGraphQLBigIntType('GraphQLBigInt64', INT64_MIN, INT64_MAX);
export const GraphQLUBigInt64 = createGraphQLBigIntType('GraphQLUBigInt64', UINT_MIN, UINT64_MAX);
export const GraphQLNaturalBigInt64 = createGraphQLBigIntType(
  'GraphQLNaturalBigInt64',
  NATURAL_INT_MIN,
  UINT64_MAX
);

export const GraphQLStringInt64 = createGraphQLStringIntType(
  'GraphQLStringInt64',
  INT64_MIN,
  INT64_MAX
);
export const GraphQLUStringInt64 = createGraphQLStringIntType(
  'GraphQLUStringInt64',
  UINT_MIN,
  UINT64_MAX
);
export const GraphQLNaturalStringInt64 = createGraphQLStringIntType(
  'GraphQLNaturalStringInt64',
  NATURAL_INT_MIN,
  UINT64_MAX
);
