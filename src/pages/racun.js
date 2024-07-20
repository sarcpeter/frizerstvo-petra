import React, {useState} from 'react';
import styled, {css} from "styled-components";
import {graphql, useStaticQuery, navigate} from 'gatsby';

import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faQuestionCircle, faScissors, faUser} from "@fortawesome/free-solid-svg-icons";

import Layout from '../components/layout/Layout';
import Section from "../components/content/Section";
import Form from "../components/action/Form";
import Input from '../components/action/Input';
import Dialog from '../components/content/Dialog';
import BackgroundImage from '../components/content/BackgroundImage';

const ContentWrapper = styled.div`
  width: 100%;
  
  @media screen and (min-width: 750px) {
    display: flex;
    gap: 2rem;
  }
`;

const StyledAside = styled.aside`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  min-width: 250px;
  
  @media screen and (min-width: 750px) {
    max-width: 33%;
  }
`;

const UserContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  
  height: fit-content;
  padding: 1rem;
  border-radius: 1.25rem;
  box-shadow: var(--container-box-shadow);
`;

const UserIcon = styled(FontAwesomeIcon)`
  width: 64px;
  height: 64px;
  padding: 2rem;
  margin: 0 auto;
  border-radius: 50%;
  font-size: 4rem;
  color: var(--secondary-text-color);
  background: var(--primary-color);
`;

const UserDetails = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  
  & > div:first-child {
    width: 100%;
  }
`;

const StyledDisplay = styled.div`
  padding: 0.5rem 1rem;
  
  span {  // Label
    display: block;
    font-size: 0.8em;
    font-weight: bold;
    text-align: left;
    opacity: 0.7;
  }
  
  p {     // Value
    margin: 0.2rem 0 0 0.3rem;
    text-align: left;
    word-break: break-all;
  }
  
  @media screen and (min-width: 750px) {
    span {  // Label
      font-size: 0.9rem;
    }

    p {     // Value
      font-size: 1.2rem;
    }
  }
  
  ${props => props.$layout?.includes('center') && css`
    span, p {
      width: fit-content;
      margin-left: auto;
      margin-right: auto;
      text-align: center;
    }
  `}

  ${props => props.$layout?.includes('small-value') && css`
    p {
      font-size: 0.9rem;
    }
  `}
`;


const ActionWrapper = styled.div`
  padding: 1rem;
  border-radius: var(--container-border-radius);
  box-shadow: var(--container-box-shadow);
  
  h2 {
    margin-left: auto;
    margin-right: auto;
  }
`;

const SectionTitle = styled.h2`
  position: relative;
  z-index: 15;
  width: fit-content;
  margin: 0 0 1rem;
  font-size: 1.25em;
  text-align: left;

  &::before {
    content: '';
    display: none;
    
    position: absolute;
    left: calc(100% + 0.45rem);
    bottom: -0.85rem;
    z-index: 12;
    
    width: 0.5rem;
    height: 0.5rem;
    border: 1px solid var(--primary-color);
    
    background: var(--secondary-text-color);
    transform: scaleY(1.5) rotate(45deg);
    clip-path: polygon(0 0, 100% 0, 0 100%);
  }
  
  &:has(svg:hover) {
    p,
    &::before {
      display: block;
    }
  }
`;

const QuestionIcon = styled(FontAwesomeIcon)`
  position: absolute;
  top: 50%;
  left: calc(100% + 0.3rem);
  font-size: 0.8rem;
  transform: translateY(-50%);
`;

const ActionDescription = styled.p`
  position: absolute;
  top: calc(100% + 0.5rem);
  left: -75px;
  z-index: 10;
  display: none;
  
  width: fit-content;
  min-width: 200px;
  margin: 0;
  padding: 0.3rem;
  border: 1px solid var(--primary-color);
  
  font-size: 0.8rem;
  background: var(--secondary-text-color);
  
  span {
    font-weight: bold;
    text-transform: uppercase;
    color: var(--secondary-color);
  }
`;

const Action = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  max-width: 300px;
  margin: 0 auto;
  
  & > div {
    width: 20%;
  }
  
  ${props => props.$actionCuts && css`
    div:has(svg):nth-child(-n+${props.$actionCuts}) {
      svg {
        opacity: 1;
        background: var(--secondary-color);
      }
    }
  `}}
