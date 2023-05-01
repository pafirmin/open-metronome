import { ReactElement } from "react";
import { useTabs } from "../../hooks";

interface Props {
  index: number;
  children: ReactElement;
}

const TabContent = ({ index, children }: Props) => {
  const { value } = useTabs();

  return (
    <div
      role="tabpanel"
      tabIndex={0}
      id={`tabpanel-${index}`}
      aria-labelledby={`tab-${index}`}
    >
      {value === index && children}
    </div>
  );
};

export default TabContent;
