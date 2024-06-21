import React from 'react';
import styled from 'styled-components';

import Layout from '../components/layout/Layout';
import Section from '../components/content/Section';
import Form from '../components/action/Form';
import Input from '../components/action/Input';

const StyledSection = styled(Section)`
  max-width: var(--content-width);
`;

const StyledForm = styled(Form)`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  max-width: var(--content-width);
  
  button#submit {
    margin: 0 auto;
  }
  
  & > div {
    width: 100%;
    
    @media screen and (min-width: 700px) {
      &:has(#first-name, #last-name) {
        width: calc(50% - 1rem);
      }
    }
  }
`;

const KontaktPage = () => {
  return (
    <Layout title='Kontakt'>
      <StyledSection
        id='kontakt'
        title='Kontakt'
        description='Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'
        layout='full-height'
      >
        <StyledForm
          onSubmit={(values) => {
            console.log(JSON.stringify(values, null, 2));
          }}
        >
          <Input id='first-name' type='text' label='Ime' required />
          <Input id='last-name' type='text' label='Priimek' required />
          <Input id='email' type='email' label='Elektronski naslov' required />
          <Input id='message' type='textarea' label='Sporočilo' required />
          <Input id='submit' type='submit' label='Pošlji' />
        </StyledForm>
      </StyledSection>
    </Layout>
  )
}

export default KontaktPage;