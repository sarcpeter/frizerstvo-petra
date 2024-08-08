import React from 'react';

import {graphql, useStaticQuery} from 'gatsby';

import Layout from '../components/layout/Layout';
import Section from '../components/content/Section';

const StoritvePage = () => {
  const data = useStaticQuery(pageQuery);
  const backgroundImages = {
    backgroundImage: { image: data.backgroundImage, alt: 'Background image alt' }
  };
  const images = {
    hairdressingImage: { image: data.hairdressingImage, alt: 'Image alt' },
    scissorsImage: { image: data.scissorsImage, alt: 'Image alt' },
    combImage: { image: data.combImage, alt: 'Image alt' },
    dryerImage: { image: data.dryerImage, alt: 'Image alt' },
    soapImage: { image: data.soapImage, alt: 'Image alt' },
    nailPolishImage: { image: data.nailPolishImage, alt: 'Image alt' }
  }
  
  return (
    <Layout title='Storitve'>
      <Section
        id='storitve'
        title='Storitve'
        layout='constrained'
        theme='big'
        cardsLayout='duo'
        cards={[
          {
            title: 'Hairdressing',
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna.',
            backgroundImage: backgroundImages.backgroundImage,
            image: images.hairdressingImage,
          },
          {
            title: 'Haircutting',
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna.',
            backgroundImage: backgroundImages.backgroundImage,
            image: images.scissorsImage,
          },
          {
            title: 'Hair combing',
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna.',
            backgroundImage: backgroundImages.backgroundImage,
            image: images.combImage,
          },
          {
            title: 'Hair drying',
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna.',
            backgroundImage: backgroundImages.backgroundImage,
            image: images.dryerImage,
          },
          {
            title: 'Hair soaping',
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna.',
            backgroundImage: backgroundImages.backgroundImage,
            image: images.soapImage,
          },
          {
            title: 'Nail polishing',
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna.',
            backgroundImage: backgroundImages.backgroundImage,
            image: images.nailPolishImage,
          },
        ]}
        cta={{
          to: '/cenik',
          caption: 'Cenik Storitev'
        }}
      />
    </Layout>
  )
}

const pageQuery = graphql`
  # noinspection GraphQLUnresolvedReference
  query {
    backgroundImage: file(relativePath: { eq: "storitve/giorgio-trovato-wSpkThmoZQc-unsplash.jpg" }) {
      ...BannerBackgroundImage
    }
    
    hairdressingImage: file(relativePath: { eq: "storitve/long-wavy-hair-variant.webp" }) {
      ...IconImage
    }

    scissorsImage: file(relativePath: { eq: "storitve/scissors.webp" }) {
      ...IconImage
    }

    combImage: file(relativePath: { eq: "storitve/one-comb.webp" }) {
      ...IconImage
    }

    dryerImage: file(relativePath: { eq: "storitve/hair.webp" }) {
      ...IconImage
    }

    soapImage: file(relativePath: { eq: "storitve/soap.webp" }) {
      ...IconImage
    }

    nailPolishImage: file(relativePath: { eq: "storitve/nail-polish.webp" }) {
      ...IconImage
    }
  }
`

export default StoritvePage;