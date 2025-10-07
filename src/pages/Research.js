import React from "react";
import styled from "styled-components";
import {
  Section,
  PageTitle,
  Card,
  CardTitle,
  Grid,
  Button,
} from "../components/UIComponents";

const ResearchPosition = styled.section`
  margin-bottom: 3rem;
`;

const PositionSubtitle = styled.p`
  color: ${(props) => props.theme.colors.accentTeal};
  font-weight: 500;
  margin-bottom: 1.5rem;
`;

const ResearchContent = styled.div`
  h3 {
    color: ${(props) => props.theme.colors.accentTeal};
    margin: 1.5rem 0 0.5rem 0;
  }
`;

const Research = () => {
  return (
    <>
      <PageTitle>Research</PageTitle>

      <ResearchPosition>
        <Card>
          <CardTitle>
            The Kempner Institute for the Study of Natural and Artificial
            Intelligence
          </CardTitle>
          <PositionSubtitle>
            Student Researcher | June 2024 - Present | Cambridge, MA
          </PositionSubtitle>

          <ResearchContent>
            <h3>Current Research Focus</h3>
            <p>
              Investigating effects of synthetic reasoning data on held-out and
              related reasoning tasks through ablation studies across data types
              and proportions.
            </p>

            <h3>Summer 2024 Research (KRANIUM Fellow)</h3>
            <p>
              Investigated compositional Boolean calculation tasks across
              diverse network architectures including MLPs, LSTMs, and
              Transformers. Analyzed out-of-distribution performance and
              in-context learning capabilities. Achieved consistent performance
              across network widths by applying µP normalization in MLPs,
              demonstrating the importance of proper initialization schemes for
              scalable architectures.
            </p>

            <h3>Fall 2024 Research (KURE Fellow)</h3>
            <p>
              Leveraged self-supervised learning approaches, particularly
              SimCLR, to assess how representations learned through SSL impact
              classification accuracy. Explored the relationship between
              unsupervised pre-training objectives and downstream task
              performance.
            </p>

            <h3>Key Achievements</h3>
            <ul>
              <li>
                Developed novel architectural variations like the causal
                hypermixer model.
              </li>
              <li>
                Achieved consistent performance in such tasks across widths by
                applying µp normalization in MLPs. Selected as KRANIUM research
                fellow over Summer 2024.
              </li>
              <li>
                Leveraged self-supervised learning approaches (e.g., SimCLR) to
                assess how representations that are learned through SSL impact
                classification accuracy. Selected as KURE research fellow over
                Fall 2024.
              </li>
              <li>
                Investigated methods to transform in-context knowledge in LLMs
                into persistent memory, enabling on-the-fly model parameter
                updates for continuous learning.{" "}
              </li>
              <li>
                Currently working on analyzing equality reasoning with MLP Mixer
                models, and formulating a formal understanding of the equality
                reasoning problem.
              </li>
              <li>
                Ran large-scale experiments on the Kempner High Performance
                Cluster.
              </li>
              <li>
                Presented in lab meetings and a poster session over the summer.
              </li>
            </ul>
          </ResearchContent>
        </Card>
      </ResearchPosition>

      <ResearchPosition>
        <Card>
          <CardTitle>
            Cambridge University Department of Engineering - Kristensson Lab
          </CardTitle>
          <PositionSubtitle>
            Student Researcher | June 2025 - August 2025 | Cambridge, UK
          </PositionSubtitle>

          <ResearchContent>
            <p>Selected as Harvard-Cambridge Summer Fellowship Scholar.</p>

            <h3>Research Interests</h3>
            <p>
              At the Kristensson Lab, I worked on creating automated
              risk-analysis systems with agentic large language models, with a
              focus on creating an intuitive yet powerful package that is ready
              to be deployed by institutions, as well as automatic verification
              of internal consistency in documents.
            </p>
            <p>
              The main contribution of this work is the creation of a novel
              "source-agnostic explanatory verification" framework, treating AI
              systems like humans through verifiable reasoning chains.
            </p>
            <h3>Key Achievements</h3>
            <ul>
              <li>
                First-author paper submitted to IAAI-26(Under AAAI): "The
                Argument is the Explanation: Structured Argumentation for Trust
                in Agents" (under review)
              </li>
              <li>
                Achieved state-of-the-art performance in experiments: 94.44 F1
                on AAEC literal extraction, 0.81 F1 on AMT relation
                classification
              </li>
              <li>
                Developed complete multi-agent SWIFT risk assessment system with
                hub-spoke architecture
              </li>
              <li>
                Created open-source Bipolar ABA (Assumption-Based Argumentation)
                Python package with SAT-based solver
              </li>
              <li>
                Built production-ready Docker containers for deployment,
                published as docker.io/egecakar/edu-classifier
              </li>
              <li>
                Demonstrated computational efficiency: ModernBERT matches
                GPT-4.1 performance at a fraction of the size (GPT-4.1's exact
                size is undisclosed, but ModernBERT is ~500M parameters)
              </li>
              <li>
                First-author paper now on arXiv:{" "}
                <a
                  href="https://arxiv.org/abs/2510.03442"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  arXiv:2510.03442
                </a>
              </li>
            </ul>
            <Button
              href="https://github.com/Ege-Cakar/Structured-Argumentation-For-Trust"
              target="_blank"
              rel="noopener noreferrer"
            >
              View Repo
            </Button>
            <Button
              href="https://arxiv.org/abs/2510.03442"
              target="_blank"
              rel="noopener noreferrer"
              style={{ marginLeft: "0.5rem" }}
            >
              View Paper
            </Button>
          </ResearchContent>
        </Card>
      </ResearchPosition>

      <Section className="research-interests">
        <h2 className="section-title">Research Interests</h2>

        <Grid>
          <Card>
            <CardTitle>Machine Learning</CardTitle>
            <p>
              Exploring the capabilities and limitations of neural networks,
              particularly in the domains of mathematical reasoning and semantic
              understanding. My work focuses on understanding how different
              architectures process and represent structured information.
            </p>
          </Card>

          <Card>
            <CardTitle>Reinforcement Learning</CardTitle>
            <p>
              Investigating multi-agent systems and their applications in
              complex environments. I'm recently particularly interested in how
              reinforcement learning can be used to supplement supervised
              learning and overcome its weaknesses, as well as its robotics
              applications.
            </p>
          </Card>

          <Card>
            <CardTitle>Physics & Applied Mathematics</CardTitle>
            <p>
              Interested in the intersection of physics, applied mathematics,
              and artificial intelligence, exploring questions about
              mathematical modeling, dynamical systems, and the nature of
              intelligence.
            </p>
          </Card>
        </Grid>
      </Section>
    </>
  );
};

export default Research;
