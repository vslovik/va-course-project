import {csvParseRows, timeParse} from "d3";

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

    static getWindData(rows)
    {
        //Date,"Wind Direction","Wind Speed (m/s)"
        let dt, angle, speed, max = 0.0,  data = [];

        rows.forEach(function (row) {

            [dt, angle, speed] = row;

            speed = parseFloat(speed.replace(',', '.'));

            if(max < speed) {
                max = speed;
            }
        });

        rows.forEach(function (row) {

            [dt, angle, speed] = row;

            angle = parseFloat(angle.replace(',', '.'));
            speed = parseFloat(speed.replace(',', '.'));
            dt    = MultiChartData.parseMeasureDate(dt);

            if(null !== dt)
                data.push([Math.PI * angle/180, speed/max])
        });

        return data;
    }
}