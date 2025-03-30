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
            <p>Investigating compositional Boolean calculation tasks across different neural network architectures including MLPs, LSTMs, and Transformers.</p>
            
            <h3>Key Achievements</h3>
            <ul>
              <li>Achieved consistent performance across widths with µp normalization in MLPs (KRANIUM fellow over Summer 2024)</li>
              <li>Explored self-supervised learning (SimCLR) for assessing representation quality (KURE fellow over Fall 2024)</li>
              <li>Investigating methods for transforming in-context knowledge in LLMs into persistent memory</li>
              <li>Ran large-scale experiments on the Kempner High Performance Cluster</li>
            </ul>
            
            <h3>Research Methodology</h3>
            <p>My research involves designing controlled experiments to understand how different neural network architectures learn and represent compositional tasks. I use a combination of theoretical analysis and empirical evaluation to identify the strengths and limitations of each architecture.</p>
            
            <h3>Impact</h3>
            <p>This research contributes to our understanding of how neural networks process and represent structured information, with implications for improving the mathematical reasoning capabilities of AI systems.</p>
          </ResearchContent>
        </Card>
      </ResearchPosition>
      
      <ResearchPosition>
        <Card>
          <CardTitle>Cambridge University Center for Human Inspired Artificial Intelligence - Kristensson Lab</CardTitle>
          <PositionSubtitle>Student Researcher | March 2025 - Current | Cambridge, UK</PositionSubtitle>
          
          <ResearchContent>
            <h3>Research Focus</h3>
            <p>Selected as Harvard-Cambridge Summer Fellowship Scholar to work on human-inspired artificial intelligence research.</p>
            
            <h3>Research Interests</h3>
            <p>At the Kristensson Lab, I'm exploring the intersection of human cognition and artificial intelligence, with a focus on developing AI systems that can better understand and interact with humans.</p>
            
            <h3>Upcoming Work</h3>
            <p>This fellowship will allow me to collaborate with leading researchers in the field of human-inspired AI, contributing to the development of more intuitive and effective AI systems.</p>
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
            <p>Interested in the intersection of physics, applied mathematics, and artificial intelligence, exploring questions about mathematical modeling, dynamical systems, and the nature of intelligence. This interdisciplinary approach informs my technical research and provides a broader context for understanding AI's implications.</p>
          </Card>
        </Grid>
      </Section>
    </>
  );
};

export default Research;
