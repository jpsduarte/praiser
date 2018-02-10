import React, { Component } from 'react';
import ReactSummernote from 'react-summernote';

import 'react-summernote/dist/react-summernote.css';
import 'react-summernote/lang/summernote-pt-BR';

import 'bootstrap';

class LyricEditor extends Component {
  constructor(props) {
    super(props)

    this.state = {
      formatedLyric: ''
    }

    this.onChange = this.onChange.bind(this)
  }

  componentWillReceiveProps(props) {
    let node = document.createElement('div')
    node.innerHTML = this.formatSlides(props.lyric)

    ReactSummernote.insertNode(node)
  }

  onChange(lyric) {
    this.props.formatedLyric(lyric)
  }

  formatSlides(lyric) {
    let slides = lyric.split('\n\n')

    for(let i = 0; i < slides.length; i++) {
      slides[i] = slides[i] + '<hr />'
    }

    return slides.join('\n\n')
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
        onChange={this.onChange}
      />
    );
  }
}

export default LyricEditor
