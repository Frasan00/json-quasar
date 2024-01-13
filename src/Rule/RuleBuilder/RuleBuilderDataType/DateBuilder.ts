import Rule from "../../Rule";
import AbstractDataRuleBuilder from "./AbstractDataRuleBuilder";

export default class DateBuilder extends AbstractDataRuleBuilder {
  public constructor(rule: Rule) {
    super(rule);
  }

  public before(date: Date): DateBuilder {
    this.rule.setRule({
      before: date,
    });

    return this;
  }

  public after(date: Date): DateBuilder {
    this.rule.setRule({
      after: date,
    });

    return this;
  }

  public beforeOrEqual(date: Date): DateBuilder {
    this.rule.setRule({
      beforeOrEqual: date,
    });

    return this;
  }

  public afterOrEqual(date: Date): DateBuilder {
    this.rule.setRule({
      afterOrEqual: date,
    });

    return this;
  }
}
