import React from "react";

type TabsContextValue =
  | {
      value: number;
    }
  | undefined;

const TabsContext = React.createContext<TabsContextValue>(undefined);

export default TabsContext;
