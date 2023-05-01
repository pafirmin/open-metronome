import styled from "@emotion/styled";
import { useTabs } from "../../hooks";

interface Props {
  index: number;
  title: string;
  handleClick: (val: number) => void;
}

const StyledTab = styled.div<{ isActive: boolean }>`
  border-bottom: ${(props) => `2px solid ${props.theme.colors.text.main}`};
  text-align: center;
  padding-bottom: 0.3rem;
  position: relative;
  flex: 1;
  color: ${(props) =>
    props.isActive ? props.theme.colors.text.light : "#9d9d9d"};
  cursor: pointer;
  transition: color 0.3s;

  &:after {
    content: "";
    position: absolute;
    bottom: -2px;
    left: 50%;
    transform: translateX(-50%);
    height: 2px;
    width: ${(props) => (props.isActive ? "100%" : "0")};
    background-color: ${(props) => props.theme.colors.accent.main};
    transition: width 0.3s;
  }
`;

const Tab = ({ title, index, handleClick }: Props) => {
  const { value } = useTabs();

  return (
    <StyledTab isActive={index === value} onClick={() => handleClick(index)}>
      {title}
    </StyledTab>
  );
};

export default Tab;
