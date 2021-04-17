import { atom, CallbackInterface, selector, waitForAll } from "recoil";
import {
  RecoilerCreateParams,
  RecoilerObjectValue,
  RecoilerPrimitiveValue,
  RecoilerValue,
  RecoilerValueKey,
  StoredAtoms,
} from "./types";

export type Truthy<T> = T extends false | "" | 0 | null | undefined ? never : T;
export const truthy = <T>(value: T): value is Truthy<T> => !!value;

const undefinedAtom = atom({ key: "undefined", default: undefined });

export class Recoiler {
  // store atoms
  private storedAtoms: StoredAtoms = {};

  // store recoil actions
  private recoilMethods: CallbackInterface | undefined;

  // bind recoil methods to set/reset atoms
  // this should be done inside a `userRecoilCallback`
  public bindRecoilMethods(recoilCallbacks: CallbackInterface) {
    this.recoilMethods = recoilCallbacks;
  }

  /** CREATE ENTITY - Can be a primitive or nexted literal object */
  public createEntity({ key, defaultValue }: RecoilerCreateParams) {
    if (this.exists(key)) {
      console.warn(`Recoiler: Cannot create - Entity '${key}' exists`);
      return;
    }

    // if it's simple primitive value - create a atom
    if (!this.isObj(defaultValue)) {
      // create & store atom
      this.storedAtoms[key] = atom({
        key,
        default: defaultValue,
      });

      return this.storedAtoms[key];
    }

    // Value is object - Creates atom for each key
    // next-level deep - key building to form a breadcrumb path.
    Object.keys(defaultValue).forEach((k) => {
      this.createEntity({
        key: `${key}.${k}`,
        defaultValue: defaultValue[k],
      });
    });

    // // creates entity selector for the object
    // const entitySelector = selector<>({
    //   key,
    //   get: ({ get }) => {
    //     const childValues = get(
    //       waitForAll(objAtoms.map((atom) => atom).filter(truthy))
    //     );

    //     return childValues;
    //   },
    // });

    // return entitySelector;
  }

  /** GET A SINGLE ATOM BY KEY - single atom must always be primitive */
  public getAtom(key: RecoilerValueKey) {
    return this.storedAtoms[key] || undefinedAtom;
  }

  /** UPDATE A SINGLE ATOM BY KEY */
  public setAtom(key: RecoilerValueKey, value: RecoilerPrimitiveValue) {
    if (!this.exists(key)) {
      console.warn(`Recoiler: Cannot update - Entity '${key}' does not exist`);
      return;
    }

    this.recoilMethods?.set(this.storedAtoms[key], value);
  }

  /** RESET ALL / CLEAN UP */
  public resetAll() {
    Object.keys(this.storedAtoms).forEach((key) => {
      this.recoilMethods?.reset(this.storedAtoms[key]);
    });

    this.recoilMethods = undefined;
    this.storedAtoms = {};
  }

  /**
   * HELPERS
   */
  private exists = (key: RecoilerValueKey) => !!this.storedAtoms[key];

  private isObj = (obj: RecoilerValue): obj is RecoilerObjectValue =>
    typeof obj === "object" && !!obj;
}

/** First Recoiler Instance */
export const recoilManager = new Recoiler();
