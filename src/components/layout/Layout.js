import React from 'react';
import BaseLayout from './BaseLayout';
import Navigation from './Navigation';

const Layout = ({children}) => {
  return (
    <BaseLayout>
      <Navigation />
    </BaseLayout>
  )
}

export default Layout;