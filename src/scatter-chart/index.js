import {csvParseRows, select, timeParse} from "d3";
import Data from "./data"
import ChartSenMon from "./chart-sen-mon"
import ChartSen from "./chart-sen"

export default function scatterChart(response) {

    let rows = csvParseRows(response.responseText);

    // let dataset = getData(rows, 'SenMonChe');
    // let dd = dataset[1][3][1]; // 7, 11

    let dataset = (new Data()).getData(rows, 'SenMon');
    let data = dataset[1][3]; // 7, 11

    new ChartSenMon('.plot-apr', dataset[1][3]);
    new ChartSenMon('.plot-aug', dataset[1][7]);
    new ChartSenMon('.plot-dec', dataset[1][11]);

    new ChartSenMon('.plot-stat', dataset[1][11]);

    for(let i = 0; i < 9; i++) {

        let c = '.plot' + (i + 1);

        new ChartSen(c, dataset[i + 1]);
    }

}