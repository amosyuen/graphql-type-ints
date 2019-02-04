# graphql-type-ints

GraphQL types for integers of arbitrary precision and bounds.

Note: Depends on [BigInt Spec](https://github.com/tc39/proposal-bigint) support in the environment. `BigInt` is implemented in `node >= 10.4.0`.

## Common Types

Provides these common types:

- GraphQLInt8
- GraphQLUInt8
- GraphQLInt16
- GraphQLUInt16
- GraphQLInt32
- GraphQLUInt32
- GraphQLInt64
- GraphQLUInt64

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

You can also create a custom type using `createGraphQLIntType(name, min, max, type)` function.

| Parameters | Description                                                                                                                                                                      |
| ---------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| name       | GraphQLScalarType name (must be unique)                                                                                                                                          |
| min        | Min value of the integer inclusive                                                                                                                                               |
| max        | Max value of the integer inclusive                                                                                                                                               |
| type       | Optional. Type that GraphQL value is parsed into. Must be one of `"bigint"`, `"number"`, or `"string"`. If it is not specified, then the type will be chosen based on the range. |

- `"number"` type will always output to a `number` value
- `"bigint"` and `"string"` type will always output to a `string` value

### Example

```js
import { UINT32_MAX, createGraphQLIntType } from 'graphql-type-ints';

// Values will be resolved into bigint
const NaturalBigInt = createGraphQLIntType('NaturalBigInt', 1, UINT32_MAX, 'bigint');

// Values will be resolved into string
const NaturalStringInt = createGraphQLIntType('NaturalStringInt', 1, UINT32_MAX, 'string');

// Values will be resolved into either a number or a bigint depending on the range.
const NaturalInt = createGraphQLIntType('NaturalInt', 1, UINT32_MAX);
```
