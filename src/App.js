import React, { Component } from 'react'
import './App.css'

import Header from './components/header'
import Plots from "./components/plots";

class App extends Component {
  render() {
    return (
        <div className="App">
            <Header />
            <Plots/>
        </div>
    );
  }
}

export default App