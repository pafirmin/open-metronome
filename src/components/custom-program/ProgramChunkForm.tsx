import styled from "@emotion/styled";
import { ChangeEvent, useRef, useState } from "react";
import ReactSlider from "react-slider";
import { ProgramChunk } from "../../common/interfaces/program-chunk.interface";
import useConfig from "../../hooks/use-config";

interface Props {
  onSubmit: (chunk: ProgramChunk) => void;
}

const ProgramForm = styled.form`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  font-size: 1.2rem;
`;

const NumberInput = styled.input`
  width: 65px;
  height: 35px;
  text-align: center;
  padding: 0.4rem;
  font-size: inherit;
  border: none;
`;

const TempoPopover = styled.div<{
  top: number;
  left: number;
  visible: boolean;
}>`
  position: fixed;
  visibility: ${(props) => (props.visible ? "visible" : "hidden")};
  opacity: ${(props) => (props.visible ? "100" : "0")};
  top: ${(props) => props.top}px;
  left: ${(props) => props.left}px;
  transform: translateX(-50%);
  transition: opacity 0.3s, visibility 0.3s;
  z-index: 1000;

  &:hover {
    visibility: visible;
    opacity: 100%;
  }
`;

const PopoverContent = styled.div`
  position: relative;
  background: #ffffffc4;
  box-shadow: 0px 0px 8px 3px #2c2c2c;
  margin-top: 20px;
  width: 200px;
  padding: 0.8rem;
  box-sizing: border-box;

  &::before {
    content: "";
    position: absolute;
    top: -12px;
    left: 50%;
    transform: translateX(-50%);
    width: 0;
    height: 0;
    border-style: solid;
    border-width: 0 12px 12px 12px;
    border-color: transparent transparent #ffffffc4 transparent;
  }
`;

const ProgramChunkForm = ({ onSubmit }: Props) => {
  const [{ MIN_TEMPO, MAX_TEMPO }] = useConfig();
  const tempoRef = useRef<HTMLInputElement>(null);
  const [showSlider, setShowSlider] = useState(false);

  const popoverTop = tempoRef.current?.getBoundingClientRect().bottom || 0;
  const popoverLeft =
    Number(tempoRef.current?.getBoundingClientRect().x) +
    Number(tempoRef.current?.offsetWidth) / 2;

  const [chunkValues, setChunkValues] = useState<ProgramChunk>({
    id: "",
    measures: 1,
    metre: 4,
    tempo: 120,
    silent: false,
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setChunkValues({
      ...chunkValues,
      [e.target.name]: parseInt(e.target.value),
    });
  };

  return (
    <ProgramForm
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit(chunkValues);
      }}
    >
      <NumberInput
        type="number"
        min={1}
        max={1000}
        name="measures"
        value={chunkValues.measures}
        onChange={handleChange}
      />
      <span>bars of</span>
      <NumberInput
        type="number"
        min={2}
        max={32}
        name="metre"
        value={chunkValues.metre}
        onChange={handleChange}
      />
      <span>at</span>
      <NumberInput
        ref={tempoRef}
        min={MIN_TEMPO}
        max={MAX_TEMPO}
        type="number"
        name="tempo"
        value={chunkValues.tempo}
        onMouseOver={() => setShowSlider(true)}
        onMouseLeave={() => setShowSlider(false)}
        onChange={handleChange}
      />
      <TempoPopover top={popoverTop} left={popoverLeft} visible={showSlider}>
        <PopoverContent>
          <ReactSlider
            value={chunkValues.tempo}
            min={MIN_TEMPO}
            max={MAX_TEMPO}
            onChange={(num) => setChunkValues({ ...chunkValues, tempo: num })}
            trackClassName={"sliderTrack"}
            thumbClassName={"sliderThumb"}
            className={"slider"}
          />
        </PopoverContent>
      </TempoPopover>
      <span>bpm</span>
      <button type="submit" color="inherit">
        add
      </button>
    </ProgramForm>
  );
};

export default ProgramChunkForm;
