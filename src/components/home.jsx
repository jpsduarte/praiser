import React from 'react'
import SearchBar from './searchBar'
import LyricEditor from './lyricEditor';

import { connect } from 'react-redux'

import pptx from 'pptxgenjs' 

class Home extends React.Component {

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
        <div className="container-fluid">
          <div className="row step">
            <div className="col-sm-4 green1"></div>
            <div className="col-sm-4 green2"></div>
            <div className="col-sm-4 blue1"></div>
           </div>
        </div>
        

        <div className="container">
          <SearchBar />

          <LyricEditor />

          <div className="row format-opt">
            <div className="col-md-4">
              <div className="opt-header">Fonte</div>
              <div className="opt-content">Roboto Light</div>
            </div>
            <div className="col-md-4">
              <div className="opt-header">Background</div>
              <div className="opt-content">Roboto Light</div>
            </div>
            <div className="col-md-4">
              <div className="opt-header">Formato</div>
              <div className="opt-content">Roboto Light</div>
            </div>
          </div>

          {/* <div className="row colors">
            <div className="col-md-1 col-md-offset-3">
              <div className="square">
                <img tabIndex="-1" src="http://media.giphy.com/media/xULW8kDbx8bmQFQKAw/200w_d.gif" width="80" height="80" alt="" />
              </div>
            </div>

            <div className="col-md-1">
              <div className="square" tabIndex="-1">
                <div className="rectangle"> </div>
              </div>
            </div>

            <div className="col-md-1">
              <div className="square" tabIndex="-1">
                <div className="rectangle"> </div>
              </div>
            </div>

            <div className="col-md-1">
              <div className="square" tabIndex="-1">
                <div className="rectangle"></div>
              </div>
            </div>

            <div className="col-md-1">
              <div className="square" tabIndex="-1">
                <div className="rectangle"></div>
              </div>
            </div>

            <div className="col-md-1">
              <div className="square" tabIndex="-1">
                <div className="rectangle"></div>
              </div>
            </div>
          </div> */}

          <div className="row download">
            <div className="col-md-4 offset-md-4">
              <input type="button" value="Download" onClick={this.downloadPresentation.bind(this)} className="btn btn-default btn-lg btn-block" />
            </div>
          </div>
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

export default connect(mapStateToProp, null)(Home)
