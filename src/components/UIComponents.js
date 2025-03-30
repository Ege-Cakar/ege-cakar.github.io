import styled from 'styled-components';

// Section and Title Components
export const Section = styled.section`
  margin-bottom: 3rem;
`;

export const PageTitle = styled.h1`
  color: ${props => props.theme.colors.flame};
  margin-bottom: 2rem;
  font-size: 2.5rem;
  font-weight: 700;
  border-bottom: 2px solid ${props => props.theme.colors.flame};
  padding-bottom: 0.5rem;
`;

export const SectionTitle = styled.h2`
  color: ${props => props.theme.colors.flame};
  font-size: 2rem;
  margin-bottom: 1.5rem;
`;

// Card Components
export const Card = styled.div`
  background-color: ${props => props.theme.colors.cardBg};
  border-radius: 8px;
  padding: 1.5rem;
  margin-bottom: 1.5rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    transform: ${props => props.noHover ? 'none' : 'translateY(-5px)'};
    box-shadow: ${props => props.noHover ? '0 4px 6px rgba(0, 0, 0, 0.1)' : '0 10px 15px rgba(0, 0, 0, 0.2)'};
  }
`;

export const CardTitle = styled.h3`
  color: ${props => props.theme.colors.flame};
  margin-top: 0;
  font-size: 1.5rem;
`;

// Grid Layout
export const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1.5rem;
`;

// Button Components
export const Button = styled.a`
  display: inline-block;
  background-color: ${props => props.outline ? 'transparent' : props.theme.colors.flame};
  color: ${props => props.outline ? props.theme.colors.flame : props.theme.colors.textDark};
  padding: 0.75rem 1.5rem;
  border-radius: 4px;
  text-decoration: none;
  font-weight: 600;
  transition: background-color 0.3s ease, color 0.3s ease;
  border: ${props => props.outline ? `2px solid ${props.theme.colors.flame}` : 'none'};
  cursor: pointer;
  margin-right: ${props => props.marginRight ? '1rem' : '0'};

  &:hover {
    background-color: ${props => props.outline ? props.theme.colors.flame : props.theme.colors.battleshipGray};
    color: ${props => props.outline ? props.theme.colors.textDark : props.theme.colors.textLight};
  }
`;

// Tag Component
export const Tag = styled.span`
  background-color: rgba(222, 84, 30, 0.2);
  color: ${props => props.theme.colors.flame};
  padding: 0.25rem 0.75rem;
  border-radius: 50px;
  font-size: 0.8rem;
  font-weight: 500;
  margin-right: 0.5rem;
  margin-bottom: 0.5rem;
  display: inline-block;
`;

export const TagContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin: 1rem 0;
`;

// Form Components
export const FormGroup = styled.div`
  margin-bottom: 1.5rem;
`;

export const FormLabel = styled.label`
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 500;
`;

export const FormInput = styled.input`
  width: 100%;
  padding: 0.75rem;
  border-radius: 4px;
  border: 1px solid rgba(214, 214, 177, 0.2);
  background-color: rgba(214, 214, 177, 0.05);
  color: ${props => props.theme.colors.textLight};
  font-family: ${props => props.theme.fonts.primary};

  &:focus {
    outline: none;
    border-color: ${props => props.theme.colors.flame};
  }
`;

export const FormTextarea = styled.textarea`
  width: 100%;
  padding: 0.75rem;
  border-radius: 4px;
  border: 1px solid rgba(214, 214, 177, 0.2);
  background-color: rgba(214, 214, 177, 0.05);
  color: ${props => props.theme.colors.textLight};
  font-family: ${props => props.theme.fonts.primary};
  resize: vertical;
  min-height: 150px;

  &:focus {
    outline: none;
    border-color: ${props => props.theme.colors.flame};
  }
`;

export const SubmitButton = styled.button`
  display: inline-block;
  background-color: ${props => props.theme.colors.flame};
  color: ${props => props.theme.colors.textDark};
  padding: 0.75rem 1.5rem;
  border-radius: 4px;
  text-decoration: none;
  font-weight: 600;
  transition: background-color 0.3s ease;
  border: none;
  cursor: pointer;

  &:hover {
    background-color: ${props => props.theme.colors.battleshipGray};
    color: ${props => props.theme.colors.textLight};
  }
`;

// Contact Form Success Message
export const FormSuccess = styled.div`
  text-align: center;
  padding: 2rem;

  i {
    font-size: 3rem;
    color: ${props => props.theme.colors.flame};
    margin-bottom: 1rem;
  }
`;

// Hero Section Components
export const HeroContent = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 2rem;

  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    flex-direction: column;
  }
`;

export const HeroText = styled.div`
  flex: 2;
`;

export const HeroImage = styled.div`
  flex: 1;
  text-align: center;

  img {
    border-radius: 50%;
    border: 4px solid ${props => props.theme.colors.flame};
    max-width: 200px;
  }
`;

export const HeroButtons = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 1.5rem;

  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    flex-direction: column;
  }
`;

export const Subtitle = styled.p`
  color: ${props => props.theme.colors.flame};
  font-size: 1.2rem;
  margin-bottom: 1rem;
`;

// Project Card Components
export const ProjectCard = styled(Card)`
  display: flex;
  flex-direction: column;
  height: 100%;
`;

export const ProjectContent = styled.div`
  padding: 1.5rem;
  flex-grow: 1;
  display: flex;
  flex-direction: column;
`;

// Skills Components
export const SkillsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 1.5rem;
`;

export const SkillCategory = styled.div`
  background-color: ${props => props.theme.colors.cardBg};
  border-radius: 8px;
  padding: 1.5rem;
  box-shadow: ${props => props.noShadow ? 'none' : '0 4px 6px rgba(0, 0, 0, 0.1)'};
  transform: ${props => props.noTransform ? 'none' : 'translateY(0)'};
  transition: ${props => props.noTransform ? 'none' : 'transform 0.3s ease, box-shadow 0.3s ease'};

  &:hover {
    transform: ${props => props.noTransform ? 'none' : 'translateY(-5px)'};
    box-shadow: ${props => props.noShadow ? 'none' : '0 10px 15px rgba(0, 0, 0, 0.2)'};
  }
`;

export const SkillItem = styled.div`
  margin-bottom: 0.75rem;
`;

export const SkillName = styled.div`
  margin-bottom: 0.25rem;
  font-weight: 500;
`;

// Contact Info Components
export const ContactInfo = styled.div`
  margin-bottom: 2rem;
`;

export const ContactItem = styled.div`
  display: flex;
  align-items: flex-start;
  margin-bottom: 1.5rem;
`;

export const ContactIcon = styled.div`
  font-size: 1.5rem;
  color: ${props => props.theme.colors.flame};
  margin-right: 1rem;
  width: 30px;
  text-align: center;
`;

export const ContactDetails = styled.div`
  h3 {
    margin: 0 0 0.5rem 0;
  }
`;

export const SocialConnections = styled.div`
  margin-top: 2rem;
`;

export const SocialGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;
  margin-top: 1rem;

  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    grid-template-columns: repeat(2, 1fr);
  }
`;

export const SocialButton = styled.a`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 1rem;
  background-color: rgba(222, 84, 30, 0.1);
  border-radius: 8px;
  color: ${props => props.theme.colors.textLight};
  text-decoration: none;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: rgba(222, 84, 30, 0.2);
  }

  i {
    font-size: 1.5rem;
    margin-bottom: 0.5rem;
  }
`;

// View All Button Container
export const ViewAll = styled.div`
  text-align: center;
  margin-top: 2rem;
`;
