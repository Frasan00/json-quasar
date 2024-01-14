# Typescript json-validator

- This is a simple json validator for typescript. It is based on the [json-schema](https://json-schema.org/) standard.
- It is framework-agnostic so it can be used with any framework.

### Documentation

- [Installation](#installation)
- [Usage](#usage)

### Installation

- Can be installed with npm or yarn

```bash
    yarn add json-validator
```

```bash
    npm install json-validator
```
  
### Usage

- Some code snippets about how to use this library:

#### Validator instance that will be used for the validations
```typescript
import Validator from "json-validator";

const validator = new Validator();
```

#### Validator schema that will be used to validate a json body

- The Rules for the schema are defined in the setSchemaRules method via builder.
```typescript
import ValidatorSchema from "json-validator";

class TestValidatorSchema extends ValidatorSchema {
    constructor() {
        super();
    }

    public setSchemaRules() {
        this.schemaRules = {
            name: this.rule()
                .string()
                .trim()
                .pascalCase()
                .message("Invalid name provided")
                .required(),
            age: this.rule().number().message("Invalid age provided").required(),
            isAdult: this.rule()
                .boolean()
                .nullable()
                .message("Invalid isAdult provided")
                .required(),
            email: this.rule()
                .string()
                .optional()
                .email()
                .message("Invalid email provided"),
            func: this.rule()
                .function()
                .returns("string")
                .message("Invalid function provided")
                .required(),
            now: this.rule().date().afterOrEqual(yesterday).required(),
            array: this.rule()
                .array()
                .required()
                .members(this.rule().array().members(this.rule().number())),
            obj: this.rule()
                .object()
                .required()
                .members(this.rule().object().members(this.rule().number())),
        }
    }
}
```

#### Validation Example

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
      d: 3,
    },
  },
};

// Throws an exception if the body is not valid
const validateBody = validatorInstance.validate(
    exampleBody,
    new TestValidatorSchema(),
);

// Returns a boolean if the body is valid or not
const isBodyValid = validatorInstance.isValid(
    exampleBody,
    new TestValidatorSchema(),
);
```
