import styled from "@emotion/styled";
import { useMetronome } from "../../hooks";
import { SlMusicToneAlt, SlMusicTone } from "react-icons/sl";
import { IconButton } from "../common";
import { useTheme } from "@emotion/react";
import { Stack } from "../common";
import TapTempo from "./TapTempo";

const Wrapper = styled.div`
  margin: 1rem auto 0 auto;
  text-align: center;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margintop: 1rem;
`;

const StartBtn = styled.button`
  border-radius: 0;
  font-size: 1.6em;
  padding: 0.6rem 1rem;
  background: ${({ theme }) => theme.colors.primary.main};
  font: inherit;
  color: inherit;
  border: 1px solid #bdbdbd;
  cursor: pointer;
  width: 100px;
  height: 50px;

  &:hover {
    background: #33489b;
  }
`;

const Controls = () => {
  const { values, updateValues, isRunning, reset, startPulse } = useMetronome();
  const theme = useTheme();

  const handleNoteValue = (val: 1 | 0.5) => {
    updateValues((prev) => ({ ...prev, division: val }));
  };

  return (
    <Wrapper>
      <Stack alignItems="center" style={{ width: "33%" }}>
        <TapTempo />
      </Stack>
      <StartBtn onClick={isRunning ? reset : startPulse}>
        {isRunning ? "Stop" : "Start"}
      </StartBtn>
      <div style={{ width: "33%" }}>
        <span style={{ display: "block" }}>Note</span>
        <Stack direction="row" justifyContent="space-around">
          <IconButton
            aria-label="quarter note pulse"
            onClick={() => handleNoteValue(1)}
          >
            <SlMusicTone
              color={
                values.division === 1 ? theme.colors.accent.main : "inherit"
              }
            />
          </IconButton>
          <IconButton
            aria-label="8th note pulse"
            onClick={() => handleNoteValue(0.5)}
          >
            <SlMusicToneAlt
              color={
                values.division === 0.5 ? theme.colors.accent.main : "inherit"
              }
            />
          </IconButton>
        </Stack>
      </div>
    </Wrapper>
  );
};

export default Controls;
