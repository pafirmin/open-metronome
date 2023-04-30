import { useContext } from "react";
import TabsContext from "../contexts/tab-context/tabs.context";

export default function useTabs() {
  const context = useContext(TabsContext);

  if (!context) {
    throw new Error("useTabs must be used within TabsProvider");
  }

  return context;
}
