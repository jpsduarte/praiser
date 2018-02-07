import React from 'react'

import vagalumeAPI from '../services/vagalumeAPI'

class SearchBar extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      value: '',
      matches: [],
      lyric: '',
      hasEditor: false
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
    
  }

  render() {
    return (
      <div className="row music-search">
        <div className="col-md-12">
          <div className="form-group">
            <div className="input-group">
              <input value={this.state.value} onChange={this.search} type="text"
                className="form-control input-lg" id="musicSearchInput" placeholder="Qual música você quer?" />
              <span className="input-group-addon">
                <span className="glyphicon glyphicon-search"></span>
              </span>
            </div>
          </div>
          <ul>
            {
              this.state.matches.map(match => match.title &&
                                              <li key={match.id} onClick={(e) => this.musicSelected(match.id)}>
                                                <a href="#"> {match.band} - {match.title}</a>
                                              </li>)
            }
          </ul>
        </div>
      </div>
    )
  }
}

export default SearchBar
