import React, { Component } from 'react';
import { connect } from 'react-redux'
import BackgroundOptionItem from './backgroundOptionItem'

class BackgroundOptions extends Component {
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
      <div className="background">
        <div className="style-header">
          Background
          <div className="btn-toggle-option" onClick={this.handleAnimation.bind(this)}>
            {this.state.animation === 'fadeOut out' || !this.state.animation ? (
            <i className="fa fa-angle-double-down"></i>) : (
            <i className="fa fa-angle-double-up"></i>)}
          </div>
        </div>

        {this.props.state.backgroundStyle.bg ? (
        <div className="style-content">
          <div className="primary-background" style={{ backgroundColor: this.props.state.backgroundStyle.bg }}>
            <div className="secondary-background" style={{ backgroundColor: this.props.state.backgroundStyle.inner }}></div>
          </div>
        </div>
        ) : (
        <div className="style-content">
          <div className="primary-background default-bg">
            <div className="secondary-background default-inner"></div>
          </div>
        </div>
        )}

        <div className={`background-options ${this.state.animation}`}>
          <div className="row">
            <BackgroundOptionItem bg="#000000" inner="#8393ca" />
            <BackgroundOptionItem bg="#f15959" inner="#11f7fa" />
            <BackgroundOptionItem bg="#f1e859" inner="#040404" />
          </div>

          <div className="row">
            <BackgroundOptionItem bg="#464545" inner="#fdfdfe" />
            <BackgroundOptionItem bg="#2b9929" inner="#f3fbc7" />
            <BackgroundOptionItem bg="#59a4f1" inner="#fcfefe" />
          </div>

          <div className="row">
            <BackgroundOptionItem bg="#d4b5d4" inner="#11319d" />
            <BackgroundOptionItem bg="#5987f1" inner="#f7fa11" />
            <BackgroundOptionItem bg="#f159bd" inner="#050300" />
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProp(state) {
  return { state }
}

export default connect(mapStateToProp, null)(BackgroundOptions);
