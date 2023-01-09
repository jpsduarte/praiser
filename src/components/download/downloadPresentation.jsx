import React, { Component } from 'react'

import SearchBar from '../search/searchBar'
import LyricEditor from '../editor/lyricEditor';
import FormatOptions from '../pptOptions/formatOptionItem'
import FontOptions from '../pptOptions/fontOptions'
import BackgroundOptions from '../pptOptions/backgroundOptions'

import { connect } from 'react-redux'
import pptxDownloader from '../../services/pptxDownolader'

import 'font-awesome/css/font-awesome.css'

class DownloadPresentation extends Component {

  downloadPresentation() {
    pptxDownloader(this.props.state.formattedLyric.split('<hr>'), {
      bg: this.props.state.backgroundStyle.bg,
      format: this.props.state.formatStyle === '16:9' ? 'LAYOUT_16x9' : 'LAYOUT_4x3',
      inner: this.props.state.backgroundStyle.inner,
      fontFace: this.props.state.fontStyle,
      fontSize: 42
    })
  }

  render() {
    return (
      <div className="home">
        <div className="row step">
          <div className="col-4 green1"></div>
          <div className="col-4 green2"></div>
          <div className="col-4 blue1"></div>
        </div>

        <div className="container">
          <SearchBar />

          <LyricEditor />

          { this.props.state.formattedLyric && <section className="presentation-style">
            <div className="row">
              <div className="col-md-4">
                <FontOptions />
              </div>

              <div className="col-md-4">
                <BackgroundOptions />
              </div>

              <div className="col-md-4">
                <div className="format">
                  <div className="style-header">Formato</div>

                  <div className="style-content">
                    <FormatOptions format="16:9"/>
                    <FormatOptions format="4:9"/>
                  </div>
                </div>
              </div>
            </div>
          </section> }

          <section className="row download">
            <div className="col-md-4 offset-md-4">
                { this.props.state.formattedLyric && <input type="button" className="btn btn-default btn-lg btn-block" value="Download" onClick={this.downloadPresentation.bind(this)} /> }
            </div>
          </section>
        </div>
      </div>
    )
  }
}

function mapStateToProp(state) {
  return { state }
}

export default connect(mapStateToProp, null)(DownloadPresentation)
