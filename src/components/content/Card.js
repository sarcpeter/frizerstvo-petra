import React from 'react';
import styled from 'styled-components';

import Img from 'gatsby-image';

import BackgroundImage from './BackgroundImage';

const CardContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;

  width: 45%;
  min-width: min(450px, 80vw);


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
  &[layout~='center'] {
    & > div:first-child {
      left: 50%;
      transform: translateX(-50%);
    }
  }
`;

const Image = styled(Img)`
  height: 128px;
  width: 128px;
  pointer-events: none;
  transition: all 0.2s ease;
`;

const Content = styled.div`
  p {
    width: 200px;
    margin: 0;
    padding: 1rem;
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