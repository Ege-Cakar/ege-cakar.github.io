import React from "react";
import { Link } from "react-router-dom";
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
  ViewAll,
} from "../components/UIComponents";
import profilePic from "../images/pfp.jpg";

const SHOW_ARXIV_BANNER = false;

const Home = () => {
  return (
    <>
      <Section className="hero">
        <PageTitle>Welcome!</PageTitle>
        {SHOW_ARXIV_BANNER && (
          <div
            style={{
              margin: "0.75rem 0 1rem",
              backgroundColor: "#f5f5f5",
              border: "1px solid #d1d5db",
              borderRadius: "8px",
              padding: "0.5rem 0.75rem",
              textAlign: "center",
            }}
          >
            <a
              href="https://arxiv.org/abs/2510.03442"
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: "#111827", textDecoration: "none" }}
            >
              🎉 My first paper is on arXiv, and I'm first author! 🎉
            </a>
          </div>
        )}
        <Card>
          <HeroContent>
            <HeroText>
              <h2>Ege Cakar</h2>
              <Subtitle>Machine Learning | Physics </Subtitle>

              <p>
                I'm a third-year undergraduate at Harvard College, joint
                concentrating in Statistics and Physics. My academic journey is
                driven by curiosity about how we can use computational methods
                to understand complex systems such as intelligence. I'm
                particularly fascinated by how neural networks learn to
                represent and process structured information, solving reasoning
                tasks humans excel at, and breaking down reasoning steps.
                Outside of academics, I love reading, music, taking walks,
                biking, spending time with friends and family, cooking, and
                games. I'm always open to collaborations and discussions about
                interesting projects or research opportunities.
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
              <img src={profilePic} alt="Ege Cakar" />
            </HeroImage>
          </HeroContent>
        </Card>
      </Section>

      <Section className="featured-projects">
        <SectionTitle>Featured Projects & Research</SectionTitle>
        <Grid>
          <ProjectCard>
            <ProjectContent>
              <CardTitle>LASER: Memory-Optimized TRMs</CardTitle>
              <p>
                Dynamic activation compression for Tiny Recursive Models (TRMs),
                using fast-subspace tracking for approximating SVD and resetting
                through a cheap-to-calculate metric. Results: ~60% activation
                memory reduction with negligible accuracy and speed impact.
              </p>
              <TagContainer>
                <Tag>Efficient Training</Tag>
                <Tag>Activation Compression</Tag>
                <Tag>Memory</Tag>
                <Tag>PyTorch</Tag>
              </TagContainer>
              <Button
                href="/projects#memory-optimized-trms"
                as={Link}
                to="/projects"
              >
                Learn More
              </Button>
            </ProjectContent>
          </ProjectCard>

          <ProjectCard>
            <ProjectContent>
              <CardTitle>ProofGOAT</CardTitle>
              <p>
                Optimal Transport alignment between natural‑language proofs and
                formal Lean proofs at the token level. Results: ~80% cosine
                alignment between NL→Lean transported tokens and the
                corresponding Lean tokens; aiming to keep fast verification
                signals accurate during RL for math.
              </p>
              <TagContainer>
                <Tag>Optimal Transport</Tag>
                <Tag>Lean</Tag>
                <Tag>Theorem Proving</Tag>
                <Tag>NLP</Tag>
              </TagContainer>
              <Button href="/projects#proofgoat" as={Link} to="/projects">
                Learn More
              </Button>
            </ProjectContent>
          </ProjectCard>

          <ProjectCard>
            <ProjectContent>
              <CardTitle>Improving GCG</CardTitle>
              <p>
                Faster jailbreak attacks: Soft‑GCG achieves ~43x speedup over
                standard GCG with negligible performance loss. Also explores
                activation‑guided objectives targeting refusal representations.
              </p>
              <TagContainer>
                <Tag>AI Safety</Tag>
                <Tag>Adversarial Attacks</Tag>
                <Tag>Interpretability</Tag>
                <Tag>Efficiency</Tag>
              </TagContainer>
              <Button
                href="/projects#improving-gcg"
                as={Link}
                to="/projects"
              >
                Learn More
              </Button>
            </ProjectContent>
          </ProjectCard>

          <ProjectCard>
            <ProjectContent>
              <CardTitle>Cambridge Summer Fellowship</CardTitle>
              <p>
                First-author paper submitted to IAAI-26 achieving SOTA results
                on argument mining. Developed novel framework treating AI
                systems like humans for verifiable reasoning and trust.
              </p>
              <TagContainer>
                <Tag>Explainability</Tag>
                <Tag>LLMs</Tag>
                <Tag>Agents</Tag>
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
                A reinforcement learning project that adapts the Civilization
                game to explore sustainable development strategies using
                Multi-Agent Proximal Policy Optimization (MAPPO).
              </p>
              <TagContainer>
                <Tag>Reinforcement Learning</Tag>
                <Tag>Multi-Agent</Tag>
                <Tag>PettingZoo</Tag>
              </TagContainer>
              <Button
                href="/projects#eco-civilization"
                as={Link}
                to="/projects"
              >
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
              <p>
                PyTorch, Jax, Hugging Face Transformers, Reinforcement Learning
                (PPO, Multi-Agent), Computer Vision (CNNs, Saliency), NLP & LLMs
                (BERT-based models, Llama, OpenAI/Anthropic/Google APIs), LLM
                Safety & Alignment (adversarial prompting, refusal
                representations), Optimal Transport, Automated Theorem Proving
                (Lean), Efficient Training (low-rank activation compression),
                Self-Supervised Learning (SimCLR), Argument Mining
              </p>
            </SkillCategory>

            <SkillCategory noShadow noTransform>
              <CardTitle>Programming & Infrastructure</CardTitle>
              <p>
                Python, C++, JavaScript/React, MATLAB, Mathematica, Docker,
                SLURM/HPC, Cloud Platforms (RunPod, GCP), Git/GitHub, SAT
                Solvers
              </p>
            </SkillCategory>

            <SkillCategory noShadow noTransform>
              <CardTitle>Research & Analysis</CardTitle>
              <p>
                Experimental Design, Statistical Analysis, Paper Writing, Poster
                Presentations, Open Source Development, Reproducible Research,
                High-Performance Computing
              </p>
            </SkillCategory>
          </SkillsContainer>
        </Card>
      </Section>
    </>
  );
};

export default Home;
