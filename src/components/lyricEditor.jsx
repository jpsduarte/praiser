import React, { Component } from 'react';
import ReactSummernote from 'react-summernote';

import 'react-summernote/dist/react-summernote.css';
import 'react-summernote/lang/summernote-ru-RU';

import 'bootstrap';

class LyricEditor extends Component {
  onChange(content) {
    console.log('onChange', content);
  }

  render() {
    return (
      <ReactSummernote
        value={this.props.lyric}
        options={{
          lang: 'ru-RU',
          height: 350,
          dialogsInBody: true,
          toolbar: [
            ['style', ['style']],
            ['font', ['bold', 'underline', 'clear']],
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
