import React, { Component } from 'react';
import { connect } from 'react-redux'
import { changeBackground } from '../../actionsCreators'

class PresentationBackground extends Component {

  selectColor() {
    this.props.changeBackground({ bg: this.props.bg, inner: this.props.inner })
  }

  render() {
    return (
      <div className="col-md-4">
        <div className="background-card" style={{ backgroundColor: this.props.bg }} onClick={this.selectColor.bind(this)}>
          <div className="background-card-body" style={{ backgroundColor: this.props.inner }}></div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { state }
}

export default connect(mapStateToProps, { changeBackground })(PresentationBackground)
