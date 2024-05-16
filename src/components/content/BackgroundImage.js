import React from 'react';
import styled from 'styled-components';

import BackgroundImage from 'gatsby-image';

const BackgroundContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: -1;
  overflow: hidden;
  
  & > div:first-child {
    position: static !important;
  }
`;

const ThemeOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  
  &[layout~='dark'] {
    background: rgba(22, 22, 22, 0.6);
  }
`;

const CustomBackgroundImage = ({
  id,
  key,
  style,
  className,
  theme,
  image
}) => {
  return (
    <BackgroundContainer
      id={id}
      key={key}
      style={style}
      className={className}
    >
      <BackgroundImage
        fluid={image.image.childImageSharp.fluid}
        alt={image.alt}
      />
      <ThemeOverlay
        layout={theme}
      />
    </BackgroundContainer>
  );
}

export default CustomBackgroundImage;