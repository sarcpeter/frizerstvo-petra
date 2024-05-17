import React from 'react';
import styled from 'styled-components';

import Img from 'gatsby-image';

import BackgroundImage from './BackgroundImage';

const CardContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  width: 45%;
  min-width: min(450px, 100%);
  min-height: 280px;
  
  &[layout~='dark'] {
    color: var(--secondary-text-color);
  }

  &:has([layout~='trio']) {
    width: 30%;
    min-width: 250px;
  }

  &:hover {
    //TODO: Add hover effect for Card
  }
`;

const ContentWrapper = styled.div`
  padding: 1rem;
  
  &[layout~='left-align'] {
    display: flex;
    flex-direction: column;
    justify-content: center;
    min-height: 50vh;
    padding: 2rem 0;

    & > div:first-child { // Image
      height: 64px;
      width: 64px;
    }
    
    @media screen and (min-width: 480px) {
      flex-direction: row;
      min-height: auto;
      
      & > div:first-child { // Image
        top: 50%;
        height: 96px;
        width: 96px;
        transform: translateY(-50%);
      }
      
      p {
        max-width: 250px;
      }
    }
  }
`;

const Image = styled(Img)`
  height: 128px;
  width: 128px;
  margin: 0 auto;
  pointer-events: none;
  transition: all 0.2s ease;
`;

const Content = styled.div`
  p {
    margin: 1rem;
  }
`;

const Card = ({
  id,
  key,
  style,
  className,
  layout,
  title,
  subtitle,
  description,
  image,
  backgroundImage
}) => {
  return (
    <CardContainer
      id={id}
      key={key}
      style={style}
      className={className}
      layout={backgroundImage ? 'dark' : ''}
    >
      {backgroundImage &&
        <BackgroundImage
          image={backgroundImage}
          theme='dark'
        />
      }

      <ContentWrapper layout={layout}>
        {image &&
          <Image
            fluid={image.image.childImageSharp.fluid}
            alt={image.alt}
          />
        }

        <Content>
          {title &&
            <h2>{title}</h2>
          }
          {subtitle &&
            <h3>{subtitle}</h3>
          }
          {description &&
            <p>{description}</p>
          }
        </Content>
      </ContentWrapper>
    </CardContainer>
  )
}

export default Card;