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

          <h1>Slanted News</h1>
          <p>A visual exploration of how a story evolves over time, across three major broadcast news stations.</p>
          <form>
              <label><input type="radio" name="mode" value="multiples"/> Multiples</label>
              <label><input type="radio" name="mode" value="stacked" checked/> Stacked</label>
          </form>

          <h4>Boston bombings - 2013</h4>
          <div className="container-fluid">
              <div className="row">
                  <div className="chart-wrapper col-md-12">
                      <div className="chart1">dsd</div>
                  </div>
              </div>


              <div className="row">
                  <div className="chart-wrapper col-md-12">
                      <div className="chart2">dsds</div>
                  </div>
              </div>


              <div className="row">
                  <div className="chart-wrapper col-md-12">
                      <div className="chart3">ds</div>
                  </div>
              </div>
          </div>

          <h4>Las Vegas shooting - 2017</h4>
          <div className="container-fluid">
              <div className="row">
                  <div className="chart-wrapper col-md-12">
                      <div className="chart4">dsd</div>
                  </div>
              </div>

              <div className="row">
                  <div className="chart-wrapper col-md-12">
                      <div className="chart5">ds</div>
                  </div>
              </div>

              <div className="row">
                  <div className="chart-wrapper col-md-12">
                      <div className="chart6">dsd</div>
                  </div>
              </div>
          </div>


          <h4>Ghouta - Syria</h4>
          <div className="container-fluid">
              <div className="row">
                  <div className="chart-wrapper col-md-12">
                      <div className="chart7">dsd</div>
                  </div>
              </div>

              <div className="row">
                  <div className="chart-wrapper col-md-12">
                      <div className="chart8">dss</div>
                  </div>
              </div>

              <div className="row">
                  <div className="chart-wrapper col-md-12">
                      <div className="chart9">dsds</div>
                  </div>
              </div>
          </div>

          <h4>Hurricane Maria</h4>
          <div className="container-fluid">
              <div className="row">
                  <div className="chart-wrapper col-md-12">
                      <div className="chart10">dsd</div>
                  </div>
              </div>

              <div className="row">
                  <div className="chart-wrapper col-md-12">
                      <div className="chart11">dss</div>
                  </div>
              </div>

              <div className="row">
                  <div className="chart-wrapper col-md-12">
                      <div className="chart12">dsd</div>
                  </div>
              </div>
          </div>


          <h4>Khan - Syria </h4>
          <div className="container-fluid">
              <div className="row">
                  <div className="chart-wrapper col-md-12">
                      <div className="chart13">dsd</div>
                  </div>
              </div>

              <div className="row">
                  <div className="chart-wrapper col-md-12">
                      <div className="chart14">dsd</div>
                  </div>
              </div>

              <div className="row">
                  <div className="chart-wrapper col-md-12">
                      <div className="chart15">dsds</div>
                  </div>
              </div>
          </div>


          <h4>Tornadoes </h4>
          <div className="container-fluid">
              <div className="row">
                  <div className="chart-wrapper col-md-12">
                      <div className="chart16">dsd</div>
                  </div>
              </div>

              <div className="row">
                  <div className="chart-wrapper col-md-12">
                      <div className="chart17">dsds</div>
                  </div>
              </div>

              <div className="row">
                  <div className="chart-wrapper col-md-12">
                      <div className="chart18">dsds</div>
                  </div>
              </div>
          </div>


          <h4>NSA </h4>
          <div className="container-fluid">
              <div className="row">
                  <div className="chart-wrapper col-md-12">
                      <div className="chart19">dsdsd</div>
                  </div>
              </div>

              <div className="row">
                  <div className="chart-wrapper col-md-12">
                      <div className="chart20">dsds</div>
                  </div>
              </div>

              <div className="row">
                  <div className="chart-wrapper col-md-12">
                      <div className="chart21">dsds</div>
                  </div>
              </div>
          </div>


          <h4>Ransomware </h4>
          <div className="container-fluid">
              <div className="row">
                  <div className="chart-wrapper col-md-12">
                      <div className="chart22">dsds</div>
                  </div>
              </div>

              <div className="row">
                  <div className="chart-wrapper col-md-12">
                      <div className="chart23">ssdsds</div>
                  </div>
              </div>

              <div className="row">
                  <div className="chart-wrapper col-md-12">
                      <div className="chart24">dsdsd</div>
                  </div>
              </div>
          </div>

      </div>
    );
  }
}

export default App