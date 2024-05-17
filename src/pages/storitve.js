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
        cards={[
          {
            title: 'Hairdressing',
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna.',
            backgroundImage: backgroundImages.backgroundImage,
            image: images.hairdressingImage,
            layout: 'left-align'
          },
          {
            title: 'Haircutting',
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna.',
            backgroundImage: backgroundImages.backgroundImage,
            image: images.scissorsImage,
            layout: 'left-align'
          },
          {
            title: 'Hair combing',
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna.',
            backgroundImage: backgroundImages.backgroundImage,
            image: images.combImage,
            layout: 'left-align'
          },
          {
            title: 'Hair drying',
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna.',
            backgroundImage: backgroundImages.backgroundImage,
            image: images.dryerImage,
            layout: 'left-align'
          },
          {
            title: 'Hair soaping',
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna.',
            backgroundImage: backgroundImages.backgroundImage,
            image: images.soapImage,
            layout: 'left-align'
          },
          {
            title: 'Nail polishing',
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna.',
            backgroundImage: backgroundImages.backgroundImage,
            image: images.nailPolishImage,
            layout: 'left-align'
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
  query {
    backgroundImage: file(relativePath: {
      eq: "storitve/giorgio-trovato-wSpkThmoZQc-unsplash.jpg"
    }) {
      childImageSharp {
        fluid(maxWidth: 900) {
          ...GatsbyImageSharpFluid
        }
      }
    }
    
    hairdressingImage: file(relativePath: {
      eq: "storitve/long-wavy-hair-variant.webp"
    }) {
      childImageSharp {
        fluid(maxWidth: 128) {
          ...GatsbyImageSharpFluid
        }
      }
    }

    scissorsImage: file(relativePath: {
      eq: "storitve/scissors.webp"
    }) {
      childImageSharp {
        fluid(maxWidth: 128) {
          ...GatsbyImageSharpFluid
        }
      }
    }

    combImage: file(relativePath: {
      eq: "storitve/one-comb.webp"
    }) {
      childImageSharp {
        fluid(maxWidth: 128) {
          ...GatsbyImageSharpFluid
        }
      }
    }

    dryerImage: file(relativePath: {
      eq: "storitve/hair.webp"
    }) {
      childImageSharp {
        fluid(maxWidth: 128) {
          ...GatsbyImageSharpFluid
        }
      }
    }

    soapImage: file(relativePath: {
      eq: "storitve/soap.webp"
    }) {
      childImageSharp {
        fluid(maxWidth: 128) {
          ...GatsbyImageSharpFluid
        }
      }
    }

    nailPolishImage: file(relativePath: {
      eq: "storitve/nail-polish.webp"
    }) {
      childImageSharp {
        fluid(maxWidth: 128) {
          ...GatsbyImageSharpFluid
        }
      }
    }
  }
`

export default StoritvePage;