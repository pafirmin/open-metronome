import { Global, ThemeProvider } from "@emotion/react";
import styled from "@emotion/styled";
import { useMemo } from "react";
import Metronome from "./components/metronome/Metronome";
import ConfigProvider from "./contexts/config-context/config.provider";
import TickerProvider from "./contexts/ticker-context/ticker.provider";
import globalStyles from "./global-styles";
import theme, { breakPoints } from "./theme";
import LandingPage from "./components/landing-page/LandingPage";
import MainInterface from "./components/main-interface";

const MainWrapper = styled.main`
  margin: 1rem auto 0 auto;
  position: relative;
  padding-bottom: 1rem;
  width: 100vw;

  ${breakPoints.sm} {
    margin-top: 3rem;
  }
`;

function App() {
  const ctx = useMemo(() => new AudioContext(), []);

  return (
    <ConfigProvider>
      <ThemeProvider theme={theme}>
        <TickerProvider audioContext={ctx}>
          <Global styles={globalStyles} />
          <MainWrapper>
            <Metronome />
            <LandingPage />
            <MainInterface />
          </MainWrapper>
        </TickerProvider>
      </ThemeProvider>
    </ConfigProvider>
  );
}

export default App;
