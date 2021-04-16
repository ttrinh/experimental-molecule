import React from "react";
import { useRecoilValue } from "recoil";
import { recoilManager } from "./recoiler/recoiler";

interface ShowProps {
  recoilKey: string;
}

const Show: React.FC<ShowProps> = ({ recoilKey }) => {
  const key = useRecoilValue(recoilManager.getAtom(recoilKey));

  return <div className="show">{key}</div>;
};

export default Show;
