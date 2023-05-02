import { css, keyframes } from "@emotion/react";
import styled from "@emotion/styled";

type PendulumProps = {
  isRunning: boolean;
  weightPos: number;
  tempo: number;
};

const swing = keyframes`
  0% {
    transform: rotate(-45deg);
  }
  100% {
    transform: rotate(45deg);
  }
`;

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
    padding: 300%;
    border-radius: 50%;
    background-color: #c4c4c4;
    transition: top 0.5s;
    top: ${(props) => props.weightPos}%;
  }
`;

export default Pendulum;
