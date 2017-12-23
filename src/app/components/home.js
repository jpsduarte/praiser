import React from 'react';
import axios from 'axios';
import { MyEditor } from "./editor";
//import {Editor, EditorState, RichUtils, ContentState} from 'draft-js';
import { setTimeout } from 'timers';
import { debug } from 'util';
//require("css!../style/site.css"); 
import style from '../style/site.css'

// var pptx = require('pptxgenjs');
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
        this.setupSummernote = this.setupSummernote.bind(this);
        
        this.timeout = null;
        this.requested = null; 
      }

      componentDidMount() {
       
      }

        search(event) {
            this.setState({value: event.target.value});

            if(!this.state.value) {
                this.setState({matches: []});
                return;
            }

            //console.log(this.requested);
            //console.log(this.timeout);

            if(this.requested) {
                //source.cancel('Operation canceled by the user.');
            }

            if(this.timeout) {
                console.log('clearing', this.timeout);
                clearTimeout(this.timeout);
                this.timeout = null
                //source.cancel('Operation canceled by the user.');
            }
            
            console.log('setTimeout');
            //this.timeout = setTimeout(function() {
                this.requested = true;

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
            //}.bind(this), 1000);
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
              
              var node = document.createElement('div');
              node.innerHTML = this.format(res.data.mus[0].text);

              //$('#summernote').summernote('reset');              
            //   $('#summernote').summernote('fontSize', 24);    
              this.setupSummernote();          
              $('#summernote').summernote('insertNode', node);
             
              this.setState({hasEditor: true});

            });
        }

        format(content) {
            var slides = content.split("\n\n");

            for(var i = 0; i < slides.length; i++) {
                slides[i] = slides[i] + '<hr />';                
            }

            return  slides.join('\n\n');
            
        }

        download() {
            
            var markupStr = $('#summernote').summernote('code');
            var slides = markupStr.split('<hr>');   

            var pptx = new PptxGenJS();
            
            for (var i = 0; i < slides.length; i++) {
                var slide = pptx.addNewSlide(pptx.masters.MASTER_SLIDE, { bkgd: 'CCC' });
 
                slide.bkgd = 'F1F1F1';
                slide.color = 'red';
                slide.bkgd = "#CCCCCC";
                slide.background = "#CCCCCC";
 
                var slideText = slides[i];
                var fontSize = 37;
               
                //size
                if (slideText.indexOf('<h1>') != -1)
                {
                    fontSize = 58;
                }
                else if (slideText.indexOf('<h2>') != -1) {
                    fontSize = 52;
                }
                else if (slideText.indexOf('<h3>') != -1) {
                    fontSize = 46;
                }
                else if (slideText.indexOf('<h4>') != -1) {
                    fontSize = 39;
                }
                else if (slideText.indexOf('<h5>') != -1) {
                    fontSize = 32;
                }
                else if (slideText.indexOf('<h6>') != -1) {
                    fontSize = 26;
                }
 
                //format text
                slideText = slideText.replace("<br/>", "\n");
                slideText = slideText.replace("<br />", "\n");
                slideText = slideText.replace(new RegExp("\\<.*?>", "gm"), "");
 
                slide.addText(slideText,
                    {
                        x: 0,
                        y: 0,
                        font_face: 'arial',
                        align:'c',
                        valign: 'middle',
                        margin:5,
                        h: '100%',
                        fill: 'CCCCCC',
                        font_size: fontSize,
                        color: '000000'
                    });
            }

            pptx.save('Demo-Simple');

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
                }); 
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
                        
                        {/* {
                            hasLyric &&
                            <MyEditor content={this.state.lyric} />
                        } */}

                        {
                            hasLyric &&
                            <div id="summernote"></div>
                        }
                           


                        <div className="row colors">
                            <div className="col-md-1 col-md-offset-3">
                                <div className="square" tabindex="-1">
                                    <div className="rectangle">
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-1">
                            <div className="square" tabindex="-1">
                                    <div className="rectangle">
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-1">
                            <div className="square" tabindex="-1">
                                    <div className="rectangle">
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-1">
                            <div className="square" tabindex="-1">
                                    <div className="rectangle">
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-1">
                            <div className="square" tabindex="-1">
                                    <div className="rectangle">
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-1">
                            <div className="square" tabindex="-1">
                                    <div className="rectangle">
                                    </div>
                                </div>
                            </div>
                        </div>
                       

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