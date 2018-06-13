import {csvParseRows, timeParse} from "d3";
import sensorCsv from '../data/SensorData.csv';

export default class WindDirectionCalendar
{
    get(response) {
        let rows = csvParseRows(response.responseText);

        let key, dt, t, angle, speed;
        let calendar = {};
        rows.forEach(function(row){

            [t, angle, speed] = row;

            dt = WindDirectionCalendar.parseMeasureDate(t);
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

    static getWindDirection(dt, calendar) {

        let t = WindDirectionCalendar.parseMeasureDate(dt);

        if(null === t) {
            return null;
        }

        let key = [
            t.getFullYear(),
            t.getMonth(),
            t.getDate()
        ].join('-');

        let hour = t.getHours();
        if (calendar[key]) {

            let windDir;

            for (let h of Object.keys(calendar[key])) {
                if (hour < h) {
                    break;
                } else {
                    windDir = calendar[key][h].angle;
                }
            }

            return windDir;
        }

        console.log('Key ' + key + ' missing in calendar');

        return null;
    }

}