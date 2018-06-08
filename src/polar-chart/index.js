import Data from './data'
import Chart from './chart'
import {csvParseRows, timeParse} from "d3";
import {request} from "d3-request";
import sensorCsv from '../data/ch2/SensorData.csv';

class WindData
{
    getCalendar(response) {
        let rows = csvParseRows(response.responseText);

        let key, dt, t, angle, speed;
        let calendar = {};
        rows.forEach(function(row){

            [t, angle, speed] = row;

            dt = WindData.parseMeasureDate(t);
            if(null != dt) {

                key = [
                    dt.getFullYear(),
                    dt.getMonth(),
                    dt.getDate()
                ].join('-');

                if(!calendar[key]) {
                    calendar[key] = {};
                }

                calendar[key][dt.getHours()] = {
                    angle: parseFloat(angle.replace(',','.')),
                    speed: parseFloat(speed.replace(',','.'))
                };

            }
        });

        return calendar;
    }

    static parseMeasureDate(dt) {
        let parser;

        if (dt.length === '2016/01/01'.length) {
            parser = timeParse("%Y/%m/%d");
            return parser(dt)
        }

        if (dt.length === "2016/04/01 08:00:00".length) {
            parser = timeParse("%Y/%m/%d %H:%M:%S");
            return parser(dt)
        }

        return null;
    }

}

class SensorData {
    constructor(response, calendar) {

        let rows = csvParseRows(response.responseText);

        // console.log('rows', rows);
        console.log('calendar', calendar);

        let che, sen, dt, val, t;

        forEach(function(row) {
            [che, sen, dt, val] = row;
            t = WindData.parseMeasureDate(dt)
        });
    }
}

export default function polarChart(windDataResponse)
{
    request(sensorCsv)
        .mimeType("text/csv")
        .get(function(sensorDataResponse) {

            new SensorData(sensorDataResponse, (new WindData).getCalendar(windDataResponse));

            // new Chart("td.plot1", sd);
        });


}