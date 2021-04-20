import { RecoilState } from "recoil";

export type RecoilerPrimitiveValue = string | number | boolean;

export type RecoilerObjectValue = {
  [key: string]: RecoilerPrimitiveValue;
};

export type RecoilerValue = RecoilerPrimitiveValue | RecoilerObjectValue;

export type StoredAtom =
  | RecoilState<RecoilerPrimitiveValue>
  | RecoilState<RecoilerObjectValue>;

export interface StoredAtoms {
  [key: string]: StoredAtom;
}

/**
 * Create types
 */
export interface RecoilerLiteralObjectValue {
  [key: string]: RecoilerPrimitiveValue | RecoilerLiteralObjectValue;
}

export type RecoilerCreateValue =
  | RecoilerPrimitiveValue
  | RecoilerLiteralObjectValue;

export interface RecoilerCreateParams {
  key: string;
  defaultValue: RecoilerCreateValue;
}
