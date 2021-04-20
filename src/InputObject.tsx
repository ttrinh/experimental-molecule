import React from "react";
import { useRecoilValue } from "recoil";
import { recoilManager } from "./recoiler/recoiler";

interface InputObjectProps {
  // recoilKey: string;
  // keys: string[];
}

interface Person {
  name: string;
  age: number;
  actions: {
    eat: string;
  };
}

const InputObject: React.FC<InputObjectProps> = () => {
  // @ts-ignore
  const person = useRecoilValue<Person>(recoilManager.getAtom("person"));

  if (!person) {
    return null;
  }

  return (
    <input
      value={`${person.name}`}
      onChange={(e) =>
        recoilManager.setAtom("person", { name: e.target.value })
      }
    />
  );
};

export default InputObject;
