import React from 'react'
import axios from 'axios'
import SearchBar from  './searchBar'

import $ from 'jquery'
import pptx from 'pptxgenjs'

class Home extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      lyric: 'lyric',
      hasEditor: false
    }

    this.download = this.download.bind(this)
    this.format = this.format.bind(this)
    this.setupSummernote = this.setupSummernote.bind(this)
  }

  onSelect(id) {
    this.setState({matches: [], value: ''})

    axios.get(`${this.state.API_URL}search.php?apiKey=${this.state.API_KEY}&musid=${id}`)
      .then(res => {
        //console.log(res);
        this.setState({lyric: this.format(res.data.mus[0].text), value: res.data.mus[0].name})

        //change editor text
        if(this.state.hasEditor) {
          //console.log(editorState.getCurrentContent());
        }

        var node = document.createElement('div')
        node.innerHTML = this.format(res.data.mus[0].text)

        //$('#summernote').summernote('reset');
        //$('#summernote').summernote('fontSize', 24);
        this.setupSummernote()
        // $('#summernote').summernote('insertNode', node)

        this.setState({hasEditor: true})

      })
  }

  format(content) {
    var slides = content.split('\n\n')

    for(var i = 0; i < slides.length; i++) {
      slides[i] = slides[i] + '<hr />'
    }

    return  slides.join('\n\n')

  }

  download() {
    var markupStr = $('#summernote').summernote('code')
    var slides = markupStr.split('<hr>')

    console.debug(slides[0])

    // pptx.defineSlideMaster({
    //     title: 'MASTER_SLIDE',
    //     bkgd:  {
    //         path: 'app/images/bkgr.gif'
    //     },
    //     slideNumber: { x:0.3, y:'90%' }
    //   });


    for (var i = 0; i < slides.length; i++) {
      //var slide = pptx.addNewSlide('MASTER_SLIDE');
      var slide = pptx.addNewSlide(pptx.masters.MASTER_SLIDE, { bkgd: '#000' })


      //slide.bkgd = 'F1F1F1';
      //slide.color = 'red';
      //slide.bkgd = "#CCCCCC";
      //slide.background = "#CCCCCC";

      var slideText = slides[i]
      var fontSize = 37

      //size
      if (slideText.indexOf('<h1>') != -1)
      {
        fontSize = 58
      }
      else if (slideText.indexOf('<h2>') != -1) {
        fontSize = 52
      }
      else if (slideText.indexOf('<h3>') != -1) {
        fontSize = 46
      }
      else if (slideText.indexOf('<h4>') != -1) {
        fontSize = 39
      }
      else if (slideText.indexOf('<h5>') != -1) {
        fontSize = 32
      }
      else if (slideText.indexOf('<h6>') != -1) {
        fontSize = 26
      }

      //format text
      slideText = slideText.replace('<br/>', '\n')
      slideText = slideText.replace('<br />', '\n')
      slideText = slideText.replace(new RegExp('\\<.*?>', 'gm'), '')

      // slide.addText(slideText,
      //     {
      //         x: 0,
      //         y: 0,
      //         font_face: 'arial',
      //         align:'c',
      //         valign: 'middle',
      //         margin:5,
      //         h: '100%',
      //         fill: 'CCCCCC',
      //         font_size: fontSize,
      //         color: '000000'
      //     });

      slide.addText(slideText)
    }

    pptx.save('Demo-Simple')
  }

  setupSummernote() {
    $('#summernote').summernote({
      tooltip: 'auto',
      airMode: false,
      height: 450,                 // set editor height
      minHeight: null,             // set minimum height of editor
      maxHeight: null,             // set maximum height of editor
      focus: false,                  // set focus to editable area after initializin
      toolbar: [
        // [groupName, [list of button]]
        ['style', ['style','bold', 'italic', 'underline', 'clear']],
        ['font', ['font']],
        ['fontname', ['fontname']],
        ['fontsize', ['fontsize']],
        ['para', ['paragraph']],
        ['view', ['fullscreen']]
      ],
      styleTags: ['p', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6'],
      fontNames: [
        'Arial', 'Arial Black', 'Comic Sans MS', 'Courier New',
        'Helvetica Neue', 'Helvetica', 'Impact', 'Lucida Grande',
        'Tahoma', 'Times New Roman', 'Verdana'
      ],
      fontSizes: ['8', '9', '10', '11', '12', '14', '18', '24', '36']
    })
  }

  render() {
    const hasLyric = this.state.lyric

    return (
      <div className="home">
        <div className="row step">
          <div className="col-4 green1"></div>
          <div className="col-4 green2"></div>
          <div className="col-4 blue1"></div>
        </div>

        <div className="container">
          <SearchBar />

          { hasLyric && <div id="summernote"></div> }

          <div id="summernote"></div>

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
              { hasLyric && <input type="button" value="Download" onClick={this.download} className="btn btn-default btn-lg btn-block" /> }
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Home
