import React, { Component } from 'react';
import { connect } from 'react-redux'
import { changeFormat } from '../../actionsCreators'

class PresentationFormat extends Component {

  selectFormat() {
    this.props.changeFormat(this.props.format)
  }

  render() {
    let format = this.props.format

    return (
      <div>
        {(format === '16:9') ? (
          <div className="wide">16:9</div>
        ) : (
          <div className="square">4:3</div>
        )}
      </div>
    );
  }
}

export default connect(null, { changeFormat })(PresentationFormat)
