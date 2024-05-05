import React from 'react';
import styled, {css} from 'styled-components';

import Link from './Link';

const ButtonStyles = css`
  width: fit-content;
  padding: 0.5rem 1.5rem;
  border-radius: 0.5rem;
  text-decoration: none;
  color: var(--text-color);
  background: var(--secondary-text-color);
  box-shadow: var(--box-shadow-light);
  transition: all 0.2s ease;
  
  &::before {
    display: none;
    visibility: hidden;
  }
  
  &:hover {
    text-decoration: none;
    color: var(--secondary-text-color);
    background: var(--secondary-color);
  }
`;

const ButtonLink = styled(Link)(ButtonStyles);
const StyledButton = styled.button(ButtonStyles);

const Button = ({ id, className, to, onClick, children }) => {
  if (to) {
    return (
      <ButtonLink id={id} className={className} to={to}>
        {children}
      </ButtonLink>
    );
  }

  return (
    <StyledButton id={id} className={className} onClick={onClick}>
      {children}
    </StyledButton>
  );
}

export default Button;