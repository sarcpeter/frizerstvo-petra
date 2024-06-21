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
  
  @media screen and (min-width: 900px) {
    width: 300px;
  }
`;

const PrijavaPage = () => {
  const handleSubmit = async (values) => {
    console.log(JSON.stringify(values, null, 2));
  }

  return (
    <Layout title='Prijava'>
      <Section
        id='prijava'
        layout='full-height'
      >
        <StyledForm onSubmit={handleSubmit}>
          <h1>Prijava</h1>
          <Input id='emmail' type='email' label='Elektronski naslov' required />
          <Input id='password' type='password' label='Geslo' required />
          <Input id='submit' type='submit' label='Prijava' />
          <Link to='/registracija'>Registracija</Link>
        </StyledForm>
      </Section>
    </Layout>
  );
}

export default PrijavaPage;