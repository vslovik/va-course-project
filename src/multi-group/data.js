import {csvParseRows, timeParse} from "d3";
import WindDirectionCalendar from "../polar-chart/direction";
import {AGO, APP, CHL, MET} from './../constants'

export default class MultiChartData {
    static parseMeasureDate(dt) {
        let parser;

        if (dt.length === '2016/01/01'.length) {
            parser = timeParse("%Y/%m/%d");
            dt = parser(dt)
        }

        if (dt.length === "2016/04/01 08:00:00".length) {
            parser = timeParse("%Y/%m/%d %H:%M:%S");
            dt = parser(dt)
        }

        if(null === dt)
            console.log('Value: "' + dt + '" is not a date');

        return dt;
    }

    static getWindCalendar(winddata) {
        let key, dt, t, angle, speed;
        let calendar = {};
        winddata.forEach(function (row) {

            [t, angle, speed] = row;

            dt = WindDirectionCalendar.parseMeasureDate(t);
            if (null != dt) {

                key = [
                    dt.getFullYear(),
                    dt.getMonth(),
                    dt.getDate()
                ].join('-');

                if (!calendar[key]) {
                    calendar[key] = {};
                }

                calendar[key][dt.getHours()] = {
                    angle: parseFloat(angle.replace(',', '.')),
                    speed: parseFloat(speed.replace(',', '.'))
                };

            }
        });

        return calendar;
    }

    static getData(data, winddata) {

        const chemicals = {
            "AGOC-3A": AGO,
            "Appluimonia": APP,
            "Chlorodinine": CHL,
            "Methylosmolene": MET
        };

        const calendar = MultiChartData.getWindCalendar(winddata);

        let max = 0.0, _;
        data.forEach(function (row) {
            [_, _, _, val] = row;
            val = parseFloat(val.replace(',', '.'));
            if (max < val) {
                max = val;
            }
        });

        let che, sen, dt, val;
        let dataset = [];
        for(let i = 0; i < data.length; i++) {
            [che, sen, dt, val] = data[i];

            sen = parseInt(sen);

            che = chemicals[che];
            val = parseFloat(val.replace(',', '.'));

            let angle = WindDirectionCalendar.getWindDirection(dt, calendar);
            if(null === angle) {
                continue;
            }

            if(!dataset[sen]) {
                dataset[sen] = [];
            }

            let t = WindDirectionCalendar.parseMeasureDate(dt);

            dataset[sen].push([Math.PI * angle / 180, val / max, che, t.getMonth()]);
        }

        return dataset;
    }
}