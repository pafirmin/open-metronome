import { ReactElement } from "react";
import { useTabs } from "../../hooks";

interface Props {
  index: number;
  children: ReactElement;
}

const TabContent = ({ index, children }: Props) => {
  const { value } = useTabs();

  if (value !== index) {
    return null;
  }

  return children;
};

export default TabContent;
