import {csvParseRows, timeParse} from "d3";
import Data from "./data"
import Chart from "./chart"

export default function scatterChart(response) {

    let rows = csvParseRows(response.responseText);

    // let dataset = getData(rows, 'SenMonChe');
    // let dd = dataset[1][3][1]; // 7, 11

    let dataset = (new Data()).getData(rows, 'SenMon');
    let data = dataset[1][3]; // 7, 11

    new Chart('td.plot1', data);
}