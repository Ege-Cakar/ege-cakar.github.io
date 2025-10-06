import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";

const NavContainer = styled.nav`
  background-color: ${(props) => props.theme.colors.background};
  padding: 0.5rem 0;
  border-bottom: 1px solid ${(props) => props.theme.colors.border};
`;

const NavContent = styled.div`
  display: flex;
  justify-content: center;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;

  @media (max-width: ${(props) => props.theme.breakpoints.mobile}) {
    flex-direction: column;
  }
`;

const MobileMenuButton = styled.button`
  display: none;
  background: ${(props) => props.theme.colors.gray100};
  border: 1px solid ${(props) => props.theme.colors.border};
  color: ${(props) => props.theme.colors.text};
  font-size: 1.5rem;
  cursor: pointer;
  border-radius: 8px;
  padding: 0.25rem 0.5rem;
  transition:
    background-color ${(props) => props.theme.motion.duration.normal}
      ${(props) => props.theme.motion.easing.standard},
    color ${(props) => props.theme.motion.duration.normal}
      ${(props) => props.theme.motion.easing.standard},
    border-color ${(props) => props.theme.motion.duration.normal}
      ${(props) => props.theme.motion.easing.standard};

  @media (max-width: ${(props) => props.theme.breakpoints.mobile}) {
    display: block;
    align-self: flex-end;
    margin-right: 2rem;
  }
`;

const NavLinks = styled.ul`
  display: flex;
  list-style: none;
  margin: 0;
  padding: 0;

  @media (max-width: ${(props) => props.theme.breakpoints.mobile}) {
    flex-direction: column;
    width: 100%;
    display: ${(props) => (props.isOpen ? "flex" : "none")};
  }
`;

const NavItem = styled.li`
  margin: 0 1rem;

  @media (max-width: ${(props) => props.theme.breakpoints.mobile}) {
    margin: 0.5rem 0;
    width: 100%;
    text-align: center;
  }
`;

const StyledNavLink = styled(NavLink)`
  color: ${(props) => props.theme.colors.text};
  text-decoration: none;
  font-weight: 500;
  padding: 0.5rem 1rem;
  border-radius: 8px;
  transition:
    background-color ${(props) => props.theme.motion.duration.normal}
      ${(props) => props.theme.motion.easing.standard},
    color ${(props) => props.theme.motion.duration.normal}
      ${(props) => props.theme.motion.easing.standard},
    border-color ${(props) => props.theme.motion.duration.normal}
      ${(props) => props.theme.motion.easing.standard};
  border: 1px solid transparent;

  &:hover {
    background-color: ${(props) => props.theme.colors.gray100};
    color: ${(props) => props.theme.colors.text};
    border-color: ${(props) => props.theme.colors.border};
  }

  &.active {
    background-color: ${(props) => props.theme.colors.gray100};
    color: ${(props) => props.theme.colors.text};
    border-color: ${(props) => props.theme.colors.border};
  }
`;

const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <NavContainer>
      <NavContent>
        <MobileMenuButton onClick={toggleMenu}>
          <i className="fas fa-bars"></i>
        </MobileMenuButton>
        <NavLinks isOpen={isMenuOpen}>
          <NavItem>
            <StyledNavLink to="/" end>
              Home
            </StyledNavLink>
          </NavItem>
          <NavItem>
            <StyledNavLink to="/projects">Projects</StyledNavLink>
          </NavItem>
          <NavItem>
            <StyledNavLink to="/research">Research</StyledNavLink>
          </NavItem>
          <NavItem>
            <StyledNavLink to="/resume">Resume</StyledNavLink>
          </NavItem>
          <NavItem>
            <StyledNavLink to="/about">About</StyledNavLink>
          </NavItem>
          <NavItem>
            <StyledNavLink to="/blog">Blog</StyledNavLink>
          </NavItem>
          <NavItem>
            <StyledNavLink to="/contact">Contact</StyledNavLink>
          </NavItem>
        </NavLinks>
      </NavContent>
    </NavContainer>
  );
};

export default Navigation;
