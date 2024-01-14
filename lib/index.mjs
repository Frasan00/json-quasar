var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => {
  __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};

// src/Rule/RuleTypes.ts
var ValidationErrors = {
  requiredAndOptional: "Rule cannot be required and optional at the same time",
  integerAndFloat: "Rule cannot be integer and float at the same time",
  positiveAndNegative: "Rule cannot be positive and negative at the same time",
  invalidRange: "Invalid range",
  type: (prop, type) => `Invalid type provided for ${prop}, expected ${type}`,
  required: (prop) => `${prop} is required`,
  min: (prop, min) => `Minimum for property ${prop} is ${min}`,
  max: (prop, max) => `Maximum for property ${prop} is ${max}`,
  range: (prop, min, max) => `Range for property ${prop} is ${min} - ${max}`,
  integer: (prop) => `Property ${prop} must be an integer`,
  float: (prop) => `Property ${prop} must be a float`,
  positive: (prop) => `Property ${prop} must be positive`,
  negative: (prop) => `Property ${prop} must be negative`,
  email: (prop) => `Invalid email provided for ${prop}`,
  url: (prop) => `Invalid url provided for ${prop}`,
  uuid: (prop) => `Invalid uuid provided for ${prop}`,
  ip: (prop) => `Invalid ip provided for ${prop}`,
  regex: (prop) => `Invalid regex provided for ${prop}`,
  before: (prop, date) => `Date ${prop} must be before ${date}`,
  after: (prop, date) => `Date ${prop} must be after ${date}`,
  beforeOrEqual: (prop, date) => `Date ${prop} must be before or equal to ${date}`,
  afterOrEqual: (prop, date) => `Date ${prop} must be after or equal to ${date}`,
  returns: (prop, type) => `Function ${prop} must return ${type}`,
  arrayMembers: (prop, type) => `Array ${prop} must contain members of type ${type}`
};

// src/Rule/RuleBuilder/RuleBuilderDataType/AbstractDataRuleBuilder.ts
var AbstractDataRuleBuilder = class {
  constructor(rule) {
    __publicField(this, "rule");
    this.rule = rule;
  }
  message(message) {
    this.rule.setRule({ message });
    return this;
  }
  required() {
    if (this.rule.getRule().optional) {
      throw new Error(ValidationErrors.requiredAndOptional);
    }
    this.rule.setRule({ required: true });
    return this;
  }
  /**
   * @description Optional by default, this can be used for better readability
   */
  optional() {
    if (this.rule.getRule().optional) {
      throw new Error(ValidationErrors.requiredAndOptional);
    }
    this.rule.setRule({ optional: true });
    return this;
  }
  /**
   * @description Sets if a value can be null
   */
  nullable() {
    this.rule.setRule({ nullable: true });
    return this;
  }
  getRule() {
    return this.rule;
  }
};

// src/Rule/RuleBuilder/RuleBuilderDataType/StringBuilder.ts
var StringBuilder = class extends AbstractDataRuleBuilder {
  constructor(rule) {
    super(rule);
  }
  min(min) {
    this.rule.setRule({ min });
    return this;
  }
  max(max) {
    this.rule.setRule({ max });
    return this;
  }
  trim() {
    const inputOptions = this.rule.getRule().inputOptions;
    this.rule.setRule({ inputOptions: { ...inputOptions, trim: true } });
    return this;
  }
  lowercase() {
    const inputOptions = this.rule.getRule().inputOptions;
    this.rule.setRule({ inputOptions: { ...inputOptions, lowercase: true } });
    return this;
  }
  uppercase() {
    const inputOptions = this.rule.getRule().inputOptions;
    this.rule.setRule({ inputOptions: { ...inputOptions, uppercase: true } });
    return this;
  }
  pascalCase() {
    const inputOptions = this.rule.getRule().inputOptions;
    this.rule.setRule({ inputOptions: { ...inputOptions, pascalCase: true } });
    return this;
  }
  camelCase() {
    const inputOptions = this.rule.getRule().inputOptions;
    this.rule.setRule({
      inputOptions: {
        ...inputOptions,
        camelCase: true
      }
    });
    return this;
  }
  snakeCase() {
    const inputOptions = this.rule.getRule().inputOptions;
    this.rule.setRule({
      inputOptions: {
        ...inputOptions,
        snakeCase: true
      }
    });
    return this;
  }
  email() {
    this.rule.setRule({ email: true });
    return this;
  }
  url() {
    this.rule.setRule({ url: true });
    return this;
  }
  uuid() {
    this.rule.setRule({ uuid: true });
    return this;
  }
  ip() {
    this.rule.setRule({ ip: true });
    return this;
  }
  regex(regex) {
    this.rule.setRule({ regex });
    return this;
  }
};

