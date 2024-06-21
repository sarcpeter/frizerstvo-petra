import React, {useState} from 'react';
import styled, {css} from 'styled-components';

import Button from '../action/Button';

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 100;
  
  display: none;
  align-items: center;
  justify-content: center;
  background: rgba(0, 0, 0, 0.5);
  
  ${props => props.$isOpen && css`
    display: flex;
  `}
`;

const StyledDialog = styled.div`
  position: relative;
  padding: 2.5rem;
  border-radius: 1.5rem;
  background: var(--secondary-text-color);
`;

const CloseButton = styled.button`
  position: absolute;
  top: 0.75rem;
  right: 0.75rem;
  width: 1.5rem;
  height: 1.5rem;
  padding: 0;
  border: none;
  background: transparent !important;
  cursor: pointer;
  
  &:hover {
    opacity: 0.8;
  }
  
  span {
    display: block;
    position: absolute;
    top: 50%;
    left: 50%;
    width: 115%;
    height: 0.25rem;
    border-radius: 0.125rem;
    
    background: var(--primary-color);
    transform: translate(-50%, -50%) rotate(45deg);
    
    &:last-child {
      transform: translate(-50%, -50%) rotate(-45deg);
    }
  }
`;

const Dialog = ({
  id,
  style,
  children,
  className,
  openText,
  openStyle,
  openLayout,
  openOnClick,
  disableScroll = true,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDialog = (event = null) => {
    // Filter out elements that should not trigger the handler (eg. Overlay children)
    if (event && event.target !== event.currentTarget) {
      return;
    }

    setIsOpen(!isOpen);

    if (disableScroll) {
      document.body.style.overflow = (isOpen ? '' : 'hidden');
    }
  }

  return (
    <>
      {openText &&
        <Button
          style={openStyle}
          layout={openLayout}
          onClick={(event) => {
            if (openOnClick) {
              openOnClick(event)
            }
            toggleDialog(event);
          }}
        >
          {openText}
        </Button>
      }
      <Overlay $isOpen={isOpen} onClick={toggleDialog}>
        <StyledDialog
          id={id}
          style={style}
          className={className}
        >
          <CloseButton onClick={toggleDialog}>
            <span onClick={toggleDialog}/>
            <span onClick={toggleDialog}/>
          </CloseButton>
          {children}
        </StyledDialog>
      </Overlay>
    </>
  )
}

export default Dialog;