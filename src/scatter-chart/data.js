import {timeParse} from "d3";

export default class Data {

    constructor()
    {
        const [APP, CHL, MET, AGO] = Data.getChemicalsEncoding();

        this.chemicals = {
            "Appluimonia": APP,
            "Chlorodinine": CHL,
            "Methylosmolene": MET,
            "AGOC-3A": AGO
        };
    }

    static getChemicalsEncoding() {
        return [1, 2, 3, 4];
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
                if (dataset[sen][mon]) {
                    if (dataset[sen][mon][che]) {
                        dataset[sen][mon][che].push({
                            val: val,
                            t: t,
                            che: che
                        })
                    } else {
                        dataset[sen][mon][che] = [];
                    }
                } else {
                    dataset[sen][mon] = {};
                }
            } else {
                dataset[sen] = {};
            }
        }
    }

    getData(rows, structure = 'SenMonChe') {

        let data = {};

        for (let i = 1; i < rows.length; i++) {
            this.collectStructuredData(rows[i], structure, data)
        }

        return data;
    };
}