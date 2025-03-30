import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const HeaderContainer = styled.header`
  background-color: ${props => props.theme.colors.darkerBlue};
  padding: 1.5rem 0;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

const HeaderContent = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;

  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    flex-direction: column;
    gap: 1rem;
  }
`;

const Logo = styled(Link)`
  font-size: 1.8rem;
  font-weight: 700;
  color: ${props => props.theme.colors.textLight};
  text-decoration: none;
`;

const SocialLinks = styled.div`
  display: flex;
  gap: 1rem;
`;

const SocialLink = styled.a`
  color: ${props => props.theme.colors.textLight};
  font-size: 1.5rem;
  transition: color 0.3s ease;

  &:hover {
    color: ${props => props.theme.colors.accentTeal};
  }
`;

const Header = () => {
  return (
    <HeaderContainer>
      <HeaderContent>
        <Logo to="/">Ege Cakar</Logo>
        <SocialLinks>
          <SocialLink href="https://github.com/Ege-Cakar" target="_blank" aria-label="GitHub">
            <i className="fab fa-github"></i>
          </SocialLink>
          <SocialLink href="https://linkedin.com/in/egecakar" target="_blank" aria-label="LinkedIn">
            <i className="fab fa-linkedin"></i>
          </SocialLink>
          <SocialLink href="mailto:ecakar@college.harvard.edu" aria-label="Email">
            <i className="fas fa-envelope"></i>
          </SocialLink>
        </SocialLinks>
      </HeaderContent>
    </HeaderContainer>
  );
};

export default Header;
