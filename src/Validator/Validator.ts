import { InputBody } from "./ValidatorTypes";
import ValidatorSchema from "./ValidatorSchema";
import StringBuilder from "../Rule/RuleBuilder/RuleBuilderDataType/StringBuilder";
import NumberBuilder from "../Rule/RuleBuilder/RuleBuilderDataType/NumberBuilder";
import BooleanBuilder from "../Rule/RuleBuilder/RuleBuilderDataType/BooleanBuilder";
import ObjectBuilder from "../Rule/RuleBuilder/RuleBuilderDataType/ObjectBuilder";
import ArrayBuilder from "../Rule/RuleBuilder/RuleBuilderDataType/ArrayBuilder";
import FunctionBuilder from "../Rule/RuleBuilder/RuleBuilderDataType/FunctionBuilder";
import DateBuilder from "../Rule/RuleBuilder/RuleBuilderDataType/DateBuilder";
import RuleBuilderUtils from "../Rule/RuleBuilder/RuleBuilderUtils";

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
        validatedBody[key] = RuleBuilderUtils.parseString(
          key,
          rule.getRule(),
          body,
        );
      }

      if (value instanceof NumberBuilder) {
        const rule = value.getRule();
        RuleBuilderUtils.parseNumber(key, rule.getRule(), body);
        validatedBody[key] = body[key];
      }

      if (value instanceof BooleanBuilder) {
        const rule = value.getRule();
        RuleBuilderUtils.parseBoolean(key, rule.getRule(), body);
        validatedBody[key] = body[key];
      }

      if (value instanceof ObjectBuilder) {
        const rule = value.getRule();
        RuleBuilderUtils.parseObject(key, rule.getRule(), body);
        validatedBody[key] = body[key];
      }

      if (value instanceof DateBuilder) {
        const rule = value.getRule();
        RuleBuilderUtils.parseDate(key, rule.getRule(), body);
        validatedBody[key] = body[key];
      }

      if (value instanceof FunctionBuilder) {
        const rule = value.getRule();
        RuleBuilderUtils.parseFunction(key, rule.getRule(), body);
        validatedBody[key] = body[key];
      }

      if (value instanceof ArrayBuilder) {
        const rule = value.getRule();
        RuleBuilderUtils.parseArray(key, rule.getRule(), body);
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