// src/Rule/RuleBuilder/RuleBuilderDataType/NumberBuilder.ts
var NumberBuilder = class extends AbstractDataRuleBuilder {
  constructor(rule) {
    super(rule);
  }
  range(range) {
    this.rule.setRule({ range });
    return this;
  }
  integer() {
    if (this.rule.getRule().float) {
      throw new Error(ValidationErrors.integerAndFloat);
    }
    this.rule.setRule({ integer: true });
    return this;
  }
  float() {
    if (this.rule.getRule().integer) {
      throw new Error(ValidationErrors.integerAndFloat);
    }
    this.rule.setRule({ float: true });
    return this;
  }
  positive() {
    if (this.rule.getRule().negative) {
      throw new Error(ValidationErrors.positiveAndNegative);
    }
    this.rule.setRule({ positive: true });
    return this;
  }
  negative() {
    if (this.rule.getRule().positive) {
      throw new Error(ValidationErrors.positiveAndNegative);
    }
    this.rule.setRule({ negative: true });
    return this;
  }
};

// src/Rule/RuleBuilder/RuleBuilderDataType/BooleanBuilder.ts
var BooleanBuilder = class extends AbstractDataRuleBuilder {
  constructor(rule) {
    super(rule);
  }
};

// src/Rule/RuleBuilder/RuleBuilderDataType/ObjectBuilder.ts
var ObjectBuilder = class extends AbstractDataRuleBuilder {
  constructor(rule) {
    super(rule);
  }
  members(members) {
    this.rule.setRule({ members: members.getRule().getRule() });
    return this;
  }
};

// src/Rule/RuleBuilder/RuleBuilderDataType/FunctionBuilder.ts
var FunctionBuilder = class extends AbstractDataRuleBuilder {
  constructor(rule) {
    super(rule);
  }
  returns(returns) {
    this.rule.setRule({
      returns
    });
    return this;
  }
};

// src/Rule/RuleBuilder/RuleBuilderDataType/DateBuilder.ts
var DateBuilder = class extends AbstractDataRuleBuilder {
  constructor(rule) {
    super(rule);
  }
  before(date) {
    this.rule.setRule({
      before: date
    });
    return this;
  }
  after(date) {
    this.rule.setRule({
      after: date
    });
    return this;
  }
  beforeOrEqual(date) {
    this.rule.setRule({
      beforeOrEqual: date
    });
    return this;
  }
  afterOrEqual(date) {
    this.rule.setRule({
      afterOrEqual: date
    });
    return this;
  }
};

// src/Rule/RuleError.ts
var RuleError = class _RuleError extends Error {
  constructor(reason, customMessage) {
    super(customMessage ? customMessage : "");
    __publicField(this, "customMessage");
    __publicField(this, "reason");
    Object.setPrototypeOf(this, _RuleError.prototype);
    this.customMessage = customMessage;
    this.reason = reason;
  }
};

