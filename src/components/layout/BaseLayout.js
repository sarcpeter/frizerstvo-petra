import React from 'react';
import {createGlobalStyle} from 'styled-components';

import {Helmet} from 'react-helmet';

import FavIcon from '../../images/brand/favicon.ico';

const GlobalStyles = createGlobalStyle`
  body {
    margin: 0;
    padding-top: var(--navigation-height);
    font-family: 'Lato', sans-serif;

    --primary-color: #1D1E1C;
    --secondary-color: #E4C472;
    --text-color: #000;
    --secondary-text-color: #FFF;
    --field-color: #FFF;
    --field-hover-color: #DADADA;
    --error-color: rgba(255, 0, 0, 0.8);
    --box-shadow: 0 0 5px rgba(22, 22, 22, 0.2);
    --container-box-shadow: 3px 3px 15px rgba(0,0,0,0.4);

    --content-width: 900px;
    --max-content-width: 1450px;
    --navigation-height: 4rem;
    --footer-height: 20rem;
    --section-side-padding: 2rem;
    --section-vertical-padding: 4rem;
    --section-padding: calc(var(--section-vertical-padding) * 0.75) var(--section-side-padding) var(--section-vertical-padding) var(--section-side-padding);
    --layout-section-padding: 0.5rem var(--section-side-padding);
    --container-border-radius: 1.25rem;

    @media screen and (min-width: 850px) {
      --footer-height: 10rem;
    }
    
    @media screen and (min-width: 750px) {
      --section-side-padding: 3rem;
      --layout-section-padding: 0.5rem var(--section-side-padding);
    }

    @media screen and (min-width: 600px) {
      --navigation-height: 6rem;
      --section-side-padding: 4.5rem;
      --layout-section-padding: 1rem var(--section-side-padding);
    }
  }
  
  main {
    width: 100%;
  }
`;

/*
 * TODO: Add meta content for SEO and social media meta data
 *    --> Further research is needed (particularly social media meta data).
 */
const BaseLayout = ({ children, title }) => {
  return (
    <>
      <Helmet>
        <title>
          {title ? `${title}  |  Frizerstvo Petra` : 'Frizerstvo Petra'}
        </title>
        <link rel='icon' href={FavIcon}/>

        <meta name='description' content='Frizerstvo Petra description'/>
        <meta charSet='utf-8'/>
        <meta name='viewport' content='width=device-width, initial-scale=1'/>
        <meta name='robots' content='noindex'/>

        {/* Twitter meta tags */}
        <meta name='twitter:card' content='summary'/>
        <meta name='twitter:site' content='@handle'/>
        <meta name='twitter:title' content='Page Title'/>
        <meta name='twitter:description' content='Page description less than 200 characters'/>
        <meta name='twitter:image' content='http://www.example.com/image.jpg'/>

        {/* Facebook meta tags */}
        <meta property='og:url' content='http://euro-travel-example.com/index.htm'/>
        <meta property='og:type' content='website'/>
        <meta property='og:title' content='European Travel Destinations '/>
        <meta property='og:description' content='We provide travel planning for European holidays. '/>
        <meta property='og:image' content='http://euro-travel-example.com/thumbnail.jpg'/>

        {/* Fonts */}
        <link rel='preconnect' href='https://fonts.googleapis.com'/>
        <link rel='preconnect' href='https://fonts.gstatic.com' crossOrigin/>
        <link
          href='https://fonts.googleapis.com/css2?family=Lato:ital,wght@0,100;0,300;0,400;0,700;0,900;1,100;1,300;1,400;1,700;1,900&display=swap'
          rel='stylesheet'
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Corinthia:wght@400;700&display=swap"
          rel="stylesheet"
        />

        {/* Font Awesome */}
        <script src='https://kit.fontawesome.com/ce1558de9c.js' crossOrigin='anonymous'></script>
      </Helmet>
      <GlobalStyles/>
      {children}
    </>
  );
}

export default BaseLayout;