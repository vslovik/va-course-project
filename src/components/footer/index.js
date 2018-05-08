import React, { Component } from 'react'

export default class Footer extends Component {
    render = () => (
        <div className="footer container-lg px-3" role="contentinfo">
            <div className="position-relative d-flex flex-justify-between pt-6 pb-2 mt-6 f6 text-gray border-top border-gray-light ">
                <ul className="list-style-none d-flex flex-wrap ">
                    <li className="mr-3">2018 <span title="0.36115s from unicorn-3796505407-t64mb">Valeriya Slovikovskaya</span></li>
                    <li className="mr-3"><a href="/">Link 1</a></li>
                    <li className="mr-3"><a href="/">Link 2</a></li>
                    <li className="mr-3"><a href="/">Link 3</a></li>
                </ul>
            </div>
            <div className="d-flex flex-justify-center pb-6">
                <span className="f6 text-gray-light"/>
            </div>
        </div>
    )
}