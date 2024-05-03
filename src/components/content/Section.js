import React from 'react';
import styled from 'styled-components';

import BackgroundImage from 'gatsby-image';

const StyledSection = styled.section`
  position: relative;
  min-height: 50px;
  
  &:has(div img) {
    background: rgba(0, 0, 0, 0.6);
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


const Section = ({
  id,
  className,
  children,
  style,
  background
}) => {

  return (
    <StyledSection id={id} className={className} style={style}>
      {
        background &&
        <StyledBackgroundImage
          fluid={background.childImageSharp.fluid}
          style={{position: 'absolute'}}
        />
      }
      {children}
    </StyledSection>
  );
}

export default Section;