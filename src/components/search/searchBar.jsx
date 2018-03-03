import React from 'react'
import vagalumeAPI from '../../services/vagalumeAPI'

import { connect } from 'react-redux'
import { addLyric } from '../../actionsCreators'

import 'font-awesome/css/font-awesome.css'

class SearchBar extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      value: '',
      matches: [],
      lyric: ''
    }

    this.search = this.search.bind(this)
  }

  search(event) {
    this.setState({ value: event.target.value })

    let params = {
      q: event.target.value,
      limit: 7
    }

    new vagalumeAPI().getArtMus(params).then(res => {
      this.setState({ matches: res })
    })
  }

  musicSelected(id){
    new vagalumeAPI().getMusicById(id).then(res => {
      this.setState({ lyric: res.text, value: res.name, matches: []})
      this.props.addLyric(this.state.lyric)
    })
  }

  render() {
    return (
      <div className="row music-search">
        <div className="col-md-12">
          <div className="form-group">
            <div className="input-group">
              <input value={this.state.value} onChange={this.search} type="text"
                className="form-control input-lg" id="musicSearchInput" placeholder="Qual música você quer?" />
              <span className="input-group-prepend">
                <span className="input-group-text">
                  <i className="fa fa-search"></i>
                </span>
              </span>
            </div>
          </div>
          <ul>
            {
              this.state.matches.map(match => match.title &&
                                              <li key={match.id} onClick={(e) => this.musicSelected(match.id)}>
                                                <span> {match.band} - {match.title}</span>
                                              </li>)
            }
          </ul>
        </div>
      </div>
    )
  }
}

export default connect(null, { addLyric })(SearchBar)
