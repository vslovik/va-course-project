import React, { Component } from 'react'
import ViewTab from './../toggle/viewtab'
import {VECTORIAL, TEMPORAL} from "../../constants";

export default class Tabs extends Component {
    render = () => (
        <div className="pagehead repohead instapaper_ignore readability-menu experiment-repo-nav">
            <div className="reponav container">
                <span>
                    <ViewTab selected={false} value={VECTORIAL} name="Vectorial View"/>
                    <ViewTab selected={true}  value={TEMPORAL}  name="Temporal View"/>
                </span>
                <h1><b>CHEMICAL POLUTION ASSESMENT</b></h1>
            </div>
        </div>
    )
}