import { atom, CallbackInterface } from "recoil";
import {
  RecoilerCreateParams,
  RecoilerObjectValue,
  RecoilerPrimitiveValue,
  RecoilerValue,
  RecoilerValueKey,
  StoredAtoms,
} from "./types";

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

    // Value is object - Creates atom for each key
    if (this.isObj(defaultValue)) {
      Object.keys(defaultValue).forEach((k) => {
        const childKey = `${key}.${k}`;

        // next-level deep
        this.createEntity({
          key: childKey,
          defaultValue: defaultValue[k],
        });
      });

      return;
    }

    // create & store atom
    this.storedAtoms[key] = atom({
      key,
      default: defaultValue,
    });
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
