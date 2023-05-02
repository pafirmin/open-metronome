import { css, Theme } from "@emotion/react";

export default (theme: Theme) => css`
  * {
    box-sizing: border-box;
  }

  html {
    font-size: 18px;
  }

  body {
    background-color: ${theme.background.main};
    color: ${theme.colors.text.main};
    font-family: "Roboto", "Montserrat", sans-serif;
  }

  h2 {
    margin-top: 0;
    margin-bottom: 1rem;
  }

  h3 {
    margin-top: 0;
    margin-bottom: 0.5rem;
  }
  /* Number input buttons always visible */
  input[type="number"]::-webkit-inner-spin-button,
  input[type="number"]::-webkit-outer-spin-button {
    opacity: 1;
  }

  .slider {
    width: 100%;
    margin: auto;
    height: 20px;
  }

  .sliderTrack {
    top: 8px;
    height: 4px;
    background: ${theme.colors.accent.main};
  }

  .sliderThumb {
    cursor: pointer;
    /*color for the thumb */
    background: ${theme.colors.accent.main};
    /* shape of the thumb: circle */
    width: 20px;
    height: 20px;
    border-radius: 100%;
    /* remove default outline when selected */
    outline: none;
  }

  .sliderThumb:hover {
    box-shadow: 0 0 0 8px #ea585854;
  }
`;
