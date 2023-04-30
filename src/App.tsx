import { Global, ThemeProvider } from "@emotion/react";
import styled from "@emotion/styled";
import Controls from "./components/controls/Controls";
import Metronome from "./components/metronome/Metronome";
import ModeSelect from "./components/mode-select/ModeSelect";
import TickerProvider from "./contexts/ticker-context/ticker.provider";
import globalStyles from "./global-styles";
import theme from "./theme";

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
    <ThemeProvider theme={theme}>
      <TickerProvider audioContext={ctx}>
        <Global styles={globalStyles} />
        <MainWrapper>
          <Metronome />
          <Controls />
          <ModeSelect />
        </MainWrapper>
      </TickerProvider>
    </ThemeProvider>
  );
}

export default App;
