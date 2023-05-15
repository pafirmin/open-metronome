import { useMetronome } from "../../hooks";
import styled from "@emotion/styled";
import { Button } from "../common";
import { breakPoints } from "../../theme";

const Wrapper = styled.div<{ show: boolean }>`
  position: absolute;
  width: 100vw;
  top: 50%:
  left: 50%;
  gap: 2rem;
  transform: translateX(-50%), translateY(-50%);
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  margin: auto;
  visibility: ${(props) => (props.show ? "visible" : "hidden")};
  opacity: ${(props) => (props.show ? "1" : "0")};
  transition: opacity 1s, visibility 1s;
`;

const MainTitle = styled.div`
  font-family: "Bruno Ace SC", cursive;
  font-size: 2.5rem;
  text-align: center;

  ${breakPoints.md} {
    font-size: 4rem;
  }
`;

const LandingPage = () => {
  const { initAudioCtx, isInitialised } = useMetronome();

  const handleClick = async () => {
    try {
      await initAudioCtx();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Wrapper show={!isInitialised}>
      <MainTitle>open metronome</MainTitle>
      <div style={{ flexGrow: 1 }}>
        <Button onClick={handleClick}>Get started</Button>
      </div>
    </Wrapper>
  );
};

export default LandingPage;
