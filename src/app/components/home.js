import React from 'react';
import axios from 'axios';
import { MyEditor } from "./editor";
import {Editor, EditorState, RichUtils, ContentState} from 'draft-js';
import { setTimeout } from 'timers';
import { debug } from 'util';

var pptx = require('pptxgenjs');
var CancelToken = axios.CancelToken;
var source = CancelToken.source();

export class Home extends React.Component {

    constructor(props) {
        super(props);
        
        this.state = {
            API_KEY: "816cb2693b51b9f3dbd1e1fbbb8f5d5e",
            API_URL : "https://api.vagalume.com.br/",
            value: '',
            matches: [],
            lyric: '',
            hasEditor: false
        }; 

        // This binding is necessary to make `this` work in the callback
        this.search = this.search.bind(this);
        this.download = this.download.bind(this);
        this.format = this.format.bind(this);
        
        this.timeout = null;
        this.requested = null; 
      }

        search(event) {
            this.setState({value: event.target.value});

            if(!this.state.value) {
                this.setState({matches: []});
                return;
            }

            if(this.requested) {
                source.cancel('Operation canceled by the user.');
            }

            
            axios.get(`${this.state.API_URL}search.artmus?limit=7&q=${this.state.value}`, { timeout: 1500, cancelToken: source.token })
            .then(res => {
                //console.log(res); 
                this.setState({matches: res.data.response.docs});
            })
            .then(thrown => {
                if (axios.isCancel(thrown)) {
                    console.log('Request canceled', thrown.message);
                  } else {
                    // handle error
                  }              
            });
            this.requsted = true;
        }

        onSelect(id) {
            this.setState({matches: [], value: ''});

            axios.get(`${this.state.API_URL}search.php?apiKey=${this.state.API_KEY}&musid=${id}`)
            .then(res => {
              //console.log(res); 
              this.setState({lyric: this.format(res.data.mus[0].text), value: res.data.mus[0].name});
                
              //change editor text
              if(this.state.hasEditor) {
                //console.log(editorState.getCurrentContent());
              }
                
              this.setState({hasEditor: true});

            });
        }

        format(content) {
            var slides = content.split("\n\n");
            slides[0] = slides[0] + '<hr />';
            return slides[0];
            
        }

        download() {
            
            console.log(pptx);

            var slide = pptx.addNewSlide(pptx.masters.MASTER_SLIDE, { bkgd: 'CCC' });
            
            slide.bkgd = 'F1F1F1';
            slide.color = 'red';
            slide.bkgd = "#CCCCCC";// model.configuration.background;
            slide.background = "#CCCCCC";// model.configuration.background;

            slide.addText("<h1>Ed Sheeran</h1>",
                {
                    x: 0,
                    y: 0,
                    align:'c',
                    valign: 'middle',
                    margin:5,
                    h: '100%',
                    fill: "#EDEDED",
                    font_size: "14",
                    color: "BLACK"
                });

                pptx.save('Demo-Simple');

        }

        render() {
            
            const hasLyric = this.state.lyric;

            return (
                <div className="home">
                    <div className="row-fluid step">
                        <div className="col-xs-4 green1"></div>
                        <div className="col-xs-4 green2"></div>
                        <div className="col-xs-4 blue1"></div>
                    </div>

                    <div className="container">
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
                                {this.state.matches.map(match =>
                                    match.title &&
                                    <li key={match.id} onClick={(e) => this.onSelect(match.id)}><a href="#"> {match.band} - {match.title}</a></li>
                                )}
                                </ul>
                            </div>
                        </div>
                        
                        {
                            hasLyric &&
                            <MyEditor content={this.state.lyric} />
                        }
                        
                        <div className="row download">
                            <div className="col-md-4 col-md-offset-4">
                            {
                               hasLyric &&
                               <input type="button" value="Download" onClick={this.download} className="btn btn-default btn-lg btn-block" />
                            }
                            </div>
                        </div>
                            
                    </div>
                </div>
            );
        }
    
    }