// src/Rule/RuleBuilder/RuleBuilderUtils.ts
var RuleBuilderUtils = class {
  parseStringRuleOptions(value, options) {
    if (options.trim) {
      value = value.trim();
    }
    if (options.lowercase) {
      value = value.toLowerCase();
    }
    if (options.uppercase) {
      value = value.toUpperCase();
    }
    if (options.pascalCase) {
      value = new RegExp(/^[A-Z][a-z]+$/).test(value) ? value : value[0].toUpperCase() + value.slice(1).toLowerCase();
    }
    if (options.camelCase) {
      value = new RegExp(/^[a-z]+$/).test(value) ? value : value[0].toLowerCase() + value.slice(1).toUpperCase();
    }
    if (options.snakeCase) {
      value = value.replace(/\s+/g, "_");
    }
    return value;
  }
  checkIfRequired(rule, inputBody, propertyValue) {
    if (rule.required && Object.hasOwnProperty.call(inputBody, propertyValue) === false) {
      throw new RuleError(
        ValidationErrors.required(propertyValue),
        rule.message
      );
    }
  }
  checkType(propertyKey, propertyValue, type, message) {
    switch (type) {
      case "string":
        if (typeof propertyValue !== "string") {
          throw new RuleError(
            ValidationErrors.type(propertyKey, "string"),
            message
          );
        }
        break;
      case "number":
        if (typeof propertyValue !== "number") {
          throw new RuleError(
            ValidationErrors.type(propertyKey, "number"),
            message
          );
        }
        break;
      case "boolean":
        if (typeof propertyValue !== "boolean") {
          throw new RuleError(
            ValidationErrors.type(propertyKey, "boolean"),
            message
          );
        }
        break;
      case "object":
        if (typeof propertyValue !== "object") {
          throw new RuleError(
            ValidationErrors.type(propertyKey, "object"),
            message
          );
        }
        break;
      case "Function":
        if (typeof propertyValue !== "function") {
          throw new RuleError(
            ValidationErrors.type(propertyKey, "Function"),
            message
          );
        }
        break;
      case "Date":
        if (typeof propertyValue !== "object" || !(propertyValue instanceof Date)) {
          throw new RuleError(
            ValidationErrors.type(propertyKey, "Date"),
            message
          );
        }
        break;
      case "Array":
        if (typeof propertyValue !== "object" || Array.isArray(propertyValue) === false) {
          throw new RuleError(
            ValidationErrors.type(propertyKey, "Array"),
            message
          );
        }
        break;
      default:
        throw new RuleError(
          ValidationErrors.type(propertyKey, "unknown"),
          message
        );
    }
  }
};
var RuleBuilderUtils_default = new RuleBuilderUtils();

