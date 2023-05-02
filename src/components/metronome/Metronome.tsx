import styled from "@emotion/styled";
import { useMetronome, useTapTempo } from "../../hooks";
import useConfig from "../../hooks/use-config";
import { breakPoints } from "../../theme";
import Pendulum from "../common/Pendulum";

const Wrapper = styled.div`
  width: 100%;
  margin: auto;
`;

const TempoDisplay = styled.span<{ show: boolean }>`
  display: block;
  font-size: 2rem;
  text-align: center;
  user-select: none;
  visibility: ${(props) => (props.show ? "visible" : "hidden")};
  opacity: ${(props) => (props.show ? "1" : "0")};
  transition: opacity 1s, visibility 1s;
  transition-delay: 1s;

  ${breakPoints.md} {
    font-size: 3rem;
  }
`;

const BeatCount = styled.div`
  font-size: 12rem;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  font-family: "Bruno Ace SC", cursive;
  user-select: none;
`;

const PendulumWrapper = styled.div`
  position: relative;
  height: 155px;

  ${breakPoints.sm} {
    height: 250px;
  }
`;

const Metronome = () => {
  const [config] = useConfig();
  const { values, isRunning, beatCount, isInitialised } = useMetronome();
  const handleTap = useTapTempo();

  return (
    <Wrapper onClick={handleTap}>
      <TempoDisplay show={isInitialised}>{values.tempo}bpm</TempoDisplay>
      <PendulumWrapper>
        {config.display === "pendulum" ? (
          <Pendulum
            isRunning={!isInitialised || isRunning}
            weightPos={((values.tempo - 50) / Number(config.MAX_TEMPO)) * 100}
            tempo={!isInitialised ? 100 : values.tempo}
          />
        ) : (
          <BeatCount>
            <span>
              {Number.isInteger(beatCount.measure)
                ? beatCount.measure || "..."
                : "&"}
            </span>
          </BeatCount>
        )}
      </PendulumWrapper>
    </Wrapper>
  );
};

export default Metronome;
