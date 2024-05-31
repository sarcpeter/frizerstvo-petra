import React from 'react';
import styled, {css} from 'styled-components';

import Link from './Link';

const ButtonStyles = css`
  position: relative;
  width: fit-content;
  padding: 0.5rem 1.5rem;
  border: none;
  border-radius: 0.5rem;
  text-decoration: none;
  color: var(--text-color);
  background: var(--secondary-text-color);
  box-shadow: var(--box-shadow);
  font-family: 'Lato', sans-serif;
  cursor: pointer;
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
  
  ${props => props.$layout?.includes('big') && css` & {
    font-size: 1rem;
    padding: 0.7rem 3rem;
  }`}
`;

const ButtonLink = styled(Link)`${ButtonStyles}`;
const StyledButton = styled.button`${ButtonStyles}`;

const Button = ({ id, className, children, to, onClick, type, layout }) => {
  if (to) {
    return (
      <ButtonLink id={id} className={className} to={to} $layout={layout}>
        {children}
      </ButtonLink>
    );
  }

  return (
    <StyledButton id={id} className={className} onClick={onClick} type={type} $layout={layout}>
      {children}
    </StyledButton>
  );
}

export default Button;