// src/Rule/RuleBuilder/RuleBuilderParser.ts
var RuleBuilderParser = class {
  parseString(propertyKey, rule, inputBody) {
    RuleBuilderUtils_default.checkIfRequired(rule, inputBody, propertyKey);
    if (Object.hasOwnProperty.call(inputBody, propertyKey) === false) {
      return;
    }
    if (rule.nullable && inputBody[propertyKey] === null) {
      return;
    }
    RuleBuilderUtils_default.checkType(
      propertyKey,
      inputBody[propertyKey],
      "string",
      rule.message
    );
    let value = inputBody[propertyKey];
    if (rule.inputOptions) {
      value = RuleBuilderUtils_default.parseStringRuleOptions(value, rule.inputOptions);
    }
    if (rule.min && value.length < rule.min) {
      throw new RuleError(ValidationErrors.min(value, rule.min), rule.message);
    }
    if (rule.max && value.length > rule.max) {
      throw new RuleError(ValidationErrors.max(value, rule.max), rule.message);
    }
    if (rule.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
      throw new RuleError(ValidationErrors.email(value), rule.message);
    }
    if (rule.url && !/^(?:https?:\/\/)?(?:www\.)?[^\s\.]+\.[^\s]{2,}$/.test(value)) {
      throw new RuleError(ValidationErrors.url(value), rule.message);
    }
    if (rule.uuid && !/^[a-f\d]{8}(-[a-f\d]{4}){4}[a-f\d]{8}$/i.test(value)) {
      throw new RuleError(ValidationErrors.uuid(value), rule.message);
    }
    if (rule.ip && !/^(?:[0-9]{1,3}\.){3}[0-9]{1,3}$/.test(value)) {
      throw new RuleError(ValidationErrors.ip(value), rule.message);
    }
    if (rule.regex && !rule.regex.test(value)) {
      throw new RuleError(ValidationErrors.regex(value), rule.message);
    }
    return value;
  }
  parseNumber(propertyKey, rule, inputBody) {
    RuleBuilderUtils_default.checkIfRequired(rule, inputBody, propertyKey);
    if (Object.hasOwnProperty.call(inputBody, propertyKey) === false) {
      return;
    }
    if (rule.nullable && inputBody[propertyKey] === null) {
      return;
    }
    RuleBuilderUtils_default.checkType(
      propertyKey,
      inputBody[propertyKey],
      "number",
      rule.message
    );
    const value = inputBody[propertyKey];
    if (rule.min && value < rule.min) {
      throw new RuleError(ValidationErrors.min(value, rule.min), rule.message);
    }
    if (rule.max && value > rule.max) {
      throw new RuleError(ValidationErrors.max(value, rule.max), rule.message);
    }
    if (rule.range && (value < rule.range[0] || value > rule.range[1])) {
      throw new RuleError(
        ValidationErrors.range(value, rule.range[0], rule.range[1]),
        rule.message
      );
    }
    if (rule.integer && !Number.isInteger(value)) {
      throw new RuleError(ValidationErrors.integer(value), rule.message);
    }
    if (rule.float && Number.isInteger(value)) {
      throw new RuleError(ValidationErrors.float(value), rule.message);
    }
    if (rule.positive && value < 0) {
      throw new RuleError(ValidationErrors.positive(value), rule.message);
    }
    if (rule.negative && value > 0) {
      throw new RuleError(ValidationErrors.negative(value), rule.message);
    }
  }
  parseBoolean(propertyKey, rule, inputBody) {
    RuleBuilderUtils_default.checkIfRequired(rule, inputBody, propertyKey);
    if (Object.hasOwnProperty.call(inputBody, propertyKey) === false) {
      return;
    }
    if (rule.nullable && inputBody[propertyKey] === null) {
      return;
    }
    RuleBuilderUtils_default.checkType(
      propertyKey,
      inputBody[propertyKey],
      "boolean",
      rule.message
    );
  }
  parseDate(propertyKey, rule, inputBody) {
    RuleBuilderUtils_default.checkIfRequired(rule, inputBody, propertyKey);
    if (Object.hasOwnProperty.call(inputBody, propertyKey) === false) {
      return;
    }
    if (rule.nullable && inputBody[propertyKey] === null) {
      return;
    }
    RuleBuilderUtils_default.checkType(
      propertyKey,
      inputBody[propertyKey],
      "Date",
      rule.message
    );
    const value = inputBody[propertyKey];
    if (rule.before && value.getTime() >= rule.before.getTime()) {
      throw new RuleError(
        ValidationErrors.before(value, rule.before),
        rule.message
      );
    }
    if (rule.after && value.getTime() <= rule.after.getTime()) {
      throw new RuleError(
        ValidationErrors.after(value, rule.after),
        rule.message
      );
    }
    if (rule.beforeOrEqual && value.getTime() > rule.beforeOrEqual.getTime()) {
      throw new RuleError(
        ValidationErrors.beforeOrEqual(value, rule.beforeOrEqual),
        rule.message
      );
    }
    if (rule.afterOrEqual && value.getTime() < rule.afterOrEqual.getTime()) {
      throw new RuleError(
        ValidationErrors.afterOrEqual(value, rule.afterOrEqual),
        rule.message
      );
    }
  }
  parseFunction(propertyKey, rule, inputBody) {
    RuleBuilderUtils_default.checkIfRequired(rule, inputBody, propertyKey);
    if (Object.hasOwnProperty.call(inputBody, propertyKey) === false) {
      return;
    }
    RuleBuilderUtils_default.checkType(
      propertyKey,
      inputBody[propertyKey],
      "Function",
      rule.message
    );
    const value = inputBody[propertyKey];
    if (rule.returns) {
      if (typeof value() !== rule.returns) {
        throw new RuleError(
          ValidationErrors.type(propertyKey, rule.returns),
          rule.message
        );
      }
    }
  }
  parseObject(propertyKey, rule, inputBody) {
    RuleBuilderUtils_default.checkIfRequired(rule, inputBody, propertyKey);
    if (!Object.hasOwnProperty.call(inputBody, propertyKey)) {
      return;
    }
    if (rule.nullable && inputBody[propertyKey] === null) {
      return;
    }
    RuleBuilderUtils_default.checkType(
      propertyKey,
      inputBody[propertyKey],
      "object",
      rule.message
    );
    const members = rule.members;
    if (!members) {
      return;
    }
    const value = inputBody[propertyKey];
    Object.entries(value).forEach(([key, item]) => {
      if (members.type === "string") {
        this.parseString(key, members, { [key]: item });
      } else if (members.type === "number") {
        this.parseNumber(key, members, { [key]: item });
      } else if (members.type === "boolean") {
        this.parseBoolean(key, members, { [key]: item });
      } else if (members.type === "object") {
        this.parseObject(key, members, { [key]: item });
      } else if (members.type === "function") {
        this.parseFunction(key, members, { [key]: item });
      } else if (members.type === "Date") {
        this.parseDate(key, members, { [key]: item });
      } else if (members.type === "Array") {
        this.parseArray(key, members, { [key]: item });
      } else {
        throw new RuleError(ValidationErrors.type(key, "unknown"));
      }
    });
  }
  parseArray(propertyKey, rule, inputBody) {
    RuleBuilderUtils_default.checkIfRequired(rule, inputBody, propertyKey);
    if (!Object.hasOwnProperty.call(inputBody, propertyKey)) {
      return;
    }
    if (rule.nullable && inputBody[propertyKey] === null) {
      return;
    }
    RuleBuilderUtils_default.checkType(propertyKey, inputBody[propertyKey], "Array");
    const members = rule.members;
    if (!members) {
      return;
    }
    if (members.type === "string") {
      const value = inputBody[propertyKey];
      value.forEach((item) => {
        this.parseString(propertyKey, members, { [propertyKey]: item });
      });
    } else if (members.type === "number") {
      const value = inputBody[propertyKey];
      value.forEach((item) => {
        this.parseNumber(propertyKey, members, { [propertyKey]: item });
      });
    } else if (members.type === "boolean") {
      const value = inputBody[propertyKey];
      value.forEach((item) => {
        this.parseBoolean(propertyKey, members, { [propertyKey]: item });
      });
    } else if (members.type === "object") {
      const value = inputBody[propertyKey];
      value.forEach((item) => {
        this.parseObject(propertyKey, members, { [propertyKey]: item });
      });
    } else if (members.type === "function") {
      const value = inputBody[propertyKey];
      value.forEach((item) => {
        this.parseFunction(propertyKey, members, { [propertyKey]: item });
      });
    } else if (members.type === "Date") {
      const value = inputBody[propertyKey];
      value.forEach((item) => {
        this.parseDate(propertyKey, members, { [propertyKey]: item });
      });
    } else if (members.type === "Array") {
      const value = inputBody[propertyKey];
      value.forEach((item) => {
        this.parseArray(propertyKey, members, { [propertyKey]: item });
      });
    } else {
      throw new RuleError(ValidationErrors.type(propertyKey, "unknown"));
    }
  }
};
var RuleBuilderParser_default = new RuleBuilderParser();

