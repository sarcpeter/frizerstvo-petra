import React from 'react';
import styled from 'styled-components';

import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faFacebook} from "@fortawesome/free-brands-svg-icons";

import Link from '../action/Link';

import logo from '../../images/brand/logo_horizontal.png';

const StyledFooter = styled.footer`
  box-sizing: border-box;
  height: var(--footer-height);
  padding: var(--layout-section-padding);
  color: var(--secondary-text-color);
  background: var(--primary-color);
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;
  
  @media screen and (min-width: 850px) {
    flex-direction: row;
    justify-content: space-between;
    
    & > div {
      width: 33%;
    }
  }
`;

const LogoContainer = styled.div`
  width: 225px;
  height: 91px;
`;

const LogoLink = styled(Link)`
  &::before {
    display: none;
    visibility: hidden;
  }
`;

const LogoImage = styled.img`
  max-width: 250px;
  height: 90px;
  overflow: hidden;
`;

const FooterLinks = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  
  @media screen and (min-width: 750px) {
    order: 2;
  }
`;

const Container = styled.div`
  width: fit-content;
  
  a {
    margin: 0;
    padding: 0.15rem 0.5rem;
    border-left: 1px solid var(--secondary-text-color);
    
    &:first-child {
      border-left: none;
    }
  }
`;

const TermsOfService = styled.div`
  display: flex;
  justify-content: center;
  
  a {
    margin: 0;
    padding: 0.15rem 0.5rem;
    font-size: 0.8rem;
    text-align: center;
    opacity: 0.9;
    
    &::before {
      bottom: 0;
    }
  }
`;

const SocialMedia = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  h4 {
    margin: 0;
  }

  a {
    &::before {
      left: calc(50% + 0.125rem);
      right: calc(50% - 0.125rem);
    }
    
    &:hover::before {
      right: 0;
    } 
    
    svg {
      margin-left: 0.5rem;
    }
  }

  @media screen and (min-width: 850px) {
    order: 3;
    align-items: flex-end;
    
    a {
      margin-right: 0;
      padding-right: 0;
      text-align: end;
    }
  }
`;

const Copyright = styled.p`
  opacity: 0.7;
  font-size: 0.7rem;
  text-align: center;
`;

const Footer = () => {
  return (
    <StyledFooter>
      <Content>
        <LogoContainer>
          <LogoLink to='/'>
            <LogoImage src={logo} alt='Frizerstvo Petra Logo' />
          </LogoLink>
        </LogoContainer>
        <SocialMedia>
          <h4>Sledi nam</h4>
          <Link href='https://www.facebook.com/p/FRIZERSTVO-PETRA-100063542471781/' target='_blank' rel='noreferrer'>
            Frizerstvo Petra
            <FontAwesomeIcon icon={faFacebook} />
          </Link>
        </SocialMedia>
        <FooterLinks>
          <Container>
            <Link to='/cenik'>Cenik</Link>
            <Link to='/kontakt'>Kontakt</Link>
            <Link to='/racun'>Račun</Link>
          </Container>
          <TermsOfService>
            <Link to='/pogoji-in-zasebnost'>Splošni pogoji in zasebnost</Link>
          </TermsOfService>
        </FooterLinks>
      </Content>
      <Copyright>
        Copyright © 2024 Petra Lipar s.p.  Vse pravice pridržane.
      </Copyright>
    </StyledFooter>
  );
}

export default Footer;