import * as React from "react"

import '../../global-styles.css';
import Layout from '../components/layout/Layout';

const IndexPage = () => {
  return (
    <Layout>
      Hello world
    </Layout>
  )
}

export default IndexPage

export const Head = () => <title>Home Page</title>
