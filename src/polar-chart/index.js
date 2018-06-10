import Data from './data'
import Chart from './chart'
import WindDirectionCalendar from './direction'
import {csvParseRows, timeParse} from "d3";
import {request} from "d3-request";
import sensorCsv from '../data/ch2/SensorData.csv';

class SensorData {
    constructor(response, calendar) {

        this.response = response;
        this.calendar = calendar;
        this.data     = [];

        const [APP, CHL, MET, AGO] = SensorData.getChemicalsEncoding();

        this.chemicals = {
            "Appluimonia": APP,
            "Chlorodinine": CHL,
            "Methylosmolene": MET,
            "AGOC-3A": AGO
        };
    }

    getData(sensor) {
        let rows = csvParseRows(this.response.responseText);

        let max = 0.0, _;
        rows.forEach(function (row) {
            [_, _, _, val] = row;
            val = parseFloat(val.replace(',', '.'));
            if (max < val) {
                max = val;
            }
        });

        let che, sen, dt, val;
        let data = [];
        for(let i = 0; i < rows.length; i++) {
            [che, sen, dt, val] = rows[i];

            sen = parseInt(sen);

            che = this.chemicals[che];
            val = parseFloat(val.replace(',', '.'));

            let angle = WindDirectionCalendar.getWindDirection(dt, this.calendar);
            if(null === angle) {
                continue;
            }

            if(!data[sen]) {
                data[sen] = [];
            }
            data[sen].push([Math.PI * angle / 180, val / max])
        }

        console.log(data);

        return data[sensor];
    }

    static getChemicalsEncoding() {
        return [1, 2, 3, 4];
    }
}

export default function polarChart(windDataResponse)
{
    request(sensorCsv)
        .mimeType("text/csv")
        .get(function(sensorDataResponse) {

            let sd = (new SensorData(
                sensorDataResponse,
                (new WindDirectionCalendar).get(windDataResponse)
            )).getData(6);

            new Chart(".plot1", sd);
        });
}