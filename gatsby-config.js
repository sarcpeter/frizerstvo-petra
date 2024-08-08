require('dotenv').config({ path: '.env' });

module.exports = {
  siteMetadata: {
    siteUrl: `https://www.yourdomain.tld`,
  },
  plugins: [
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    `gatsby-plugin-sass`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    {
      resolve: 'gatsby-source-storyblok',
      options: {
        accessToken: process.env.GATSBY_PREVIEW_STORYBLOK,
        version: 'draft',
        localAssets: true
      }
    }
  ],
}
