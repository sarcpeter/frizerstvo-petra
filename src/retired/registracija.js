import React from "react";
import styled from "styled-components";

import Layout from "../components/layout/Layout";
import Section from "../components/content/Section";
import Form from "../components/action/Form";
import Input from "../components/action/Input";
import Link from "../components/action/Link";

const StyledForm = styled(Form)`
  width: 200px;
  padding: 2rem;
  border-radius: 1.25rem;
  box-shadow: var(--setion-box-shadow);
  
  h1 {
    margin-bottom: 2rem;
  }
  
  [type='submit'] {
    margin: 2rem auto 0.5rem;
  }
  
  a {
    font-size: 0.9rem;
    color: var(--primary-text-color);
    background: transparent;
    
    &:hover {
      text-decoration: underline;
    }
  }
  
  @media screen and (min-width: 756px) {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    width: 600px;
    
    & > * {
      width: 100%;
    }
    
    & > div:has(input) {
      width: calc(50% - 1rem);
    }

    [type='submit'] {
      margin-top: 1rem;
    }
  }
`;

const RegistracijaPage = () => {
  const handleSubmit = async (values) => {
    console.log(JSON.stringify(values, null, 2));
  }

  return (
    <Layout title='Registracija'>
      <Section
        id='registracija'
        layout='full-height'
      >
        <StyledForm onSubmit={handleSubmit}>
          <h1>Registracija</h1>
          <Input id='first-name' type='text' label='Ime' required />
          <Input id='last-name' type='text' label='Priimek' required />
          <Input id='email' type='email' label='Elektronski naslov' required />
          <Input id='phone' type='tel' label='Telefonska številka' required />
          <Input id='password' type='password' label='Geslo' required />
          <Input id='repaet-password' type='password' label='Ponovite geslo' required />
          <Input id='submit' type='submit' label='Registracija' />
          <Link to='/prijava'>Prijava</Link>
        </StyledForm>
      </Section>
    </Layout>
  );
}

export default RegistracijaPage;