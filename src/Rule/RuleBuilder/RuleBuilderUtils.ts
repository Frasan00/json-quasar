import RuleError from "../RuleError";
import { OptionType, RuleType, ValidationErrors } from "../RuleTypes";
import { InputBody } from "../../Validator/ValidatorTypes";
import { BaseType, PropertyValueType } from "./RuleBuilderParser";

class RuleBuilderUtils {
  public parseStringRuleOptions(value: string, options: OptionType): string {
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

  public checkIfRequired(
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
  public checkType(
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
}

export default new RuleBuilderUtils();
