import { InputBody } from "./ValidatorTypes";
import ValidatorSchema from "./ValidatorSchema";
import StringBuilder from "../Rule/RuleBuilder/RuleBuilderDataType/StringBuilder";
import NumberBuilder from "../Rule/RuleBuilder/RuleBuilderDataType/NumberBuilder";
import BooleanBuilder from "../Rule/RuleBuilder/RuleBuilderDataType/BooleanBuilder";
import ObjectBuilder from "../Rule/RuleBuilder/RuleBuilderDataType/ObjectBuilder";
import FunctionBuilder from "../Rule/RuleBuilder/RuleBuilderDataType/FunctionBuilder";
import DateBuilder from "../Rule/RuleBuilder/RuleBuilderDataType/DateBuilder";
import RuleBuilderParser from "../Rule/RuleBuilder/RuleBuilderParser";

export default class Validator {
  /**
   * @description - Validates the body of the request, throws an error if the body is invalid
   * @param {InputBody} body - The body of the request
   * @param {ValidatorSchema} validatorSchema - The schema of the validator
   * @returns {Object} - Returns the validated object
   */
  public validate<T extends ValidatorSchema>(
    body: InputBody,
    validatorSchema: T,
  ): InputBody {
    const validatedBody = {} as InputBody;
    const schema = validatorSchema.getSchemaRules();

    Object.entries(schema).forEach(([key, value]) => {
      if (value instanceof StringBuilder) {
        const rule = value.getRule();
        validatedBody[key] =
          RuleBuilderParser.parseString(key, rule.getRule(), body) || null;
      } else if (value instanceof NumberBuilder) {
        const rule = value.getRule();
        RuleBuilderParser.parseNumber(key, rule.getRule(), body);
        validatedBody[key] = body[key];
      } else if (value instanceof BooleanBuilder) {
        const rule = value.getRule();
        RuleBuilderParser.parseBoolean(key, rule.getRule(), body);
        validatedBody[key] = body[key];
      } else if (value instanceof ObjectBuilder) {
        const rule = value.getRule();
        RuleBuilderParser.parseObject(key, rule.getRule(), body);
        validatedBody[key] = body[key];
      } else if (value instanceof DateBuilder) {
        const rule = value.getRule();
        RuleBuilderParser.parseDate(key, rule.getRule(), body);
        validatedBody[key] = body[key];
      } else if (value instanceof FunctionBuilder) {
        const rule = value.getRule();
        RuleBuilderParser.parseFunction(key, rule.getRule(), body);
        validatedBody[key] = body[key];
      } else {
        const rule = value.getRule();
        RuleBuilderParser.parseArray(key, rule.getRule(), body);
        validatedBody[key] = body[key];
      }
    });

    return validatedBody;
  }

  /**
   * @description - Checks if the body of the request is valid
   * @param {InputBody} body - The body of the request
   * @param {ValidatorSchema} validatorSchema - The schema of the validator
   * @returns {boolean} - Returns true if the body is valid, false otherwise
   */
  public isValid<T>(body: InputBody, validatorSchema: T): boolean {
    try {
      this.validate(body, validatorSchema as ValidatorSchema);
      return true;
    } catch (error) {
      return false;
    }
  }
}
