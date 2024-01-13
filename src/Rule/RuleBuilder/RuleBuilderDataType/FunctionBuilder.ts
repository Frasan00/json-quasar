import Rule from "../../Rule";
import AbstractDataRuleBuilder from "./AbstractDataRuleBuilder";
import { RuleDataTypes } from "../../RuleTypes";
export default class FunctionBuilder extends AbstractDataRuleBuilder {
  public constructor(rule: Rule) {
    super(rule);
  }

  public returns(returns: RuleDataTypes): FunctionBuilder {
    this.rule.setRule({
      returns,
    });

    return this;
  }
}
