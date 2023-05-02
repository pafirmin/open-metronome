import styled from "@emotion/styled";
import { ReactElement } from "react";
import { useTabs } from "../../hooks";
import { breakPoints } from "../../theme";

interface Props {
  index: number;
  children: ReactElement;
}

const Wrapper = styled.div`
  margin-top: 1rem;
  text-align: center;

  ${breakPoints.sm} {
    margin-top: 2rem;
  }
`;

const TabContent = ({ index, children }: Props) => {
  const { value } = useTabs();

  return (
    <Wrapper
      role="tabpanel"
      tabIndex={0}
      id={`tabpanel-${index}`}
      aria-labelledby={`tab-${index}`}
    >
      {value === index && children}
    </Wrapper>
  );
};

export default TabContent;
