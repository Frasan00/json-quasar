import Validator from "./Validator/Validator";
import ValidatorSchema from "./Validator/ValidatorSchema";
import { ValidatorSchemaRules } from "./Validator/ValidatorTypes";

class Core {
  protected schema: ValidatorSchema;

  constructor() {
    this.schema = new ValidatorSchema();
  }

  /**
   * @description - Creates a new validator instance
   * @param cb - Callback function that contains the rules
   * @returns {Validator} Instance of the validator with the given rules
   */
  public validator(cb: (schema: ValidatorSchema) => ValidatorSchemaRules): Validator {
    this.schema.schemaRules = cb(this.schema);
    return new Validator(this.schema);
  }
}

const core = new Core();
export const newValidator =  core.validator.bind(core);
