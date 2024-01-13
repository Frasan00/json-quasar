import { RuleType } from "./RuleTypes";

export default class Rule {
  protected rule: RuleType;

  constructor(rule: RuleType = {} as RuleType) {
    this.rule = rule;
  }

  public setRule(rule: RuleType): void {
    this.rule = {
      ...this.rule,
      ...rule,
    };
  }

  public getRule(): RuleType {
    return this.rule;
  }
}
