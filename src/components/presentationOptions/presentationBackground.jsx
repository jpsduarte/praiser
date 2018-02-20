import React, { Component } from 'react';

class PresentationBackground extends Component {
  render() {
    return (
      <div className="col-md-4">
        <div className="background-card" style={{ backgroundColor: this.props.bg }}>
          <div className="background-card-body" style={{ backgroundColor: this.props.inner }}></div>
        </div>
      </div>
    );
  }
}

export default PresentationBackground;

