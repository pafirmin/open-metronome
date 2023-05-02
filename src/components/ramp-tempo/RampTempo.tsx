import styled from "@emotion/styled";
import { ChangeEvent, useEffect, useState } from "react";
import { useMetronome } from "../../hooks";
import useConfig from "../../hooks/use-config";
import ClassicMode from "../classic-mode/ClassicMode";
import { NumberInput, Stack } from "../common";

const Wrapper = styled.div`
  margin-top: 2rem;
  text-align: center;
`;

const RampTempo = () => {
  const [{ MIN_TEMPO, MAX_TEMPO }] = useConfig();
  const { beatCount, values, setValues, isRunning } = useMetronome();
  const [rampValues, setRampValues] = useState({
    amount: 10,
    frequency: 2,
  });
  const [completedMeasres, setCompletedMeasures] = useState(0);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setRampValues({
      ...rampValues,
      [e.target.name]: parseInt(e.target.value),
    });
  };

  useEffect(() => {
    if (beatCount.measure + values.division === values.metre + 1) {
      setCompletedMeasures((prev) => prev + 1);
    }
  }, [beatCount, values.division, values.metre]);

  useEffect(() => {
    if (rampValues.frequency === completedMeasres) {
      setCompletedMeasures(0);
      setValues((prev) => ({
        ...prev,
        tempo: Math.max(
          MIN_TEMPO,
          Math.min(prev.tempo + rampValues.amount, MAX_TEMPO)
        ),
      }));
    }
  }, [
    MIN_TEMPO,
    MAX_TEMPO,
    rampValues.frequency,
    rampValues.amount,
    completedMeasres,
    setValues,
  ]);

  useEffect(() => {
    if (!isRunning && completedMeasres > 0) {
      setCompletedMeasures(0);
    }
  }, [isRunning, completedMeasres]);

  return (
    <Wrapper>
      <h2>Ramp Tempo</h2>
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="center"
        gap={12}
      >
        <label htmlFor="amount">Ramp by</label>
        <NumberInput
          type="number"
          min={1}
          max={20}
          id="amount"
          name="amount"
          value={rampValues.amount}
          onChange={handleChange}
        />
        <span>bpm every</span>
        <NumberInput
          type="number"
          min={1}
          max={20}
          id="frequency"
          name="frequency"
          value={rampValues.frequency}
          onChange={handleChange}
        />
        <label htmlFor="frequency">measures</label>
      </Stack>
      <ClassicMode disabled={isRunning} />
    </Wrapper>
  );
};

export default RampTempo;
