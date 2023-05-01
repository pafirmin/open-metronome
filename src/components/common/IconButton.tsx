import styled from "@emotion/styled";

const IconButton = styled.button`
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

export default IconButton;
