import styled from "@emotion/styled";
import { KeyboardEvent, useEffect, useRef } from "react";
import { useTabs } from "../../hooks";

interface Props {
  index: number;
  title: string;
  handleClick: (val: number) => void;
}

const StyledTab = styled.button<{ isActive: boolean }>`
  background: none;
  border: none;
  border-bottom: ${(props) => `2px solid ${props.theme.colors.text.main}`};
  text-align: center;
  padding-bottom: 0.3rem;
  position: relative;
  flex: 1;
  color: ${(props) =>
    props.isActive ? props.theme.colors.text.main : "#9d9d9d"};
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
  const { value, focusedIndex, handleNextTab, handlePrevTab, registerTab } =
    useTabs();
  const tabRef = useRef<HTMLButtonElement>(null);

  const handleKeyDown = (e: KeyboardEvent) => {
    switch (e.key) {
      case "ArrowRight":
        handleNextTab();
        break;
      case "ArrowLeft":
        handlePrevTab();
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    registerTab(index);
  }, [registerTab, index]);

  useEffect(() => {
    if (focusedIndex === index) {
      tabRef.current?.focus();
    }
  }, [focusedIndex, index]);

  return (
    <StyledTab
      role="tab"
      tabIndex={index === value ? undefined : -1}
      aria-controls={`tabpanel-${index}`}
      aria-selected={index === focusedIndex}
      isActive={index === value}
      onClick={() => handleClick(index)}
      onKeyDown={handleKeyDown}
      ref={tabRef}
    >
      {title}
    </StyledTab>
  );
};

export default Tab;
