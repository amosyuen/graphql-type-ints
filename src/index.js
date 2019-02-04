import createGraphQLIntType from './create-int-type';

export { createGraphQLIntType };

export const UINT_MIN = 0;

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

export const GraphQLTypeInt8 = createGraphQLIntType('GraphQLTypeInt8', INT8_MIN, INT8_MAX);

export const GraphQLTypeUInt8 = createGraphQLIntType('GraphQLTypeUInt8', UINT_MIN, UINT8_MAX);

export const GraphQLTypeInt16 = createGraphQLIntType('GraphQLTypeInt16', INT16_MIN, INT16_MAX);

export const GraphQLTypeUInt16 = createGraphQLIntType('GraphQLTypeUInt16', UINT_MIN, UINT16_MAX);

export const GraphQLTypeInt32 = createGraphQLIntType('GraphQLTypeInt32', INT32_MIN, INT32_MAX);

export const GraphQLTypeUInt32 = createGraphQLIntType('GraphQLTypeUInt32', UINT_MIN, UINT32_MAX);

export const GraphQLTypeInt64 = createGraphQLIntType('GraphQLTypeInt64', INT64_MIN, INT64_MAX);

export const GraphQLTypeUInt64 = createGraphQLIntType('GraphQLTypeUInt64', UINT_MIN, UINT64_MAX);
