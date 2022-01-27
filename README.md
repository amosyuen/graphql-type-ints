# graphql-type-ints

GraphQL types for integers of arbitrary precision and bounds.

Javascript `number` type only has 53 bits of integer precision. This means it can't support 64 bit or higher integers without losing precision. To solve this, the library uses the new node `bigint` type.

Also often APIs want to restrict the range of values for an integer, this library also allows specifying a valid min and max range that will be validated.

Note: Depends on [BigInt Spec](https://github.com/tc39/proposal-bigint) support in the environment. `BigInt` is implemented in `node >= 10.4.0`.

## Common Types

Provides these common types:

| GraphQL Type              | GraphQL Kind | JS Type  | Min     | Max    |
| ------------------------- | ------------ | -------- | ------- | ------ |
| GraphQLInt8               | `INT`        | `number` | -(2^7)  | 2^7-1  |
| GraphQLUInt8              | `INT`        | `number` | 0       | 2^8-1  |
| GraphQLNaturalInt8        | `INT`        | `number` | 1       | 2^8-1  |
| GraphQLInt16              | `INT`        | `number` | -(2^15) | 2^15-1 |
| GraphQLUInt16             | `INT`        | `number` | 0       | 2^16-1 |
| GraphQLNaturalInt16       | `INT`        | `number` | 1       | 2^16-1 |
| GraphQLInt32              | `INT`        | `number` | -(2^31) | 2^31-1 |
| GraphQLUInt32             | `INT`        | `number` | 0       | 2^32-1 |
| GraphQLNaturalInt32       | `INT`        | `number` | 1       | 2^32-1 |
| GraphQLBigInt64           | `STRING`     | `bigint` | -(2^63) | 2^63-1 |
| GraphQLUBigInt64          | `STRING`     | `bigint` | 0       | 2^64-1 |
| GraphQLNaturalBigInt64    | `STRING`     | `bigint` | 1       | 2^64-1 |
| GraphQLStringInt64        | `STRING`     | `string` | -(2^63) | 2^63-1 |
| GraphQLStringUInt64       | `STRING`     | `string` | 0       | 2^64-1 |
| GraphQLNaturalStringInt64 | `STRING`     | `string` | 1       | 2^64-1 |

### Example

```js
import { makeExecutableSchema } from 'graphql-tools';
import { GraphQLInt8 } from 'graphql-type-ints';

const typeDefs = `
scalar GraphQLInt8

type Query {
  value(v: GraphQLInt8): UInt
}`;

const resolvers = {
  GraphQLInt8,
  Query: {
    value: (root, { v }) => v,
  },
};
let schema = makeExecutableSchema({ typeDefs, resolvers });

export default schema;
```

## Custom Types

You can also create a custom GraphQL integer type using one of these functions:

| Function                     | GraphQL Kind | JS Type  |
| ---------------------------- | ------------ | -------- |
| `createGraphQLNumberIntType` | `INT`        | `number` |
| `createGraphQLBigIntType`    | `STRING`     | `bigint` |
| `createGraphQLStringIntType` | `STRING`     | `string` |

Each function takes the same parameters `function(name, min ,max)`:

| Parameters | Description                             |
| ---------- | --------------------------------------- |
| name       | GraphQLScalarType name (must be unique) |
| min        | Min value of the integer inclusive      |
| max        | Max value of the integer inclusive      |

The function will validate that the `min` and `max` parameters are in the safe integer range to ensure that you don't lose precision from javascript `number` type.

### Example

```js
import { UINT32_MAX, createGraphQLBigIntType } from 'graphql-type-ints';

const NaturalBigInt = createGraphQLBigIntType('NaturalBigInt', 1, UINT32_MAX);
```
