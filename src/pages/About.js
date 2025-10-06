import React from "react";
import styled from "styled-components";
import { PageTitle, Card, CardTitle, Grid } from "../components/UIComponents";
import profilePic from "../images/pfp.jpg";

const AboutContent = styled.div`
  display: flex;
  flex-direction: row;
  gap: 2rem;

  @media (max-width: ${(props) => props.theme.breakpoints.mobile}) {
    flex-direction: column;
  }
`;

const AboutImage = styled.div`
  flex: 1;
  text-align: center;

  img {
    border-radius: 50%;
    border: 2px solid ${(props) => props.theme.colors.border};
    max-width: 250px;
  }
`;

const AboutText = styled.div`
  flex: 2;
`;

const InterestIcon = styled.div`
  font-size: 2.5rem;
  color: ${(props) => props.theme.colors.text};
  margin-bottom: 1rem;
  text-align: center;
`;

const About = () => {
  return (
    <>
      <PageTitle>About Me</PageTitle>

      <Card>
        <AboutContent>
          <AboutImage>
            <img src={profilePic} alt="Ege Cakar" />
          </AboutImage>
          <AboutText>
            <h2>Hello, I'm Ege!</h2>
            <p>
              I'm a third-year undergraduate (junior) at Harvard College, joint
              concentrating in Statistics and Physics, with (hopefully) an
              Integrated Masters in Computer Science. My academic journey is
              driven by curiosity about how we can use computational methods to
              understand complex systems such as intelligence.
            </p>
            <p>
              I'm particularly fascinated by how neural networks learn to
              represent and process structured information, solving reasoning
              tasks humans excel at, and breaking down reasoning steps.
            </p>
            <p>
              Outside of academics, I love reading, music, taking walks, biking,
              spending time with friends and family, cooking, and games. I'm
              always open to collaborations and discussions about interesting
              projects or research opportunities.
            </p>
          </AboutText>
        </AboutContent>
      </Card>

      <h2 className="section-title">My Interests</h2>

      <Grid>
        <Card>
          <InterestIcon>
            <i className="fas fa-book"></i>
          </InterestIcon>
          <CardTitle>Reading</CardTitle>
          <p>
            My favorite book of all time is probably Pachinko by Min Jin Lee,
            which I recommend everyone read.
          </p>
        </Card>

        <Card>
          <InterestIcon>
            <i className="fas fa-music"></i>
          </InterestIcon>
          <CardTitle>Music</CardTitle>
          <p>
            I listen to music so much that my ears get tired. I'm an avid fan of
            Jazz, Rock, Spanish/Latin Folk, Metal, Blues, Other Folk, Funk, and
            many more. I'm also Turkish, so if you want to give Turkish music a
            try, I recommend Cem Karaca.
          </p>
        </Card>

        <Card>
          <InterestIcon>
            <i className="fas fa-utensils"></i>
          </InterestIcon>
          <CardTitle>Cooking</CardTitle>
          <p>
            I enjoy cooking and experimenting with different cuisines and
            flavors. It's a creative outlet that allows me to share my culture
            and experiences with friends and family. I also love eating, so it's
            a win-win.
          </p>
        </Card>

        <Card>
          <InterestIcon>
            <i className="fas fa-chess"></i>
          </InterestIcon>
          <CardTitle>Games</CardTitle>
          <p>
            I enjoy playing strategy games like Civilization and Frostpunk, and
            I'm also a big fan of fighting games and Nintendo games. Also love
            board games of all kinds!
          </p>
        </Card>
      </Grid>
    </>
  );
};

export default About;
