import WindDirectionCalendar from "../wind-chart/direction";
import {AGO, APP, CHL, MET} from './../constants'

export default class MultiChartData {

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

            let azimuth = WindDirectionCalendar.getWindDirection(dt, calendar);
            if(isNaN(azimuth) || !azimuth) {
                continue;
            }

            if(!dataset[sen]) {
                dataset[sen] = [];
            }

            let t = WindDirectionCalendar.parseMeasureDate(dt);

            dataset[sen].push([Math.PI * azimuth / 180, val / max, che, t.getMonth()]);
        }

        return dataset;
    }
}