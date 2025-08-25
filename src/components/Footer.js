import React from 'react';
import styled from 'styled-components';

const FooterContainer = styled.footer`
  background-color: ${props => props.theme.colors.background};
  padding: 2rem 0;
  text-align: center;
  margin-top: 3rem;
  border-top: 1px solid ${props => props.theme.colors.border};
`;

const FooterContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
`;

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <FooterContainer>
      <FooterContent>
        <p>&copy; {currentYear} Ege Cakar. All rights reserved.</p>
      </FooterContent>
    </FooterContainer>
  );
};

export default Footer;
