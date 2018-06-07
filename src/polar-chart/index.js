import Data from './data'
import Chart from './chart'
import {csvParseRows, timeParse} from "d3";

class SensorData
{
    constructor(response) {
        let calendar = this.getCalendar(response);
        console.log(calendar)
    }

    getCalendar(response) {
        let rows = csvParseRows(response.responseText);

        let key, dt, t, angle, speed;
        let calendar = {};
        rows.forEach(function(row){

            [t, angle, speed] = row;

            dt = SensorData.parseMeasureDate(t);
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

export default function polarChart(response)
{
    new SensorData(response);

    new Chart("td.plot1", Data.getData(response));
}