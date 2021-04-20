import React from "react";
import { useRecoilValue } from "recoil";
import { recoilManager } from "./recoiler/recoiler";
import { isPrimitive } from "./recoiler/utils";

interface InputProps {
  recoilKey: string;
}

const Input: React.FC<InputProps> = ({ recoilKey }) => {
  // @ts-ignore
  const value = useRecoilValue(recoilManager.getAtom(recoilKey));

  const text = isPrimitive(value) ? value : JSON.stringify(value);
  return (
    <input
      value={`${text}`}
      onChange={(e) => recoilManager.setAtom(recoilKey, e.target.value)}
    />
  );
};

export default Input;
