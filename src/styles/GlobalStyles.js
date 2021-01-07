import { createGlobalStyle } from 'styled-components';


export const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
  }

  *,
  *::before,
  *::after {
    box-sizing: inherit;
  }

  body {
    box-sizing: border-box;
    font-family: 'Roboto', sans-serif;
    min-height: 100vh;
  }

  button:focus {
    outline: 2px solid #00c3ff;
  }

  /* used by KeyDownListener and MouseDownListener */
  .intent-mouse button {
    outline: none !important;
  }

  ::-webkit-scrollbar {
    width: 20px;
  }

  ::-webkit-scrollbar-track {
    background: #1d1d1d;
  }

  ::-webkit-scrollbar-thumb {
    background-image: linear-gradient(to bottom, #666, #444);
    border: 1px solid #1d1d1d;
    border-radius: 15px;
  }

  ::-webkit-scrollbar-thumb:hover {
    background-image: linear-gradient(to bottom, #888, #666);
  }
`;