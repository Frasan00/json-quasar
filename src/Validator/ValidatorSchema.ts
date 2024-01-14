import { ValidatorSchemaRules } from "./ValidatorTypes";
import RuleBuilder from "../Rule/RuleBuilder/RuleBuilder";

export default class ValidatorSchema {
  public schemaRules: ValidatorSchemaRules;

  public constructor() {
    this.schemaRules = {};
  }

  public rule() {
    return new RuleBuilder();
  }
}
