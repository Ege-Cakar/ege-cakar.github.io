import React from 'react';
import styled from 'styled-components';
import {
  Section,
  PageTitle,
  Card,
  CardTitle,
  ContactInfo,
  ContactItem,
  ContactIcon,
  ContactDetails,
  SocialConnections,
  SocialGrid,
  SocialButton
} from '../components/UIComponents';

// Styled components specific to the Contact page
const ContactContainer = styled.div`
  max-width: 600px;
  margin: 0 auto;
`;

const Contact = () => {
  return (
    <>
      <PageTitle>Contact Me</PageTitle>
      
      <Section className="contact-section">
        <ContactContainer>
          <Card>
            <CardTitle>Contact Information</CardTitle>
            
            <ContactInfo>
              <ContactItem>
                <ContactIcon>
                  <i className="fas fa-envelope"></i>
                </ContactIcon>
                <ContactDetails>
                  <h3>Email</h3>
                  <a href="mailto:ecakar@college.harvard.edu">ecakar[at]college.harvard.edu</a>
                </ContactDetails>
              </ContactItem>
              
              <ContactItem>
                <ContactIcon>
                  <i className="fas fa-map-marker-alt"></i>
                </ContactIcon>
                <ContactDetails>
                  <h3>Location</h3>
                  <p>Cambridge, MA 02138</p>
                </ContactDetails>
              </ContactItem>
              
              <ContactItem>
                <ContactIcon>
                  <i className="fas fa-university"></i>
                </ContactIcon>
                <ContactDetails>
                  <h3>University</h3>
                  <p>Harvard University</p>
                </ContactDetails>
              </ContactItem>
            </ContactInfo>
            
            <SocialConnections>
              <h3>Connect With Me</h3>
              <SocialGrid>
                <SocialButton href="https://github.com/Ege-Cakar" target="_blank">
                  <i className="fab fa-github"></i>
                  <span>GitHub</span>
                </SocialButton>
                <SocialButton href="https://linkedin.com/in/egecakar" target="_blank">
                  <i className="fab fa-linkedin"></i>
                  <span>LinkedIn</span>
                </SocialButton>
                <SocialButton href="https://linktr.ee/egecakar" target="_blank">
                  <i className="fas fa-link"></i>
                  <span>LinkTree</span>
                </SocialButton>
              </SocialGrid>
            </SocialConnections>
          </Card>
        </ContactContainer>
      </Section>
    </>
  );
};

export default Contact;
