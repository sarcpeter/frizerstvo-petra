import React, {useState} from 'react';
import styled from 'styled-components';
import {graphql} from 'gatsby';

import Link from '../action/Link';
import Button from '../action/Button';

import logo from '../../images/brand/logo_horizontal.png';
import {isBrowser} from '../../utils/Utils';

const NavContainer = styled.nav`
  --box-shadow: 0 0 5px rgba(255, 255, 255, 0.4);
  
  color: var(--secondary-text-color);
  background: var(--primary-color);
`;

const StyledNav = styled.div`
  box-sizing: border-box;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 100;
  display: flex;
  align-items: center;
  justify-content: space-between;
  
  height: var(--navigation-height);
  padding: var(--layout-section-padding);
  
  color: inherit;
  background: inherit;
`;

const NavSection = styled.div`
  color: inherit;
  
  &:not([data-mobile]) {
    display: none;
    visibility: hidden;
  }
  
  @media screen and (min-width: 800px) {
    &:not([data-desktop]) {
      display: none;
      visibility: hidden;
    }
    
    &:not([data-mobile]) {
      display: block;
      visibility: visible;
    }
  }
`;

const LogoLink = styled(Link)`
  &::before {
    display: none;
    visibility: hidden;
  }
`;

const LogoImage = styled.img`
  max-width: 250px;
  height: 70px;
  overflow: hidden;
`;

const NavLink = styled(Link)`
  &::before {
    bottom: 0.25rem;
    height: 1px;
    background: var(--secondary-color);
  }
  
  &.active::before {
    left: 0.25rem;
    right: 0.25rem;
  }
`;

const BurgerButton = styled.div`
  position: relative;
  z-index: 100;
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
  box-sizing: border-box;
  position: fixed;
  top: var(--navigation-height);
  left: 0;
  z-index: 90;
  display: flex;
  flex-direction: column;

  width: 100vw;
  height: calc(100vh - var(--navigation-height));
  max-height: 100vh;
  overflow: hidden;
  
  background: var(--primary-color);
  transition: max-height 0.3s ease;
  
  &[data-open=false] {
    max-height: 0;
  }
  
  @media screen and (min-width: 800px) {
    display: none;
    visibility: hidden;
  }
`;

const MobileSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 1rem 2rem;
`;

const Navigation = (props) => {
  const locationUrl = new URL((isBrowser() ? window.location.href : ''));
  const subpage = locationUrl.pathname.slice(1, -1);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = (event) => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
    document.body.style.overflow = (isMobileMenuOpen ? 'hidden' : 'visible');
  }

  return (
    <NavContainer>
      <StyledNav>
        <NavSection data-mobile data-desktop>
          <LogoLink to='/'>
            <LogoImage src={logo} alt='Frizerstvo Petra Logo' />
          </LogoLink>
        </NavSection>
        <NavSection data-desktop>
          <NavLink to='/salon' className={(subpage === 'salon' ? 'active' : '')}>
            O salonu
          </NavLink>
          <NavLink to='/storitve' className={(subpage === 'storitve' ? 'active' : '')}>
            Storitve
          </NavLink>
          <NavLink to='/kontakt' className={(subpage === 'kontakt' ? 'active' : '')}>
            Kontakt
          </NavLink>
          <Button to='/rezervacija' className={(subpage === 'rezervacija' ? 'active' : '')}>
            Rezervacija
          </Button>
        </NavSection>
        <NavSection data-mobile>
          <BurgerButton data-open={isMobileMenuOpen} onClick={toggleMobileMenu}>
            <span></span>
            <span></span>
            <span></span>
          </BurgerButton>
        </NavSection>
      </StyledNav>
      <MobileMenu data-open={isMobileMenuOpen}>
        <MobileSection>
          <NavLink to='/salon' className={(subpage === 'salon' ? 'active' : '')} onClick={toggleMobileMenu}>
            O salonu
          </NavLink>
          <NavLink to='/storitve' className={(subpage === 'storitve' ? 'active' : '')} onClick={toggleMobileMenu}>
            Storitve
          </NavLink>
          <NavLink to='/kontakt' className={(subpage === 'kontakt' ? 'active' : '')} onClick={toggleMobileMenu}>
            Kontakt
          </NavLink>
          <Button to='/rezervacija' className={(subpage === 'rezervacija' ? 'active' : '')} onClick={toggleMobileMenu}>
            Rezervacija
          </Button>
        </MobileSection>
      </MobileMenu>
    </NavContainer>
  );
}

export default Navigation;

export const pageQuery = graphql`
  # noinspection GraphQLUnresolvedReference
  query {
    logoImage: file(relativePath: { eq: "images/logo.png" }) {
      childImageSharp {
        fluid(maxWidth: 250) {
          ...GatsbyImageSharpFluid
        }
      }
    }
  }
`;