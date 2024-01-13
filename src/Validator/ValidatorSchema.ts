import { ValidatorSchemaRules } from "./ValidatorTypes";
import RuleBuilder from "../Rule/RuleBuilder/RuleBuilder";

export default abstract class ValidatorSchema {
  protected schemaRules: ValidatorSchemaRules;

  protected constructor() {
    this.schemaRules = {};
    this.setSchemaRules();
  }

  public rule() {
    return new RuleBuilder();
  }

  public getSchemaRules() {
    return this.schemaRules;
  }

  public abstract setSchemaRules(): void;
}
