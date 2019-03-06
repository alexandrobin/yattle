/* eslint-disable react/button-has-type */
import React from 'react'
import {
  Link,
  graphql,
} from 'gatsby'


import Layout from '../components/layout'
import library from '../utils/fontawesome'
import SEO from '../utils/seo'
import TodoList from '../components/todolist'


const IndexPage = () => (
  <Layout>
    <Link to="/login"> Sign In </Link>
    <SEO
      title="Yattle"
      keywords={
    ['todolist', 'application', 'react']}
    />
    <TodoList />

  </Layout>
)

export default IndexPage
