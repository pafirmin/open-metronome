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
  transition: 0.2s;

  &:hover {
    transform: scale(1.2);
  }
`;

export default IconButton;
