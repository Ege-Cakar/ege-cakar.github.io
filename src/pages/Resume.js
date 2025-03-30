import React from 'react';
import styled from 'styled-components';
import {
  PageTitle,
  SectionTitle,
  Card,
  CardTitle,
  SkillsContainer,
  SkillCategory,
  SkillItem,
  SkillName
} from '../components/UIComponents';

const ResumeSection = styled.section`
  margin-bottom: 3rem;
`;

const ResumeItem = styled.div`
  margin-bottom: 2rem;
`;

const ResumeHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 0.5rem;
  
  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    flex-direction: column;
  }
`;

const ResumeTitle = styled.h3`
  margin: 0;
  font-size: 1.25rem;
`;

const ResumeSubtitle = styled.h4`
  margin: 0;
  font-weight: 500;
  color: ${props => props.theme.colors.battleshipGray};
`;

const ResumeDates = styled.span`
  color: ${props => props.theme.colors.battleshipGray};
  font-weight: 500;
  
  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    margin-top: 0.5rem;
  }
`;

const ResumeContent = styled.div`
  margin-top: 0.5rem;
`;

const ContactInfo = styled.div`
  margin-bottom: 2rem;
  text-align: center;
`;

const Resume = () => {
  return (
    <>
      <PageTitle>Resume</PageTitle>
      
      <ContactInfo>
        <p>Ege Cakar</p>
        <p>Cambridge, MA 02138 • ecakar[at]college.harvard.edu • linktr.ee/egecakar</p>
      </ContactInfo>
      
      <ResumeSection>
        <SectionTitle>Education</SectionTitle>
        <Card>
          <ResumeItem>
            <ResumeHeader>
              <div>
                <ResumeTitle>Harvard University</ResumeTitle>
                <ResumeSubtitle>AB Double Concentration in Statistics and Physics, Secondary in General Philosophy</ResumeSubtitle>
                <p>GPA: 3.91/4.0</p>
              </div>
              <ResumeDates>May 2027</ResumeDates>
            </ResumeHeader>
            <ResumeContent>
              <p><strong>Relevant Coursework:</strong> Machine Learning, Reinforcement Learning, Biological and Artificial Intelligence, Probability, Statistical Inference, Algorithms and Their Limitations, Statistical Mechanics and Thermodynamics, Linear Algebra, Multivariable Calculus, Quantum Mechanics</p>
              <p><strong>Honors:</strong> John Harvard Scholar, given to the top 10% of class.</p>
            </ResumeContent>
          </ResumeItem>
          
          <ResumeItem>
            <ResumeHeader>
              <div>
                <ResumeTitle>American Collegiate Institute</ResumeTitle>
                <ResumeSubtitle>Double diploma in the International Baccalaureate and the Turkish Curriculum</ResumeSubtitle>
              </div>
              <ResumeDates>June 2023</ResumeDates>
            </ResumeHeader>
          </ResumeItem>
        </Card>
      </ResumeSection>
      
      <ResumeSection>
        <SectionTitle>Technical Skills & Projects</SectionTitle>
        <Card>
          <ResumeItem>
            <ResumeContent>
              <p><strong>Machine learning frameworks:</strong> PyTorch, numpy, TensorFlow, Gymnasium, PettingZoo, Wandb, TensorBoard</p>
              <p><strong>Programming and Design:</strong> Python, C++, Mathematica, MATLAB, SLURM, Github, Adobe Photoshop, Adobe Illustrator, Matplotlib and Seaborn</p>
            </ResumeContent>
          </ResumeItem>
          
          <ResumeItem>
            <ResumeHeader>
              <div>
                <ResumeTitle>Eco Civilization MDP: A Multi-Agent Environment for Studying Sustainable Growth</ResumeTitle>
              </div>
            </ResumeHeader>
            <ResumeContent>
              <ul>
                <li>Developed a custom PettingZoo environment and trained agents using Multi Agent Proximal Policy Optimization, building a 3000+ line codebase from scratch as part of a 3 person team.</li>
                <li>Modeled collaboration and researched how countries can stay competitive in growth while preserving the environment.</li>
              </ul>
            </ResumeContent>
          </ResumeItem>
          
          <ResumeItem>
            <ResumeHeader>
              <div>
                <ResumeTitle>FocusCaption: A Novel Image Captioning Approach that Aims to Mimic Humans</ResumeTitle>
              </div>
            </ResumeHeader>
            <ResumeContent>
              <ul>
                <li>Utilized a saliency map generator to identify the point of interest and focus in an image and cut it out, then utilized information from 2 CNNs in parallel to extract information from both the full image and the focused portion to provide to a decoder for image captioning.</li>
                <li>Perceived improvement specifically in counting the number of subjects in the image and details.</li>
              </ul>
            </ResumeContent>
          </ResumeItem>
          
          <ResumeItem>
            <ResumeHeader>
              <div>
                <ResumeTitle>Policivilization MDP</ResumeTitle>
              </div>
            </ResumeHeader>
            <ResumeContent>
              <ul>
                <li>Extending Eco Civilization MDP to be more realistic for explaining and understanding behavior of agents in complex, competitive, and realistic environments, with updates such as more realistic terrain and resource generation, population, population dissent and riots, and government types.</li>
                <li>Swapping the RNN agents with LLM agents who learn in-context for interpretability and transparency and enabling Interactive user intervention options for exploring how the agents will come to solutions in unexpected situations.</li>
                <li>Will be utilized at Harvard Kennedy School for teaching.</li>
              </ul>
            </ResumeContent>
          </ResumeItem>
        </Card>
      </ResumeSection>
      
      <ResumeSection>
        <SectionTitle>Relevant Experience</SectionTitle>
        <Card>
          <ResumeItem>
            <ResumeHeader>
              <div>
                <ResumeTitle>The Kempner Institute for the Study of Natural and Artificial Intelligence</ResumeTitle>
                <ResumeSubtitle>Student Researcher, Pehlevan Lab</ResumeSubtitle>
              </div>
              <ResumeDates>June 2024 - Current</ResumeDates>
            </ResumeHeader>
            <ResumeContent>
              <ul>
                <li>Investigated compositional Boolean calculation tasks across diverse network architectures such as MLPs, LSTMs and Transformers, also looking at out-of-distribution performance and in-context learning. Achieved consistent performance in such tasks across widths by applying µp normalization in MLPs. Selected as KRANIUM research fellow over Summer 2024.</li>
                <li>Leveraged self-supervised learning approaches (e.g., SimCLR) to assess how representations that are learned through SSL impact classification accuracy. Selected as KURE research fellow over Fall 2024.</li>
                <li>Investigating methods to transform in-context knowledge in LLMs into persistent memory, enabling on-the-fly model parameter updates for continuous learning.</li>
                <li>Ran large-scale experiments on the Kempner High Performance Cluster.</li>
                <li>Presented in lab meetings and a poster session over the summer.</li>
              </ul>
            </ResumeContent>
          </ResumeItem>
          
          <ResumeItem>
            <ResumeHeader>
              <div>
                <ResumeTitle>Cambridge University Center for Human Inspired Artificial Intelligence – Kristensson Lab</ResumeTitle>
                <ResumeSubtitle>Student Researcher</ResumeSubtitle>
              </div>
              <ResumeDates>March 2025 – Current</ResumeDates>
            </ResumeHeader>
            <ResumeContent>
              <ul>
                <li>Selected as Harvard-Cambridge Summer Fellowship Scholar.</li>
                <li>Working on Automated Risk-Analysis systems, utilizing agentic large language models with first-order logic techniques to create reliable, provably correct, and interpretable analysis reports.</li>
              </ul>
            </ResumeContent>
          </ResumeItem>
          
          <ResumeItem>
            <ResumeHeader>
              <div>
                <ResumeTitle>Harvard University</ResumeTitle>
                <ResumeSubtitle>Course Assistant – Theoretical Physics, Quantum Mechanics 1</ResumeSubtitle>
              </div>
              <ResumeDates>September 2024 - Current</ResumeDates>
            </ResumeHeader>
            <ResumeContent>
              <ul>
                <li>Provided supplementary education for students with upper level physics concepts, evaluated assignments and provided feedback.</li>
                <li>Contributed to weekly organizational meetings on class feedback from students and worked with the instructor to ascertain students falling behind and provide support.</li>
              </ul>
            </ResumeContent>
          </ResumeItem>
        </Card>
      </ResumeSection>
      
      <ResumeSection>
        <SectionTitle>Skills</SectionTitle>
        <Card>
          <SkillsContainer>
            <SkillCategory>
              <CardTitle>Programming</CardTitle>
              <SkillItem>
                <SkillName>Python</SkillName>
              </SkillItem>
              <SkillItem>
                <SkillName>C++</SkillName>
              </SkillItem>
              <SkillItem>
                <SkillName>MATLAB</SkillName>
              </SkillItem>
              <SkillItem>
                <SkillName>Mathematica</SkillName>
              </SkillItem>
            </SkillCategory>
            
            <SkillCategory>
              <CardTitle>Machine Learning</CardTitle>
              <SkillItem>
                <SkillName>PyTorch</SkillName>
              </SkillItem>
              <SkillItem>
                <SkillName>TensorFlow</SkillName>
              </SkillItem>
              <SkillItem>
                <SkillName>Reinforcement Learning</SkillName>
              </SkillItem>
              <SkillItem>
                <SkillName>Computer Vision</SkillName>
              </SkillItem>
            </SkillCategory>
            
            <SkillCategory>
              <CardTitle>Tools</CardTitle>
              <SkillItem>
                <SkillName>Git/GitHub</SkillName>
              </SkillItem>
              <SkillItem>
                <SkillName>SLURM</SkillName>
              </SkillItem>
              <SkillItem>
                <SkillName>Adobe Photoshop</SkillName>
              </SkillItem>
              <SkillItem>
                <SkillName>Adobe Illustrator</SkillName>
              </SkillItem>
            </SkillCategory>
          </SkillsContainer>
        </Card>
      </ResumeSection>
    </>
  );
};

export default Resume;
