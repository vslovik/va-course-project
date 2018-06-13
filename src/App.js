import React, { Component } from 'react'
import './css/App.css'

import Header from './components/header'
import Plots from "./components/plots";

export default class App extends Component {
  render() {
    return (
        <div className="App">
            <Header />
            <Plots/>
        </div>
    );
  }
}