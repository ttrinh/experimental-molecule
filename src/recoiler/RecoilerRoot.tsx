/**
 * Initiate Recoiler by assigning Recoil Setter to the manager
 */
import React, { useEffect } from "react";
import { useRecoilCallback } from "recoil";
import { Recoiler, recoilManager } from "./recoiler";

export const RecoilerInit: React.FC = () => {
  const { initRecoiler } = useInitRecoiler();

  useEffect(() => {
    initRecoiler(recoilManager);

    return () => {
      recoilManager.resetAll();
    }
  }, [initRecoiler]);

  return null;
};

export const useInitRecoiler = () => {
  return {
    initRecoiler: useRecoilCallback(
      (recoilCallbacks) => (recoiler: Recoiler) => {
        recoiler.bindRecoilMethods(recoilCallbacks);
      }
    ),
  };
};
