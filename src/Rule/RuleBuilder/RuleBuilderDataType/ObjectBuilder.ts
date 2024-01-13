import Rule from "../../Rule";
import AbstractDataRuleBuilder from "./AbstractDataRuleBuilder";
import { RuleType } from "../../RuleTypes";
import { ValidatorSchemaRule } from "../../../Validator/ValidatorTypes";

export default class ObjectBuilder extends AbstractDataRuleBuilder {
  public constructor(rule: Rule) {
    super(rule);
  }

  public members(members: AbstractDataRuleBuilder): AbstractDataRuleBuilder {
    this.rule.setRule({ members: members.getRule().getRule() });
    return this;
  }
}
