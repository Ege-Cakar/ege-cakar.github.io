import React from "react";
import styled from "styled-components";
import {
  Section,
  PageTitle,
  Card,
  CardTitle,
} from "../components/UIComponents";

const LinkList = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
`;

const LinkItem = styled.li`
  margin-bottom: 0.75rem;
`;

const LinkAnchor = styled.a`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.75rem;
  padding: 0.75rem 1rem;
  border: 1px solid ${(props) => props.theme.colors.border};
  border-radius: 8px;
  background-color: ${(props) => props.theme.colors.cardBg};
  color: ${(props) => props.theme.colors.text};
  text-decoration: none;

  transition:
    background-color ${(props) => props.theme.motion.duration.normal}
      ${(props) => props.theme.motion.easing.standard},
    color ${(props) => props.theme.motion.duration.normal}
      ${(props) => props.theme.motion.easing.standard},
    border-color ${(props) => props.theme.motion.duration.normal}
      ${(props) => props.theme.motion.easing.standard},
    transform ${(props) => props.theme.motion.duration.normal}
      ${(props) => props.theme.motion.easing.standard},
    box-shadow ${(props) => props.theme.motion.duration.normal}
      ${(props) => props.theme.motion.easing.standard};

  transform: translateY(0);
  box-shadow: 0 0 0 rgba(0, 0, 0, 0);

  &:hover {
    background-color: ${(props) => props.theme.colors.gray100};
    transform: translateY(-1px);
    box-shadow: 0 2px 6px rgba(17, 24, 39, 0.06);
  }
`;

const Meta = styled.span`
  font-size: 0.875rem;
  color: ${(props) => props.theme.colors.gray600};
`;

const Blog = () => {
  // Initial content: one example blog post link (LessWrong) and an empty PDFs section.
  // Add more entries by appending to these arrays or converting to data fetched from a CMS later.
  const posts = [
    {
      title:
        "New: Blog post on Adversarial Robustness & Jailbreaks based on my AI Safety Class",
      href: "https://www.lesswrong.com/posts/xZA9cXkiRhnATpifZ/cs-2881r-week-3-adversarial-robustness-jailbreaks-prompt",
      external: true,
      meta: "LessWrong",
    },
    {
      title:
        "In-Context Learning Without Attention: MLP Mixers as an Alternative to Transformers",
      href: "/blog/mlp-mixer-icl",
      external: false,
      meta: "Post",
    },
  ];

  return (
    <>
      <PageTitle>Blog</PageTitle>

      <Section aria-labelledby="blog-posts-heading">
        <Card>
          <CardTitle id="blog-posts-heading">Posts</CardTitle>
          {posts.length === 0 ? (
            <p>No posts yet. Check back soon.</p>
          ) : (
            <LinkList>
              {posts.map((post, idx) => (
                <LinkItem key={idx}>
                  <LinkAnchor
                    href={post.href}
                    target={post.external ? "_blank" : "_self"}
                    rel={post.external ? "noopener noreferrer" : undefined}
                    aria-label={post.title}
                  >
                    <span>{post.title}</span>
                    <Meta>
                      {post.meta} {post.external ? "• External" : ""}
                      {post.external ? (
                        <i
                          className="fas fa-external-link-alt"
                          style={{ marginLeft: "0.4rem" }}
                          aria-hidden="true"
                        />
                      ) : null}
                    </Meta>
                  </LinkAnchor>
                </LinkItem>
              ))}
            </LinkList>
          )}
        </Card>
      </Section>
    </>
  );
};

export default Blog;
