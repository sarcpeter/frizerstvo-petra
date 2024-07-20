import React from 'react';
import styled from 'styled-components';

import {GatsbyImage} from 'gatsby-plugin-image';

import BackgroundImage from './BackgroundImage';

const CardContainer = styled.div`
  overflow: hidden;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  width: 45%;
  min-width: min(450px, 100%);
  min-height: 280px;
  border-radius: var(--container-border-radius);
  box-shadow: var(--container-box-shadow);
  transition: all 0.2s ease;

  &:hover {
    transform: scale(1.05);

    [data-gatsby-image-wrapper] {
      transform: scaleX(1.3) scaleY(0);
    }
    
    h2, h3, p {
      transform: scale(1);
    }
  }
`;

const ContentWrapper = styled.div`
  padding: 1rem;
`;

const ImageWrapper = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  [data-gatsby-image-wrapper] {
    transition: all 0.2s ease;
  }
`;

const Image = styled(GatsbyImage)`
  height: 128px;
  width: 128px;
  margin: 0 auto;
  pointer-events: none;
`;

const Content = styled.div`
  h2, h3, p {
    transform: scaleY(0) scaleX(1.3);
    transition: all 0.2s ease;
  }
  
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
    >
      {backgroundImage &&
        <BackgroundImage
          image={backgroundImage}
          theme='dark'
        />
      }

      <ContentWrapper $layout={layout}>
        {image &&
          <ImageWrapper>
            <Image image={image.image.childImageSharp.gatsbyImageData} alt={image.alt} />
          </ImageWrapper>
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