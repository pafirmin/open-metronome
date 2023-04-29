import { Global } from "@emotion/react";
import styled from "@emotion/styled";
import Controls from "./components/controls/Controls";
import CustomProgram from "./components/custom-program";
import Metronome from "./components/metronome/Metronome";
import TickerProvider from "./contexts/ticker-context/ticker.provider";
import globalStyles from "./global-styles";

const MainWrapper = styled.main`
  width: 100%;
  margin: 3rem auto 0 auto;

  @media screen and (min-width: 600px) {
    width: 600px;
  }
`;

function App() {
  const ctx = new AudioContext();

  return (
    <TickerProvider audioContext={ctx}>
      <Global styles={globalStyles} />
      <MainWrapper>
        <Metronome />
        <Controls />
        <CustomProgram />
      </MainWrapper>
    </TickerProvider>
  );
}

export default App;
