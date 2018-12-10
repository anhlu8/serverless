import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { withRouter } from 'react-router'

class Header extends Component {
  render() {
    return (
      <div className="flex pa1 justify-between nowrap orange">
        <div className="flex flex-fixed black">
          <div className="fw7 mr1">LK Game</div>
          <Link to="/" className="ml1 no-underline black">
            Players
          </Link> |
          {/* <Link to="/habitat" className="ml1 no-underline black">
            Habitats
          </Link> |
          <Link to="/alliance" className="ml1 no-underline black">
            Alliances
          </Link> */}
        </div>
      </div>
    )
  }
}

export default withRouter(Header)