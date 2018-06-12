import {csvParseRows, select, timeParse} from "d3";
import Data from "./data"
import ChartSenMon from "./chart-sen-mon"
import ChartSen from "./chart-sen"
import {APRIL, AUGUST, DECEMBER} from './../constants'

export default function scatterChart(response) {

    let rows = csvParseRows(response.responseText);

    // let dataset = getData(rows, 'SenMonChe');
    // let dd = dataset[1][3][1]; // 7, 11

    let dataset = (new Data()).getData(rows, 'SenMon');

    new ChartSenMon('.plot-apr', dataset[1][APRIL]);
    new ChartSenMon('.plot-aug', dataset[1][AUGUST]);
    new ChartSenMon('.plot-dec', dataset[1][DECEMBER]);

    new ChartSenMon('.plot-stat', dataset[1][DECEMBER]);// ToDo

    for(let i = 0; i < 9; i++) {
        new ChartSen('.plot' + (i + 1), dataset[i + 1]);
    }
}