import React from 'react';
import styled from 'styled-components';
import {
  PageTitle,
  Card,
  CardTitle,
  Grid
} from '../components/UIComponents';
import profilePic from '../images/pfp.jpg';

const AboutContent = styled.div`
  display: flex;
  flex-direction: row;
  gap: 2rem;
  
  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    flex-direction: column;
  }
`;

const AboutImage = styled.div`
  flex: 1;
  text-align: center;
  
  img {
    border-radius: 50%;
    border: 4px solid ${props => props.theme.colors.flame};
    max-width: 250px;
  }
`;

const AboutText = styled.div`
  flex: 2;
`;

const InterestIcon = styled.div`
  font-size: 2.5rem;
  color: ${props => props.theme.colors.flame};
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
              I'm a second-year undergraduate at Harvard College, double concentrating in Statistics and Physics, with an Integrated Masters in Applied Math. My academic journey is driven by curiosity about how we can use computational methods to understand complex systems such as intelligence.
            </p>
            <p>
              I'm particularly fascinated by how neural networks learn to represent and process structured information, solving reasoning tasks humans excel at. 
            </p>
            <p>
              Outside of academics, I love reading, music, taking walks, spending time with friends and family, cooking, and strategy games. I'm always open to collaborations and discussions about interesting projects or research opportunities.
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
            My favorite book of all time is probably Pachinko by Min Jin Lee, which I recommend everyone read. If you're into philosophy, I recommend looking into reading Seneca and Aurelius.
          </p>
        </Card>
        
        <Card>
          <InterestIcon>
            <i className="fas fa-music"></i>
          </InterestIcon>
          <CardTitle>Music</CardTitle>
          <p>
            I listen to music so much that my ears get tired. I'm an avid fan of Jazz (Chet Baker, Stan Getz, Miles Davis, Frank Sinatra, Bill Evans, Dave Brubeck, Duke Ellington, Masayoshi Takanaka), Rock (Pink Floyd, Muse, The Strokes, Franz Ferdinand), Spanish/Latin Folk (Compay Segundo, Mon Laferte), Metal (Gojira), Blues (Albert King, Freddie King, B.B King), Other Folk (Fish in a Birdcage, Poor Man's Poison), Funk (Daft Punk), and many more. I'm also Turkish, so if you want to give Turkish music a try, I recommend Cem Karaca.
          </p>
        </Card>
        
        <Card>
          <InterestIcon>
            <i className="fas fa-utensils"></i>
          </InterestIcon>
          <CardTitle>Cooking</CardTitle>
          <p>
            I enjoy cooking and experimenting with different cuisines and flavors. It's a creative outlet that allows me to share my culture and experiences with friends and family.
          </p>
        </Card>
        
        <Card>
          <InterestIcon>
            <i className="fas fa-chess"></i>
          </InterestIcon>
          <CardTitle>Strategy Games</CardTitle>
          <p>
            I enjoy playing strategy games to put myself through the enjoyable process that I put my models through. Some I really like are the Civilization games.
          </p>
        </Card>
      </Grid>
    </>
  );
};

export default About;
