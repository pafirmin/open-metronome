import styled from "@emotion/styled";
import { useMetronome } from "../../hooks";
import Controls from "../controls/Controls";
import ModeSelect from "../mode-select/ModeSelect";

const Wrapper = styled.div<{ show: boolean }>`
  max-width: 600px;
  margin: auto;
  padding: 0 0.5rem 0 0.5rem;
  visibility: ${(props) => (props.show ? "visible" : "hidden")};
  opacity: ${(props) => (props.show ? "1" : "0")};
  transition: opacity 1s, visibility 1s;
  transition-delay: 1s;
`;

const MainInterface = () => {
  const { isInitialised } = useMetronome();

  return (
    <Wrapper show={isInitialised}>
      <Controls />
      <ModeSelect />
    </Wrapper>
  );
};

export default MainInterface;
