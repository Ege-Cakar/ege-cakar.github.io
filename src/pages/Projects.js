import React from "react";
import styled from "styled-components";
import {
  PageTitle,
  Card,
  CardTitle,
  Button,
  Tag,
  TagContainer,
} from "../components/UIComponents";

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
    color: ${(props) => props.theme.colors.accentTeal};
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

      <ProjectSection id="memory-optimized-trms">
        <Card>
          <ProjectHeader>
            <CardTitle>LASER: Memory-Optimized TRMs</CardTitle>
            <TagContainer>
              <Tag>CS2420</Tag>
              <Tag>Efficient Training</Tag>
              <Tag>Activation Compression</Tag>
              <Tag>Memory</Tag>
              <Tag>PyTorch</Tag>
            </TagContainer>
          </ProjectHeader>
          <ProjectContent>
            <ProjectDescription>
              <h3>Overview</h3>
              <p>
                A final project for CS2420 introducing LASER (Low‑Rank Activation
                SVD for Efficient Recursion), a dynamic activation‑compression
                framework for training Tiny Recursive Models (TRMs) with
                substantially lower memory usage.
              </p>

              <h3>Details</h3>
              <p>
                TRMs require storing activations across many recursive steps for
                Backpropagation Through Time (BPTT). LASER tracks an evolving
                low‑rank activation subspace using matrix‑free updates, monitors
                reconstruction fidelity without extra matrix calculations, and
                uses a fidelity‑triggered “safetynet” reset that recomputes an
                exact SVD when error accumulates. In experiments, LASER achieves
                roughly 60% activation memory savings with negligible accuracy
                and speed impact, and can be combined with quantization and
                checkpointing.
              </p>

              <h3>Technologies Used</h3>
              <ul>
                <li>PyTorch</li>
                <li>Online subspace tracking (matrix‑free updates)</li>
                <li>Activation compression and quantization</li>
                <li>Reconstruction‑error monitoring and safetynet resets</li>
              </ul>

              <ProjectLinks>
                <Button
                  href="https://github.com/Ege-Cakar/Memory-Optimized-TRMs"
                  target="_blank"
                >
                  View on GitHub
                </Button>
              </ProjectLinks>
            </ProjectDescription>
          </ProjectContent>
        </Card>
      </ProjectSection>

      <ProjectSection id="proofgoat">
        <Card>
          <ProjectHeader>
            <CardTitle>ProofGOAT: OT‑Based Proof Generation</CardTitle>
            <TagContainer>
              <Tag>Optimal Transport</Tag>
              <Tag>Lean</Tag>
              <Tag>Automated Theorem Proving</Tag>
              <Tag>NLP</Tag>
            </TagContainer>
          </ProjectHeader>
          <ProjectContent>
            <ProjectDescription>
              <h3>Overview</h3>
              <p>
                A final project for CS2840 (Optimal Transport & Machine
                Learning), developing an Optimal Transport framework that aligns
                natural‑language proofs with formal Lean proofs at the token
                level.
              </p>

              <h3>Details</h3>
              <p>
                The approach learns a Neural Optimal Transport map between
                token‑level embedding distributions from a Lean‑specialized
                language model. To handle variable‑length sequences while
                preserving positional structure, it introduces a void‑token
                mechanism that converts the problem into balanced OT. The
                learned couplings are used to build soft token prompts that
                guide a downstream Lean‑generating decoder. In results, the
                NL→Lean transport reaches ~80% cosine alignment with the
                corresponding Lean tokens, with stable bidirectional mappings
                and meaningful cross‑modal correspondences. We hope this
                alignment can help keep faster verification signals accurate
                during RL for mathematics when training larger language models.
              </p>

              <h3>Technologies Used</h3>
              <ul>
                <li>Optimal Transport (Neural OT)</li>
                <li>Lean theorem prover</li>
                <li>Token‑level embedding alignment</li>
                <li>Sequence decoding and prompt construction</li>
              </ul>

              <ProjectLinks>
                <Button
                  href="https://github.com/Ege-Cakar/ProofGOAT"
                  target="_blank"
                >
                  View on GitHub
                </Button>
              </ProjectLinks>
            </ProjectDescription>
          </ProjectContent>
        </Card>
      </ProjectSection>

      <ProjectSection id="improving-gcg">
        <Card>
          <ProjectHeader>
            <CardTitle>Improving GCG: Soft‑GCG + Activation Objectives</CardTitle>
            <TagContainer>
              <Tag>CS2881R</Tag>
              <Tag>AI Safety</Tag>
              <Tag>Adversarial Attacks</Tag>
              <Tag>Efficiency</Tag>
            </TagContainer>
          </ProjectHeader>
          <ProjectContent>
            <ProjectDescription>
              <h3>Overview</h3>
              <p>
                A final project for CS2881R (AI Alignment & Safety) exploring
                faster and more mechanistically‑grounded variants of the Greedy
                Coordinate Gradient (GCG) jailbreak attack.
              </p>

              <h3>Details</h3>
              <p>
                The project investigates (1) Activation‑Guided GCG, replacing
                log‑likelihood objectives with losses that directly minimize
                projections onto refusal directions in the model’s residual
                stream, and (2) Soft‑GCG, a continuous relaxation via
                Gumbel‑Softmax that achieves ~43x speedup over standard GCG with
                negligible loss in attack success. Evaluations on the Gemma 3
                family suggest smaller models remain more vulnerable while
                larger models exhibit greater robustness.
              </p>

              <h3>Technologies Used</h3>
              <ul>
                <li>LLM safety and adversarial prompt optimization</li>
                <li>Mechanistic objectives using refusal directions</li>
                <li>Gumbel‑Softmax continuous relaxation</li>
                <li>Benchmarking across model scales (Gemma 3)</li>
              </ul>

              <ProjectLinks>
                <Button
                  href="https://github.com/Ege-Cakar/ImprovingGCG"
                  target="_blank"
                >
                  View on GitHub
                </Button>
              </ProjectLinks>
            </ProjectDescription>
          </ProjectContent>
        </Card>
      </ProjectSection>

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
              <p>
                A reinforcement learning project that adapts the Civilization
                game to explore sustainable development strategies. Utilizing
                Multi-Agent Proximal Policy Optimization (MAPPO), the project
                trains AI agents to balance economic growth with environmental
                responsibility.
              </p>

              <h3>Details</h3>
              <p>
                The modified game introduces environmental penalties,
                challenging agents to optimize strategies that mitigate climate
                impact while expanding their civilizations. With the work, our
                aim is to use reinforcement learning for finding strategies for
                enabling countries to stay competitive economically while taking
                environmentally conscious actions.
              </p>

              <h3>Technologies Used</h3>
              <ul>
                <li>PyTorch for implementing neural networks</li>
                <li>PettingZoo for multi-agent environment</li>
                <li>MAPPO algorithm for training agents</li>
                <li>Custom environment based on Civilization game mechanics</li>
              </ul>

              <ProjectLinks>
                <Button
                  href="https://github.com/Ege-Cakar/Eco-Civilization-MDP"
                  target="_blank"
                >
                  View on GitHub
                </Button>
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
              <p>
                An image captioning method that utilizes 2 CNNs in parallel with
                a saliency prediction model to extract extra information from
                where 'should be focused' in an image.
              </p>

              <h3>Details</h3>
              <p>
                After figuring out the location that should be focused on, the
                portion is cut out and fed into an identical CNN, and at the
                end, the information from the full image and the focused portion
                is combined and fed into a decoder. This approach showed
                improvements in counting image subjects and detailing finer
                features.
              </p>

              <h3>Technologies Used</h3>
              <ul>
                <li>Convolutional Neural Networks (CNNs)</li>
                <li>TranSalNet for saliency prediction</li>
                <li>LSTM decoder for caption generation</li>
                <li>PyTorch framework</li>
              </ul>

              <ProjectLinks>
                <Button
                  href="https://github.com/Ege-Cakar/FocusCaption"
                  target="_blank"
                >
                  View on GitHub
                </Button>
              </ProjectLinks>
            </ProjectDescription>
          </ProjectContent>
        </Card>
      </ProjectSection>

      <ProjectSection id="butler">
        <Card>
          <ProjectHeader>
            <CardTitle>BUTLER</CardTitle>
            <TagContainer>
              <Tag>RAG</Tag>
              <Tag>Automation</Tag>
              <Tag>Voice</Tag>
              <Tag>Web</Tag>
            </TagContainer>
          </ProjectHeader>
          <ProjectContent>
            <ProjectDescription>
              <h3>Overview</h3>
              <p>
                BUTLER is an AI helper that automates a variety of day‑to‑day
                tasks on your computer. It combines a retrieval‑augmented chat
                interface with automation capabilities to manage information,
                organize files and handle routine tasks. Finalist on the
                Anthropic Harvard Hackathon.
              </p>

              <h3>Details</h3>
              <p>
                At its core, BUTLER provides a chat/Vector Database system so
                you can query your personal knowledge base or documents. It
                automatically tidies your file system according to custom rules
                and manages your calendar by generating and organizing events.
                Beyond scheduling, the system automates tasks such as contact
                management, placing Amazon orders and handling emails. A
                voice‑control layer (built with Whisper and Eleven Labs) lets
                you interact with the assistant hands‑free. The frontend is
                built with a modern web stack that includes React, TypeScript,
                Vite and Tailwind CSS.
              </p>

              <h3>Technologies Used</h3>
              <ul>
                <li>React + TypeScript + Vite for the frontend</li>
                <li>
                  Tailwind CSS with Headless UI and Heroicons for styling and UI
                  components
                </li>
                <li>
                  Retrieval‑augmented generation (Vector Database) for chat and
                  knowledge queries
                </li>
                <li>
                  File‑system automation, calendar integration, contact and
                  email automation
                </li>
                <li>Voice control using Whisper and Eleven Labs</li>
                <li>House-developed computer use tool</li>
              </ul>

              <ProjectLinks>
                <Button
                  href="https://github.com/Ege-Cakar/BUTLER"
                  target="_blank"
                >
                  View on GitHub
                </Button>
              </ProjectLinks>
            </ProjectDescription>
          </ProjectContent>
        </Card>
      </ProjectSection>

      <ProjectSection id="macos-computer-use">
        <Card>
          <ProjectHeader>
            <CardTitle>MacOS‑Computer‑Use</CardTitle>
            <TagContainer>
              <Tag>VNC</Tag>
              <Tag>Automation</Tag>
              <Tag>Virtualization</Tag>
              <Tag>Claude</Tag>
            </TagContainer>
          </ProjectHeader>
          <ProjectContent>
            <ProjectDescription>
              <h3>Overview</h3>
              <p>
                MacOS‑Computer‑Use is a tool for remote control and automation
                of virtual machines via VNC. Designed primarily for UTM macOS
                virtual machines, it allows you to run commands and interact
                with a VM as if you were physically using it.
              </p>

              <h3>Details</h3>
              <p>
                The project comprises two main components: vnc_mcp.py, an MCP
                server that exposes VNC remote‑control capabilities, and
                client.py, a client application that connects to the MCP server
                and uses Claude AI to interpret natural‑language requests. Once
                connected, you can perform actions such as clicking, typing,
                pressing keys, taking screenshots and even executing SSH
                commands. The tool is intended to give Claude and other LLMs
                access to their own containerized computer that still supports
                most of the software people use day to day, unlike Linux.
              </p>

              <h3>Technologies Used</h3>
              <ul>
                <li>VNC protocol for remote control of the virtual machine</li>
                <li>
                  Claude AI API for interpreting user instructions in natural
                  language
                </li>
                <li>
                  UTM virtualization software for running macOS virtual machines
                </li>
              </ul>

              <ProjectLinks>
                <Button
                  href="https://github.com/Ege-Cakar/MacOS-VM-Computer-Use"
                  target="_blank"
                >
                  View on GitHub
                </Button>
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
              <p>
                Extending Eco Civilization MDP to be more realistic for
                explaining and understanding behavior of agents in complex,
                competitive environments.
              </p>

              <h3>Details</h3>
              <p>
                Updates include more realistic terrain and resource generation,
                population, population dissent and riots, and government types.
                Swapping the RNN agents with LLM agents who learn in-context for
                interpretability and transparency. Enabling interactive user
                intervention options for exploring how the agents will come to
                solutions in unexpected situations.
              </p>

              <h3>Technologies Used</h3>
              <ul>
                <li>Large Language Models (LLMs) for agent decision-making</li>
                <li>Advanced simulation environment</li>
                <li>Interpretability tools for understanding agent behavior</li>
                <li>Interactive visualization components</li>
              </ul>

              <ProjectLinks>
                <Button
                  href="https://github.com/Ege-Cakar/HCS-AI-RL-Project"
                  target="_blank"
                >
                  View on GitHub
                </Button>
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
              <p>
                A desktop application that combines audio recording,
                transcription, and LaTeX conversion for academic and scientific
                content. Users can speak mathematical equations and technical
                content, which are then transcribed and converted to proper
                LaTeX notation.
              </p>

              <h3>Details</h3>
              <p>
                The application supports both offline processing using a local
                Whisper model and cloud-based processing via the OpenAI API. It
                offers multiple formatting options for output and integrates
                with various AI providers (Ollama for fully local operation,
                OpenAI, Google, etc.).
              </p>

              <h3>Technologies Used</h3>
              <ul>
                <li>Audio recording and file format conversion</li>
                <li>Whisper model for local speech-to-text</li>
                <li>OpenAI API integration</li>
                <li>Customizable system prompts and model settings</li>
                <li>Persistent settings storage</li>
              </ul>

              <ProjectLinks>
                <Button
                  href="https://github.com/Ege-Cakar/talkToMe"
                  target="_blank"
                >
                  View on GitHub
                </Button>
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
              <p>
                A simple Mistral OCR Wrapper for converting PDF files to
                Markdown, with ways of viewing the content in-app. This quick
                project was scrapped together because I needed it and made open
                source so others can use it as well.
              </p>

              <h3>Details</h3>
              <p>
                This tool utilizes the Mistral OCR API to convert PDFs to
                markdown files, making it easier to use on a day-to-day basis.
                After uploading a PDF and getting back the response, content is
                displayed first as plain text, with additional options to view
                it as Markdown or in a browser for LaTeX rendering.
              </p>

              <h3>Technologies Used</h3>
              <ul>
                <li>Mistral OCR API integration</li>
                <li>PDF to Markdown conversion</li>
                <li>
                  Multiple viewing options (plain text, Markdown, browser)
                </li>
                <li>Standalone application with PyInstaller</li>
                <li>Persistent API key storage</li>
              </ul>

              <ProjectLinks>
                <Button
                  href="https://github.com/Ege-Cakar/MistralOCR"
                  target="_blank"
                >
                  View on GitHub
                </Button>
              </ProjectLinks>
            </ProjectDescription>
          </ProjectContent>
        </Card>
      </ProjectSection>
    </>
  );
};

export default Projects;
