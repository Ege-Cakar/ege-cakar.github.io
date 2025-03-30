import React from 'react';
import { Link } from 'react-router-dom';
import {
  Section,
  PageTitle,
  SectionTitle,
  Card,
  CardTitle,
  Grid,
  Button,
  Tag,
  TagContainer,
  HeroContent,
  HeroText,
  HeroImage,
  HeroButtons,
  Subtitle,
  ProjectCard,
  ProjectContent,
  SkillsContainer,
  SkillCategory,
  ViewAll
} from '../components/UIComponents';
import profilePic from '../images/pfp.jpg';

const Home = () => {
  return (
    <>
      <Section className="hero">
        <PageTitle>Welcome</PageTitle>
        <Card>
          <HeroContent>
            <HeroText>
              <h2>Ege Cakar</h2>
              <Subtitle>Machine Learning | Physics | Applied Mathematics</Subtitle>
              <p>
                I'm a second year undergraduate at Harvard College double concentrating in Statistics and Physics, 
                with an Integrated Masters in Applied Mathematics. I'm interested in machine learning broadly — 
                my current area of interest is mathematical and semantic reasoning.
              </p>
              <HeroButtons>
                <Button href="/projects" as={Link} to="/projects" marginRight>
                  View Projects
                </Button>
                <Button href="/resume" as={Link} to="/resume" outline>
                  Resume
                </Button>
              </HeroButtons>
            </HeroText>
            <HeroImage>
              <img
                src={profilePic}
                alt="Ege Cakar"
              />
            </HeroImage>
          </HeroContent>
        </Card>
      </Section>

      <Section className="featured-projects">
        <SectionTitle>Featured Projects</SectionTitle>
        <Grid>
          <ProjectCard>
            <ProjectContent>
              <CardTitle>Eco-Civilization MDP</CardTitle>
              <p>
                A reinforcement learning project that adapts the Civilization game to explore 
                sustainable development strategies using Multi-Agent Proximal Policy Optimization (MAPPO).
              </p>
              <TagContainer>
                <Tag>Reinforcement Learning</Tag>
                <Tag>Multi-Agent</Tag>
                <Tag>PettingZoo</Tag>
              </TagContainer>
              <Button href="/projects#eco-civilization" as={Link} to="/projects">
                Learn More
              </Button>
            </ProjectContent>
          </ProjectCard>

          <ProjectCard>
            <ProjectContent>
              <CardTitle>FocusCaption</CardTitle>
              <p>
                An image captioning method that utilizes 2 CNNs in parallel with a saliency prediction model 
                to extract extra information from where 'should be focused' in an image.
              </p>
              <TagContainer>
                <Tag>Computer Vision</Tag>
                <Tag>Image Captioning</Tag>
                <Tag>CNN</Tag>
              </TagContainer>
              <Button href="/projects#focus-caption" as={Link} to="/projects">
                Learn More
              </Button>
            </ProjectContent>
          </ProjectCard>

          <ProjectCard>
            <ProjectContent>
              <CardTitle>Policivilization MDP</CardTitle>
              <p>
                Extending Eco Civilization MDP with more realistic terrain, resources, population dynamics, 
                and government types. Uses LLMs for interpretable agent decision-making.
              </p>
              <TagContainer>
                <Tag>Reinforcement Learning</Tag>
                <Tag>LLMs</Tag>
                <Tag>Interpretability</Tag>
              </TagContainer>
              <Button href="/projects#policivilization" as={Link} to="/projects">
                Learn More
              </Button>
            </ProjectContent>
          </ProjectCard>
        </Grid>
        <ViewAll>
          <Button href="/projects" as={Link} to="/projects" outline>
            View All Projects
          </Button>
        </ViewAll>
      </Section>

      <Section className="skills-overview">
        <SectionTitle>Skills Overview</SectionTitle>
        <Card>
          <SkillsContainer>
            <SkillCategory noShadow noTransform>
              <CardTitle>Machine Learning</CardTitle>
              <p>PyTorch, NumPy, TensorFlow, Gymnasium, Reinforcement Learning, Computer Vision, Natural Language Processing</p>
            </SkillCategory>

            <SkillCategory noShadow noTransform>
              <CardTitle>Programming</CardTitle>
              <p>Python, C++, Mathematica, MATLAB, JavaScript, HTML/CSS</p>
            </SkillCategory>

            <SkillCategory noShadow noTransform>
              <CardTitle>Design & Visualization</CardTitle>
              <p>Adobe Photoshop, Adobe Illustrator, Matplotlib, Seaborn</p>
            </SkillCategory>
          </SkillsContainer>
        </Card>
      </Section>
    </>
  );
};

export default Home;
