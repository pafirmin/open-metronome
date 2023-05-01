import { PropsWithChildren, useState } from "react";
import TabsContext from "./tabs.context";

interface Props {
  value: number;
}

const TabsProvider = ({ value, children }: PropsWithChildren<Props>) => {
  const [focusedIndex, setFocusedIndex] = useState(-1);
  const [tabs, setTabs] = useState<Set<number>>(new Set());

  const registerTab = (index: number) => {
    const added = tabs.add(index);
    setTabs(added);
  };

  const handleNextTab = () => {
    const index = Math.max(focusedIndex, 0);
    setFocusedIndex((index + 1) % tabs.size);
  };

  const handlePrevTab = () => {
    const index = Math.max(focusedIndex, 0);
    setFocusedIndex((((index - 1) % tabs.size) + tabs.size) % tabs.size);
  };

  return (
    <TabsContext.Provider
      value={{ value, focusedIndex, registerTab, handleNextTab, handlePrevTab }}
    >
      {children}
    </TabsContext.Provider>
  );
};

export default TabsProvider;
