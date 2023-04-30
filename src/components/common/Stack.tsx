import styled from "@emotion/styled";

interface Props {
  direction?: "row" | "column";
  justifyContent?:
    | "start"
    | "end"
    | "center"
    | "space-between"
    | "space-around"
    | "stretch";
  alignItems?:
    | "start"
    | "end"
    | "center"
    | "space-between"
    | "space-around"
    | "stretch";
}

const Stack = styled.div<Props>`
  display: flex;
  flex-direction: ${(props) => props.direction || "column"};
  justify-content: ${(props) => props.justifyContent || "start"};
  align-items: ${(props) => props.alignItems || "stretch"};
`;

export default Stack;
