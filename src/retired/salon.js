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
        layout='full-width gallery'
        theme='dark'
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
  # noinspection GraphQLUnresolvedReference
  query {
    salonImage: file(relativePath: { eq: "salon/michael-dagonakis-SPuo9KOWCJs-unsplash.jpg" }) {
      ...BannerBackgroundImage
    }

    hairWashImage: file(relativePath: { eq: "salon/giorgio-trovato-ldC8xP2Z9lo-unsplash.jpg" }) {
      ...GalleryImage
    }

    hairCurlingImage: file(relativePath: { eq: "salon/giorgio-trovato-wSpkThmoZQc-unsplash.jpg" }) {
      ...GalleryImage
    }

    seatsImage: file(relativePath: { eq: "salon/greg-trowman-jsuWg7IXx1k-unsplash.jpg" }) {
      ...GalleryImage
    }

    washingImage: file(relativePath: { eq: "salon/lindsay-cash-Md_DhaFsnCQ-unsplash.jpg" }) {
      ...GalleryImage
    }
  }
  
  fragment GalleryImage on File {
    childImageSharp {
      gatsbyImageData(
        width: 480,
        layout: CONSTRAINED,
        placeholder: BLURRED
      )
    }
  }
`

export default SalonPage;