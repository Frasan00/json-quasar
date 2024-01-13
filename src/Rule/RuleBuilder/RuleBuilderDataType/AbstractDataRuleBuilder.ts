import Rule from "../../Rule";
import { ValidationErrors } from "../../RuleTypes";

export default abstract class AbstractDataRuleBuilder {
  protected rule: Rule;
  protected constructor(rule: Rule) {
    this.rule = rule;
  }

  public message(message: string): this {
    this.rule.setRule({ message });
    return this;
  }

  public isRequired(): this {
    if (this.rule.getRule().optional) {
      throw new Error(ValidationErrors.requiredAndOptional);
    }

    this.rule.setRule({ required: true });
    return this;
  }

  public isOptional(): this {
    if (this.rule.getRule().optional) {
      throw new Error(ValidationErrors.requiredAndOptional);
    }

    this.rule.setRule({ optional: true });
    return this;
  }

  public getRule(): Rule {
    return this.rule;
  }
}
