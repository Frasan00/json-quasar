import Rule from "../Rule";
import StringBuilder from "./RuleBuilderDataType/StringBuilder";
import NumberBuilder from "./RuleBuilderDataType/NumberBuilder";
import BooleanBuilder from "./RuleBuilderDataType/BooleanBuilder";
import ObjectBuilder from "./RuleBuilderDataType/ObjectBuilder";
import FunctionBuilder from "./RuleBuilderDataType/FunctionBuilder";
import DateBuilder from "./RuleBuilderDataType/DateBuilder";
import ArrayBuilder from "./RuleBuilderDataType/ArrayBuilder";

export default class RuleBuilder {
  protected rule: Rule;
  public constructor() {
    this.rule = new Rule();
  }

  public required(): RuleBuilder {
    this.rule.setRule({ required: true });
    return this;
  }

  public string(): StringBuilder {
    this.rule.setRule({ type: "string" });
    return new StringBuilder(this.rule);
  }

  public number(): NumberBuilder {
    this.rule.setRule({ type: "number" });
    return new NumberBuilder(this.rule);
  }

  public boolean(): BooleanBuilder {
    this.rule.setRule({ type: "boolean" });
    return new BooleanBuilder(this.rule);
  }

  public object(): ObjectBuilder {
    this.rule.setRule({ type: "object" });
    return new ObjectBuilder(this.rule);
  }

  public function(): FunctionBuilder {
    this.rule.setRule({ type: "function" });
    return new FunctionBuilder(this.rule);
  }

  public date(): DateBuilder {
    this.rule.setRule({ type: "Date" });
    return new DateBuilder(this.rule);
  }

  public array(): ArrayBuilder {
    this.rule.setRule({ type: "Array" });
    return new ArrayBuilder(this.rule);
  }
}
