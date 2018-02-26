import React, { Component } from 'react'
import SearchBar from './searchBar'
import LyricEditor from './lyricEditor';
import PresentationBackground from './presentationOptions/presentationBackground';
import PresentationFont from './presentationOptions/presentationFont'

import { connect } from 'react-redux'

import pptx from 'pptxgenjs'

class DownloadPresentation extends Component {

  downloadPresentation() {
    let presentation = new pptx()
    presentation.setBrowser(true)

    let slidePages = this.props.state.formattedLyric.split('<hr>')

    presentation.getLayout('LAYOUT_16x9') //LAYOUT_16x9 or LAYOUT_4x3

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
        // fill: this.props.state.backgroundStyle.inner,
        fontSize: 24,
        fontFace: this.props.state.fontStyle,
        isTextBox: true
      })
    }

    presentation.save(`NomeMusica`)
  }

  tempDownload() {
    // for (var i = 0; i < slidePages.length; i++) {
    //   //var slide = pptx.addNewSlide('MASTER_SLIDE');
    //   var slide = pptx.addNewSlide()
    //   //slide.bkgd = 'F1F1F1';
    //   //slide.color = 'red';
    //   //slide.bkgd = "#CCCCCC";
    //   //slide.background = "#CCCCCC";

    //   var slideText = slidePages[i]
    //   var fontSize = 37
    //   //size
    //   if (slideText.indexOf('<h1>') != -1)
    //   {
    //     fontSize = 58
    //   }
    //   else if (slideText.indexOf('<h2>') != -1) {
    //     fontSize = 52
    //   }
    //   else if (slideText.indexOf('<h3>') != -1) {
    //     fontSize = 46
    //   }
    //   else if (slideText.indexOf('<h4>') != -1) {
    //     fontSize = 39
    //   }
    //   else if (slideText.indexOf('<h5>') != -1) {
    //     fontSize = 32
    //   }
    //   else if (slideText.indexOf('<h6>') != -1) {
    //     fontSize = 26
    //   }

    //   //format text
    //   slideText = slideText.replace('<br/>', '\n')
    //   slideText = slideText.replace('<br />', '\n')
    //   slideText = slideText.replace(new RegExp('\\<.*?>', 'gm'), '')

    //   slide.addText(slideText,
    //   {
    //     x: 0,
    //     y: 0,
    //     font_face: 'arial',
    //     align:'c',
    //     valign: 'middle',
    //     margin:5,
    //     h: '100%',
    //     fill: 'CCCCCC',
    //     font_size: fontSize,
    //     color: '000000'
    //   });

    //   slide.addText(slideText)
    // }

    // pptx.save('Demo-Simple')
  }

  render() {
    let selectedFont = null

    if (this.props.state.fontStyle !== '') {
      selectedFont = <div className="style-content" style={{ fontFamily: this.props.state.fontStyle }}>
                      { this.props.state.fontStyle }
                     </div>
    }
    else {
      selectedFont = <div className="style-content default-font">Roboto Light</div>
    }

    let selectedBackground = null

    if (this.props.state.backgroundStyle.bg !== '') {
      selectedBackground = <div className="style-content">
                              <div className="primary-background" style={{ backgroundColor: this.props.state.backgroundStyle.bg }}>
                                <div className="secondary-background" style={{ backgroundColor: this.props.state.backgroundStyle.inner }}></div>
                              </div>
                            </div>
    }
    else {
      selectedBackground = <div className="style-content">
                              <div className="primary-background default-bg">
                                <div className="secondary-background default-inner"></div>
                              </div>
                            </div>
    }

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
                  <div className="style-header">Fonte</div>

                  { selectedFont }

                  <div className="font-options">
                    <div className="row">
                      <PresentationFont font="Roboto Light" />
                      <PresentationFont font="Calibri" />
                      <PresentationFont font="Arial Black" />
                    </div>

                    <div className="row">
                      <PresentationFont font="Comic Sans" />
                      <PresentationFont font="Time News Roman" />
                      <PresentationFont font="Roboto Light" />
                    </div>

                    <div className="row">
                      <PresentationFont font="Roboto Light" />
                      <PresentationFont font="Roboto Light" />
                      <PresentationFont font="Roboto Light" />
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-md-4">
                <div className="background">
                  <div className="style-header">Background</div>

                  {selectedBackground}

                  <div className="background-options">
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
                    <div className="wide">16:9</div>
                    <div className="square">4:3</div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className="row download">
            <div className="col-md-4 offset-md-4">
              <input type="button" className="btn btn-default btn-lg btn-block" value="Download" onClick={this.downloadPresentation.bind(this)} />
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
