/* eslint-disable react/button-has-type */
import React from 'react'
import {
  Link,
} from 'gatsby'

import Layout from '../components/layout'
import SEO from '../components/seo'
import TodoList from '../components/todolist'

const IndexPage = () => (
  <Layout>
    <SEO
      title="Yattle"
      keywords={
    ['todolist', 'application', 'react']}
    />
    <TodoList />
  </Layout>
)

export default IndexPage
