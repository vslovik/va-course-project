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
          <div>
              <div>
                  <div>
                      <div className="pagehead repohead instapaper_ignore readability-menu experiment-repo-nav">

                          <div className="repohead-details-container clearfix container">
                              <ul className="pagehead-actions">
                                  <li>
                                      <div className="select-menu">dsds</div>
                                  </li>
                                  <li>ccxcx</li>
                              </ul>

                              <h1 className="public ">
                                  <svg className="octicon octicon-repo" viewBox="0 0 12 16" version="1.1" width="12"
                                       height="16" aria-hidden="true">
                                      <path fill-rule="evenodd"
                                            d="M4 9H3V8h1v1zm0-3H3v1h1V6zm0-2H3v1h1V4zm0-2H3v1h1V2zm8-1v12c0 .55-.45 1-1 1H6v2l-1.5-1.5L3 16v-2H1c-.55 0-1-.45-1-1V1c0-.55.45-1 1-1h10c.55 0 1 .45 1 1zm-1 10H1v2h2v-1h3v1h5v-2zm0-10H2v9h9V1z"></path>
                                  </svg>
                                  <span className="author" itemProp="author"><a className="url fn" rel="author"
                                                                                href="/d3">d3</a></span><span className="path-divider">/</span><strong itemProp="name"><a data-pjax="#js-repo-pjax-container" href="/d3/d3">d3</a></strong>

                              </h1>

                          </div>

                          <div className="reponav container">
                              <span>
                                  <a className="reponav-item">
                                      dsdsd
                                  </a>
                                  <a className="reponav-item selected">
                                      dsdsd
                                  </a>
                              </span>

                          </div>
                      </div>



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
                                  <div className="wiki-pages-box readability-sidebar boxed-group flush js-wiki-pages-box collapsed">
                                      <h3 className="js-wiki-toggle-collapse wiki-auxiliary-content">
                                          <svg className="octicon octicon-triangle-down caret-expanded" viewBox="0 0 12 16"
                                               version="1.1" width="12" height="16" aria-hidden="true">
                                              <path fill-rule="evenodd" d="M0 5l6 6 6-6z"></path>
                                          </svg>
                                          <svg className="octicon octicon-triangle-right caret-collapsed" viewBox="0 0 6 16"
                                               version="1.1" width="6" height="16" aria-hidden="true">
                                              <path fill-rule="evenodd" d="M0 14l6-6-6-6z"></path>
                                          </svg>
                                          Pages <span className="Counter">62</span>
                                      </h3>
                                  </div>

                                  <div className="gollum-markdown-content readability-sidebar box box-small">
                                      <div className="wiki-custom-sidebar  markdown-body">
                                          <p>
                                              <a href="https://d3js.org" rel="nofollow">
                                              fdfdf
                                              </a>
                                          </p>
                                          <h1>
                                              <a id="user-content-data-driven-documents" className="anchor"
                                                 href="#data-driven-documents" aria-hidden="true">
                                                  <svg className="octicon octicon-link" viewBox="0 0 16 16" version="1.1"
                                                       width="16" height="16" aria-hidden="true">
                                                      <path fill-rule="evenodd"
                                                            d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"></path>
                                                  </svg>
                                              </a>Data-Driven Documents
                                          </h1>
                                          <ul>
                                              <li>
                                                  <a className="internal present" href="/">Home</a>
                                              </li>
                                          </ul>

                                          <h3>
                                              <a id="user-content-help" className="anchor" href="#help"
                                                 aria-hidden="true">
                                                  <svg className="octicon octicon-link" viewBox="0 0 16 16"
                                                       version="1.1" width="16" height="16" aria-hidden="true">
                                                      <path fill-rule="evenodd"
                                                            d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"></path>
                                                  </svg>
                                              </a>Help
                                          </h3>

                                          <ul>
                                              <li>
                                                  <a className="internal present" href="/">Home</a>
                                              </li>
                                              <li>
                                                  <a className="internal present" href="/">Home</a>
                                              </li>
                                          </ul>

                                          <h3>
                                              <a id="user-content-api-reference" className="anchor"
                                                 href="#api-reference" aria-hidden="true">
                                                  <svg className="octicon octicon-link" viewBox="0 0 16 16"
                                                       version="1.1" width="16" height="16" aria-hidden="true">
                                                      <path fill-rule="evenodd"
                                                            d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"></path>
                                                  </svg>
                                              </a><a href="https://github.com/d3/d3/blob/master/API.md">API
                                              Reference</a>
                                          </h3>

                                      </div>
                                  </div>

                                  <h5 className="mt-0 mb-2">Clone this wiki locally</h5>

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


                                      <h2>
                                          <a id="user-content-examples" className="anchor" href="#examples"
                                             aria-hidden="true">
                                              <svg className="octicon octicon-link" viewBox="0 0 16 16" version="1.1"
                                                   width="16" height="16" aria-hidden="true">
                                                  <path fill-rule="evenodd"
                                                        d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"></path>
                                              </svg>
                                          </a>Examples
                                      </h2>
                                      <ul>
                                          <li>
                                              <a className="internal present" href="/">Home</a>
                                          </li>
                                      </ul>

                                  </div>
                              </div>
                          </div>
                      </div>
                  </div>
              </div>
          </div>

                  </div>
              </div>
          </div>

          <div className="footer container-lg px-3" role="contentinfo">
              <div
                  className="position-relative d-flex flex-justify-between pt-6 pb-2 mt-6 f6 text-gray border-top border-gray-light ">
                  <ul className="list-style-none d-flex flex-wrap ">
                      <li className="mr-3">© 2018 <span title="0.36115s from unicorn-3796505407-t64mb">GitHub</span>,
                          Inc.
                      </li>
                      <li className="mr-3"><a data-ga-click="Footer, go to terms, text:terms"
                                              href="https://github.com/site/terms">Terms</a></li>
                      <li className="mr-3"><a data-ga-click="Footer, go to privacy, text:privacy"
                                              href="https://github.com/site/privacy">Privacy</a></li>
                      <li className="mr-3"><a href="https://help.github.com/articles/github-security/"
                                              data-ga-click="Footer, go to security, text:security">Security</a></li>
                      <li className="mr-3"><a href="https://status.github.com/"
                                              data-ga-click="Footer, go to status, text:status">Status</a></li>
                      <li><a data-ga-click="Footer, go to help, text:help" href="https://help.github.com">Help</a></li>
                  </ul>

                  <a aria-label="Homepage" title="GitHub" className="footer-octicon" href="https://github.com">
                      <svg height="24" className="octicon octicon-mark-github" viewBox="0 0 16 16" version="1.1"
                           width="24" aria-hidden="true">
                          <path fill-rule="evenodd"
                                d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0 0 16 8c0-4.42-3.58-8-8-8z"></path>
                      </svg>
                  </a>
                  <ul className="list-style-none d-flex flex-wrap ">
                      <li className="mr-3"><a data-ga-click="Footer, go to contact, text:contact"
                                              href="https://github.com/contact">Contact GitHub</a></li>
                      <li className="mr-3"><a href="https://developer.github.com"
                                              data-ga-click="Footer, go to api, text:api">API</a></li>
                      <li className="mr-3"><a href="https://training.github.com"
                                              data-ga-click="Footer, go to training, text:training">Training</a></li>
                      <li className="mr-3"><a href="https://shop.github.com"
                                              data-ga-click="Footer, go to shop, text:shop">Shop</a></li>
                      <li className="mr-3"><a href="https://blog.github.com"
                                              data-ga-click="Footer, go to blog, text:blog">Blog</a></li>
                      <li><a data-ga-click="Footer, go to about, text:about" href="https://github.com/about">About</a>
                      </li>

                  </ul>
              </div>
              <div className="d-flex flex-justify-center pb-6">
                  <span className="f6 text-gray-light"></span>
              </div>
          </div>

          <div className="d-flex flex-justify-center pb-6">
              <span className="f6 text-gray-light"></span>
          </div>


      </div>
    );
  }
}

export default App