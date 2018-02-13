import React, { Component } from 'react';
import ReactSummernote from 'react-summernote';

import { connect } from 'react-redux'
import { formatLyric } from '../actions'

import 'react-summernote/dist/react-summernote.css';
import 'react-summernote/lang/summernote-pt-BR';

import 'bootstrap';

class LyricEditor extends Component {

  componentWillReceiveProps(props) {
    let node = document.createElement('div')
    node.innerHTML = this.formatSlides(props.lyric)

    ReactSummernote.insertNode(node)
  }

  formatSlides(lyric) {
    let slides = lyric.split(' ')

    for(let i = 0; i < slides.length; i++) {
      slides[i] = slides[i] + `<hr />`

      // <p style="text-align: center;">-------- <span style="color: red">Novo Slide - ${i} </span> --------</p> <hr />
    }

    return slides.join('\n\n')
  }

  onChange(lyric) {
    this.props.formatLyric(lyric)
  }

  render() {
    return (
      <ReactSummernote
        value=""
        options={{
          lang: 'pt-BR',
          height: 350,
          dialogsInBody: true,
          toolbar: [
            ['style', ['style']],
            ['font', ['bold', 'italic', 'underline', 'clear']],
            ['fontname', ['fontname']],
            ['para', ['ul', 'ol', 'paragraph']],
            ['table', ['table']],
            ['insert', ['link', 'picture', 'video']],
            ['view', ['fullscreen', 'codeview']]
          ]
        }}
        onChange={this.onChange.bind(this)}
      />
    )
  }
}

function mapStateToProps(state) {
  return {
    lyric: state
  }
}

export default connect(mapStateToProps, { formatLyric })(LyricEditor)
