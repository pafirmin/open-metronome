import { useContext } from "react";
import ConfigContext from "../contexts/config-context/config.context";

export default function useConfig() {
  const ctx = useContext(ConfigContext);

  if (!ctx) {
    throw new Error("useConfig can only be used within a ConfigProvider");
  }

  return ctx;
}
