import React from 'react';
import styled, {css} from 'styled-components';

import { Link as GatsbyLink } from 'gatsby';

const LinkStyle = css`
  position: relative;
  padding: 0.5rem;
  margin: 0 0.5rem;
  
  color: inherit;
  font-family: 'Lato', sans-serif;
  text-decoration: none;
  
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
`;

const StyledLink = styled(GatsbyLink)(LinkStyle);
const StyledAnchor = styled.a(LinkStyle);

const Link = ({ id, className, to, onClick, href, target, rel, children, style }) => {
  if (href) {
    return (
      <StyledAnchor id={id} className={className} href={href} target={target} rel={rel} style={style}>
        {children}
      </StyledAnchor>
    )
  }
  return (
    <StyledLink id={id} className={className} to={to} style={style} onClick={onClick}>
      {children}
    </StyledLink>
  );
}

export default Link;