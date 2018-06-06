import Data from './data'
import Chart from './chart'
import {csvParseRows} from "d3";

class SensorData
{
    constructor(response) {
        let rows = csvParseRows(response.responseText);
        console.log(rows);
    }

}

export default function polarChart(response)
{
    new SensorData(response);

    new Chart("td.plot1", Data.getData(response));
}