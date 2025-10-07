import React from "react";
import styled from "styled-components";
import {
  PageTitle,
  SectionTitle,
  Card,
  CardTitle,
  SkillsContainer,
  SkillCategory,
  SkillItem,
  SkillName,
} from "../components/UIComponents";

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

  @media (max-width: ${(props) => props.theme.breakpoints.mobile}) {
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
  color: ${(props) => props.theme.colors.text};
`;

const ResumeDates = styled.span`
  color: ${(props) => props.theme.colors.text};
  font-weight: 500;

  @media (max-width: ${(props) => props.theme.breakpoints.mobile}) {
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
        <p>
          Cambridge, MA 02138 • ecakar@college.harvard.edu • 857-757-9725 •
          Website: egecakar.com • GitHub: https://github.com/Ege-Cakar
        </p>
      </ContactInfo>

      <ResumeSection>
        <SectionTitle>Education</SectionTitle>
        <Card>
          <ResumeItem>
            <ResumeHeader>
              <div>
                <ResumeTitle>Harvard University</ResumeTitle>
                <ResumeSubtitle>
                  AB Joint Concentration in Statistics and Physics, Pursuing SM
                  in Computer Science
                </ResumeSubtitle>
                <p>GPA: 3.91/4.0</p>
              </div>
              <ResumeDates>May 2027</ResumeDates>
            </ResumeHeader>
            <ResumeContent>
              <p>
                <strong>Relevant Coursework:</strong>
              </p>
              <ul>
                <li>Computing at Scale (COMPSCI 2420) by H.T. Kung</li>
                <li>
                  Linear and Generalized Linear Models (STAT 244) by Mark
                  Glickman
                </li>
                <li>
                  Optimal Transport for ML (COMPSCI 2840) by David Alvarez-Melis
                </li>
                <li>AI Safety (COMPSCI 2881R) by Boaz Barak</li>
                <li>Statistical Physics (PHYSICS 181) by Matthew Schwartz</li>
                <li>
                  Machine Learning (COMPSCI 1810) by David Alvarez-Melis and
                  Finale Doshi-Velez
                </li>
                <li>Statistical Inference (STAT 111) by Joe Blitzstein</li>
                <li>Probability (STAT 110) by Joe Blitzstein</li>
                <li>
                  Algorithms and Their Limitations (COMPSCI 1200) by Salil
                  Vadhan and Anurag Anshu
                </li>
                <li>Reinforcement Learning (COMPSCI 1840) by Lucas Janson</li>
                <li>Quantum Mechanics (PHYSICS 143A) by Louis Deslauriers</li>
                <li>
                  Biological and Artificial Intelligence (NEUROBIO 240) by
                  Gabriel Kreiman
                </li>
                <li>
                  Introduction to Theoretical Physics (PHYSICS 19) by Jacob
                  Barandes
                </li>
              </ul>
              <p>
                <strong>Honors:</strong> John Harvard Scholar, given to the top
                10% of class, 2023-2024.
              </p>
            </ResumeContent>
          </ResumeItem>

          <ResumeItem>
            <ResumeHeader>
              <div>
                <ResumeTitle>American Collegiate Institute</ResumeTitle>
                <ResumeSubtitle>
                  Double diploma in the International Baccalaureate and the
                  Turkish Curriculum
                </ResumeSubtitle>
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
              <p>
                <strong>Machine learning frameworks:</strong> PyTorch, Jax,
                numpy, TensorFlow, Gymnasium, PettingZoo, Wandb, TensorBoard,
                Hugging Face Transformers
              </p>
              <p>
                <strong>Programming and Design:</strong> Python, C++, React,
                Mathematica, MATLAB, SLURM, Docker, GitHub, Matplotlib & Seaborn
              </p>
              <p>
                <strong>AI/ML Tools:</strong> LangGraph, AutoGen,
                OpenAI/Anthropic API, Docker, RunPod/Cloud services, Fine-Tuning
                (LoRA)
              </p>
            </ResumeContent>
          </ResumeItem>

          <ResumeItem>
            <ResumeHeader>
              <div>
                <ResumeTitle>
                  Eco Civilization MDP: A Multi-Agent Environment for Studying
                  Sustainable Growth
                </ResumeTitle>
              </div>
            </ResumeHeader>
            <ResumeContent>
              <ul>
                <li>
                  Developed a custom PettingZoo environment and trained agents
                  using Multi Agent Proximal Policy Optimization, building a
                  3000+ line codebase from scratch as part of a 3 person team.
                </li>
                <li>
                  Modeled collaboration and researched how countries can stay
                  competitive in growth while preserving the environment.
                </li>
              </ul>
            </ResumeContent>
          </ResumeItem>

          <ResumeItem>
            <ResumeHeader>
              <div>
                <ResumeTitle>
                  FocusCaption: A Novel Image Captioning Approach that Aims to
                  Mimic Humans
                </ResumeTitle>
              </div>
            </ResumeHeader>
            <ResumeContent>
              <ul>
                <li>
                  Utilized a saliency map generator to identify the point of
                  interest and focus in an image and cut it out, then utilized
                  information from 2 CNNs in parallel to extract information
                  from both the full image and the focused portion to provide to
                  a decoder for image captioning.
                </li>
                <li>
                  Perceived improvement specifically in counting the number of
                  subjects in the image and details.
                </li>
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
                <li>
                  Extending Eco Civilization MDP to be more realistic for
                  explaining and understanding behavior of agents in complex,
                  competitive, and realistic environments, with updates such as
                  more realistic terrain and resource generation, population,
                  population dissent and riots, and government types.
                </li>
                <li>
                  Swapping the RNN agents with LLM agents who learn in-context
                  for interpretability and transparency and enabling Interactive
                  user intervention options for exploring how the agents will
                  come to solutions in unexpected situations.
                </li>
                <li>
                  Will be utilized at Harvard Kennedy School for teaching.
                </li>
              </ul>
            </ResumeContent>
          </ResumeItem>
          <ResumeItem>
            <ResumeHeader>
              <div>
                <ResumeTitle>BUTLER Personal Agent</ResumeTitle>
              </div>
            </ResumeHeader>
            <ResumeContent>
              <ul>
                <li>
                  Anthropic Harvard Hackathon Finalist (1 of 4); architected
                  multi-tool personal assistant with sandboxed code execution,
                  macOS VM automation via custom computer-use package, file
                  system access, and API integrations in 24 hours.
                </li>
              </ul>
            </ResumeContent>
          </ResumeItem>

          <ResumeItem>
            <ResumeHeader>
              <div>
                <ResumeTitle>Open Source & Community</ResumeTitle>
              </div>
            </ResumeHeader>
            <ResumeContent>
              <ul>
                <li>
                  Various open-source contributions on GitHub. Hosted 10+ Coffee
                  Breaks for the Statistics Department at Harvard; Equity,
                  Diversity, Inclusion and Belonging Committee Member for the
                  Statistics Department at Harvard.
                </li>
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
                <ResumeTitle>
                  The Kempner Institute for the Study of Natural and Artificial
                  Intelligence
                </ResumeTitle>
                <ResumeSubtitle>
                  Student Researcher, KRANIUM Fellow Summer 2024, KURE Fellow
                  Fall 2024-2025 — Pehlevan Lab
                </ResumeSubtitle>
              </div>
              <ResumeDates>June 2024 - Current</ResumeDates>
            </ResumeHeader>
            <ResumeContent>
              <ul>
                <li>
                  Achieved +90% consistent performance across network widths
                  (64–2048) on compositional Boolean tasks by applying µp
                  normalization to MLPs.
                </li>
                <li>
                  Investigated OOD generalization across MLPs, LSTMs, and
                  Transformers.
                </li>
                <li>
                  Leveraged self-supervised learning approaches (e.g., SimCLR)
                  to assess how representations learned via SSL impact
                  classification accuracy.
                </li>
                <li>
                  Benchmarked Transformers, MLPs, and MLP-Mixers on synthetic
                  in-context learning; demonstrated in-weight to in-context
                  learning transitions and that Mixers with the same parameter
                  count beat transformers; learned algorithms flow through a
                  small number of channels (interpretability). The best
                  Transformer had 3× the parameter count of the best Mixer.
                </li>
                <li>
                  Modified the MLP-Mixer architecture to enforce causality on
                  the attention-like HyperMixer; matched GPT-2 perplexity on
                  Shakespeare with fewer parameters.
                </li>
                <li>
                  Investigating effects of synthetic reasoning data on held-out
                  and related reasoning tasks via ablations across data types
                  and proportions.
                </li>
              </ul>
            </ResumeContent>
          </ResumeItem>

          <ResumeItem>
            <ResumeHeader>
              <div>
                <ResumeTitle>
                  Cambridge University Center for Human Inspired Artificial
                  Intelligence – Kristensson Lab
                </ResumeTitle>
                <ResumeSubtitle>
                  Student Researcher, Harvard-Cambridge Summer Fellowship
                  Scholar (1 of 4 annually)
                </ResumeSubtitle>
              </div>
              <ResumeDates>June 2025 – August 2025</ResumeDates>
            </ResumeHeader>
            <ResumeContent>
              <ul>
                <li>
                  Developed automated risk-analysis system using 12+ agentic
                  large language models utilizing SWIFT risk assessment
                  methodology.
                </li>
                <li>
                  Pioneered framework using Structured Argumentation for
                  internal consistency and fact checking of corpora (including
                  generated); examined 100000+ word documents efficiently with
                  custom code.
                </li>
                <li>
                  First-author paper submitted to IAAI-26 (under review): 94.44
                  F1 on AAEC literal extraction (+5.7 over prior work, SOTA) and
                  0.81 F1 on 3-class AMT relation classification (AMT 1 + 2
                  combined), above SOTA.
                </li>
                <li>
                  Created optimized open-source Bipolar ABA in Python and
                  production-ready Docker containers; matched SOTA performance
                  within ~0.01 F1 with a model >2000× smaller.
                </li>
              </ul>
            </ResumeContent>
          </ResumeItem>

          <ResumeItem>
            <ResumeHeader>
              <div>
                <ResumeTitle>Harvard University</ResumeTitle>
                <ResumeSubtitle>
                  Course Assistant – Theoretical Physics, Quantum Mechanics 1
                </ResumeSubtitle>
              </div>
              <ResumeDates>September 2024 - Current</ResumeDates>
            </ResumeHeader>
            <ResumeContent>
              <ul>
                <li>
                  Provided supplementary education for students with upper-level
                  physics concepts. Evaluated assignments and provided feedback
                  for 80+ students.
                </li>
                <li>
                  Contributed to weekly organizational meetings on class
                  feedback; worked with the instructor to identify 5+ students
                  falling behind and provide support.
                </li>
              </ul>
            </ResumeContent>
          </ResumeItem>
          <ResumeItem>
            <ResumeHeader>
              <div>
                <ResumeTitle>Harvard Computer Society AI Group</ResumeTitle>
                <ResumeSubtitle>
                  Executive Director & Director of Outreach & Events
                </ResumeSubtitle>
              </div>
              <ResumeDates>Jan 2025 – Current</ResumeDates>
            </ResumeHeader>
            <ResumeContent>
              <ul>
                <li>
                  Run 3+ Introduction to AI bootcamps annually for high
                  schoolers (220+ attendees each), with low tuition and generous
                  financial aid.
                </li>
                <li>
                  Lead annual AI trek to SF or NYC, visiting 5+ companies with
                  10+ students; coordinate industry partnerships and manage
                  student projects.
                </li>
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

      <ResumeSection>
        <SectionTitle>PDF CV</SectionTitle>
        <Card>
          <iframe
            title="Ege Cakar - Embedded Resume"
            src="https://docs.google.com/document/d/1jzbjXIH8LOpnRMIYW4cbgsuk_og59mL2VI3CmVdl3Bo/preview"
            width="100%"
            height="900"
            style={{ border: 0 }}
          ></iframe>
          <div style={{ marginTop: "1rem", textAlign: "center" }}>
            <a
              href="https://docs.google.com/document/d/1jzbjXIH8LOpnRMIYW4cbgsuk_og59mL2VI3CmVdl3Bo/edit?tab=t.0"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "inline-block",
                padding: "0.5rem 1rem",
                border: "1px solid #d1d5db",
                borderRadius: "8px",
                textDecoration: "none",
                color: "#111827",
                backgroundColor: "#f5f5f5",
              }}
            >
              View in Google Docs
            </a>
          </div>
        </Card>
      </ResumeSection>
    </>
  );
};

export default Resume;