`;

const ActionIcon = styled.div`
  margin: 0.1rem 0;
  transform: rotate(-15deg);
  
  svg {
    padding: 0.25rem;
    border: 1px solid var(--secondary-color);
    border-radius: 50%;
    font-size: 0.8rem;
    opacity: 0.5;
  }
`;


const ReservationsWrapper = styled.div`
  box-sizing: border-box;
  width: 100%;
  margin-top: 3rem;
  border-radius: var(--container-border-radius);
  
  @media screen and (min-width: 750px) {
    margin-top: 0;
  }
`;

const NoData = styled.span`
  display: inline-block;
  width: 100%;
  margin: 0 auto;
  padding: 2rem 0;
  border-radius: var(--container-border-radius);
  text-align: center;
  box-shadow: var(--container-box-shadow);
`;

const Reservations = styled.div`
`;

const Reservation = styled.div`
  position: relative;
  display: grid;
  overflow: hidden;
  grid-template-areas: 
    'date time'
    'service worker'
  ;

  margin: 1rem auto;
  padding: 1.5rem 0.25rem;
  border-radius: var(--container-border-radius);
  box-shadow: var(--container-box-shadow);
  
  & > div {
    box-sizing: border-box;
    
    &:first-child { grid-area: date; }
    &:nth-child(2) { grid-area: time; }
    &:nth-child(3) { grid-area: worker; }
    &:last-child { grid-area: service; }
    
    p {
      word-break: normal;
    }
  }
  
  * {
    color: var(--secondary-text-color);
  }
  
  @media 
  screen and (min-width: 450px) and (max-width: 749px),
  screen and (min-width: 900px) and (max-width: 1099px) {
    grid-template-areas: 
    'date time worker'
    'service service service'
    ;
  }
  
  @media screen and (min-width: 1100px) {
    grid-template-areas: none;
    grid-template-rows: repeat(1, 1fr);
    grid-template-columns: repeat(18, 1fr);
    
    & > div {
      padding-left: 0.5rem;
      padding-right: 0.5rem;
      
      &:first-child { grid-column: span 4; }
      &:nth-child(2) { grid-column: span 3; }
      &:nth-child(3) { grid-column: span 4; }
      &:last-child { grid-column: span 7; }
    }
  }
