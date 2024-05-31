import React from 'react';

import {graphql, useStaticQuery} from 'gatsby';

import Layout from '../components/layout/Layout';
import Section from '../components/content/Section';

const IndexPage = () => {
  const data = useStaticQuery(pageQuery);
  const backgroundImages = {
    introImage: { image: data.introImage, alt: 'Background image alt' }
  };
  const images = {
    hairdressingImage: { image: data.hairdressingImage, alt: 'Image alt' },
    scissorsImage: { image: data.scissorsImage, alt: 'Image alt' },
    combImage: { image: data.combImage, alt: 'Image alt' },
    dryerImage: { image: data.dryerImage, alt: 'Image alt' },
    soapImage: { image: data.soapImage, alt: 'Image alt' },
    nailPolishImage: { image: data.nailPolishImage, alt: 'Image alt' }
  }
  const partnersImages = [
    {image: data.schwarzkopfImage, alt: 'Schwarzkopf logo'},
    {image: data.schwarzkopfImage, alt: 'Schwarzkopf logo'},
    {image: data.schwarzkopfImage, alt: 'Schwarzkopf logo'},
    {image: data.schwarzkopfImage, alt: 'Schwarzkopf logo'},
    {image: data.schwarzkopfImage, alt: 'Schwarzkopf logo'},
    {image: data.schwarzkopfImage, alt: 'Schwarzkopf logo'},
    {image: data.schwarzkopfImage, alt: 'Schwarzkopf logo'},
    {image: data.schwarzkopfImage, alt: 'Schwarzkopf logo'}
  ]

  return (
    <Layout>
      <Section
        id='intro'
        title='Pritegljiv naslov'
        description='Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea '
        cta={{
          caption: 'Rezerviraj termin',
          to: '/rezervacija'
        }}
        background={backgroundImages.introImage}
        layout='full-width hero half-content'
      />

      <Section
        id='nase-storitve'
        title='Naše Storitve'
        cards={[
          {
            title: 'Hairdressing',
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna.',
            image: images.hairdressingImage,
            layout: 'center trio'
          },
          {
            title: 'Haircutting',
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna.',
            image: images.scissorsImage,
            layout: 'center trio'
          },
          {
            title: 'Hair combing',
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna.',
            image: images.combImage,
            layout: 'center trio'
          },
          {
            title: 'Hair drying',
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna.',
            image: images.dryerImage,
            layout: 'center trio'
          },
          {
            title: 'Hair soaping',
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna.',
            image: images.soapImage,
            layout: 'center trio'
          },
          {
            title: 'Nail polishing',
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna.',
            image: images.nailPolishImage,
            layout: 'center trio'
          },
        ]}
        cta={{
          caption: 'Rezerviraj termin',
          to: '/rezervacija'
        }}
      />

      <Section
        id='partners'
        layout='full-width gallery no-padding'
        theme='dark'
        gallery={{
          images: partnersImages,
          disableInteractions: true
        }}
      />

      <Section
        id='salon'
        title='Salon'
        description='Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea '
        image={{
          image: data.salonImage,
          alt: 'Alt text'
        }}
        cta={{
          caption: 'Več o salonu',
          to: '/salon'
        }}
        layout='side-by-side'
      />
    </Layout>
  );
}

const pageQuery = graphql`
  query {
    introImage: file(relativePath: { eq: "index/corina-rainer-qihqgBSYsMc-unsplash.jpg" }) {
      ...BannerBackgroundImage
    }

    hairdressingImage: file(relativePath: { eq: "index/long-wavy-hair-variant.png" }) {
      ...SectionImage
    }

    scissorsImage: file(relativePath: { eq: "index/scissors.png" }) {
      ...SectionImage
    }

    combImage: file(relativePath: { eq: "index/one-comb.png" }) {
      ...SectionImage
    }

    dryerImage: file(relativePath: { eq: "index/hair.png" }) {
      ...SectionImage
    }

    soapImage: file(relativePath: { eq: "index/soap.png" }) {
      ...SectionImage
    }

    nailPolishImage: file(relativePath: { eq: "index/nail-polish.png" }) {
      ...SectionImage
    }

    schwarzkopfImage: file(relativePath: { eq: "index/schwarzkopf.png" }) {
      ...IconImage
    }

    salonImage: file(relativePath: { eq: "index/michael-dagonakis-SPuo9KOWCJs-unsplash.jpg" }) {
      ...SectionImage
    }
  }
  
  fragment BannerBackgroundImage on File {
    childImageSharp {
      gatsbyImageData(
        layout: FULL_WIDTH,
        placeholder: BLURRED
      )
    }
  }
  
  fragment IconImage on File {
    childImageSharp {
      gatsbyImageData(
        width: 128,
        layout: CONSTRAINED,
        placeholder: BLURRED
      )
    }
  }
  
  fragment SectionImage on File {
    childImageSharp {
      gatsbyImageData(
        width: 512,
        layout: CONSTRAINED,
        placeholder: BLURRED
      )
    }
  }
`;

export default IndexPage;