import React from 'react';
import styled, {css} from 'styled-components';

import {GatsbyImage as Image} from 'gatsby-plugin-image';

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
  
  margin: 0 auto;
  padding: var(--section-padding);
  color: var(--text-color);
  
  main {
    max-width: var(--max-content-width);
  }
  
  ${props => props.$background && css` & {
    color: var(--secondary-text-color);
  }`}

  /*****     Layouts     *****/

  ${props => props.$layout?.includes('banner') && css`
    box-sizing: border-box;
    height: calc(80vh - var(--navigation-height));
    min-height: fit-content;
         
    h1 {
      color: var(--secondary-color);
    }
  `}
  
  ${props => props.$layout?.includes('constrained') && css` & {
    main {
      max-width: var(--content-width);
    }
  }`}

  ${props => props.$layout?.includes('full-height') && css` & {
    box-sizing: border-box;
    min-height: calc(100vh - var(--footer-height) - var(--navigation-height));
  }`}

  ${props => props.$layout?.includes('half-content') && css` & {
    @media screen and (min-width: 769px) {
      main {
        align-items: flex-start;
        width: 50%;
        margin-left: 0;
        margin-right: auto;
        
        h1 {
          width: 150%;
          text-align: left;
        }
        
        p {
          text-align: left;
        }
        
        button, a {
          margin-top: 1.5rem;
          margin-left: 0;
        }
      }
    }
  }`}

  ${props => props.$layout?.includes('image') && css` & {
    main {
      flex-direction: column;
      
      h1 {
        margin: 0 auto;
      }
      
      p {
        margin: 0 auto 2rem;
        max-width: 400px;
      }
      
      @media screen and (min-width: 769px) {
        display: grid;
        grid-template-areas: 
          'image title'
          'image description'
        ;
        
        p {
          margin-bottom: 0;
        }
        
        ${props => props.$hasCta && css`
          grid-template-areas: 
            'image title'
            'image description'
            'image cta'
          ;
        `}
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

  ${props => props.$theme?.includes('big') && css` & {
    h1 {
      font-size: 2.25rem;
      margin-top: 1rem;
      margin-bottom: 1.5rem;
      
      @media screen and (min-width: 576px) and (max-width: 768px) {
        font-size: 3rem;
        margin-top: 1rem;
        margin-bottom: 2rem;
      }
      
      @media screen and (min-width: 769px) {
        font-size: 3.5rem;
        margin-top: 1.5rem;
        margin-bottom: 3rem;
      }
    }
  }`}

  ${props => props.$theme?.includes('large') && css` & {
    h1 {
      font-size: 2.75rem;
      
      @media screen and (min-width: 576px) and (max-width: 768px) {
        font-size: 3.95rem;
      }
      
      @media screen and (min-width: 769px) {
        font-size: 5rem;
      }
    }
  }`}

  ${props => props.$theme?.includes('serif') && css` & {
    h1 {
      font-family: 'Corinthia', serif;
    }
  }`}
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
`;

const StyledTitle = styled.h1`
  grid-area: title;
  margin: 0 auto;
  font-size: 1.75rem;
  font-family: 'Lato', sans-serif;
  color: var(--text-color);

  @media screen and (min-width: 576px) and (max-width: 768px) {
    font-size: 2.15rem;
  }

  @media screen and (min-width: 769px) {
    font-size: 2.5rem;
  }
`;

const StyledDescription = styled.p`
  grid-area: description;
  margin-left: auto;
  margin-right: auto;
  font-size: 1rem;
  
  @media screen and (min-width: 576px) {
    font-size: 1.1rem;
  }
`;

const StyledButton = styled(Button)`
  grid-area: cta;
  margin: auto;
`;

const EmptyButton = styled.span`
  grid-area: cta;
  height: 0;
`

/********************************************/
/*            Content Components            */
/********************************************/

const ImageContainer = styled.div`
  --image-size: 250px;

  grid-area: image;
  width: var(--image-size);
  height: var(--image-size);
  margin: 2rem auto;
  border-radius: 50%;
  overflow: hidden;
  
  @media screen and (min-width: 769px) {
    margin: 0 auto;
  }
  
  @media screen and (min-width: 1025px) {
    --image-size: 315px;
  }
`;

const CardsContainer = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  column-gap: 2rem;
  row-gap: 2rem;
  margin-bottom: 4rem;
  
  ${props => props.$layout?.includes('trio') && css`
    & > div { // CardContainer
      width: 25%;
      min-width: 250px;
    }
  `}
  
  ${props => props.$layout?.includes('duo') && css`
    & > div { // CardContainer
      width: calc(50% - 1rem);
      min-width: 250px;
    }
  `}
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
  cardsLayout,
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

  if (image) {
    return (
      <StyledSection
        id={id}
        className={className}
        style={style}
        $theme={theme}
        $layout={`image ${layout}`}
        $background={!!background}
        $hasCta={!!cta}
      >
        <StyledMain>
          {title && <StyledTitle>{title}</StyledTitle>}
          <ImageContainer>
            <Image image={image.image.childImageSharp.gatsbyImageData} alt={image.alt} />
          </ImageContainer>

          {description && <StyledDescription>{description}</StyledDescription>}

          {children}

          {cta && <StyledButton to={cta.to}>{cta.caption}</StyledButton>}
        </StyledMain>
      </StyledSection>
    );
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

      <StyledMain>
        {title && <StyledTitle>{title}</StyledTitle>}
        {description && <StyledDescription>{description}</StyledDescription>}
        {cards &&
          <CardsContainer $layout={cardsLayout}>
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
          <StyledButton to={cta.to}>
            {cta.caption}
          </StyledButton>
        }
      </StyledMain>
    </StyledSection>
  );
}

export default Section;