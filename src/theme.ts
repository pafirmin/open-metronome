import { Theme } from "@emotion/react";

interface Palette {
  main: string;
  dark?: string;
  light?: string;
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
    main: "#333333",
    light: "#444444",
  },
};

export type AppTheme = typeof theme;

export default theme;
