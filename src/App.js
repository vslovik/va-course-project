import React, { Component } from 'react'
import './App.css'

// import store from "./store/index";
// import { addArticle } from "./actions/index";

import Header from './components/Header'
import MainBlock from "./components/MainBlock";
import Sidebar from './components/Sidebar'
import Footer from './components/Footer'

// import { Navbar, Jumbotron, Button } from 'react-bootstrap';

class App extends Component {
  render() {
    return (
        <div className="App">
            <div>
                <div>
                    <div>
                        <Header />
                        <div className="container">
                              <div className="repository-content">
                                  <div className="wiki-wrapper-text">
                                      <h1 className="gh-header-title instapaper_title">Project name</h1>
                                      <div className="gh-header-meta">Project short description</div>
                                      <div className="wiki-content">
                                          <div className="has-rightbar">
                                              <Sidebar />
                                              <MainBlock />
                                          </div>
                                    </div>
                                  </div>
                              </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
            <div className="d-flex flex-justify-center pb-6">
                <span className="f6 text-gray-light"/>
            </div>
        </div>
    );
  }
}

export default App