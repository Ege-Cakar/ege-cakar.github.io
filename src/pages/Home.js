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
              <Subtitle>Machine Learning | Physics </Subtitle>
              <p>
                I'm a third-year undergraduate at Harvard College, joint concentrating in Statistics and Physics. My academic journey is driven by curiosity about how we can use computational methods to understand complex systems such as intelligence.
                I'm particularly fascinated by how neural networks learn to represent and process structured information, solving reasoning tasks humans excel at, and breaking down reasoning steps. 
                Outside of academics, I love reading, music, taking walks, biking, spending time with friends and family, cooking, and games. I'm always open to collaborations and discussions about interesting projects or research opportunities.
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
        <SectionTitle>Featured Projects & Research</SectionTitle>
        <Grid>
        <ProjectCard>
        <ProjectContent>
          <CardTitle>Structured Argumentation for Trust in AI (IAAI-26 Submission)</CardTitle>
          <p>
            First-author paper submitted to IAAI-26 (under review), achieving state-of-the-art results: 94.44 F1 on AAEC literal extraction, 0.81 F1 on AMT relation classification. Introduces "agnostic explainability" framework. More info on Research tab.
          </p>
          <TagContainer>
            <Tag>Explainable AI</Tag>
            <Tag>Large Language Models</Tag>
            <Tag>Multi-Agent Systems</Tag>
            <Tag>Argumentation</Tag>
          </TagContainer>
          <Button href="/research" as={Link} to="/research">
            Learn More
          </Button>
        </ProjectContent>
      </ProjectCard>

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
            <CardTitle>Machine Learning & AI</CardTitle>
            <p>PyTorch, Jax, Hugging Face Transformers, Reinforcement Learning (PPO, Multi-Agent), Computer Vision (CNNs, Saliency), NLP & LLMs (BERT-based models, Llama, GPT, Claude, Gemini), Self-Supervised Learning (SimCLR), Argument Mining</p>
          </SkillCategory>

          <SkillCategory noShadow noTransform>
            <CardTitle>Programming & Infrastructure</CardTitle>
            <p>Python, C++, JavaScript/React, MATLAB, Mathematica, Docker, SLURM/HPC, Cloud Platforms (RunPod, GCP), Git/GitHub, SAT Solvers</p>
          </SkillCategory>

          <SkillCategory noShadow noTransform>
            <CardTitle>Research & Analysis</CardTitle>
            <p>Experimental Design, Statistical Analysis, Paper Writing, Poster Presentations, Open Source Development, Reproducible Research, High-Performance Computing</p>
          </SkillCategory>
          </SkillsContainer>
        </Card>
      </Section>
    </>
  );
};

export default Home;
