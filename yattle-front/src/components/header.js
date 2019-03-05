import { Link } from 'gatsby'
import PropTypes from 'prop-types'
import React from 'react'
import {
  observer,
  inject,
} from 'mobx-react'


@inject(({ session }) => ({ session }))
@observer
class Header extends React.Component {
  render() {
    const { siteTitle } = this.props
    return (
      <div
        style={{
          marginBottom: '1.25rem',
        }}
      >
        <div
          style={{
            margin: '0 auto',
            maxWidth: '80%',
            padding: '1.45rem 0.2rem',
          }}
        >
          <h1 style={{ margin: 0 }}>
            <Link
              to="/"
              style={{
                color: 'white',
                textDecoration: 'none',
              }}
            >
              {siteTitle}
            </Link>
          </h1>
          {
            this.props.session.user ? <button> Sign Out </button> : (
              <Link
                to="/login"
                style={
                {
                  color: 'white',
                  textDecoration: 'none',
                }
              }
              >
              Login

              </Link>
            )}
        </div>
      </div>
    )
  }
}

Header.propTypes = {
  siteTitle: PropTypes.string,
}

Header.defaultProps = {
  siteTitle: '',
}

export default Header
