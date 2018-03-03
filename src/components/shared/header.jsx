import React from 'react'

class Header extends React.Component {
  render() {
    return (
      <nav className="navbar navbar-expand-md navbar-dark bg-dark">
        <a className="navbar-brand" href="">
          <img alt="" src="../assets/img/logo.png" width="140" />
        </a>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
          aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav ml-auto">
            <li className="nav-item">
              <span className="nav-link">Explore</span>
            </li>
            <li className="nav-item">
              <button className="btn btn-success">Doar</button>
            </li>
          </ul>
        </div>
      </nav>
    )
  }
}

export default Header
