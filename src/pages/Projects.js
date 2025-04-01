import React from 'react';
import styled from 'styled-components';
import {
  PageTitle,
  Card,
  CardTitle,
  Button,
  Tag,
  TagContainer
} from '../components/UIComponents';

const ProjectSection = styled.section`
  margin-bottom: 3rem;
  scroll-margin-top: 2rem;
`;

const ProjectHeader = styled.div`
  margin-bottom: 1.5rem;
`;

const ProjectContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const ProjectDescription = styled.div`
  h3 {
    color: ${props => props.theme.colors.accentTeal};
    margin: 1.5rem 0 0.5rem 0;
  }
`;

const ProjectLinks = styled.div`
  margin-top: 1.5rem;
`;

const Projects = () => {
  return (
    <>
      <PageTitle>Projects</PageTitle>
      
      <ProjectSection id="eco-civilization">
        <Card>
          <ProjectHeader>
            <CardTitle>Eco-Civilization MDP</CardTitle>
            <TagContainer>
              <Tag>Reinforcement Learning</Tag>
              <Tag>Multi-Agent</Tag>
              <Tag>PettingZoo</Tag>
              <Tag>PyTorch</Tag>
            </TagContainer>
          </ProjectHeader>
          <ProjectContent>
            <ProjectDescription>
              <h3>Overview</h3>
              <p>A reinforcement learning project that adapts the Civilization game to explore sustainable development strategies. Utilizing Multi-Agent Proximal Policy Optimization (MAPPO), the project trains AI agents to balance economic growth with environmental responsibility.</p>
              
              <h3>Details</h3>
              <p>The modified game introduces environmental penalties, challenging agents to optimize strategies that mitigate climate impact while expanding their civilizations. With the work, our aim is to use reinforcement learning for finding strategies for enabling countries to stay competitive economically while taking environmentally conscious actions.</p>
              
              <h3>Technologies Used</h3>
              <ul>
                <li>PyTorch for implementing neural networks</li>
                <li>PettingZoo for multi-agent environment</li>
                <li>MAPPO algorithm for training agents</li>
                <li>Custom environment based on Civilization game mechanics</li>
              </ul>
              
              <ProjectLinks>
                <Button href="https://github.com/Ege-Cakar/Eco-Civilization-MDP" target="_blank">View on GitHub</Button>
              </ProjectLinks>
            </ProjectDescription>
          </ProjectContent>
        </Card>
      </ProjectSection>
      
      <ProjectSection id="focus-caption">
        <Card>
          <ProjectHeader>
            <CardTitle>FocusCaption</CardTitle>
            <TagContainer>
              <Tag>Computer Vision</Tag>
              <Tag>Image Captioning</Tag>
              <Tag>CNN</Tag>
              <Tag>TranSalNet</Tag>
            </TagContainer>
          </ProjectHeader>
          <ProjectContent>
            <ProjectDescription>
              <h3>Overview</h3>
              <p>An image captioning method that utilizes 2 CNNs in parallel with a saliency prediction model to extract extra information from where 'should be focused' in an image.</p>
              
              <h3>Details</h3>
              <p>After figuring out the location that should be focused on, the portion is cut out and fed into an identical CNN, and at the end, the information from the full image and the focused portion is combined and fed into a decoder. This approach showed improvements in counting image subjects and detailing finer features.</p>
              
              <h3>Technologies Used</h3>
              <ul>
                <li>Convolutional Neural Networks (CNNs)</li>
                <li>TranSalNet for saliency prediction</li>
                <li>LSTM decoder for caption generation</li>
                <li>PyTorch framework</li>
              </ul>
              
              <ProjectLinks>
                <Button href="https://github.com/Ege-Cakar/FocusCaption" target="_blank">View on GitHub</Button>
              </ProjectLinks>
            </ProjectDescription>
          </ProjectContent>
        </Card>
      </ProjectSection>
      
      <ProjectSection id="policivilization">
        <Card>
          <ProjectHeader>
            <CardTitle>Policivilization MDP</CardTitle>
            <TagContainer>
              <Tag>Reinforcement Learning</Tag>
              <Tag>LLMs</Tag>
              <Tag>Interpretability</Tag>
              <Tag>Simulation</Tag>
            </TagContainer>
          </ProjectHeader>
          <ProjectContent>
            <ProjectDescription>
              <h3>Overview</h3>
              <p>Extending Eco Civilization MDP to be more realistic for explaining and understanding behavior of agents in complex, competitive environments.</p>
              
              <h3>Details</h3>
              <p>Updates include more realistic terrain and resource generation, population, population dissent and riots, and government types. Swapping the RNN agents with LLM agents who learn in-context for interpretability and transparency. Enabling interactive user intervention options for exploring how the agents will come to solutions in unexpected situations.</p>
              
              <h3>Technologies Used</h3>
              <ul>
                <li>Large Language Models (LLMs) for agent decision-making</li>
                <li>Advanced simulation environment</li>
                <li>Interpretability tools for understanding agent behavior</li>
                <li>Interactive visualization components</li>
              </ul>
              
              <ProjectLinks>
                <Button href="https://github.com/Ege-Cakar/HCS-AI-RL-Project" target="_blank">View on GitHub</Button>
              </ProjectLinks>
            </ProjectDescription>
          </ProjectContent>
        </Card>
      </ProjectSection>
      
      <ProjectSection id="talk-to-me">
        <Card>
          <ProjectHeader>
            <CardTitle>Talk To Me</CardTitle>
            <TagContainer>
              <Tag>Audio Processing</Tag>
              <Tag>Speech-to-Text</Tag>
              <Tag>LaTeX</Tag>
              <Tag>AI Integration</Tag>
            </TagContainer>
          </ProjectHeader>
          <ProjectContent>
            <ProjectDescription>
              <h3>Overview</h3>
              <p>A desktop application that combines audio recording, transcription, and LaTeX conversion for academic and scientific content. Users can speak mathematical equations and technical content, which are then transcribed and converted to proper LaTeX notation.</p>
              
              <h3>Details</h3>
              <p>The application supports both offline processing using a local Whisper model and cloud-based processing via the OpenAI API. It offers multiple formatting options for output and integrates with various AI providers (Ollama for fully local operation, OpenAI, Google, etc.).</p>
              
              <h3>Technologies Used</h3>
              <ul>
                <li>Audio recording and file format conversion</li>
                <li>Whisper model for local speech-to-text</li>
                <li>OpenAI API integration</li>
                <li>Customizable system prompts and model settings</li>
                <li>Persistent settings storage</li>
              </ul>
              
              <ProjectLinks>
                <Button href="https://github.com/Ege-Cakar/talkToMe" target="_blank">View on GitHub</Button>
              </ProjectLinks>
            </ProjectDescription>
          </ProjectContent>
        </Card>
      </ProjectSection>
      
      <ProjectSection id="mistral-ocr">
        <Card>
          <ProjectHeader>
            <CardTitle>Mistral OCR</CardTitle>
            <TagContainer>
              <Tag>OCR</Tag>
              <Tag>PDF Processing</Tag>
              <Tag>Markdown</Tag>
              <Tag>API Wrapper</Tag>
            </TagContainer>
          </ProjectHeader>
          <ProjectContent>
            <ProjectDescription>
              <h3>Overview</h3>
              <p>A simple Mistral OCR Wrapper for converting PDF files to Markdown, with ways of viewing the content in-app. This quick project was scrapped together because I needed it and made open source so others can use it as well.</p>
              
              <h3>Details</h3>
              <p>This tool utilizes the Mistral OCR API to convert PDFs to markdown files, making it easier to use on a day-to-day basis. After uploading a PDF and getting back the response, content is displayed first as plain text, with additional options to view it as Markdown or in a browser for LaTeX rendering.</p>
              
              <h3>Technologies Used</h3>
              <ul>
                <li>Mistral OCR API integration</li>
                <li>PDF to Markdown conversion</li>
                <li>Multiple viewing options (plain text, Markdown, browser)</li>
                <li>Standalone application with PyInstaller</li>
                <li>Persistent API key storage</li>
              </ul>
              
              <ProjectLinks>
                <Button href="https://github.com/Ege-Cakar/MistralOCR" target="_blank">View on GitHub</Button>
              </ProjectLinks>
            </ProjectDescription>
          </ProjectContent>
        </Card>
      </ProjectSection>
    </>
  );
};

export default Projects;
