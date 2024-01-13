import Rule from "../../Rule";
import { ValidationErrors } from "../../RuleTypes";
import AbstractDataRuleBuilder from "./AbstractDataRuleBuilder";

export default class NumberBuilder extends AbstractDataRuleBuilder {
  public constructor(rule: Rule) {
    super(rule);
  }

  public range(range: [number, number]): NumberBuilder {
    this.rule.setRule({ range });
    return this;
  }

  public integer(): NumberBuilder {
    if (this.rule.getRule().float) {
      throw new Error(ValidationErrors.integerAndFloat);
    }

    this.rule.setRule({ integer: true });
    return this;
  }

  public float(): NumberBuilder {
    if (this.rule.getRule().integer) {
      throw new Error(ValidationErrors.integerAndFloat);
    }

    this.rule.setRule({ float: true });
    return this;
  }

  public positive(): NumberBuilder {
    if (this.rule.getRule().negative) {
      throw new Error(ValidationErrors.positiveAndNegative);
    }

    this.rule.setRule({ positive: true });
    return this;
  }

  public negative(): NumberBuilder {
    if (this.rule.getRule().positive) {
      throw new Error(ValidationErrors.positiveAndNegative);
    }

    this.rule.setRule({ negative: true });
    return this;
  }
}
