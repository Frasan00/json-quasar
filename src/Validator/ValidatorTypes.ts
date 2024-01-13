import Rule from "../Rule/Rule";
import { RuleType } from "../Rule/RuleTypes";
import StringBuilder from "../Rule/RuleBuilder/RuleBuilderDataType/StringBuilder";
import NumberBuilder from "../Rule/RuleBuilder/RuleBuilderDataType/NumberBuilder";
import BooleanBuilder from "../Rule/RuleBuilder/RuleBuilderDataType/BooleanBuilder";
import FunctionBuilder from "../Rule/RuleBuilder/RuleBuilderDataType/FunctionBuilder";
import ObjectBuilder from "../Rule/RuleBuilder/RuleBuilderDataType/ObjectBuilder";
import DateBuilder from "../Rule/RuleBuilder/RuleBuilderDataType/DateBuilder";
import AbstractDataRuleBuilder from "../Rule/RuleBuilder/RuleBuilderDataType/AbstractDataRuleBuilder";

type acceptedKeys = string | number;
type acceptedValues = string | number | boolean | object | Function;

export type InputBody = {
  [key: acceptedKeys]: acceptedValues;
};

export type BuilderTypes = AbstractDataRuleBuilder;

export type ValidatorSchemaRule = Rule | RuleType;
export type ValidatorSchemaRules = {
  [key: acceptedKeys]: BuilderTypes;
};
