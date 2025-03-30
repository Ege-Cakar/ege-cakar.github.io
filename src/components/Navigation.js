import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';

const NavContainer = styled.nav`
  background-color: ${props => props.theme.colors.drabDarkBrown};
  padding: 0.5rem 0;
  border-bottom: 3px solid ${props => props.theme.colors.flame};
`;

const NavContent = styled.div`
  display: flex;
  justify-content: center;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;

  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    flex-direction: column;
  }
`;

const MobileMenuButton = styled.button`
  display: none;
  background: none;
  border: none;
  color: ${props => props.theme.colors.textLight};
  font-size: 1.5rem;
  cursor: pointer;
  
  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
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

  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    flex-direction: column;
    width: 100%;
    display: ${props => (props.isOpen ? 'flex' : 'none')};
  }
`;

const NavItem = styled.li`
  margin: 0 1rem;

  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    margin: 0.5rem 0;
    width: 100%;
    text-align: center;
  }
`;

const StyledNavLink = styled(NavLink)`
  color: ${props => props.theme.colors.textLight};
  text-decoration: none;
  font-weight: 500;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: ${props => props.theme.colors.flame};
    color: ${props => props.theme.colors.textDark};
  }
  
  &.active {
    background-color: ${props => props.theme.colors.flame};
    color: ${props => props.theme.colors.textDark};
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
            <StyledNavLink to="/" end>Home</StyledNavLink>
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
            <StyledNavLink to="/contact">Contact</StyledNavLink>
          </NavItem>
        </NavLinks>
      </NavContent>
    </NavContainer>
  );
};

export default Navigation;
