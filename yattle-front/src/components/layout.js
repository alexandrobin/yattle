/* eslint-disable react/jsx-filename-extension */
import React from 'react'
import PropTypes from 'prop-types'
import { StaticQuery, graphql } from 'gatsby'
import {
  Provider,
} from 'mobx-react'
import stateSession from '../states/session'

import Header from './header'
import './layout.css'


const Layout = ({ children }) => (
  <Provider session={
    stateSession
  }
  >
    <StaticQuery
      query={graphql`
      query SiteTitleQuery {
        site {
          siteMetadata {
            title
          }
        }
      }
    `}
      render={data => (
        <React.Fragment>

          <Header siteTitle={data.site.siteMetadata.title} />
          <div
            style={{
              margin: '0 auto',
              maxWidth: 960,
              padding: '0px 1.0875rem 1.45rem',
              paddingTop: 0,
            }}
          >
            {children}
          </div>

        </React.Fragment>
      )}
    />
  </Provider>
)

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
