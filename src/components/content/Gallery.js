import React, {useEffect, useRef, useState} from 'react';
import styled from 'styled-components';

import {GatsbyImage} from 'gatsby-plugin-image';

const GalleryWrapper = styled.div`
  --gallery-gap: 3rem;
  
  overflow: hidden;
  width: fit-content;
  max-width: 100vw;
  margin: 0 auto;
  
  &[data-interactive=false] {
    &, * {
      pointer-events: none;
    }
  }
`;

const GalleriesContainer = styled.div`
  display: flex;
  flex-wrap: nowrap;
  gap: var(--gallery-gap);
  width: fit-content;
  
  &[data-autoscroll=true] {
    animation: autoscroll 30s linear infinite;
  }
  
  @keyframes autoscroll {
    0% { transform: translateX(0); }
    100% { transform: translateX(calc(-50% - (var(--gallery-gap) / 2))); }
  }
`;

const StyledGallery = styled.div`
  display: flex;
  gap: var(--gallery-gap);
  width: fit-content;
`;

const ImageWrapper = styled.div`
  min-height: 128px;
  min-width: 128px;
  
  &[data-size~='16:9'] {
    min-width: 384px;
    min-height: 216px;
  }
`;

const Image = styled(GatsbyImage)`
  width: 100%;
  height: 100%;
`;

const Gallery = ({
  id,
  className,
  style,
  images,
  imageSize,
  disableAutoscroll,
  disableInteractions
}) => {
  const ref = useRef(null);
  const [doAutoscroll, setDoAutoscroll] = useState(false);

  const updateWidths = () => {
    if (ref.current) {
      const viewportWidth = ref.current.clientWidth;
      const galleryWidth = ref.current.children[0].children[0].clientWidth;
      const widthDiff = viewportWidth - galleryWidth;

      if (!disableAutoscroll) {
        setDoAutoscroll(widthDiff < 0);
      }

      if (widthDiff >= 0) {
        ref.current.children[0].style.width = `${galleryWidth}px`;
      }
    }
  }

  useEffect(updateWidths, []);
  visualViewport.addEventListener('resize', updateWidths);

  const buildGalleryImage = (imageData, index) => {
    return (
      <ImageWrapper key={`image_${index}`} data-size={imageSize}>
        <Image
          image={imageData.image.childImageSharp.gatsbyImageData}
          alt={imageData.alt}
        />
      </ImageWrapper>
    );
  }

  return (
    <GalleryWrapper
      id={id} className={className} style={style}
      ref={ref}
      data-interactive={!disableInteractions}
    >
      <GalleriesContainer data-autoscroll={doAutoscroll}>
        <StyledGallery>
          {images.map(buildGalleryImage)}
        </StyledGallery>
        {!disableAutoscroll &&
          <StyledGallery>
            {images.map(buildGalleryImage)}
          </StyledGallery>
        }
      </GalleriesContainer>
    </GalleryWrapper>
  );
}

export default Gallery;