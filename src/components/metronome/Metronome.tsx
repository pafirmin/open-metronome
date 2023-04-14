import styled from "@emotion/styled";
import { css, keyframes } from '@emotion/react'
import { useMetronome } from "../../hooks";

const Wrapper = styled.div`
  position: relative;
  width: 100%;
  height: 300px;
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
  isRunning: boolean
  tempo: number
};

const Pendulum = styled.div<PendulumProps>`
  width: 2px;
  height: 80%;
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
    top: ${(props) => ((props.tempo - 50) / 168) * 100}%;
    left: 50%;
    transform: translate(-50%);
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background-color: #c4c4c4;
    transition: top 0.5s;
  }
`;

const Metronome = () => {
  const { values, isRunning } = useMetronome()

  return (
    <Wrapper>
      <TempoDisplay>{values.tempo}bpm</TempoDisplay>
      <Pendulum isRunning={isRunning} tempo={values.tempo} />
    </Wrapper>
  );
};

export default Metronome
