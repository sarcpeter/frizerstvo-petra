import React from 'react';

import {graphql, useStaticQuery} from 'gatsby';

import Layout from '../components/layout/Layout';
import Section from '../components/content/Section';

const SalonPage = () => {
  const data = useStaticQuery(pageQuery);
  const galleryImages = [
    { image: data.hairWashImage, alt: 'Some alt text' },
    { image: data.hairCurlingImage, alt: 'Some alt text' },
    { image: data.seatsImage, alt: 'Some alt text' },
    { image: data.washingImage, alt: 'Some alt text' },
  ]

  return (
    <Layout title='Salon'>
      <Section
        id='salon'
        title='O salonu'
        description='Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna.'
        image={{
          image: data.salonImage,
          alt: 'Alt text'
        }}
        layout='side-by-side reversed'
      />

      <Section
        id='gallery'
        layout='full-width dark gallery'
        gallery={{
          images: galleryImages,
          imageSize: '16:9',
          disableInteractions: true
        }}
      />

      <Section
        id='salon'
        title='Petra Lipar'
        description='Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna.'
        image={{
          image: data.salonImage,
          alt: 'Alt text'
        }}
        layout='side-by-side'
      />
    </Layout>
  )
}

const pageQuery = graphql`
  query {
    salonImage: file(relativePath: {
      eq: "salon/michael-dagonakis-SPuo9KOWCJs-unsplash.jpg"
    }) {
      childImageSharp {
        fluid(maxWidth: 1920) {
          ...GatsbyImageSharpFluid
        }
      }
    }

    hairWashImage: file(relativePath: {
      eq: "salon/giorgio-trovato-ldC8xP2Z9lo-unsplash.jpg"
    }) {
      childImageSharp {
        fluid(maxWidth: 480) {
          ...GatsbyImageSharpFluid
        }
      }
    }

    hairCurlingImage: file(relativePath: {
      eq: "salon/giorgio-trovato-wSpkThmoZQc-unsplash.jpg"
    }) {
      childImageSharp {
        fluid(maxWidth: 480) {
          ...GatsbyImageSharpFluid
        }
      }
    }

    seatsImage: file(relativePath: {
      eq: "salon/greg-trowman-jsuWg7IXx1k-unsplash.jpg"
    }) {
      childImageSharp {
        fluid(maxWidth: 480) {
          ...GatsbyImageSharpFluid
        }
      }
    }

    washingImage: file(relativePath: {
      eq: "salon/lindsay-cash-Md_DhaFsnCQ-unsplash.jpg"
    }) {
      childImageSharp {
        fluid(maxWidth: 480) {
          ...GatsbyImageSharpFluid
        }
      }
    }
  }
`

export default SalonPage;