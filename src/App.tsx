import { Global, ThemeProvider } from "@emotion/react";
import styled from "@emotion/styled";
import { useMemo } from "react";
import Metronome from "./components/metronome/Metronome";
import ConfigProvider from "./contexts/config-context/config.provider";
import TickerProvider from "./contexts/ticker-context/ticker.provider";
import globalStyles from "./global-styles";
import theme from "./theme";
import LandingPage from "./components/landing-page/LandingPage";
import MainInterface from "./components/main-interface";

const MainWrapper = styled.main`
  margin: 3rem auto 0 auto;
  /* height: 100vh; */
  position: relative;
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
