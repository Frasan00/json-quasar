export type RuleType = {
  type?: RuleDataTypes;
  inputOptions?: OptionType;

  message?: string;

  required?: boolean;
  optional?: boolean;

  min?: number;
  max?: number;

  // number
  range?: [number, number];
  integer?: boolean;
  float?: boolean;
  positive?: boolean;
  negative?: boolean;

  // date
  before?: Date;
  after?: Date;
  beforeOrEqual?: Date;
  afterOrEqual?: Date;

  // string
  email?: boolean;
  url?: boolean;
  uuid?: boolean;
  ip?: boolean;
  regex?: RegExp;

  // array and object
  members?: RuleType;

  // function
  returns?: RuleDataTypes;
};

export type OptionType = {
  trim?: boolean;
  lowercase?: boolean;
  uppercase?: boolean;
  pascalCase?: boolean;
  camelCase?: boolean;
  snakeCase?: boolean;
};

export type RuleDataTypes =
  | "string"
  | "number"
  | "boolean"
  | "object"
  | "function"
  | "Date"
  | "Array"
  | "alphaNumeric";

export const ValidationErrors = {
  requiredAndOptional: "Rule cannot be required and optional at the same time",
  integerAndFloat: "Rule cannot be integer and float at the same time",
  positiveAndNegative: "Rule cannot be positive and negative at the same time",
  invalidRange: "Invalid range",

  type: (prop: any, type: string) =>
    `Invalid type provided for ${prop}, expected ${type}`,

  required: (prop: any) => `${prop} is required`,

  min: (prop: any, min: number) => `Minimum for property ${prop} is ${min}`,
  max: (prop: any, max: number) => `Maximum for property ${prop} is ${max}`,

  range: (prop: number, min: number, max: number) =>
    `Range for property ${prop} is ${min} - ${max}`,
  integer: (prop: number) => `Property ${prop} must be an integer`,
  float: (prop: number) => `Property ${prop} must be a float`,
  positive: (prop: number) => `Property ${prop} must be positive`,
  negative: (prop: number) => `Property ${prop} must be negative`,

  email: (prop: string) => `Invalid email provided for ${prop}`,
  url: (prop: string) => `Invalid url provided for ${prop}`,
  uuid: (prop: string) => `Invalid uuid provided for ${prop}`,
  ip: (prop: string) => `Invalid ip provided for ${prop}`,
  regex: (prop: string) => `Invalid regex provided for ${prop}`,

  before: (prop: Date, date: Date) => `Date ${prop} must be before ${date}`,
  after: (prop: Date, date: Date) => `Date ${prop} must be after ${date}`,
  beforeOrEqual: (prop: Date, date: Date) =>
    `Date ${prop} must be before or equal to ${date}`,
  afterOrEqual: (prop: Date, date: Date) =>
    `Date ${prop} must be after or equal to ${date}`,

  returns: (prop: string, type: string) =>
    `Function ${prop} must return ${type}`,

  arrayMembers: (prop: string, type: string) =>
    `Array ${prop} must contain members of type ${type}`,
};
