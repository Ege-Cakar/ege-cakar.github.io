import React from 'react';
import styled from 'styled-components';
import {
  Section,
  PageTitle,
  Card,
  CardTitle,
  Grid
} from '../components/UIComponents';

const ResearchPosition = styled.section`
  margin-bottom: 3rem;
`;

const PositionSubtitle = styled.p`
  color: ${props => props.theme.colors.accentTeal};
  font-weight: 500;
  margin-bottom: 1.5rem;
`;

const ResearchContent = styled.div`
  h3 {
    color: ${props => props.theme.colors.accentTeal};
    margin: 1.5rem 0 0.5rem 0;
  }
`;

const Research = () => {
  return (
    <>
      <PageTitle>Research</PageTitle>
      
      <ResearchPosition>
        <Card>
          <CardTitle>The Kempner Institute for the Study of Natural and Artificial Intelligence</CardTitle>
          <PositionSubtitle>Student Researcher | June 2024 - Present | Cambridge, MA</PositionSubtitle>
          
          <ResearchContent>
          <h3>Research Focus</h3>
            <p>Investigated compositional Boolean calculation tasks across diverse network architectures such as MLPs, LSTMs and Transformers, also looking at out-of-distribution performance and in-context learning.</p>
            <p>Currently working on analyzing abstract equality reasoning with MLP Mixer models, in different settings such as image, and different "equality" definitions.</p>
            
            <h3>Key Achievements</h3>
            <ul>
              <li>Achieved consistent performance in such tasks across widths by applying µp normalization in MLPs. Selected as KRANIUM research fellow over Summer 2024.</li>
              <li>Leveraged self-supervised learning approaches (e.g., SimCLR) to assess how representations that are learned through SSL impact classification accuracy. Selected as KURE research fellow over Fall 2024.</li>
              <li>Investigated methods to transform in-context knowledge in LLMs into persistent memory, enabling on-the-fly model parameter updates for continuous learning. </li>
              <li>Currently working on analyzing equality reasoning with MLP Mixer models, and formulating a formal understanding of the equality reasoning problem.</li>
              <li>Ran large-scale experiments on the Kempner High Performance Cluster.</li>
              <li>Presented in lab meetings and a poster session over the summer.</li>
            </ul>
          </ResearchContent>
        </Card>
      </ResearchPosition>
      
      <ResearchPosition>
        <Card>
          <CardTitle>Cambridge University Department of Engineering - Kristensson Lab</CardTitle>
          <PositionSubtitle>Student Researcher | June 2025 - August 2025 | Cambridge, UK</PositionSubtitle>
          
          <ResearchContent>
            <p>Selected as Harvard-Cambridge Summer Fellowship Scholar.</p>
            
            <h3>Research Interests</h3>
            <p>At the Kristensson Lab, I will be working on creating automated risk-analysis systems with agentic large language models, with a focus on creating an intuituve yet powerful package that is ready to be deployed by institutions.</p>
          </ResearchContent>
        </Card>
      </ResearchPosition>
      
      <Section className="research-interests">
        <h2 className="section-title">Research Interests</h2>
        
        <Grid>
          <Card>
            <CardTitle>Machine Learning</CardTitle>
            <p>Exploring the capabilities and limitations of neural networks, particularly in the domains of mathematical reasoning and semantic understanding. My work focuses on understanding how different architectures process and represent structured information.</p>
          </Card>
          
          <Card>
            <CardTitle>Reinforcement Learning</CardTitle>
            <p>Investigating multi-agent systems and their applications in complex environments, with a focus on sustainable development strategies. I'm particularly interested in how reinforcement learning can be used to model and solve complex societal challenges.</p>
          </Card>
          
          <Card>
            <CardTitle>Physics & Applied Mathematics</CardTitle>
            <p>Interested in the intersection of physics, applied mathematics, and artificial intelligence, exploring questions about mathematical modeling, dynamical systems, and the nature of intelligence.</p>
          </Card>
        </Grid>
      </Section>
    </>
  );
};

export default Research;
