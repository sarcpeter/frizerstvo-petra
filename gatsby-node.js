const path = require('path');
const {parseStoryblokData, refactorSlugs, refactorImages, generateSitemap} = require('./src/utils/Storyblok');
const pageQuery = `
  query {
    allStoryblokEntry {
      nodes {
        name
        slug
        full_slug
        content
      }
    }
  }
`;

const imagesQuery = `
  query {
    allFile(filter: { publicURL: { regex: "^/static/.*(\\\\.jpg|\\\\.jpeg|\\\\.png|\\\\.webp)$/" } }) {
      nodes {
        name
        childImageSharp {
          gatsbyImageData(placeholder: BLURRED, formats: [AUTO, WEBP])
        }
      }
    }  
  }
`;

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions;

  const pageData = parseStoryblokData((await graphql(pageQuery)).data.allStoryblokEntry.nodes);
  await new Promise((resolve) => setTimeout(resolve, 2000));
  const imagesData = (await graphql(imagesQuery)).data.allFile.nodes;

  refactorSlugs(pageData);
  refactorImages(pageData, imagesData);

  process.env.GATSBY_SITEMAP = JSON.stringify(generateSitemap(pageData));

  pageData.forEach((node) => {
    createPage({
      path: node.slug,
      component: path.resolve('src/templates/Page.js'),
      context: {
        node: node
      }
    });
  })
}