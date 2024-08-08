import React, {useEffect} from 'react';
import {apiPlugin, storyblokInit, StoryblokComponent} from 'gatsby-source-storyblok';

import Layout from '../components/layout/Layout';
import TextAndImage from '../components/storyblok/section/textAndImage';
import {isStoryblok} from '../utils/Storyblok';

const Page = ({ pageContext }) => {
  const blok = pageContext.node;

  function loadStoryblokBridge() {
    const {StoryblokBridge, location} = window;
    const storyblokInstance = new StoryblokBridge();
    storyblokInstance.on(['publish', 'change'], () => location.reload());
  }

  function loadBridgeScript() {
    const existingScript = document.getElementById('storyblokBridge');

    if (!existingScript) {
      const script = document.createElement('script');
      script.src = 'https://app.storyblok.com/f/storyblok-v2-latest.js';
      script.id = 'storyblokBridge';

      document.body.appendChild(script);

      script.onload = () => { loadStoryblokBridge(); };
    } else {
      loadStoryblokBridge();
    }
  }

  storyblokInit({
    accessToken: process.env.GATSBY_PREVIEW_STORYBLOK,
    use: [apiPlugin],
    components: {
      'section-textAndImage': TextAndImage
    }
  });

  useEffect(() => {
    if (isStoryblok()) {
      loadBridgeScript();
    }
    // ! Intentionally ignoring react-hooks exhaustive-deps warning !
    // loadBridgeScript is stable and should only be called upon first render.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Layout title={blok.name}>
      {blok.content.body.map((nestedBlok) => (
        <StoryblokComponent blok={nestedBlok} key={nestedBlok._uid} />
      ))}
    </Layout>
  );
}

export default Page;