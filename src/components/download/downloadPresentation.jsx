import React, { Component } from 'react'
import SearchBar from '../search/searchBar'
import LyricEditor from '../editor/lyricEditor';
import FormatOptions from '../presentationOptions/formatOptionItem'
import FontOptions from '../presentationOptions/fontOptions'
import BackgroundOptions from '../presentationOptions/backgroundOptions'

import { connect } from 'react-redux'
import pptxjs from 'pptxgenjs'

import 'font-awesome/css/font-awesome.css'

class DownloadPresentation extends Component {
  addFormat(pptx) {
    let slideFormat = this.props.state.formatStyle === '16:9' ? 'LAYOUT_16x9' : 'LAYOUT_4x3'
    pptx.setLayout(slideFormat)
  }

  addMaster(pptx) {
    pptx.defineSlideMaster({
      title: 'Master',
      bkgd: this.props.state.backgroundStyle.bg
    })
  }

  addPage(presentation, slidePages) {
    for (let page = 0; page < slidePages.length; page++) {
      if (!slidePages[page]) return

      let slide = presentation.addNewSlide('Master')
      slide.color = this.props.state.backgroundStyle.inner.replace('#','')

      const options = {
        x: '10%',
        y: '15%',
        w: '80%',
        h: "70%",
        autoFit: true,
        valign: 'middle',
        fontFace: this.props.state.fontStyle,
        fontSize: 16
      }

      slide.addText(slidePages[page], options)
    }
  }

  downloadPresentation() {
    let pptx = new pptxjs()
    pptx.setBrowser(true)

    let slidePages = this.props.state.formattedLyric.split('<hr>')

    this.addFormat(pptx)

    this.addMaster(pptx)

    this.addPage(pptx, slidePages)

    pptx.save(`NomeMusica`)
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

          <section className="presentation-style">
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
          </section>

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
