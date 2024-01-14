type RuleType = {
    type?: RuleDataTypes;
    inputOptions?: OptionType;
    message?: string;
    required?: boolean;
    optional?: boolean;
    nullable?: boolean;
    min?: number;
    max?: number;
    range?: [number, number];
    integer?: boolean;
    float?: boolean;
    positive?: boolean;
    negative?: boolean;
    before?: Date;
    after?: Date;
    beforeOrEqual?: Date;
    afterOrEqual?: Date;
    email?: boolean;
    url?: boolean;
    uuid?: boolean;
    ip?: boolean;
    regex?: RegExp;
    members?: RuleType;
    returns?: RuleDataTypes;
};
type OptionType = {
    trim?: boolean;
    lowercase?: boolean;
    uppercase?: boolean;
    pascalCase?: boolean;
    camelCase?: boolean;
    snakeCase?: boolean;
};
type RuleDataTypes = "string" | "number" | "boolean" | "object" | "function" | "Date" | "Array" | "alphaNumeric";

declare class Rule {
    protected rule: RuleType;
    constructor(rule?: RuleType);
    setRule(rule: RuleType): void;
    getRule(): RuleType;
}

declare abstract class AbstractDataRuleBuilder {
    protected rule: Rule;
    protected constructor(rule: Rule);
    message(message: string): this;
    required(): this;
    /**
     * @description Optional by default, this can be used for better readability
     */
    optional(): this;
    /**
     * @description Sets if a value can be null
     */
    nullable(): this;
    getRule(): Rule;
}

type acceptedValues = string | number | boolean | object | Function | Date | Array<any> | null;
type InputBody = {
    [key: acceptedKeys]: acceptedValues;
};
type BuilderTypes = AbstractDataRuleBuilder;
type ValidatorSchemaRules = {
    [key: acceptedKeys]: BuilderTypes;
};

declare class StringBuilder extends AbstractDataRuleBuilder {
    constructor(rule: Rule);
    min(min: number): StringBuilder;
    max(max: number): StringBuilder;
    trim(): this;
    lowercase(): this;
    uppercase(): this;
    pascalCase(): this;
    camelCase(): this;
    snakeCase(): this;
    email(): this;
    url(): this;
    uuid(): this;
    ip(): this;
    regex(regex: RegExp): this;
}

declare class NumberBuilder extends AbstractDataRuleBuilder {
    constructor(rule: Rule);
    range(range: [number, number]): NumberBuilder;
    integer(): NumberBuilder;
    float(): NumberBuilder;
    positive(): NumberBuilder;
    negative(): NumberBuilder;
}

declare class BooleanBuilder extends AbstractDataRuleBuilder {
    constructor(rule: Rule);
}

declare class ObjectBuilder extends AbstractDataRuleBuilder {
    constructor(rule: Rule);
    members(members: AbstractDataRuleBuilder): AbstractDataRuleBuilder;
}

declare class FunctionBuilder extends AbstractDataRuleBuilder {
    constructor(rule: Rule);
    returns(returns: RuleDataTypes): FunctionBuilder;
}

declare class DateBuilder extends AbstractDataRuleBuilder {
    constructor(rule: Rule);
    before(date: Date): DateBuilder;
    after(date: Date): DateBuilder;
    beforeOrEqual(date: Date): DateBuilder;
    afterOrEqual(date: Date): DateBuilder;
}

declare class ArrayBuilder extends AbstractDataRuleBuilder {
    constructor(rule: Rule);
    members(members: AbstractDataRuleBuilder): AbstractDataRuleBuilder;
}

declare class RuleBuilder {
    protected rule: Rule;
    constructor();
    required(): RuleBuilder;
    string(): StringBuilder;
    number(): NumberBuilder;
    boolean(): BooleanBuilder;
    object(): ObjectBuilder;
    function(): FunctionBuilder;
    date(): DateBuilder;
    array(): ArrayBuilder;
}

declare class ValidatorSchema {
    schemaRules: ValidatorSchemaRules;
    constructor();
    rule(): RuleBuilder;
}

declare class Validator {
    protected validatorSchema: ValidatorSchema;
    constructor(validatorSchema: ValidatorSchema);
    /**
     * @description - Validates the body of the request, throws an error if the body is invalid
     * @param {InputBody} body - The body of the request
     * @returns {Object} - Returns the validated object
     */
    validate<T extends ValidatorSchema>(body: InputBody): InputBody;
    /**
     * @description - Checks if the body of the request is valid
     * @param {InputBody} body - The body of the request
     * @returns {boolean} - Returns true if the body is valid, false otherwise
     */
    isValid<T>(body: InputBody): boolean;
}

declare const validator: (cb: (schema: ValidatorSchema) => ValidatorSchemaRules) => Validator;

export { validator };
