import { useMetronome } from "../../hooks";
import styled from "@emotion/styled";
import drums from "../../assets/images/drums.jpg";
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

const ImageWrapper = styled.div<{ show: boolean }>`
  position: fixed;
  top: 0;
  width: 100%;
  height: 100vh;
  background-image: url(${drums});
  background-size: auto 80%;
  background-position: right bottom;
  background-repeat: no-repeat;
  z-index: -1000;
  visibility: hidden;
  opacity: ${(props) => (props.show ? "1" : "0")};
  transition: opacity 1s, visibility 1s;
  ${breakPoints.sm} {
    visibility: ${(props) => (props.show ? "visible" : "hidden")};
  }
`;

const MainTitle = styled.div`
  font-family: "Bruno Ace SC", cursive;
  font-size: 2.5rem;
  text-align: center;
  ${breakPoints.md} {
    font-size: 4rem;
  } 
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
      <ImageWrapper aria-hidden="true" show={!isInitialised} />
      <MainTitle>open metronome</MainTitle>
      <div style={{ flexGrow: 1 }}>
        <Button onClick={handleClick}>Get started</Button>
      </div>
    </Wrapper>
  );
};

export default LandingPage;
