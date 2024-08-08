function isStoryblok() {
  return (window && window.location.search.includes('_storyblok'));
}

function parseStoryblokData(data) {
  data.forEach((node) => {
    if (typeof node.content === 'string') {
      node.content = JSON.parse(node.content);
    }
  })

  return data;
}

function refactorSlugs(data) {
  data.forEach((node) => {
    node.slug = node.full_slug;

    if (node.slug.endsWith('/')) {
      node.slug = node.slug.substring(0, node.slug.length - 1);
    }

    node.slug = (node.slug === 'domov' ? '/' : `/${node.slug}`);
    console.log(`${node.name}: ${node.slug}`);
  })
}

function refactorImages(node, images) {
  if (!node) {
    return;
  }

  if (node instanceof Array) {
    node.forEach((node) => refactorImages(node, images));
  } else if (typeof node === 'object') {
    if (node.fieldtype && node.fieldtype === 'asset' && node.filename) {
      // Image node
      const filenameSegments = node.filename.split('/');
      const imageName = filenameSegments[filenameSegments.length - 1].split('.')[0];
      const image = images.filter((node) => node.name === imageName);

      if (!node.alt) {
        throw new Error(`Image '${imageName}' has missing attribute alt. Add it in the CMS assets.`);
      }

      if (image && image.length > 0) {
        node.childImageSharp = image[0].childImageSharp;
      } else {
        throw new Error(`Reference to unknown image '${imageName}'`);
      }
    } else {
      Object.keys(node).forEach((key) => refactorImages(node[key], images));
    }
  }
}

function sitemapSortFunction(a, b) {
  return a.navigationIndex - b.navigationIndex;
}

function createSitemapNode(nodeData) {
  return {
    name: nodeData.name,
    slug: nodeData.slug,
    isRoot: false,
    children: null,
    navigationIndex: nodeData.content.navigationIndex,
    showSubpages: nodeData.content.showSubpages,
    showSections: nodeData.content.showSections
  }
}

function generateSitemap(pagesData) {
  const sitemapNodes = {};
  const sitemap = [];

  // Create searchable object
  pagesData.forEach((node) => {
    sitemapNodes[node.name.toLowerCase()] = createSitemapNode(node);
  });

  // Generate sitemap structure (add references to children and parents)
  Object.keys(sitemapNodes).forEach((pageName) => {
    const node = sitemapNodes[pageName];
    const slugSegments = node.slug.split('/');

    if (slugSegments.length > 2) {
      const parentNode = sitemapNodes[slugSegments[slugSegments.length - 2]];

      if (!parentNode.children) {
        parentNode.children = [];
      }

      parentNode.children.push(node);
      parentNode.children.sort(sitemapSortFunction);
    } else if (node.navigationIndex >= 0){
      node.isRoot = true;
      sitemap.push(node);
    }
  })

  return sitemap.sort(sitemapSortFunction);
}

module.exports = {
  isStoryblok,
  parseStoryblokData,
  refactorSlugs,
  refactorImages,
  generateSitemap
}