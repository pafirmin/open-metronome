import styled from "@emotion/styled";

const Button = styled.button`
  border: 2px solid ${(props) => props.theme.colors.text.main};
  cursor: pointer;
  font-size: inherit;
  color: inherit;
  padding: 0.4rem 0.8rem;
  background: transparent;
`;

export default Button;
