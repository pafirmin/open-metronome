import styled from "@emotion/styled";
import { MouseEvent, ReactNode } from "react";

interface Props {
  onClick?: (e: MouseEvent) => void;
  children: ReactNode;
  "aria-label"?: string;
}

const StyledButton = styled.button`
  position: relative;
  cursor: pointer;
  background: none;
  border: none;
  color: inherit;
  font-size: 1.7rem;
  border-radius: 100%;
  line-height: 0;

  &:hover::after {
    content: "";
    position: absolute;
    width: 120%;
    height: 0;
    padding-top: 120%;
    top: 50%;
    left: 50%;
    transform: translateY(-50%) translateX(-50%);
    border-radius: 100%;
    background: #8f8f8f;
    opacity: 0.3;
    z-index: -1;
  }
`;

const IconButton = ({ onClick, children, ...props }: Props) => {
  return (
    <StyledButton aria-label={props["aria-label"]} onClick={onClick}>
      {children}
    </StyledButton>
  );
};

export default IconButton;
