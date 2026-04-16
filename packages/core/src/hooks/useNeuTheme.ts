import { useContext } from "react";
import { NeuContext } from "../components/NeuProvider";

export const useNeuTheme = () => {
  const ctx = useContext(NeuContext);
  if (!ctx) throw new Error("useNeuTheme must be used inside <NeuProvider>");
  return {
    ...ctx,
    isDark: ctx.theme === "dark",
    isLight: ctx.theme === "light",
  };
};
