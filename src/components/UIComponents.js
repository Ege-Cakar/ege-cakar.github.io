import styled from "styled-components";

// Section and Title Components
export const Section = styled.section`
  margin-bottom: 3rem;
`;

export const PageTitle = styled.h1`
  color: ${(props) => props.theme.colors.text};
  margin-bottom: 2rem;
  font-size: 2.5rem;
  font-weight: 700;
  border-bottom: 1px solid ${(props) => props.theme.colors.border};
  padding-bottom: 0.5rem;
`;

export const SectionTitle = styled.h2`
  color: ${(props) => props.theme.colors.text};
  font-size: 2rem;
  margin-bottom: 1.5rem;
`;

// Card Components
export const Card = styled.div`
  background-color: ${(props) => props.theme.colors.cardBg};
  border-radius: 8px;
  padding: 1.5rem;
  margin-bottom: 1.5rem;
  border: 1px solid ${(props) => props.theme.colors.border};
  transition:
    background-color ${(props) => props.theme.motion.duration.normal}
      ${(props) => props.theme.motion.easing.standard},
    border-color ${(props) => props.theme.motion.duration.normal}
      ${(props) => props.theme.motion.easing.standard},
    transform ${(props) => props.theme.motion.duration.normal}
      ${(props) => props.theme.motion.easing.standard},
    box-shadow ${(props) => props.theme.motion.duration.normal}
      ${(props) => props.theme.motion.easing.standard};
  transform: translateY(0);
  box-shadow: 0 0 0 rgba(0, 0, 0, 0);

  &:hover {
    background-color: ${(props) =>
      props.noHover ? props.theme.colors.cardBg : props.theme.colors.gray100};
    transform: translateY(-2px);
    box-shadow: 0 2px 6px rgba(17, 24, 39, 0.06);
  }
`;

export const CardTitle = styled.h3`
  color: ${(props) => props.theme.colors.text};
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
  background-color: ${(props) =>
    props.outline ? "transparent" : props.theme.colors.gray100};
  color: ${(props) => props.theme.colors.text};
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
  text-decoration: none;
  font-weight: 600;
  transition:
    background-color ${(props) => props.theme.motion.duration.normal}
      ${(props) => props.theme.motion.easing.standard},
    color ${(props) => props.theme.motion.duration.normal}
      ${(props) => props.theme.motion.easing.standard},
    border-color ${(props) => props.theme.motion.duration.normal}
      ${(props) => props.theme.motion.easing.standard},
    transform ${(props) => props.theme.motion.duration.normal}
      ${(props) => props.theme.motion.easing.standard},
    box-shadow ${(props) => props.theme.motion.duration.normal}
      ${(props) => props.theme.motion.easing.standard};
  transform: translateY(0);
  box-shadow: 0 0 0 rgba(0, 0, 0, 0);
  border: ${(props) =>
    props.outline
      ? `1px solid ${props.theme.colors.border}`
      : `1px solid ${props.theme.colors.border}`};
  cursor: pointer;
  margin-right: ${(props) => (props.marginRight ? "1rem" : "0")};

  &:hover {
    background-color: ${(props) => props.theme.colors.gray200};
    color: ${(props) => props.theme.colors.text};
    transform: translateY(-1px);
    box-shadow: 0 2px 6px rgba(17, 24, 39, 0.06);
  }
`;

// Tag Component
export const Tag = styled.span`
  background-color: ${(props) => props.theme.colors.gray100};
  color: ${(props) => props.theme.colors.text};
  padding: 0.25rem 0.75rem;
  border-radius: 50px;
  font-size: 0.8rem;
  font-weight: 500;
  margin-right: 0.5rem;
  margin-bottom: 0.5rem;
  display: inline-block;
  border: 1px solid ${(props) => props.theme.colors.border};
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
  border: 1px solid ${(props) => props.theme.colors.border};
  background-color: ${(props) => props.theme.colors.background};
  color: ${(props) => props.theme.colors.text};
  font-family: ${(props) => props.theme.fonts.primary};
  transition:
    border-color ${(props) => props.theme.motion.duration.normal}
      ${(props) => props.theme.motion.easing.standard},
    box-shadow ${(props) => props.theme.motion.duration.normal}
      ${(props) => props.theme.motion.easing.standard};

  &:focus {
    outline: none;
    border-color: ${(props) => props.theme.colors.text};
    box-shadow: 0 0 0 3px ${(props) => props.theme.colors.gray100};
  }
`;

