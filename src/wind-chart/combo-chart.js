/**
 * https://raw.githubusercontent.com/prcweb/d3-circularheat/master/js/circularHeatChart.js
 *
 * http://prcweb.co.uk/lab/circularheat
 *
 */
import {radialLine} from 'd3'
import CircularHeatChart from "./circular";
import {ORANGE, RED, BLUE, GREEN} from './../constants'
import {APP, CHL, MET, AGO} from './../constants'

export default class ComboChart extends CircularHeatChart {

    constructor(selector, data)
    {
        super(selector, data);

        this.pdata    = null;
        this.chemical = null;
        this.month    = null;

        const colorMap = {};

        colorMap[AGO] = ORANGE;
        colorMap[APP] = RED;
        colorMap[CHL] = BLUE;
        colorMap[MET] = GREEN;

        this.colorMap =  colorMap;
    }

    setPointsData(data) {
        this.pdata = data;

        return this;
    }

    setChemical(chemical) {
        this.chemical = chemical;

        return this;
    }

    setMonth(month) {
        this.month = month;

        return this;
    }

    addPoints() {

        let chart = this;

        const line = radialLine()
            .radius(function (d) {
                return chart.r(d[1]);
            })
            .angle(function (d) {
                return d[0];
            });

        this.svg.append("g")
            .attr("transform", "translate(" + (this.width / 2) + "," + (-15 + this.height / 2) + ")")
            .selectAll("point")
            .data(this.pdata[6]) // ToDo: first sensor here
            .enter()
            .append("circle")
            .filter(function (d) {
                return chart.chemical === null ? true : d[2] === chart.chemical;
            })
            .filter(function (d) {
                return chart.month === null ? true : d[3] === chart.month;
            })
            .attr("class", "point")
            .attr("transform", function (d) {

                const coors = line([d]).slice(1).slice(0, -1);

                let [x, y] = coors.split(',');

                x = parseFloat(x);
                y = parseFloat(y);

                return "translate(" + x + ',' + y + ")"
            })
            .attr("r", 1) // ToDo sqrt scale?
            .attr("fill", function (d) {
                return chart.colorMap[d[2]];
            });

        return this;
    }

}