// src/Validator/Validator.ts
var Validator = class {
  constructor(validatorSchema) {
    __publicField(this, "validatorSchema");
    this.validatorSchema = validatorSchema;
  }
  /**
   * @description - Validates the body of the request, throws an error if the body is invalid
   * @param {InputBody} body - The body of the request
   * @returns {Object} - Returns the validated object
   */
  validate(body) {
    const validatedBody = {};
    const schema = this.validatorSchema.schemaRules;
    Object.entries(schema).forEach(([key, value]) => {
      if (value instanceof StringBuilder) {
        const rule = value.getRule();
        validatedBody[key] = RuleBuilderParser_default.parseString(key, rule.getRule(), body) || null;
      } else if (value instanceof NumberBuilder) {
        const rule = value.getRule();
        RuleBuilderParser_default.parseNumber(key, rule.getRule(), body);
        validatedBody[key] = body[key];
      } else if (value instanceof BooleanBuilder) {
        const rule = value.getRule();
        RuleBuilderParser_default.parseBoolean(key, rule.getRule(), body);
        validatedBody[key] = body[key];
      } else if (value instanceof ObjectBuilder) {
        const rule = value.getRule();
        RuleBuilderParser_default.parseObject(key, rule.getRule(), body);
        validatedBody[key] = body[key];
      } else if (value instanceof DateBuilder) {
        const rule = value.getRule();
        RuleBuilderParser_default.parseDate(key, rule.getRule(), body);
        validatedBody[key] = body[key];
      } else if (value instanceof FunctionBuilder) {
        const rule = value.getRule();
        RuleBuilderParser_default.parseFunction(key, rule.getRule(), body);
        validatedBody[key] = body[key];
      } else {
        const rule = value.getRule();
        RuleBuilderParser_default.parseArray(key, rule.getRule(), body);
        validatedBody[key] = body[key];
      }
    });
    return validatedBody;
  }
  /**
   * @description - Checks if the body of the request is valid
   * @param {InputBody} body - The body of the request
   * @returns {boolean} - Returns true if the body is valid, false otherwise
   */
  isValid(body) {
    try {
      this.validate(body);
      return true;
    } catch (error) {
      return false;
    }
  }
};

