import React, { Component } from 'react';
import { connect } from 'react-redux'
import { changeFont } from '../../actionsCreators'

class PresentationFont extends Component {

  selectFont() {
    this.props.changeFont(this.props.font)
  }

  render() {
    return (
      <div className="col col-md-4">
        <div className="font-card">
          <div className="font-card-body" style={{ fontFamily: this.props.font }} onClick={ this.selectFont.bind(this) }>
            { this.props.font }
          </div>
        </div>
      </div>
    );
  }
}

export default connect(null, { changeFont })(PresentationFont)
