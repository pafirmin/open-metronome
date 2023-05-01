import React from "react";

type TabsContextValue =
  | {
      value: number;
      focusedIndex: number;
      registerTab: (i: number) => void;
      handleNextTab: () => void;
      handlePrevTab: () => void;
    }
  | undefined;

const TabsContext = React.createContext<TabsContextValue>(undefined);

export default TabsContext;
