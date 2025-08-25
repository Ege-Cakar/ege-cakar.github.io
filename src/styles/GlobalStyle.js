import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  body {
    font-family: ${props => props.theme.fonts.primary};
    background-color: ${props => props.theme.colors.background};
    color: ${props => props.theme.colors.text};
    line-height: 1.6;
  }

  main {
    max-width: 1200px;
    margin: 2rem auto;
    padding: 0 2rem;
  }

  h1, h2, h3, h4, h5, h6 {
    margin-bottom: 1rem;
    font-weight: 700;
  }

  p {
    margin-bottom: 1rem;
  }

  a {
    text-decoration: none;
    color: ${props => props.theme.colors.text};
    transition: color 0.2s ease, background-color 0.2s ease;
  }

  a:hover {
    color: ${props => props.theme.colors.gray600};
  }

  ul, ol {
    margin-left: 2rem;
    margin-bottom: 1rem;
  }

  img {
    max-width: 100%;
  }

  button {
    cursor: pointer;
  }
`;

export default GlobalStyle;
