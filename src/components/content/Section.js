import React from 'react';
import styled, {css} from 'styled-components';

import {GatsbyImage} from 'gatsby-plugin-image';

import BackgroundImage from './BackgroundImage';
import Button from '../action/Button';
import Gallery from './Gallery';
import Card from './Card';

/*********************************************/
/*              Base Components              */
/*********************************************/

const StyledSection = styled.section`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  
  max-width: var(--max-content-width);
  margin: 0 auto;
  padding: var(--section-padding);
  color: var(--text-color);
  
  ${props => props.$background && css` & {
    color: var(--secondary-text-color);
  }`}

  /*****     Layouts     *****/

  ${props => props.$layout?.includes('constrained') && css` & {
    max-width: var(--content-width);
  }`}
  
  ${props => props.$layout?.includes('full-width') && css` & {
    max-width: none;
  }`}

  ${props => props.$layout?.includes('full-height') && css` & {
    box-sizing: border-box;
    min-height: calc(100vh - var(--footer-height) - var(--navigation-height));
  }`}

  ${props => props.$layout?.includes('half-content') && css` & {
    main > *:not(div, a, button) {
      width: 100%;
    }

    @media screen and (min-width: 750px) {
      main {
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
  }`}

  ${props => props.$layout?.includes('hero') && css` & {
    h1 {
      color: var(--secondary-color);
    }
  }`}

  ${props => props.$layout?.includes('side-by-side') && css` & {
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

    @media screen and (min-width: 860px) {
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
  }`}

  ${props => props.$layout?.includes('no-padding') && css` & {
    padding: 0;
  }`}

  ${props => props.$layout?.includes('reversed') && css` & {
    flex-direction: row-reverse;
  }`}

  /*****     Themes     *****/
  
  ${props => props.$theme?.includes('dark') && css` & {
    background: var(--primary-color);
  }`}
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

const Image = styled(GatsbyImage)`

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
  theme,
  cards,
  gallery,
  children
}) => {
  if (gallery) {
    return (
      <StyledSection
        id={id}
        className={className}
        style={style}
        $theme={theme}
        $layout={layout}
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
      style={style}
      $theme={theme}
      $layout={layout}
      $background={!!background}
    >
      {background &&
        <BackgroundImage
          image={background}
          theme='dark'
        />
      }

      {image &&
        <ImageContainer>
          <Image image={image.image.childImageSharp.gatsbyImageData} alt={image.alt} />
        </ImageContainer>
      }

      <StyledMain>
        {title && <StyledTitle>{title}</StyledTitle>}
        {description && <StyledDescription>{description}</StyledDescription>}
        {cards &&
          <CardsContainer>
            {cards.map((card, index) => { return (
              <Card
                key={`card_${index}`}
                title={card.title}
                description={card.description}
                image={card.image}
                backgroundImage={card.backgroundImage}
                layout={card.layout}
              />
            );})}
          </CardsContainer>
        }

        {children}

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