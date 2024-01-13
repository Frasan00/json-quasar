import { OptionType, RuleType, ValidationErrors } from "../RuleTypes";
import RuleError from "../RuleError";
import { InputBody } from "../../Validator/ValidatorTypes";

type BaseType =
  | "string"
  | "number"
  | "boolean"
  | "object"
  | "Function"
  | "Date"
  | "Array";

type PropertyValueType =
  | string
  | number
  | boolean
  | object
  | Function
  | Date
  | Array<any>
  | null;

class RuleBuilderParser {
  private checkIfRequired(
    rule: RuleType,
    inputBody: InputBody,
    propertyValue: string,
  ) {
    if (
      rule.required &&
      Object.hasOwnProperty.call(inputBody, propertyValue) === false
    ) {
      throw new RuleError(
        ValidationErrors.required(propertyValue),
        rule.message,
      );
    }
  }

  private checkType(
    propertyKey: string,
    propertyValue: PropertyValueType,
    type: BaseType,
    message?: string,
  ) {
    switch (type) {
      case "string":
        if (typeof propertyValue !== "string") {
          throw new RuleError(
            ValidationErrors.type(propertyKey, "string"),
            message,
          );
        }
        break;
      case "number":
        if (typeof propertyValue !== "number") {
          throw new RuleError(
            ValidationErrors.type(propertyKey, "number"),
            message,
          );
        }
        break;
      case "boolean":
        if (typeof propertyValue !== "boolean") {
          throw new RuleError(
            ValidationErrors.type(propertyKey, "boolean"),
            message,
          );
        }
        break;
      case "object":
        if (typeof propertyValue !== "object") {
          throw new RuleError(
            ValidationErrors.type(propertyKey, "object"),
            message,
          );
        }
        break;
      case "Function":
        if (typeof propertyValue !== "function") {
          throw new RuleError(
            ValidationErrors.type(propertyKey, "Function"),
            message,
          );
        }
        break;
      case "Date":
        if (
          typeof propertyValue !== "object" ||
          !(propertyValue instanceof Date)
        ) {
          throw new RuleError(
            ValidationErrors.type(propertyKey, "Date"),
            message,
          );
        }
        break;
      case "Array":
        if (
          typeof propertyValue !== "object" ||
          Array.isArray(propertyValue) === false
        ) {
          throw new RuleError(
            ValidationErrors.type(propertyKey, "Array"),
            message,
          );
        }
        break;
      default:
        throw new RuleError(
          ValidationErrors.type(propertyKey, "unknown"),
          message,
        );
    }
  }