export const FormTextarea = styled.textarea`
  width: 100%;
  padding: 0.75rem;
  border-radius: 4px;
  border: 1px solid ${(props) => props.theme.colors.border};
  background-color: ${(props) => props.theme.colors.background};
  color: ${(props) => props.theme.colors.text};
  font-family: ${(props) => props.theme.fonts.primary};
  resize: vertical;
  min-height: 150px;
  transition:
    border-color ${(props) => props.theme.motion.duration.normal}
      ${(props) => props.theme.motion.easing.standard},
    box-shadow ${(props) => props.theme.motion.duration.normal}
      ${(props) => props.theme.motion.easing.standard};

  &:focus {
    outline: none;
    border-color: ${(props) => props.theme.colors.text};
    box-shadow: 0 0 0 3px ${(props) => props.theme.colors.gray100};
  }
`;

export const SubmitButton = styled.button`
  display: inline-block;
  background-color: ${(props) => props.theme.colors.gray100};
  color: ${(props) => props.theme.colors.text};
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
  text-decoration: none;
  font-weight: 600;
  transition:
    background-color ${(props) => props.theme.motion.duration.normal}
      ${(props) => props.theme.motion.easing.standard},
    color ${(props) => props.theme.motion.duration.normal}
      ${(props) => props.theme.motion.easing.standard},
    border-color ${(props) => props.theme.motion.duration.normal}
      ${(props) => props.theme.motion.easing.standard},
    transform ${(props) => props.theme.motion.duration.normal}
      ${(props) => props.theme.motion.easing.standard},
    box-shadow ${(props) => props.theme.motion.duration.normal}
      ${(props) => props.theme.motion.easing.standard};
  transform: translateY(0);
  box-shadow: 0 0 0 rgba(0, 0, 0, 0);
  border: 1px solid ${(props) => props.theme.colors.border};
  cursor: pointer;

  &:hover {
    background-color: ${(props) => props.theme.colors.gray200};
    color: ${(props) => props.theme.colors.text};
    transform: translateY(-1px);
    box-shadow: 0 2px 6px rgba(17, 24, 39, 0.06);
  }
`;

// Contact Form Success Message
export const FormSuccess = styled.div`
  text-align: center;
  padding: 2rem;

  i {
    font-size: 3rem;
    color: ${(props) => props.theme.colors.text};
    margin-bottom: 1rem;
  }
`;

// Hero Section Components
export const HeroContent = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 2rem;

  @media (max-width: ${(props) => props.theme.breakpoints.mobile}) {
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
    border: 2px solid ${(props) => props.theme.colors.border};
    max-width: 200px;
  }
`;

export const HeroButtons = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 1.5rem;

  @media (max-width: ${(props) => props.theme.breakpoints.mobile}) {
    flex-direction: column;
  }
`;

export const Subtitle = styled.p`
  color: ${(props) => props.theme.colors.gray600};
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
  background-color: ${(props) => props.theme.colors.cardBg};
  border-radius: 8px;
  padding: 1.5rem;
  border: 1px solid ${(props) => props.theme.colors.border};
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
  color: ${(props) => props.theme.colors.text};
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

  @media (max-width: ${(props) => props.theme.breakpoints.mobile}) {
    grid-template-columns: repeat(2, 1fr);
  }
`;

export const SocialButton = styled.a`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 1rem;
  background-color: ${(props) => props.theme.colors.gray100};
  border-radius: 8px;
  color: ${(props) => props.theme.colors.text};
  text-decoration: none;
  transition:
    background-color ${(props) => props.theme.motion.duration.normal}
      ${(props) => props.theme.motion.easing.standard},
    color ${(props) => props.theme.motion.duration.normal}
      ${(props) => props.theme.motion.easing.standard},
    transform ${(props) => props.theme.motion.duration.normal}
      ${(props) => props.theme.motion.easing.standard},
    box-shadow ${(props) => props.theme.motion.duration.normal}
      ${(props) => props.theme.motion.easing.standard};
  transform: translateY(0);
  box-shadow: 0 0 0 rgba(0, 0, 0, 0);
  border: 1px solid ${(props) => props.theme.colors.border};

  &:hover {
    background-color: ${(props) => props.theme.colors.gray200};
    transform: translateY(-1px);
    box-shadow: 0 2px 6px rgba(17, 24, 39, 0.06);
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
