import React, { Component } from 'react'
import ReactSummernote from 'react-summernote'

import { connect } from 'react-redux'
import { formatLyric, addLyric } from '../actionsCreators'

import 'react-summernote/dist/react-summernote.css'
import 'react-summernote/lang/summernote-pt-BR'

import 'bootstrap';

class LyricEditor extends Component {
  constructor(props) {
    super(props)

    this.state = {
      lyric: ''
    }
  }

  componentWillReceiveProps(props) {
    if(props.state.lyric !== "") {
      let lyric = this.formatSlides(props.state.lyric)

      this.props.formatLyric(lyric)

      this.setState({ lyric })

      this.props.addLyric("")
    }
  }

  formatSlides(lyric) {
    let slides = lyric.split('\n\n')

    slides = slides.map((page) => {
      return `${page} <hr>`
    })

    return slides.join('\n\n')
  }

  onChange(lyric) {
    this.setState({ lyric })
    this.props.formatLyric(this.state.lyric)
  }

  render() {
    return (
      <ReactSummernote
        value={this.state.lyric}
        options={{
          lang: 'pt-BR',
          height: 350,
          dialogsInBody: true,
          toolbar: [
            ['font', ['fontsize', 'bold', 'italic', 'underline']],
            ['para', ['paragraph']]
          ]
        }}
        onChange={this.onChange.bind(this)} />
    )
  }
}

function mapStateToProps(state) {
  return { state }
}

export default connect(mapStateToProps, { formatLyric, addLyric })(LyricEditor)