// src/Rule/Rule.ts
var Rule = class {
  constructor(rule = {}) {
    __publicField(this, "rule");
    this.rule = rule;
  }
  setRule(rule) {
    this.rule = {
      ...this.rule,
      ...rule
    };
  }
  getRule() {
    return this.rule;
  }
};

// src/Rule/RuleBuilder/RuleBuilderDataType/ArrayBuilder.ts
var ArrayBuilder = class extends AbstractDataRuleBuilder {
  constructor(rule) {
    super(rule);
  }
  members(members) {
    this.rule.setRule({ members: members.getRule().getRule() });
    return this;
  }
};

// src/Rule/RuleBuilder/RuleBuilder.ts
var RuleBuilder = class {
  constructor() {
    __publicField(this, "rule");
    this.rule = new Rule();
  }
  required() {
    this.rule.setRule({ required: true });
    return this;
  }
  string() {
    this.rule.setRule({ type: "string" });
    return new StringBuilder(this.rule);
  }
  number() {
    this.rule.setRule({ type: "number" });
    return new NumberBuilder(this.rule);
  }
  boolean() {
    this.rule.setRule({ type: "boolean" });
    return new BooleanBuilder(this.rule);
  }
  object() {
    this.rule.setRule({ type: "object" });
    return new ObjectBuilder(this.rule);
  }
  function() {
    this.rule.setRule({ type: "function" });
    return new FunctionBuilder(this.rule);
  }
  date() {
    this.rule.setRule({ type: "Date" });
    return new DateBuilder(this.rule);
  }
  array() {
    this.rule.setRule({ type: "Array" });
    return new ArrayBuilder(this.rule);
  }
};

// src/Validator/ValidatorSchema.ts
var ValidatorSchema = class {
  constructor() {
    __publicField(this, "schemaRules");
    this.schemaRules = {};
  }
  rule() {
    return new RuleBuilder();
  }
};

// src/index.ts
var Core = class {
  constructor() {
    __publicField(this, "schema");
    this.schema = new ValidatorSchema();
  }
  /**
   * @description - Creates a new validator instance
   * @param cb - Callback function that contains the rules
   * @returns {Validator} Instance of the validator with the given rules
   */
  validator(cb) {
    this.schema.schemaRules = cb(this.schema);
    return new Validator(this.schema);
  }
};
var core = new Core();
var validator = core.validator.bind(core);
export {
  validator
};
//# sourceMappingURL=index.mjs.map