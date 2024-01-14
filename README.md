# Typescript JSON Validator

- This is a simple json validator for typescript. It is based on the [json-schema](https://json-schema.org/) standard.
- It's framework-agnostic, so it can be used with any framework.

## Documentation

- [Installation](#installation)
- [Usage](#usage)

## Installation

- Can be installed with npm or yarn

```bash
    yarn add json-quasar
```

```bash
    npm install json-quasar
```
  
## Usage

### Create a validator instance
```typescript
import {validator} from "json-quasar";

const currentDate = new Date();
const yesterday = new Date(currentDate);
yesterday.setDate(currentDate.getDate() - 1);

const validator = validator((schema) => {
    return {
        name: schema.rule()
            .string()
            .trim()
            .pascalCase()
            .message("Invalid name provided")
            .required(),
        age: schema.rule().number().message("Invalid age provided").required(),
        isAdult: schema.rule()
            .boolean()
            .nullable()
            .message("Invalid isAdult provided")
            .required(),
        email: schema.rule()
            .string()
            .optional()
            .email()
            .message("Invalid email provided"),
        func: schema.rule()
            .function()
            .returns("string")
            .message("Invalid function provided")
            .required(),
        now: schema.rule().date().afterOrEqual(yesterday).required(),
        array: schema.rule()
            .array()
            .required()
            .members(schema.rule().array().members(schema.rule().number())),
        obj: schema.rule()
            .object()
            .required()
            .members(schema.rule().object().members(schema.rule().number())),
    }
});
```

### Validation
```typescript
const exampleBody = {
    name: "test  ",
    email: "francesco@gmail.com",
    age: 21,
    now: new Date(),
    isAdult: null,
    func: () => {
        return "test";
    },
    array: [
        [1, 2, 3],
        [4, 5, 6],
    ],
    obj: {
        a: {
            c: 2,
        },
        b: {
            d: 2,
        },
    },
};

// Throws an exception if the body is not valid
const validateBody = validator.validate(exampleBody);

// Returns a boolean if the body is valid or not
const isBodyValid = validator.isValid(exampleBody);
```