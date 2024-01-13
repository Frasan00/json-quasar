import Validator from "../src/Validator/Validator";
import ValidatorSchema from "../src/Validator/ValidatorSchema";

const validatorInstance = new Validator();
const today = new Date();
const yesterday = new Date(today);
yesterday.setDate(today.getDate() - 1);

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
        .isRequired(),
      age: this.rule().number().message("Invalid age provided").isRequired(),
      isAdult: this.rule()
        .boolean()
        .message("Invalid isAdult provided")
        .isRequired(),
      email: this.rule()
        .string()
        .isOptional()
        .email()
        .message("Invalid email provided"),
      func: this.rule()
        .function()
        .returns("string")
        .message("Invalid function provided")
        .isRequired(),
      now: this.rule().date().afterOrEqual(yesterday).isRequired(),
      array: this.rule()
        .array()
        .isRequired()
        .members(this.rule().array().members(this.rule().number())),
      obj: this.rule()
        .object()
        .isRequired()
        .members(this.rule().object().members(this.rule().number())),
    };
  }
}

const exampleBody = {
  name: "test  ",
  email: "francesco@gmail.com",
  age: 21,
  now: new Date(),
  isAdult: true,
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

const validateBody = validatorInstance.validate(
  exampleBody,
  new TestValidatorSchema(),
);

console.log(validateBody);
