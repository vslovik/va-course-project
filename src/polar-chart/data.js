import {csvParseRows, timeParse} from "d3";

export default class Data {

    static parseMeasureDate(t) {
        let parser;

        if (t.length === '2016/01/01'.length) {
            parser = timeParse("%Y/%m/%d");
            return parser(t);
        }

        if (t.length === "2016/04/01 08:00:00".length) {
            parser = timeParse("%Y/%m/%d %H:%M:%S");
            return parser(t);
        }

        return null;
    }

    static getData(response) {
        let data = [];

        let rows = csvParseRows(response.responseText);

        //Date,"Wind Direction","Wind Speed (m/s)"
        let t, dt, angle, speed, max = 0.0;

        rows.forEach(function (row) {
            let _;
            [_, _, speed] = row;
            speed = parseFloat(speed.replace(',', '.'));
            if (max < speed) {
                max = speed;
            }
        });

        rows.forEach(function (row) {
            [t, angle, speed] = row;

            angle = parseFloat(angle.replace(',', '.'));
            speed = parseFloat(speed.replace(',', '.'));

            dt = Data.parseMeasureDate(t); // use for filtering by time

            data.push([Math.PI * angle / 180, speed / max])
        });

        return data;
    }
}