/**
 * https://raw.githubusercontent.com/prcweb/d3-circularheat/master/js/circularHeatChart.js
 *
 * http://prcweb.co.uk/lab/circularheat
 *
 */
import {radialLine, scaleLinear} from 'd3'
import CircularHeatChart from "./circular";
import {ORANGE, RED, BLUE, GREEN} from './../constants'
import {APP, CHL, MET, AGO} from './../constants'
import {sensors, factories} from './../constants'

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

    init() {
        this
            .createSegments()
            .addAngleLabels()
            .addRadialLabels()
            .addWindRadialLabels()
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

    setSensor(sensor) {
        this.sensor = sensor;

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
            .data(this.pdata[this.sensor])
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

                if(isNaN(x) || isNaN(y)) {
                    console.log(d);
                    return null;
                }

                return "translate(" + x + ',' + y + ")";

            })
            .attr("r", function () {return 2.0})
            .attr("fill", function (d) {
                return chart.colorMap[d[2]];
            });

        return this;
    }

    drawSensorFactory(){
        let chart = this;

        const xScale = scaleLinear()
            .domain([42, 139]) //97
            .range([- this.width / 2, this.width / 2]);

        const yScale = scaleLinear()
            .domain([-7, 55]) //62
            .range([15 - this.height / 2, -15 + this.height / 2]);

        const line = radialLine()
            .radius(function (d) {
                return d[1];
            })
            .angle(function (d) {
                return d[0];
            });

        let radius = chart.innerRadius + 7 * chart.segmentHeight;

        let fpoints = [];

        factories.forEach(function(factory){

            let [x, y, name] = factory;
            let [centerX, centerY] = sensors[chart.sensor - 1];

            let sX = xScale(parseFloat(centerX));
            let sY = yScale(parseFloat(centerY));

            let sx = xScale(parseFloat(x));
            let sy = yScale(parseFloat(y));

            let tan = (sY - sy) / (sX - sx);

            let angle = 180 * Math.atan(tan)/Math.PI;

            let azimuth;
            if(sx > sX) {
                azimuth = 90 - angle;
            } else {
                azimuth = 270 - angle;
            }

            fpoints.push([Math.PI * azimuth / 180, radius, name]);

        });

        this.svg.append("g")
            .attr("transform", "translate(" + (this.width / 2) + "," + (-15 + this.height / 2) + ")")
            .selectAll("point")
            .data(fpoints) // ToDo: first sensor here
            .enter()
            .append("circle")
            .attr("class", "point")
            .attr("transform", function (d) {

                const coors = line([d]).slice(1).slice(0, -1);

                let [x, y] = coors.split(',');

                x = parseFloat(x);
                y = parseFloat(y);

                if(isNaN(x) || isNaN(y)) {
                    console.log(d);
                    return null;
                }

                return "translate(" + x + ',' + y + ")";

            })
            .attr("r", 1)
            .attr("fill", 'black');

        this.svg.append("g")
            .attr("transform", "translate(" + (this.width / 2) + "," + (-15 + this.height / 2) + ")")
            .selectAll("point")
            .data(fpoints) // ToDo: first sensor here
            .enter()
            .append("text")
            .attr("class", "point")
            .attr("transform", function (d) {

                const coors = line([d]).slice(1).slice(0, -1);

                let [x, y] = coors.split(',');

                x = parseFloat(x);
                y = parseFloat(y);

                if(isNaN(x) || isNaN(y)) {
                    return null;
                }

                return "translate(" + (x + 4) + ',' + (y + 8) + ")";

            })
            .attr('color', 'grey')
            .style("font-size", '6px')
            .text(function(d){return d[2]});

        return this;
    }
}



