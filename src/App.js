import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import styled, { ThemeProvider, keyframes } from "styled-components";
import GlobalStyle from "./styles/GlobalStyle";
import theme from "./styles/theme";

// Components
import Header from "./components/Header";
import Navigation from "./components/Navigation";
import Footer from "./components/Footer";

// Pages
import Home from "./pages/Home";
import Projects from "./pages/Projects";
import Research from "./pages/Research";
import Resume from "./pages/Resume";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Blog from "./pages/Blog";
import BlogPostMlpMixerIcl from "./pages/BlogPostMlpMixerIcl";

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(8px); }
  to { opacity: 1; transform: translateY(0); }
`;

const gradientIn = keyframes`
  from { opacity: 0.15; transform: translateY(12px); }
  to { opacity: 0; transform: translateY(0); }
`;

const RouteTransition = styled.div`
  position: relative;
  will-change: opacity, transform;
  animation: ${fadeIn} ${(props) => props.theme.motion.duration.slow}
    ${(props) => props.theme.motion.easing.emphasized};
  @media (prefers-reduced-motion: reduce) {
    animation: none;
  }
  &::before {
    content: "";
    position: absolute;
    inset: 0;
    pointer-events: none;
    background: linear-gradient(
      180deg,
      rgba(17, 24, 39, 0.06),
      rgba(255, 255, 255, 0)
    );
    opacity: 0;
    transform: translateY(10px);
    animation: ${gradientIn} ${(props) => props.theme.motion.duration.slow}
      ${(props) => props.theme.motion.easing.standard};
  }
  @media (prefers-reduced-motion: reduce) {
    &::before {
      display: none;
    }
  }
`;

const AppRoutes = () => {
  const location = useLocation();
  return (
    <RouteTransition key={location.pathname}>
      <Routes location={location}>
        <Route path="/" element={<Home />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/research" element={<Research />} />
        <Route path="/resume" element={<Resume />} />
        <Route path="/about" element={<About />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/blog/mlp-mixer-icl" element={<BlogPostMlpMixerIcl />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </RouteTransition>
  );
};

function App() {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <Router>
        <Header />
        <Navigation />
        <main>
          <AppRoutes />
        </main>
        <Footer />
      </Router>
    </ThemeProvider>
  );
}

export default App;
