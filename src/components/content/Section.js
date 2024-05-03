import React from 'react';
import styled from 'styled-components';

const StyledSection = styled.section`

`;

const Section = ({
  id,
  className,
  children,
  style
}) => {
  return (
    <StyledSection id={id} className={className} style={style}>
      {children}
    </StyledSection>
  );
}

export default Section;