  public parseString(
    propertyKey: string,
    rule: RuleType,
    inputBody: InputBody,
  ): string | void {
    this.checkIfRequired(rule, inputBody, propertyKey);
    if (Object.hasOwnProperty.call(inputBody, propertyKey) === false) {
      return;
    }

    if (rule.nullable && inputBody[propertyKey] === null) {
      return;
    }

    this.checkType(propertyKey, inputBody[propertyKey], "string", rule.message);

    let value = inputBody[propertyKey] as string;
    if (rule.inputOptions) {
      value = this.parseStringRuleOptions(value, rule.inputOptions);
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

    if (
      rule.url &&
      !/^(?:https?:\/\/)?(?:www\.)?[^\s\.]+\.[^\s]{2,}$/.test(value)
    ) {
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

  public parseNumber(
    propertyKey: string,
    rule: RuleType,
    inputBody: InputBody,
  ): void {
    this.checkIfRequired(rule, inputBody, propertyKey);
    if (Object.hasOwnProperty.call(inputBody, propertyKey) === false) {
      return;
    }

    if (rule.nullable && inputBody[propertyKey] === null) {
      return;
    }

    this.checkType(propertyKey, inputBody[propertyKey], "number", rule.message);

    const value = inputBody[propertyKey] as number;
    if (rule.min && value < rule.min) {
      throw new RuleError(ValidationErrors.min(value, rule.min), rule.message);
    }

    if (rule.max && value > rule.max) {
      throw new RuleError(ValidationErrors.max(value, rule.max), rule.message);
    }

    if (rule.range && (value < rule.range[0] || value > rule.range[1])) {
      throw new RuleError(
        ValidationErrors.range(value, rule.range[0], rule.range[1]),
        rule.message,
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

  public parseBoolean(
    propertyKey: string,
    rule: RuleType,
    inputBody: InputBody,
  ): void {
    this.checkIfRequired(rule, inputBody, propertyKey);
    if (Object.hasOwnProperty.call(inputBody, propertyKey) === false) {
      return;
    }

    if (rule.nullable && inputBody[propertyKey] === null) {
      return;
    }

    this.checkType(
      propertyKey,
      inputBody[propertyKey],
      "boolean",
      rule.message,
    );
  }

  public parseDate(
    propertyKey: string,
    rule: RuleType,
    inputBody: InputBody,
  ): void {
    this.checkIfRequired(rule, inputBody, propertyKey);
    if (Object.hasOwnProperty.call(inputBody, propertyKey) === false) {
      return;
    }

    if (rule.nullable && inputBody[propertyKey] === null) {
      return;
    }

    this.checkType(propertyKey, inputBody[propertyKey], "Date", rule.message);

    const value = inputBody[propertyKey] as Date;
    if (rule.before && value.getTime() >= rule.before.getTime()) {
      throw new RuleError(
        ValidationErrors.before(value, rule.before),
        rule.message,
      );
    }

    if (rule.after && value.getTime() <= rule.after.getTime()) {
      throw new RuleError(
        ValidationErrors.after(value, rule.after),
        rule.message,
      );
    }

    if (rule.beforeOrEqual && value.getTime() > rule.beforeOrEqual.getTime()) {
      throw new RuleError(
        ValidationErrors.beforeOrEqual(value, rule.beforeOrEqual),
        rule.message,
      );
    }

    if (rule.afterOrEqual && value.getTime() < rule.afterOrEqual.getTime()) {
      throw new RuleError(
        ValidationErrors.afterOrEqual(value, rule.afterOrEqual),
        rule.message,
      );
    }
  }

  public parseFunction(
    propertyKey: string,
    rule: RuleType,
    inputBody: InputBody,
  ) {
    this.checkIfRequired(rule, inputBody, propertyKey);
    if (Object.hasOwnProperty.call(inputBody, propertyKey) === false) {
      return;
    }
    this.checkType(
      propertyKey,
      inputBody[propertyKey],
      "Function",
      rule.message,
    );

    const value = inputBody[propertyKey] as Function;

    if (rule.returns) {
      if (typeof value() !== rule.returns) {
        throw new RuleError(
          ValidationErrors.type(propertyKey, rule.returns),
          rule.message,
        );
      }
    }
  }

  public parseObject(
    propertyKey: string,
    rule: RuleType,
    inputBody: InputBody,
  ) {
    this.checkIfRequired(rule, inputBody, propertyKey);
    if (!Object.hasOwnProperty.call(inputBody, propertyKey)) {
      return;
    }

    if (rule.nullable && inputBody[propertyKey] === null) {
      return;
    }

    this.checkType(propertyKey, inputBody[propertyKey], "object", rule.message);

    const members = rule.members;
    if (!members) {
      return;
    }

    const value = inputBody[propertyKey] as Record<string, any>;
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

  public parseArray(propertyKey: string, rule: RuleType, inputBody: InputBody) {
    this.checkIfRequired(rule, inputBody, propertyKey);
    if (!Object.hasOwnProperty.call(inputBody, propertyKey)) {
      return;
    }

    if (rule.nullable && inputBody[propertyKey] === null) {
      return;
    }

    this.checkType(propertyKey, inputBody[propertyKey], "Array");

    const members = rule.members;
    if (!members) {
      return;
    }

    if (members.type === "string") {
      const value = inputBody[propertyKey] as string[];
      value.forEach((item) => {
        this.parseString(propertyKey, members, { [propertyKey]: item });
      });
    } else if (members.type === "number") {
      const value = inputBody[propertyKey] as number[];
      value.forEach((item) => {
        this.parseNumber(propertyKey, members, { [propertyKey]: item });
      });
    } else if (members.type === "boolean") {
      const value = inputBody[propertyKey] as boolean[];
      value.forEach((item) => {
        this.parseBoolean(propertyKey, members, { [propertyKey]: item });
      });
    } else if (members.type === "object") {
      const value = inputBody[propertyKey] as object[];
      value.forEach((item) => {
        this.parseObject(propertyKey, members, { [propertyKey]: item });
      });
    } else if (members.type === "function") {
      const value = inputBody[propertyKey] as Function[];
      value.forEach((item) => {
        this.parseFunction(propertyKey, members, { [propertyKey]: item });
      });
    } else if (members.type === "Date") {
      const value = inputBody[propertyKey] as Date[];
      value.forEach((item) => {
        this.parseDate(propertyKey, members, { [propertyKey]: item });
      });
    } else if (members.type === "Array") {
      const value = inputBody[propertyKey] as Array<any>[];
      value.forEach((item) => {
        this.parseArray(propertyKey, members, { [propertyKey]: item });
      });
    } else {
      throw new RuleError(ValidationErrors.type(propertyKey, "unknown"));
    }
  }

  private parseStringRuleOptions(value: string, options: OptionType): string {
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
      value = new RegExp(/^[A-Z][a-z]+$/).test(value)
        ? value
        : value[0].toUpperCase() + value.slice(1).toLowerCase();
    }

    if (options.camelCase) {
      value = new RegExp(/^[a-z]+$/).test(value)
        ? value
        : value[0].toLowerCase() + value.slice(1).toUpperCase();
    }

    if (options.snakeCase) {
      value = value.replace(/\s+/g, "_");
    }

    return value;
  }
}

export default new RuleBuilderParser();
