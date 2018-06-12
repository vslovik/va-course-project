import {timeParse} from "d3";
import {AGO, APP, CHL, MET} from './../constants'

export default class Data {

    constructor()
    {
        this.chemicals = {
            "Appluimonia": APP,
            "Chlorodinine": CHL,
            "Methylosmolene": MET,
            "AGOC-3A": AGO
        };
    }

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

        if (null === dt)
            console.log('Value: "' + dt + '" is not a date');

        return dt;
    }

    collectStructuredData(row, structure, dataset) {

        let [che, sen, dt, val] = row;

        che = this.chemicals[che];
        sen = parseInt(sen);
        val = parseFloat(val.replace(',', '.'));

        let t = Data.parseMeasureDate(dt);

        let mon = t.getMonth();

        if (structure === 'SenMon') {
            if (dataset[sen]) {
                if (dataset[sen][mon]) {
                    dataset[sen][mon].push({
                        val: val,
                        t: t,
                        che: che
                    })
                } else {
                    dataset[sen][mon] = [];
                }
            } else {
                dataset[sen] = {};
            }
        } else {
            if (dataset[sen]) {
                if (dataset[sen][che]) {
                    if (dataset[sen][che][mon]) {
                        dataset[sen][che][mon].push({
                            val: val,
                            t: t,
                            che: che
                        })
                    } else {
                        dataset[sen][che][mon] = [];
                    }
                } else {
                    dataset[sen][che] = {};
                }
            } else {
                dataset[sen] = {};
            }
        }
    }

    getData(rows, structure = 'SenMon') {

        let data = {};

        for (let i = 1; i < rows.length; i++) {
            this.collectStructuredData(rows[i], structure, data)
        }

        return data;
    };
}