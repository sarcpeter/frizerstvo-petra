import React from 'react';

import BaseLayout from './BaseLayout';
import Navigation from './Navigation';
import Footer from "./Footer";

const Layout = ({title, children}) => {
  return (
    <BaseLayout title={title}>
      <Navigation />
      {children}
      <Footer />
    </BaseLayout>
  )
}

export default Layout;