import React from 'react';

import { Link as GatsbyLink } from 'gatsby';
import styled from 'styled-components';

const StyledLink = styled(GatsbyLink)`
  padding: 0.5rem;
  margin: 0 0.5rem;
  
  color: inherit;
  font-family: 'Lato', sans-serif;
  text-decoration: none;
  
  transition: all 0.2s ease;
  
  &:hover {
    text-decoration: underline;
  }
`;

const Link = ({ children, to }) => {
  return (
    <StyledLink to={to}>
      {children}
    </StyledLink>
  );
}

export default Link;