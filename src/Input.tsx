import React from "react";
import { useRecoilValue } from "recoil";
import { recoilManager } from "./recoiler/recoiler";

interface InputProps {
  recoilKey: string;
}

const Input: React.FC<InputProps> = ({ recoilKey }) => {
  const value = useRecoilValue(recoilManager.getAtom(recoilKey));

  return (
    <input
      value={`${value}`}
      onChange={(e) => recoilManager.setAtom(recoilKey, e.target.value)}
    />
  );
};

export default Input;
