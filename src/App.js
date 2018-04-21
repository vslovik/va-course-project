import React, { Component } from 'react'
import './App.css'
import SimpleForm from './components/SimpleForm'
import TediousForm from './components/TediousForm'
import FormikForm from './components/FormikForm'

import { Navbar, Jumbotron, Button } from 'react-bootstrap';

class App extends Component {
  render() {
    return (
      <div className="App">
          <div className="container">
              <div className="repository-content">
                  <div className="wiki-wrapper-text">
                      <h1 className="gh-header-title instapaper_title">Gallery</h1>
                      <div className="gh-header-meta">
                          kgbvax edited this page <relative-time datetime="2018-01-18T21:58:54Z"
                                                                 title="18 янв. 2018 г., 22:58 GMT+1">on 18
                          Jan</relative-time>
                          ·
                          <a href="/" className="history">
                              1276 revisions
                          </a>
                      </div>
                      <div className="wiki-content">
                          <div className="has-rightbar">
                              <div className="wiki-rightbar">
                                  <div className="width-full input-group">
                                      <input id="wiki-clone-url" type="text"
                                             className="form-control input-sm text-small text-gray input-monospace js-url-field"
                                             aria-label="Clone URL for this wiki"
                                             value="https://github.com/d3/d3.wiki.git" readOnly="readonly"/>
                                        <span className="input-group-button">
                                          <clipboard-copy htmlFor="wiki-clone-url" aria-label="Copy to clipboard"
                                                          className="btn btn-sm zeroclipboard-button tooltipped tooltipped-s" copied-label="Copied!"
                                                          tabindex="0" role="button">
                                            <svg className="octicon octicon-clippy" viewBox="0 0 14 16" version="1.1" width="14" height="16"
                                                 aria-hidden="true"><path fill-rule="evenodd"
                                                                          d="M2 13h4v1H2v-1zm5-6H2v1h5V7zm2 3V8l-3 3 3 3v-2h5v-2H9zM4.5 9H2v1h2.5V9zM2 12h2.5v-1H2v1zm9 1h1v2c-.02.28-.11.52-.3.7-.19.18-.42.28-.7.3H1c-.55 0-1-.45-1-1V4c0-.55.45-1 1-1h3c0-1.11.89-2 2-2 1.11 0 2 .89 2 2h3c.55 0 1 .45 1 1v5h-1V6H1v9h10v-2zM2 5h8c0-.55-.45-1-1-1H8c-.55 0-1-.45-1-1s-.45-1-1-1-1 .45-1 1-.45 1-1 1H3c-.55 0-1 .45-1 1z"></path></svg>
                                          </clipboard-copy>
                                        </span>
                                  </div>
                              </div>
                              <div className="wiki-body gollum-markdown-content instapaper_body">
                                  <div className="markdown-body">
                                      <blockquote>
                                          <p><a href="Home">Wiki</a> ▸ <strong>Gallery</strong></p>
                                      </blockquote>
                                      <p>Welcome to the <strong>D3 gallery</strong>! More examples are available on
                                          <a href="http://bl.ocks.org/mbostock" rel="nofollow">bl.ocks.org/mbostock</a>.
                                          If you want to share an example and don't have your own hosting, consider using
                                          <a href="http://gist.github.com">Gist</a> and <a href="http://bl.ocks.org" rel="nofollow">bl.ocks.org</a>.
                                          If you want to share or view live examples try <a href="https://vida.io/explore" rel="nofollow">vida.io</a>.
                                      </p>
                                      <h2>
                                          <a id="user-content-visual-index" className="anchor" href="#visual-index"
                                             aria-hidden="true">
                                              <svg className="octicon octicon-link" viewBox="0 0 16 16" version="1.1"
                                                   width="16" height="16" aria-hidden="true">
                                                  <path fill-rule="evenodd"
                                                        d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"></path>
                                              </svg>
                                          </a>Visual Index
                                      </h2>
                                      <table>
                                        <tbody>
                                        <tr valign="top">
                                            <td width="25%">Box Plots</td>
                                            <td width="25%">Box Plots</td>
                                            <td width="25%">Box Plots</td>
                                            <td width="25%">Box Plots</td>
                                        </tr>
                                        </tbody>
                                      </table>
                                  </div>
                              </div>
                          </div>
                      </div>
                  </div>
              </div>
          </div>
      </div>
    );
  }
}

export default App