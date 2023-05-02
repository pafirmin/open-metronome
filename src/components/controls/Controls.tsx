import { useTheme } from "@emotion/react";
import styled from "@emotion/styled";
import { Tooltip } from "react-tooltip";
import { SlMusicTone, SlMusicToneAlt, SlQuestion } from "react-icons/sl";
import { useMetronome } from "../../hooks";
import { IconButton, Stack } from "../common";

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
    background: #3b639a;
  }
`;

const Controls = () => {
  const { values, setValues, isRunning, reset, startPulse } = useMetronome();
  const theme = useTheme();

  const handleNoteValue = (val: 1 | 0.5) => {
    setValues((prev) => ({ ...prev, division: val }));
  };

  return (
    <Wrapper>
      <Stack alignItems="center" style={{ width: "33%" }} gap={12}>
        Tap Tempo
        <SlQuestion id="tap-tempo" size="1.7rem" />
        <Tooltip anchorSelect="#tap-tempo" clickable>
          You can set the tempo by tapping a beat anywhere on the top half of
          this app
        </Tooltip>
      </Stack>
      <StartBtn onClick={isRunning ? reset : startPulse}>
        {isRunning ? "Stop" : "Start"}
      </StartBtn>
      <Stack style={{ width: "33%" }} gap={12}>
        <span style={{ display: "block" }}>Note Value</span>
        <Stack direction="row" justifyContent="space-between">
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
      </Stack>
    </Wrapper>
  );
};

export default Controls;
