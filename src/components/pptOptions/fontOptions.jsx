import React, { Component } from 'react';
import { connect } from 'react-redux'
import FontOptionItem from './fontOptionItem'

class FontOptions extends Component {
  constructor(props) {
    super(props);

    this.state = {
      animation: ''
    }
  }

  handleAnimation() {
    if (!this.state.animation || this.state.animation === 'fadeOut out') {
      this.setState({ animation: 'fadeIn' })
    }
    else if (this.state.animation === 'fadeIn') {
      this.setState({ animation: 'fadeOut' })

      setTimeout(() => {
        this.setState({ animation: 'fadeOut out' })
      }, 510)
    }
  }

  render() {
    return (
      <div className="font">
        <div className="style-header">
          Fonte
          <div className="btn-toggle-option" onClick={this.handleAnimation.bind(this)}>
            {this.state.animation === 'fadeOut out' || !this.state.animation ? (
            <i className="fa fa-angle-double-down"></i>) : (
            <i className="fa fa-angle-double-up"></i>)}
          </div>
        </div>

        {this.props.state.fontStyle ? (
          <div className="style-content" style={{ fontFamily: this.props.state.fontStyle }}>
            { this.props.state.fontStyle }
          </div>
          ) : (
          <div className="style-content default-font">Roboto Light</div>
        )}

        <div className={`font-options ${this.state.animation}`}>
          <div className="row">
            <FontOptionItem font="Arial" />
            <FontOptionItem font="Arial Black" />
            <FontOptionItem font="Calibri" />
          </div>

          <div className="row">
            <FontOptionItem font="Calibri Light" />
            <FontOptionItem font="Calibri" />
            <FontOptionItem font="Open Sans" />
          </div>

          <div className="row">
            <FontOptionItem font="Roboto" />
            <FontOptionItem font="Roboto Light" />
            <FontOptionItem font="Times New Roman" />
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProp(state) {
  return { state }
}

export default connect(mapStateToProp, null)(FontOptions);

