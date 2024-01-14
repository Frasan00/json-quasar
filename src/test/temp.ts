import {Validator} from "json-quasar";

const validatorInstance = new Validator();

import {ValidatorSchema} from "json-quasar";

const currentDate = new Date();
const yesterday = new Date(currentDate);
yesterday.setDate(currentDate.getDate() - 1);

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

console.log(validateBody);
console.log(isBodyValid)