`;

const RacunPage = () => {
  const [formReset, setFormReset] = useState(false);
  const data = useStaticQuery(pageQuery);

  const servicesImages = {
    hairDressing: data.hairDressingImage,
    manicure: data.manicureImage,
    coloring: data.hairColoringImage
  }

  const userData = {
    id: 123456,
    firstName: 'Janko',
    lastName: 'Kozina',
    phone: '+386 41 455 681',
    phoneVerificationStatus: 'v',   // 'v' - Verified, 'p' - Pending, 'r' - Revoked/blocked
    email: 'mail.example@gmail.com',
    password: 'Geslo123',
    actionCuts: 4
  }

  const reservationsData = [
    {
      date: '12.02.2025',
      time: '13:30',
      service: {
        name: 'Moško striženje',
        imageKey: 'hairDressing'
      },
      worker: {
        name: 'Jakob',
        gender: 'male'
      }
    },
    {
      date: '12.02.2025',
      time: '14:00',
      service: {
        name: 'Manikura',
        imageKey: 'manicure'
      },
      worker: {
        name: 'Petra',
        gender: 'female'
      }
    },
    {
      date: '12.02.2025',
      time: '13:45',
      service: {
        name: 'Barvanje',
        imageKey: 'coloring'
      },
      worker: {
        name: 'Antonija',
        gender: 'female'
      }
    },
    {
      date: '12.02.2025',
      time: '13:30',
      service: {
        name: 'Moško striženje',
        imageKey: 'hairDressing'
      },
      worker: {
        name: 'Jakob',
        gender: 'male'
      }
    }
  ];

  if (!userData) {
    navigate('/prijava');
  }

  const handleSubmit = async (values) => {
    console.log(JSON.stringify(values, null, 2));
  }

  const DataDisplay = ({value, label, layout, background}) => {
    return (
      <StyledDisplay $layout={layout}>
        {background &&
          <BackgroundImage image={background} theme='darker' />
        }
        <span>{label}</span>
        <p>{value}</p>
      </StyledDisplay>
    );
  }

  return (
    <Layout title='Račun'>
      <Section
        id='account'
        layout='full-height'
      >
        <ContentWrapper>
          <StyledAside>
            <UserContainer>
              <UserIcon icon={faUser} />

              <UserDetails>
                <DataDisplay label='Ime in priimek' value={`${userData.firstName} ${userData.lastName}`} layout='center' />
                <DataDisplay label='Telefon' value={userData.phone} layout='center small-value' />
                <DataDisplay label='Elektronski naslov' value={userData.email} layout='center small-value' />
              </UserDetails>

              <Dialog
                openText='Uredi'
                openLayout='center'
                openOnClick={() => { setFormReset(!formReset); }}
              >
                <Form onSubmit={handleSubmit} resetSignal={formReset}>
                  <h1>Uredite svoje podatke</h1>
                  <Input id='first-name' type='text' label='Ime' required initialValue={userData.firstName}  />
                  <Input id='last-name' type='text' label='Priimek' required initialValue={userData.lastName} />
                  <Input id='phone' type='tel' label='Telefonska številka' required initialValue={userData.phone}  />
                  <Input id='password' type='password' label='Geslo' required initialValue={userData.password}  />
                  <Input id='repaet-password' type='password' label='Ponovite geslo' required initialValue={userData.password}  />
                  <Input id='submit' type='submit' label='Shrani' />
                </Form>
              </Dialog>
            </UserContainer>

            <ActionWrapper>
              <SectionTitle>
                Akcija
                <QuestionIcon icon={faQuestionCircle} />
                <ActionDescription>Ali ste vedeli, da je vsako deseto stirženje <span>zastonj</span>?</ActionDescription>
              </SectionTitle>


              <Action $actionCuts={userData.actionCuts}>
                {Array.from({length: 10}, (_, index) =>
                  <ActionIcon key={`action_${index}`}>
                    <FontAwesomeIcon icon={faScissors}/>
                  </ActionIcon>
                )}
              </Action>
            </ActionWrapper>
          </StyledAside>

          <ReservationsWrapper>
            <SectionTitle>Vaše rezervacije</SectionTitle>
            <Reservations>
              {!reservationsData ? (
                <NoData>
                  Ni rezervacij
                </NoData>
              ) : (
                <>
                  {reservationsData.map((reservation, index) => {
                    return (
                      <Reservation key={`reservation_${index}`}>
                        <DataDisplay
                          label='Datum'
                          value={reservation.date}
                        />
                        <DataDisplay
                          label='Ura'
                          value={reservation.time}
                        />
                        <DataDisplay
                          label={`Frizer${reservation.worker.gender === 'female' ? 'ka' : ''}`}
                          value={reservation.worker.name}
                        />
                        <DataDisplay
                          label='Storitev'
                          value={reservation.service.name}
                          background={{
                            image: servicesImages[reservation.service.imageKey],
                            alt: reservation.service.name
                          }}
                        />
                      </Reservation>
                    );
                  })}
                </>
              )}
            </Reservations>
          </ReservationsWrapper>
        </ContentWrapper>
      </Section>
    </Layout>
  );
}

const pageQuery = graphql`
  # noinspection GraphQLUnresolvedReference
  query {
    hairDressingImage: file(relativePath: { eq: "storitve/john-arano-CCTCHXEsan8-unsplash.jpg" }) {
      ...ServiceBackgroundImage
    }

    manicureImage: file(relativePath: { eq: "storitve/allison-christine-0gTyPRZXnho-unsplash.jpg" }) {
      ...ServiceBackgroundImage
    }
    
    hairColoringImage: file(relativePath: { eq: "storitve/george-bohunicky-qJKT2rMU0VU-unsplash.jpg" }) {
      ...ServiceBackgroundImage
    } 
  }
  
  fragment ServiceBackgroundImage on File {
    childImageSharp {
      gatsbyImageData(
        width: 600
        placeholder: BLURRED
      )
    }
  }
`;

export default RacunPage;