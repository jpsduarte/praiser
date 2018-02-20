import React, { Component } from 'react'
import SearchBar from './searchBar'
import LyricEditor from './lyricEditor';

import { connect } from 'react-redux'

import pptx from 'pptxgenjs'
import PresentationBackground from './presentationOptions/presentationBackground';

class DownloadPresentation extends Component {

  downloadPresentation() {
    let presentation = new pptx()
    presentation.setBrowser(true)

    let slidePages = this.props.formatedLyric.split('<hr>')

    presentation.getLayout('LAYOUT_16x9') //LAYOUT_16x9 or LAYOUT_4x3

    for (let page = 0; page < slidePages.length; page++) {
      let slide = presentation.addNewSlide()

      slide.back = '#000000'
      slide.color = 'FFFFFF'


      slide.addText(slidePages[page], {
        x: 0,
        y: 2,
        w:'100%',
        h: '10%',
        align:'left',
        valign: 'middle',
        // fill: '72f970',
        fontSize: 24,
        fontFace: 'Nunito Sans',
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

                  <div className="style-content">Roboto Light</div>

                  <div className="font-options">
                    <div className="row">
                      <div className="col-md-4">
                        <div className="font-card">
                          <div className="font-card-body font-1">
                            Roboto Light
                          </div>
                        </div>
                      </div>

                      <div className="col-md-4">
                        <div className="font-card">
                          <div className="font-card-body font-2">
                            Proxima Nova
                          </div>
                        </div>
                      </div>

                      <div className="col-md-4">
                        <div className="font-card">
                          <div className="font-card-body font-3">
                            ADAM
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="row">
                      <div className="col-md-4">
                        <div className="font-card">
                          <div className="font-card-body font-4">
                            Trashhand
                          </div>
                        </div>
                      </div>

                      <div className="col-md-4">
                        <div className="font-card">
                          <div className="font-card-body font-5">
                            MOON
                          </div>
                        </div>
                      </div>

                      <div className="col-md-4">
                        <div className="font-card">
                          <div className="font-card-body font-6">
                            SANTANELLI
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="row">
                      <div className="col-md-4">
                        <div className="font-card">
                          <div className="font-card-body font-7">
                            Seravek
                          </div>
                        </div>
                      </div>

                      <div className="col-md-4">
                        <div className="font-card">
                          <div className="font-card-body font-8">
                            Reef
                          </div>
                        </div>
                      </div>

                      <div className="col-md-4">
                        <div className="font-card">
                          <div className="font-card-body font-9">
                            Core Circus
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-md-4">
                <div className="background">
                  <div className="style-header">Background</div>

                  <div className="style-content">
                    <div className="primary-background">
                      <div className="secondary-background"></div>
                    </div>
                  </div>

                  <div className="background-options">
                    <div className="row">
                      <div className="col-md-4">
                        <div className="background-card bkg-1">
                          <div className="background-card-body bkg-inner-1"></div>
                        </div>
                      </div>

                      <div className="col-md-4">
                        <div className="background-card bkg-2">
                          <div className="background-card-body bkg-inner-2"></div>
                        </div>
                      </div>

                      <div className="col-md-4">
                        <div className="background-card bkg-3">
                          <div className="background-card-body bkg-inner-3"></div>
                        </div>
                      </div>
                    </div>

                    <div className="row">
                      <div className="col-md-4">
                        <div className="background-card bkg-4">
                          <div className="background-card-body bkg-inner-4"></div>
                        </div>
                      </div>

                      <div className="col-md-4">
                        <div className="background-card bkg-5">
                          <div className="background-card-body bkg-inner-5"></div>
                        </div>
                      </div>

                      <div className="col-md-4">
                        <div className="background-card bkg-6">
                          <div className="background-card-body bkg-inner-6"></div>
                        </div>
                      </div>
                    </div>

                    <div className="row">
                      <div className="col-md-4">
                        <div className="background-card bkg-7">
                          <div className="background-card-body bkg-inner-7"></div>
                        </div>
                      </div>

                      <div className="col-md-4">
                        <div className="background-card bkg-8">
                          <div className="background-card-body bkg-inner-8"></div>
                        </div>
                      </div>

                      <div className="col-md-4">
                        <div className="background-card bkg-9">
                          <div className="background-card-body bkg-inner-9"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-md-4">
                <div className="format">
                  <div className="style-header">Formato</div>

                  <div className="style-content">
                    <div className="wide">16:9</div>
                    <dic className="square">4:3</dic>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className="row download">
            <div className="col-md-4 offset-md-4">
              <input type="button" className="btn btn-default btn-lg btn-block" value="Download" onClick={this.downloadPresentation.bind(this)}
              />
            </div>
          </section>
        </div>
      </div>
    )
  }
}

function mapStateToProp(state) {
  return {
    formatedLyric: state
  }
}

export default connect(mapStateToProp, null)(DownloadPresentation)
