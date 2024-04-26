import React from 'react';
import styled from 'styled-components';

import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faFacebook} from "@fortawesome/free-brands-svg-icons";

import Link from '../content/Link';

/*
const StyledFooter = styled.footer`
  padding: var(--layout-section-padding);
  color: var(--secondary-text-color);
  background: var(--primary-color);
`;

const ContentWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  
  & > * {
    width: 30%;
  }
  
  @media screen and (max-width: 600px) {
    flex-direction: column;
  }
`;

const FooterLinks = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 0.5rem;
`;

const LinksRow = styled.div`
  display: flex;
  justify-content: center;
  margin: 0.25rem 1rem;
`;

const SiteMapLink = styled(Link)`
  position: relative;
  padding: 0.1rem 0.5rem;
  margin: 0.2rem 0.5rem;
  
  &:not(:first-child)::before {
    content: '';
    position: absolute;
    top: 0;
    left: -0.5rem;
    bottom: 0;
    width: 1px;
    background: var(--secondary-text-color);
    pointer-events: none;
  }
`;

const SocialMedia = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-end;
  
  h4 {
    margin: 0.5rem 0;
  }
  
  a {
    position: relative;
    margin: 0;
    padding: 0;
    opacity: 0.7;
    
    svg {
      margin-left: 0.3rem;
    }
  }
`;

const Copyright = styled.p`
  margin-top: 1rem;
  margin-bottom: 0;
  text-align: center;
  font-size: 0.7rem;
  opacity: 0.7;
`;
*/

const StyledFooter = styled.footer`
  padding: var(--layout-section-padding);
  color: var(--secondary-text-color);
  background: var(--primary-color);
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;
`;

const LogoContainer = styled.div`
  width: 225px;
  height: 91px;
  margin-top: 1rem;
  background: rgb(105, 0, 170);
`;

const FooterLinks = styled.div`
  
`;

const Container = styled.div`
  
`;

const TermsOfService = styled.div`
  display: flex;
  justify-content: center;
  
  a {
    font-size: 0.9rem;
    opacity: 0.9;
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
    svg {
      margin-left: 0.5rem;
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
          <Link to='/'>
            LOGO
          </Link>
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
  /*
  return (
    <StyledFooter>
      <ContentWrapper>
        <Link to='/' style={{height: '90px'}}>
          LOGO
        </Link>
        <FooterLinks>
          <LinksRow>
            <SiteMapLink to='/kontakt'>Kontakt</SiteMapLink>
            <SiteMapLink to='/cenik'>Cenik</SiteMapLink>
            <SiteMapLink to='/racun'>Račun</SiteMapLink>
          </LinksRow>
          <LinksRow>
            <Link to='/pogoji-in-zasebnost'>Splošni pogoji in zasebnost</Link>
          </LinksRow>
        </FooterLinks>
        <SocialMedia>
          <h4>Sledi nam</h4>
          <Link href='https://www.facebook.com/p/FRIZERSTVO-PETRA-100063542471781/' target='_blank' rel='noreferrer'>
            Frizerstvo Petra
            <FontAwesomeIcon icon={faFacebook} />
          </Link>
        </SocialMedia>
      </ContentWrapper>
      <Copyright>
        Copyright © 2024 Petra Lipar s.p.  Vse pravice pridržane.
      </Copyright>
    </StyledFooter>
  );
  */
}

export default Footer;