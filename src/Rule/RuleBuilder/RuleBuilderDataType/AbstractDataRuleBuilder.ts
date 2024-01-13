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

  public required(): this {
    if (this.rule.getRule().optional) {
      throw new Error(ValidationErrors.requiredAndOptional);
    }

    this.rule.setRule({ required: true });
    return this;
  }

  /**
   * @description Optional by default, this can be used for better readability
   */
  public optional(): this {
    if (this.rule.getRule().optional) {
      throw new Error(ValidationErrors.requiredAndOptional);
    }

    this.rule.setRule({ optional: true });
    return this;
  }

  /**
   * @description Sets if a value can be null
   */
  public nullable(): this {
    this.rule.setRule({ nullable: true });
    return this;
  }

  public getRule(): Rule {
    return this.rule;
  }
}
