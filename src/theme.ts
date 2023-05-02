import { Theme } from "@emotion/react";

interface Palette {
  main: string;
  dark?: string;
  light?: string;
}

interface BreakPoints {
  xs: string;
  sm: string;
  md: string;
  lg: string;
  xl: string;
}

declare module "@emotion/react" {
  export interface Theme {
    colors: {
      text: Palette;
      accent: Palette;
      primary: Palette;
    };
    background: Palette;
  }
}

const theme: Theme = {
  colors: {
    text: { main: "#dfdfdf" },
    accent: { main: "#f24c4c" },
    primary: { main: "#3d6cac" },
  },
  background: {
    main: "#000",
    light: "#444444",
  },
};

const getMediaQuery = (px: number) => {
  return `@media (min-width: ${px}px)`;
};

export const breakPoints: BreakPoints = {
  xs: getMediaQuery(0),
  sm: getMediaQuery(768),
  md: getMediaQuery(1024),
  lg: getMediaQuery(1200),
  xl: getMediaQuery(1450),
};

export default theme;
