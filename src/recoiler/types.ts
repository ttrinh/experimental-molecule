import { RecoilState } from "recoil";

export type RecoilerPrimitiveValue = string | number | boolean;
export type RecoilerValueKey = string;
export type RecoilerObjectValue = {
  [key: string]: RecoilerValue;
};

export type RecoilerValue = RecoilerPrimitiveValue | RecoilerObjectValue;

export interface StoredAtoms {
  [key: string]: RecoilState<RecoilerPrimitiveValue>;
}

export interface RecoilerCreateParams {
  key: RecoilerValueKey;
  defaultValue: RecoilerValue;
}
