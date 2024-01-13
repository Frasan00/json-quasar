import Rule from "../../Rule";
import AbstractDataRuleBuilder from "./AbstractDataRuleBuilder";

export default class StringBuilder extends AbstractDataRuleBuilder {
  public constructor(rule: Rule) {
    super(rule);
  }

  public min(min: number): StringBuilder {
    this.rule.setRule({ min });
    return this;
  }

  public max(max: number): StringBuilder {
    this.rule.setRule({ max });
    return this;
  }

  public trim(): this {
    const inputOptions = this.rule.getRule().inputOptions;
    this.rule.setRule({ inputOptions: { ...inputOptions, trim: true } });
    return this;
  }

  public lowercase(): this {
    const inputOptions = this.rule.getRule().inputOptions;
    this.rule.setRule({ inputOptions: { ...inputOptions, lowercase: true } });
    return this;
  }

  public uppercase(): this {
    const inputOptions = this.rule.getRule().inputOptions;
    this.rule.setRule({ inputOptions: { ...inputOptions, uppercase: true } });
    return this;
  }

  public pascalCase(): this {
    const inputOptions = this.rule.getRule().inputOptions;
    this.rule.setRule({ inputOptions: { ...inputOptions, pascalCase: true } });
    return this;
  }

  public camelCase(): this {
    const inputOptions = this.rule.getRule().inputOptions;
    this.rule.setRule({
      inputOptions: {
        ...inputOptions,
        camelCase: true,
      },
    });
    return this;
  }

  public snakeCase(): this {
    const inputOptions = this.rule.getRule().inputOptions;
    this.rule.setRule({
      inputOptions: {
        ...inputOptions,
        snakeCase: true,
      },
    });
    return this;
  }

  public email(): this {
    this.rule.setRule({ email: true });
    return this;
  }

  public url(): this {
    this.rule.setRule({ url: true });
    return this;
  }

  public uuid(): this {
    this.rule.setRule({ uuid: true });
    return this;
  }

  public ip(): this {
    this.rule.setRule({ ip: true });
    return this;
  }

  public regex(regex: RegExp): this {
    this.rule.setRule({ regex });
    return this;
  }
}
