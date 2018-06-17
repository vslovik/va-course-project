import {csvParseRows, timeParse} from "d3";

export default class WindDirectionCalendar
{
    get(response) {
        let rows = csvParseRows(response.responseText);

        let key, dt, t, angle, speed;
        let calendar = {};
        rows.forEach(function(row){

            [t, angle, speed] = row;

            dt = WindDirectionCalendar.parseMeasureDate(t);
            if(null === dt) {
                console.log('Invalid date: ' + t)
            }

            if(null !== dt) {

                key = WindDirectionCalendar.getDataKey(dt);

                if(!(key in calendar)) {
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

    static getDataKey(dt)
    {
        return [
            dt.getFullYear(),
            dt.getMonth(),
            dt.getDate()
        ].join('-');
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
            console.log('Invalid date: ' + dt);
            return null;
        }

        let key = WindDirectionCalendar.getDataKey(t);

        if (!(key in calendar)) {
            //console.log('Key ' + key + 'not found in wind calendar', 'dt: ', dt, 't: ', t);
            return null;
        }

        let windDir, hour = t.getHours();

        for (let h of Object.keys(calendar[key])) {
            if (hour < h) {
                break;
            } else {
                windDir = calendar[key][h].angle;
            }
        }

        return windDir;
    }

}