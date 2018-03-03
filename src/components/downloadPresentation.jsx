import React, { Component } from 'react'
import SearchBar from './searchBar'
import LyricEditor from './lyricEditor';
import PresentationBackground from './presentationOptions/presentationBackground';
import PresentationFont from './presentationOptions/presentationFont'
import PresentationFormat from './presentationOptions/presentationFormat'

import { connect } from 'react-redux'
import pptx from 'pptxgenjs'

import 'font-awesome/css/font-awesome.css'

class DownloadPresentation extends Component {
  constructor(props) {
    super(props);

    this.state = {
      component: {
        background: '',
        font: ''
      }
    }
  }

  handleFontFade() {
    if (!this.state.component.font || this.state.component.font === 'fadeOut') {
      this.setState({ component: { font: 'fadeIn' } })
    }
    else if (this.state.component.font == 'fadeIn') {
      this.setState({ component: { font: 'fadeOut' } })
    }
  }

  handleBackgroundFade() {
    if (!this.state.component.background || this.state.component.background === 'fadeOut') {
      this.setState({ component: { background: 'fadeIn' } })
    }
    else if (this.state.component.background == 'fadeIn') {
      this.setState({ component: { background: 'fadeOut' } })
    }
  }

  downloadPresentation() {
    let presentation = new pptx()
    presentation.setBrowser(true)

    let slidePages = this.props.state.formattedLyric.split('<hr>')

    let slideFormat = this.props.formatStyle === '16:9' ? 'LAYOUT_16x9' : 'LAYOUT_4x3'
    presentation.getLayout(slideFormat)

    this.addPage(presentation, slidePages)

    presentation.save(`NomeMusica`)
  }

  addPage(presentation, slidePages) {
    for (let page = 0; page < slidePages.length; page++) {
      let slide = presentation.addNewSlide()

      slide.back = this.props.state.backgroundStyle.bg
      slide.color = this.props.state.backgroundStyle.inner.replace('#','')

      slide.addText(slidePages[page], {
        x: 0,
        y: 2,
        w:'100%',
        h: '10%',
        align:'left',
        valign: 'middle',
        fontSize: 24,
        fontFace: this.props.state.fontStyle,
        isTextBox: true
      })
    }
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
                <div className="font">
                  <div className="style-header">
                    Fonte
                    <button className="badge btn-toggle-option" onClick={this.handleFontFade.bind(this)}>
                      {this.state.component.font === 'fadeOut' || !this.state.component.font ? (<i class="fa fa-angle-double-down"></i>) : (<i class="fa fa-angle-double-up"></i>)}
                    </button>
                  </div>

                  {this.props.state.fontStyle ? (
                      <div className="style-content" style={{ fontFamily: this.props.state.fontStyle }}>
                        { this.props.state.fontStyle }
                      </div>
                    ) : (
                      <div className="style-content default-font">Roboto Light</div>
                  )}

                  <div className={`font-options ${this.state.component.font}`}>
                    <div className="row">
                      <PresentationFont font="Roboto Light" />
                      <PresentationFont font="Calibri" />
                      <PresentationFont font="Arial Black" />
                    </div>

                    <div className="row">
                      <PresentationFont font="Roboto Light" />
                      <PresentationFont font="Calibri" />
                      <PresentationFont font="Arial Black" />
                    </div>

                    <div className="row">
                      <PresentationFont font="Roboto Light" />
                      <PresentationFont font="Calibri" />
                      <PresentationFont font="Arial Black" />
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-md-4">
                <div className="background">
                  <div className="style-header">
                    Background
                    <button className="badge btn-toggle-option" onClick={this.handleBackgroundFade.bind(this)}>
                      {this.state.component.background === 'fadeOut' || !this.state.component.background ? (<i class="fa fa-angle-double-down"></i>) : (<i class="fa fa-angle-double-up"></i>)}
                    </button>
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

                  <div className={`background-options ${this.state.component.background}`}>
                    <div className="row">
                      <PresentationBackground bg="#000000" inner="#8393ca"/>
                      <PresentationBackground bg="#f15959" inner="#11f7fa"/>
                      <PresentationBackground bg="#f1e859" inner="#040404"/>
                    </div>

                    <div className="row">
                      <PresentationBackground bg="#464545" inner="#fdfdfe"/>
                      <PresentationBackground bg="#2b9929" inner="#f3fbc7"/>
                      <PresentationBackground bg="#59a4f1" inner="#fcfefe"/>
                    </div>

                    <div className="row">
                      <PresentationBackground bg="#d4b5d4" inner="#11319d"/>
                      <PresentationBackground bg="#5987f1" inner="#f7fa11"/>
                      <PresentationBackground bg="#f159bd" inner="#050300"/>
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-md-4">
                <div className="format">
                  <div className="style-header">Formato</div>

                  <div className="style-content">
                    <PresentationFormat format="16:9"/>
                    <PresentationFormat format="4:9"/>
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
