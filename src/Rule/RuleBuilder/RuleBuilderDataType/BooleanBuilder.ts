import Rule from "../../Rule";
import AbstractDataRuleBuilder from "./AbstractDataRuleBuilder";

export default class BooleanBuilder extends AbstractDataRuleBuilder {
  public constructor(rule: Rule) {
    super(rule);
  }
}
