import React from 'react';
import styled from 'styled-components';

import SectionBase from './SectionBase';

const StyledSection = styled(SectionBase)`

`;

const TextAndImage = ({ blok }) => {
  return (
    <StyledSection
      id={blok.sectionId}
      blok={blok}
      $layout={blok.layout}
      $theme={blok.theme}
    >
      {blok.title}
    </StyledSection>

  );
}

export default TextAndImage;