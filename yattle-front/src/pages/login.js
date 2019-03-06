import React from 'react'
import {
  Link,
  graphql,
} from 'gatsby'


import Layout from '../components/layout'
import SEO from '../utils/seo'
import Login from '../components/login'


const LoginPage = () => (
  <Layout>
    <Link to="/"> Go back to the homepage </Link>
    <SEO
      title="Yattle"
      keywords={
        ['todolist', 'application', 'react']
    }
    />
    <Login />
  </Layout>
)

export default LoginPage
