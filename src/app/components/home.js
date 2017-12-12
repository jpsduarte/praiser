import React from 'react';
import axios from 'axios';
import { MyEditor } from "./editor";

export class Home extends React.Component {
    
    constructor(props) {
        super(props);
        
        this.state = {
            API_KEY: "816cb2693b51b9f3dbd1e1fbbb8f5d5e",
            API_URL : "https://api.vagalume.com.br/",
            value: '',
            timeout: null,
            matches: [],
            lyric: ''
        }; 

        // This binding is necessary to make `this` work in the callback
        this.search = this.search.bind(this);
      }

        search(event) {
            this.setState({value: event.target.value});
            console.log(this.state);
            
            if(!event.target.value) {
                this.setState({matches: []});
                return;
            }

            axios.get(`${this.state.API_URL}search.artmus?limit=7&q=${this.state.value}`)
            .then(res => {
              //    console.log(res); 
              this.setState({matches: res.data.response.docs});
            });
        }

        onSelect(id) {
            this.setState({matches: [], value: ''});

            axios.get(`${this.state.API_URL}search.php?apiKey=${this.state.API_KEY}&musid=${id}`)
            .then(res => {
              console.log(res); 
              //this.setState({editorState: res.data.mus[0].text});
            });
        }

        render() {
            return (
                <div className="home">
                    <div className="row-fluid step">
                        <div className="col-sm-4 green1"></div>
                        <div className="col-sm-4 green2"></div>
                        <div className="col-sm-4 blue1"></div>
                    </div>

                    <div className="container">
                         <div className="music-search">
                            <div className="form-group">
                                <input value={this.state.value} onChange={this.search} type="text" className="form-control input-lg" id="musicSearchInput" placeholder="Qual música você quer?" />
                            </div>
                            <ul>
                            {this.state.matches.map(match =>
                                <li key={match.id}><a href="#" onClick={(e) => this.onSelect(match.id)}> {match.band} - {match  .title}</a></li>
                            )}
                            </ul>
                        </div>
                       
                        <MyEditor content={this.state.lyric} />
                            
                    </div>
                </div>
            );
        }
    
    }