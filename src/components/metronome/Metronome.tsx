import styled from "@emotion/styled";
import { css, keyframes } from "@emotion/react";
import { useMetronome } from "../../hooks";
import { Box } from "@mui/material";

const Wrapper = styled.div`
  width: 100%;
  margin: auto;
`;

const TempoDisplay = styled.span`
  display: block;
  font-size: 3rem;
  text-align: center;
`;

const swing = keyframes`
  0% {
    transform: rotate(-45deg);
  }
  100% {
    transform: rotate(45deg);
  }
`;

type PendulumProps = {
  isRunning: boolean;
  tempo: number;
};

const Pendulum = styled.div<PendulumProps>`
  width: 2px;
  height: 100%;
  position: absolute;
  left: 50%;
  bottom: 0;
  background-color: #c4c4c4;
  transform-origin: bottom center;
  animation: ${(props) =>
    props.isRunning &&
    css`
      ${swing} ${60 / props.tempo}s linear infinite alternate
    `};

  &:after {
    content: "";
    position: absolute;
    left: 50%;
    transform: translate(-50%);
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background-color: #c4c4c4;
    transition: top 0.5s;
    top: ${(props) =>
      ((props.tempo - 50) / Number(import.meta.env.VITE_MAX_TEMPO)) * 100}%;
  }
`;

const Metronome = () => {
  const { values, isRunning, beatCount } = useMetronome();

  return (
    <Wrapper>
      <TempoDisplay>
        {Number.isInteger(beatCount.measure) ? beatCount.measure : "&"}
      </TempoDisplay>
      <TempoDisplay>{values.tempo}bpm</TempoDisplay>
      <Box position="relative" height={300}>
        <Pendulum isRunning={isRunning} tempo={values.tempo} />
      </Box>
    </Wrapper>
  );
};

export default Metronome;
