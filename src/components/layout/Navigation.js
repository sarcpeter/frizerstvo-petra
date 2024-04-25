import React, {useState} from 'react';
import styled from 'styled-components';
import Link from '../content/Link';

const StyledNav = styled.nav`
  box-sizing: border-box;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  
  height: var(--navigation-heihgt);
  padding: 0.5rem 2.5rem;
  
  color: var(--secondary-text-color);
  background: var(--primary-color);
  
  @media screen and (min-width: 600px) {
    padding: 1rem 4.5rem;
  }
`;

const NavSection = styled.div`
  color: inherit;
  
  &:not([data-mobile]) {
    display: none;
  }
  
  @media screen and (min-width: 600px) {
    &:not([data-desktop]) {
      display: none;
    }
    
    &:not([data-mobile]) {
      display: block;
    }
  }
`;

const BurgerButton = styled.div`
  position: relative;
  z-index: 99;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  
  width: 1.75rem;
  height: 1.25rem;
  
  cursor: pointer;
  
  span {
    width: 100%;
    height: 0.2rem;
    border-radius: 0.1rem;
    background: var(--secondary-text-color);
    transition: all 0.2s ease;
  }
  
  &[data-open=true] span {
    &:nth-child(1) {
      transform: translateY(0.52rem) rotateZ(-45deg);
    }
    
    &:nth-child(2) {
      opacity: 0;
      transform: scaleX(1.1) scaleY(0.9);
    }

    &:nth-child(3) {
      transform: translateY(-0.52rem) rotateZ(45deg);
    }
  }
`;

const MobileMenu = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  
  background: var(--primary-color);
  
  &[data-open=false] {
    display: none;
  }
`;

const Navigation = (props) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = (event) => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
    document.body.style.overflow = (isMobileMenuOpen ? 'hidden' : 'visible');
  }

  return (
    <StyledNav>
      <NavSection data-mobile data-desktop>
        LOGO
      </NavSection>
      <NavSection data-desktop>
        <Link to='/salon'>
          O salonu
        </Link>
        <Link to='/storitve'>
          Storitve
        </Link>
        <Link to='/kontakt'>
          Kontakt
        </Link>
      </NavSection>
      <NavSection data-mobile>
        <BurgerButton data-open={isMobileMenuOpen} onClick={toggleMobileMenu}>
          <span></span>
          <span></span>
          <span></span>
        </BurgerButton>
        <MobileMenu data-open={isMobileMenuOpen}>

        </MobileMenu>
      </NavSection>
    </StyledNav>
  );
}

export default Navigation;