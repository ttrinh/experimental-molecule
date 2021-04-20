import { atom, GetRecoilValue, RecoilState, SetRecoilState } from "recoil";
import { RecoilerPrimitiveValue } from "./types";

export const undefinedAtom = atom({ key: "undefined", default: undefined });

export type Truthy<T> = T extends false | "" | 0 | null | undefined ? never : T;
export const truthy = <T>(value: T): value is Truthy<T> => !!value;

export const isObj = <T extends {}>(obj: T): obj is T =>
  typeof obj === "object" && !!obj;

export const isPrimitive = (value: unknown): value is RecoilerPrimitiveValue =>
  ["string", "number", "boolean"].includes(typeof value);

/**
 * Recoil helper to compare and set when new value differs from old value
 */
export const compareAndSet = (get: GetRecoilValue, set: SetRecoilState) => <T>(
  state: RecoilState<T>,
  newValue: T
) => {
  const oldValue = get(state);
  if (oldValue !== newValue) {
    set(state, newValue);
  }
};
