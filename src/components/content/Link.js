import React from 'react';
import styled, {css} from 'styled-components';

import { Link as GatsbyLink } from 'gatsby';

const LinkStyle = css`
  padding: 0.5rem;
  margin: 0 0.5rem;
  
  color: inherit;
  font-family: 'Lato', sans-serif;
  text-decoration: none;
  text-underline-offset: 0.25rem;
  
  &:hover {
    text-decoration: underline;
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