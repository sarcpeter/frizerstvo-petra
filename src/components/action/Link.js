import React from 'react';
import styled, {css} from 'styled-components';

import { Link as GatsbyLink } from 'gatsby';

const LinkStyle = css`
  position: relative;
  padding: 0.5rem;
  margin: 0 0.5rem;

  font-size: 1rem;
  font-family: 'Lato', sans-serif;
  text-decoration: none;
  color: inherit;
  
  &::before {
    content: '';
    position: absolute;
    bottom: 1px;
    left: 50%;
    right: 50%;
    height: 1px;
    background: var(--secondary-text-color);
    transition: all 0.2s ease;
  }
  
  &:hover::before {
    left: 0.5rem;
    right: 0.5rem;
  }

  @media screen and (min-width: 576px) {
    font-size: 1.1rem;
  }
`;

const StyledLink = styled(GatsbyLink)(LinkStyle);
const StyledAnchor = styled.a(LinkStyle);

const Link = ({ id, className, to, onClick, target, rel, children, style }) => {
  if (to.startsWith('/')) {
    // Internal link --> use GatsbyLink
    return (
      <StyledLink id={id} className={className} to={to} style={style} onClick={onClick}>
        {children}
      </StyledLink>
    )
  }

  // External link --> use anchor
  return (
    <StyledAnchor id={id} className={className} href={to} target={target} rel={rel} style={style}>
      {children}
    </StyledAnchor>
  );
}

export default Link;