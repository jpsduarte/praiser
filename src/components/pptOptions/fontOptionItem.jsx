import React, { Component } from 'react';
import { connect } from 'react-redux'
import { changeFont } from '../../actionsCreators'

class FontOptionItem extends Component {

  selectFont() {
    this.props.changeFont(this.props.font)
  }

  render() {
    return (
      <div className="col col-md-4">
        <div className="font-card" onClick={ this.selectFont.bind(this) }>
          <div className="font-card-body" style={{ fontFamily: this.props.font }}>
            { this.props.font }
          </div>
        </div>
      </div>
    );
  }
}

export default connect(null, { changeFont })(FontOptionItem)
