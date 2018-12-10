import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { withRouter } from 'react-router'

class Header extends Component {
  render() {
    return (
      <div className="flex pa1 justify-between nowrap orange">
        <div className="flex flex-fixed black">
          <Link to="/" className="f6 fw4 hover-white no-underline black-70 dn dib-ns pv2 ph3">
            Players
          </Link>
          <span className="f6 fw4 no-underline black-70 dn dib-ns pv2 ph3">|</span>
          <Link to="/habitat" className="f6 fw4 hover-white no-underline black-70 dn dib-ns pv2 ph3">
            Habitats
          </Link>
          <span className="f6 fw4 no-underline black-70 dn dib-ns pv2 ph3">|</span>
          <Link to="/alliance" className="f6 fw4 hover-white no-underline black-70 dn dib-ns pv2 ph3">
            Alliances
          </Link>
        </div>
      </div>

    )
  }
}

export default withRouter(Header)