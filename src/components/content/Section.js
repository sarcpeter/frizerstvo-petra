import React from 'react';
import styled from 'styled-components';

import BackgroundImage from 'gatsby-image';
import Img from 'gatsby-image';

import Button from './Button';
import Gallery from './Gallery';


/*********************************************/
/*              Base Components              */
/*********************************************/

const StyledSection = styled.section`
  position: relative;
  display: flex;
  align-items: center;
  
  max-width: var(--content-width);
  margin: 0 auto;
  padding: var(--section-padding);
  color: var(--text-color);
  
  &[data-background=true] {
    color: var(--secondary-text-color);
    background: rgba(0, 0, 0, 0.6);
  }

  /*****     Layouts     *****/
  
  &[layout~='full-width'] {
    max-width: none;
  }

  &[layout~='half-content'] {
    main > *:not(div, a, button) {
      width: 100%;
    }
  }
  
  &[layout~='hero'] main {
    h1 {
      color: var(--secondary-color);
    }
  }
  
  &[layout~='side-by-side'] {
    flex-direction: column;
    
    &:has(div > div > img) {
      div:has(> div > img) {
        transform: translateY(6.5rem);
      }
      
      main {
        h1 {
          transform: translateY(calc(-250px));
        }
        
        p {
          width: 70%;
          min-width: 250px;
        }
      }
    }
  }
  
  &[layout~='no-padding'] {
    padding: 0;
  }

  /*****     Themes     *****/
  
  &[layout~='dark'] {
    background: var(--primary-color);
  }
  
  @media screen and (min-width: 860px) {
    &[layout~='side-by-side'] {
      flex-direction: row;
      gap: 5rem;

      &:has(div > div > img) {
        div:has(> div > img) {
          transform: none;
        }

        main {
          h1 {
            transform: none;
          }

          p {
            width: auto;
            min-width: auto;
          }
        }
      }
    }

    &[layout~='reversed'] {
      flex-direction: row-reverse;
    }
  }
  
  @media screen and (min-width: 750px) {
    &[layout~='half-content'] main {
      align-items: flex-start;
      
      & > h1 {
        width: 75%;
        text-align: left;
      }
      
      & > p {
        width: 50%;
        text-align: left;
      }
    }
  }
`;

const StyledBackgroundImage = styled(BackgroundImage)`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: -1;
`;

const ImageContainer = styled.div`
  --image-size: 250px;
  
  flex-shrink: 0;
  width: var(--image-size);
  height: var(--image-size);
  border-radius: 50%;
  overflow: hidden;
  
  @media screen and (min-width: 1000px) {
    --image-size: 315px;
  }
`;

const Image = styled(Img)`

`;

/********************************************/
/*            Default Components            */
/********************************************/

const StyledMain = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;

  & > * {
    text-align: center;
  }

  a,
  button {
    display: block;
    margin: 0;
    color: var(--secondary-text-color);
    background: var(--secondary-color);
  }

  &:has(p) > h1 {
    margin-bottom: 2rem;
  }

  &:has(a) > p,
  &:has(button) > p {
    margin-bottom: 4rem;
  }
`;

const StyledTitle = styled.h1`
  margin-top: 0;
  margin-bottom: 0;
  font-family: 'Corinthia', serif;
  font-size: 5rem;
  color: var(--text-color);
`;

const StyledDescription = styled.p`

`;

/********************************************/
/*             Cards Components             */
/********************************************/

const CardsContainer = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  column-gap: 3rem;
  row-gap: 5rem;
  margin-bottom: 4rem;
`;

const Card = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  
  width: 30%;
  min-width: 250px;
  
  &:hover {
    //TODO: Add hover effect for Card
  }
`;

const CardImage = styled(Img)`
  height: 128px;
  width: 128px;
  pointer-events: none;
  transition: all 0.2s ease;
`;

const CardContent = styled.div`
  p {
    width: 200px;
    margin: 0;
    padding: 1rem;
  }
`;

/*********************************************/
/*                  Section                  */
/*********************************************/

const Section = ({
  id,
  className,
  style,
  title,
  description,
  cta,
  image,
  background,
  layout,
  cards,
  gallery
}) => {

  if (gallery) {
    return (
      <StyledSection
        id={id}
        className={className}
        layout={layout}
        style={style}
      >
        <Gallery
          images={gallery.images}
          imageSize={gallery.imageSize}
          disableAutoscroll={gallery.disableAutoscroll}
          disableInteractions={gallery.disableInteractions}
        />
      </StyledSection>
    )
  }

  return (
    <StyledSection
      id={id}
      className={className}
      layout={layout}
      style={style}
      data-background={!!background}
    >
      {background &&
        <StyledBackgroundImage
          fluid={background.childImageSharp.fluid}
          style={{position: 'absolute'}}
        />
      }

      {image &&
        <ImageContainer>
          <Image fluid={image.image.childImageSharp.fluid} alt={image.alt} />
        </ImageContainer>
      }

      <StyledMain>
        {title && <StyledTitle>{title}</StyledTitle>}
        {description && <StyledDescription>{description}</StyledDescription>}
        {cards &&
          <CardsContainer>
            {cards.map((card, index) => { return (
              <Card key={`card_${index}`}>
                <CardImage fluid={card.image.childImageSharp.fluid} />
                <CardContent>
                  <h2>{card.title}</h2>
                  <p>{card.description}</p>
                </CardContent>
              </Card>
            );})}
          </CardsContainer>
        }
        {cta &&
          <Button to={cta.to}>
            {cta.caption}
          </Button>
        }
      </StyledMain>
    </StyledSection>
  );
}

export default Section;