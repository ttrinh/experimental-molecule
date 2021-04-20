import {
  atom,
  CallbackInterface,
  DefaultValue,
  RecoilState,
  selector,
  waitForAll,
} from "recoil";

import {
  RecoilerCreateParams,
  RecoilerObjectValue,
  RecoilerValue,
  StoredAtom,
  StoredAtoms,
} from "./types";
import { compareAndSet, isPrimitive, truthy, undefinedAtom } from "./utils";

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

  /** CREATE ENTITY - Can be a primitive or nested literal object */
  public createEntity({ key, defaultValue }: RecoilerCreateParams) {
    if (this.exists(key)) {
      console.warn(`Recoiler: Cannot create - Entity '${key}' exists`);
      return;
    }

    // Value is simple primitive value - create an atom and store it
    if (isPrimitive(defaultValue)) {
      this.storedAtoms[key] = atom({ key, default: defaultValue });
      return;
    }

    /**
     * Value is Object
     * - Creates atom for each key (primitive value only)
     * - Next-level deep, key building to form a breadcrumb path.
     */
    const childKeys = Object.keys(defaultValue);
    childKeys.forEach((childK) => {
      this.createEntity({
        key: `${key}.${childK}`,
        defaultValue: defaultValue[childK],
      });
    });

    // create and store entity selector for the nested object
    const selectorKeys = childKeys.map((k) => `${key}.${k}`);
    const selectorObject = selector<RecoilerObjectValue>({
      key,
      // @ts-ignore
      get: ({ get }) => {
        const values = get(
          waitForAll(selectorKeys.map((childK) => this.getAtom(childK)))
        ).filter(truthy);

        // @ts-ignore
        return values.reduce<RecoilerObjectValue>((carrier, value, index) => {
          // primitive values only
          return {
            ...carrier,
            [childKeys[index]]: value,
          };
        }, {});
      },
      set: ({ set, get, reset }, newValue) => {
        if (newValue instanceof DefaultValue) {
          selectorKeys.forEach((k) => {
            reset(this.getAtom(k));
          });

          return;
        }

        const _set = compareAndSet(get, set);

        Object.keys(newValue).forEach((k) => {
          // @ts-ignore
          _set(this.getAtom(`${key}.${k}`), newValue[k]);
        });
      },
    });

    this.storedAtoms[key] = selectorObject;
  }

  /** GET A SINGLE ATOM BY KEY - single atom must always be primitive */
  public getAtom(key: string): StoredAtom | RecoilState<undefined> {
    return this.storedAtoms[key] || undefinedAtom;
  }

  /** UPDATE A SINGLE ATOM BY KEY */
  public setAtom(key: string, value: RecoilerValue) {
    console.log(this.storedAtoms);
    if (!this.exists(key)) {
      console.warn(`Recoiler: Cannot update - Entity '${key}' does not exist`);
      return;
    }

    // @ts-ignore
    this.recoilMethods?.set(this.getAtom(key), value);
  }

  /** RESET ALL / CLEAN UP */
  public resetAll() {
    Object.keys(this.storedAtoms).forEach((key) => {
      this.recoilMethods?.reset(this.storedAtoms[key]);
    });

    this.recoilMethods = undefined;
    this.storedAtoms = {};
  }

  /** CHECK IF ATOM EXISTS BY KEY */
  private exists = (key: string) => !!this.storedAtoms[key];
}

/** First Recoiler Instance */
export const recoilManager = new Recoiler();
