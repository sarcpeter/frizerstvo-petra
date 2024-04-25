import React from 'react';
import styled from 'styled-components';

const StyledLayout = styled.div`
`;

const BaseLayout = ({ children }) => {
  return (
    <StyledLayout>
      {children}
    </StyledLayout>
  );
}

export default BaseLayout;