import React from 'react';

export class Header extends React.Component {
        render() {
            return (
                <nav className="navbar navbar-inverse">
                    <div className="container-fluid">
                        <div className="navbar-header">
                            <a className="navbar-brand" href="#">
                                <img alt="" src="../app/images/logo.png" width="140" /> 
                            </a>
                        </div>
                        <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1"> 
                            <ul className="nav navbar-nav navbar-right">
                                <li><a href="#">Explore</a></li>
                                <li><a href="#">Doar</a></li>
                            </ul>
                        </div>
                    </div>
                </nav>
            );
        }
    }