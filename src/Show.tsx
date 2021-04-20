import React from "react";
import { useRecoilValue } from "recoil";
import { recoilManager } from "./recoiler/recoiler";
import { isPrimitive } from "./recoiler/utils";

interface ShowProps {
  recoilKey: string;
}

const Show: React.FC<ShowProps> = ({ recoilKey }) => {
  // @ts-ignore
  const value = useRecoilValue(recoilManager.getAtom(recoilKey));

  const text = isPrimitive(value) ? value : JSON.stringify(value);
  return <div className="show">{text}</div>;
};

export default Show;
