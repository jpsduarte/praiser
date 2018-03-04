import React, { Component } from 'react';
import { connect } from 'react-redux'
import { changeFormat } from '../../actionsCreators'

class FormatOptionItem extends Component {
  constructor(props) {
    super(props);

    this.state = {
      wideActive: '',
      squareActive: ''
    }
  }

  selectFormat() {
    this.setActive(this.props.format)
    this.props.changeFormat(this.props.format)
  }

  setActive(format) {
    if (format === '16:9') {
      this.setState({ wideActive: 'active' })
    }
    else {
      this.setState({ squareActive: 'active' })
    }
  }

  render() {
    let format = this.props.format

    return (
      <div>
        {(format === '16:9') ? (
          <div className={`wide ${this.state.wideActive}`} onClick={this.selectFormat.bind(this)}>16:9</div>
        ) : (
          <div className={`square ${this.state.squareActive}`} onClick={this.selectFormat.bind(this)}>4:3</div>
        )}
      </div>
    );
  }
}

export default connect(null, { changeFormat })(FormatOptionItem)
