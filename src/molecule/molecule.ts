import { atom, DefaultValue, RecoilState, selector, waitForAll } from "recoil";
import { compareAndSet } from "./utils";

// 'any' usage is essential here to correctly extract type of key and value from entity
export const molecule = <T extends Record<string, any>>(
  moleculeKey: string,
  obj: T
) => {
  const keys = Object.keys(obj);

  // Internally create and store atoms
  const atoms = keys.reduce(
    (carrier, k) => ({
      ...carrier,
      [k]: atom({
        key: `${moleculeKey}.${k}`,
        default: obj[k],
      }),
    }),
    {} as Record<keyof T, RecoilState<T[keyof T]>>
  );

  /**
   * Get an atom by key
   * @param key a key in entity
   * @returns RecoilState<value type>
   */
  const getAtom = <K extends keyof T>(key: K): RecoilState<T[K]> => {
    // @ts-ignore - having <K extends keyof T> to exact correct type of value from key
    return atoms[key];
  };

  // Care
  const getFull_SLOW = selector<T>({
    key: moleculeKey,
    get: ({ get }) => {
      const values = get(waitForAll(keys.map((k) => {
        return atoms[k];
      })));      

      return keys.reduce(
        (carrier, k, idx) => ({
          ...carrier,
          [k]: values[idx],
        }),
        {} as T
      );
    },
    set: ({ get, set, reset }, newValue) => {
      if (newValue instanceof DefaultValue) {
        keys.forEach((k) => reset(getAtom(k)));
        return;
      }

      const _set = compareAndSet(get, set);
      keys.forEach((k) => _set(getAtom(k), newValue[k]));
    },
  });

  return {
    getAtom,
    getFull_SLOW,
  };
};
