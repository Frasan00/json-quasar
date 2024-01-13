export default class RuleError extends Error {
  customMessage?: string;
  reason: string;

  constructor(reason: string, customMessage?: string) {
    super(customMessage ? customMessage : "");
    Object.setPrototypeOf(this, RuleError.prototype);
    this.customMessage = customMessage;
    this.reason = reason;
  }
}
