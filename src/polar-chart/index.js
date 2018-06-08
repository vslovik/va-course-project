import Data from './data'
import Chart from './chart'
import WindDirectionCalendar from './direction'
import {csvParseRows, timeParse} from "d3";
import {request} from "d3-request";
import sensorCsv from '../data/ch2/SensorData.csv';

class SensorData {
    constructor(response, calendar) {

        let rows = csvParseRows(response.responseText);

        let che, sen, dt, val;

        let t, key, hour;
        let data = [];
        for(let i = 0; i < rows.length; i++) {
            [che, sen, dt, val] = rows[i];

            t = WindDirectionCalendar.parseMeasureDate(dt);

            if(null === t) {
                continue;
            }

            let windDir = WindDirectionCalendar.getWindDirection(t, calendar);

            if(null === windDir) {
                continue;
            }
        }

        console.log(data);
    }
}

export default function polarChart(windDataResponse)
{
    request(sensorCsv)
        .mimeType("text/csv")
        .get(function(sensorDataResponse) {

            new SensorData(sensorDataResponse, (new WindDirectionCalendar).get(windDataResponse));

            // new Chart("td.plot1", sd);
        });


}