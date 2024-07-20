import React from 'react';
import styled, {css} from 'styled-components';

import Link from './Link';

const ButtonStyles = css`
  position: relative;
  width: fit-content;
  padding: 0.5rem 1.5rem;
  border: none;
  border-radius: 0.5rem;

  font-size: 1rem;
  font-family: 'Lato', sans-serif;
  text-decoration: none;
  color: var(--text-color);
  background: var(--secondary-text-color);
  box-shadow: var(--box-shadow);
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

  @media screen and (min-width: 576px) {
    font-size: 1.1rem;
  }
  
  ${props => props.$layout?.includes('big') && css` & {
    font-size: 1rem;
    padding: 0.7rem 3rem;
  }`}

  ${props => props.$layout?.includes('center') && css` & {
    margin: 0 auto;
  }`}
`;

const ButtonLink = styled(Link)`${ButtonStyles}`;
const StyledButton = styled.button`${ButtonStyles}`;

const Button = ({
  id,
  style,
  className,
  children,
  to,
  type,
  onClick,
  layout
}) => {
  if (to) {
    return (
      <ButtonLink id={id} style={style} className={className} to={to} $layout={layout}>
        {children}
      </ButtonLink>
    );
  }

  return (
    <StyledButton id={id} style={style} className={className} onClick={onClick} type={type} $layout={layout}>
      {children}
    </StyledButton>
  );
}

export default Button;