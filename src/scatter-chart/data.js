import {timeParse} from "d3";
import {AGO, APP, CHL, MET} from './../constants'
import {WEEKDAY, WEEKEND, DAY, NIGHT} from './../constants';

export default class Data {

    constructor(data)
    {
        this.chemicals = {
            "AGOC-3A": AGO,
            "Appluimonia": APP,
            "Chlorodinine": CHL,
            "Methylosmolene": MET
        };

        this.data = data;
        this.stats = {};

        this.statInit();
    }

    statInit() {
        let stat = {};

        stat[WEEKDAY] = {sum: 0, num: 0};
        stat[WEEKEND] = {sum: 0, num: 0};
        stat[DAY]     = {sum: 0, num: 0};
        stat[NIGHT]   = {sum: 0, num: 0};

        this.stats[AGO] = stat;
        this.stats[APP] = stat;
        this.stats[CHL] = stat;
        this.stats[MET] = stat;
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

    collectChemicalTimeStat(che, val, t) {
        let hours = t.getHours();
        let slot = (hours > 7 && hours < 23) ? DAY : NIGHT;
        this.stats[che][slot]['sum'] += val;
        this.stats[che][slot]['num'] += 1;

        let weekday = t.getDay();
        slot = (weekday === 0 || weekday === 6)? WEEKEND : WEEKDAY;
        this.stats[che][slot]['sum'] += val;
        this.stats[che][slot]['num'] += 1;
    }

    collectStructuredData(row, structure, dataset) {

        let [che, sen, dt, val] = row;

        che = this.chemicals[che];
        sen = parseInt(sen);
        val = parseFloat(val.replace(',', '.'));

        let t = Data.parseMeasureDate(dt);

        this.collectChemicalTimeStat(che, val, t);

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

    getData(structure = 'SenMon') {

        let data = {};

        for (let i = 1; i < this.data.length; i++) {
            this.collectStructuredData(this.data[i], structure, data)
        }

        return data;
    };

    getStats() {
        return this.stats;
    }
}