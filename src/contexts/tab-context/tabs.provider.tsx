import { ReactNode } from "react";
import TabsContext from "./tabs.context";

interface Props {
  value: number;
  children: ReactNode;
}

const TabsProvider = ({ value, children }: Props) => {
  return (
    <TabsContext.Provider value={{ value }}>{children}</TabsContext.Provider>
  );
};

export default TabsProvider;
