import {max, radialLine, scaleLinear, scaleSqrt, select, selectAll} from "d3";
import MultiChartData from "./data";
import {ORANGE, RED, BLUE, GREEN} from './../constants'
import {APP, CHL, MET, AGO} from './../constants'
import {sensors, factories} from './../constants'
/**
 *
 * @see https://spin.atomicobject.com/2015/06/12/objects-around-svg-circle-d3-js/
 */
export default class MultiChart {
    constructor(selector, data, winddata, chemical = null, month = null) {

        this.chemical = chemical;
        this.month    = month;

        const colorMap = {};

        colorMap[AGO] = ORANGE;
        colorMap[APP] = RED;
        colorMap[CHL] = BLUE;
        colorMap[MET] = GREEN;

        this.colorMap =  colorMap;

        this.data     = data;
        this.winddata = winddata;

        this.width  = 500 * 97/62;
        this.height = 500;

        this.svg = select(selector)
            .append("svg")
            .attr('class', 'multi_chart')
            .attr("width", this.width)
            .attr("height",this.height);

        this.circleRadius = 45;

        this.createScales()
            .pointFactories()
            .drawCircles()
            .drawPoints();

        this.connectFactory(factories[0]);

    }

    createScales() {

        this.xScale = scaleLinear()
            .domain([42, 139]) //97
            .range([0, this.width]);

        this.yScale = scaleLinear()
            .domain([-7, 55]) //62
            .range([this.height, 0]);

        return this;
    }

    connectFactory(fentry) {

        let [x, y] = fentry;

        let chart = this;

        selectAll("text.sensor-factory").remove();
        sensors.forEach(function(entry) {

            chart.drawSensorFactory(entry, fentry);

            let [centerX, centerY] = entry;

            chart.svg.append("line")
                .style("stroke", "#eee")
                .attr("x1", chart.xScale(parseFloat(x)))
                .attr("y1", chart.yScale(parseFloat(y)))
                .attr("x2", chart.xScale(parseFloat(centerX)))
                .attr("y2", chart.yScale(parseFloat(centerY)));
        });
    }

    drawSensorFactory(sensorCoors, factoryCoors){

        let chart = this;

        let [x, y, name]       = factoryCoors;
        let [centerX, centerY] = sensorCoors;

        let sX = chart.xScale(parseFloat(centerX));
        let sY = chart.yScale(parseFloat(centerY));

        let sx = chart.xScale(parseFloat(x));
        let sy = chart.yScale(parseFloat(y));

        let tan    = (sY - sy)/(sX - sx);

        let halfPi = (x > centerX) ? Math.PI/2 : (-Math.PI/2);

        let xx = sX + chart.circleRadius * Math.sin(Math.atan(tan) + halfPi);
        let yy = sY - chart.circleRadius * Math.cos(Math.atan(tan) + halfPi);

        chart.svg.append("circle")
            .attr("cx", xx)
            .attr("cy", yy)
            .attr("r", 1)
            .attr("fill", "black");

        chart.svg.append("text")
            .attr('class', 'sensor-factory')
            .style("font-size", '6px')
            .attr('color', 'grey')
            .attr('x', xx + 4)
            .attr('y', yy + 4)
            .text(name);
    }

    pointFactories() {
        let chart = this;

        this.svg.selectAll(".circle")
            .data(factories)
            .enter().append("circle")
            .attr("cx", function(d){return chart.xScale(d[0])})
            .attr("cy", function(d){return chart.yScale(d[1])})
            .attr("r", 4)
            .attr("fill", "black")
            .attr("fill-opacity", "0.8")
            .on("click", function(d) {

                selectAll("line").remove();
                chart.connectFactory(d);
            });

        this.svg.selectAll(".factory-labels")
            .data(factories)
            .enter()
            .append("text")
            .attr('color', 'grey')
            .attr('x', function(d){return chart.xScale(d[0]) + 8})
            .attr('y', function(d){return chart.yScale(d[1]) + 4})
            .text((d)=> d[2]);

        return this;
    }

    drawCircles(){

        let chart = this;

        this.svg.selectAll(".circle")
            .data(sensors)
            .enter().append("circle")
            .attr("cx", function(d){return chart.xScale(d[0])})
            .attr("cy", function(d){return chart.yScale(d[1])})
            .attr("r", chart.circleRadius)
            .attr("fill", "white")
            .attr("fill-opacity", "0.9");

        this.svg.selectAll(".circle")
            .data(sensors)
            .enter().append("circle")
            .attr("cx", function(d){return chart.xScale(d[0])})
            .attr("cy", function(d){return chart.yScale(d[1])})
            .attr("r", 10)
            // .style("stroke", 'grey')
            .style("fill", "none");
            // .style("stroke-width", '2px');

        this.svg.selectAll(".sensor-labels")
            .data(sensors)
            .enter()
            .append("text")
            .attr('color', 'grey')
            .attr('x', function(d){return chart.xScale(d[0]) - 4})
            .attr('y', function(d){return chart.yScale(d[1]) + 4})
            .text((d, i)=> i + 1);

        return this;
    }

    drawPoints() {

        let data = MultiChartData.getData(this.data, this.winddata);

        const r = scaleLinear()
            .domain([0, 1.])
            .range([10, 43]); //ToDo remove magic constant

        const line = radialLine()
            .radius(function(d) { return r(d[1]); })
            .angle(function(d) { return d[0]; });

        let chart = this;

        let aScale = scaleSqrt()
            .domain([0, 0.8])
            .range([0, 2]);

        sensors.forEach(function (entry, i) {

            chart.svg.selectAll("point")
                .data(data[i + 1])
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

                    let [centerX, centerY] = entry;
                    let [x, y] = coors.split(',');

                    x = parseFloat(x) + chart.xScale(parseFloat(centerX));
                    y = parseFloat(y) + chart.yScale(parseFloat(centerY));

                    if(!x || !y)
                        console.log(d);

                    if(isNaN(x) || isNaN(y))
                        return null;

                    return "translate(" + x + ',' + y + ")"
                })
                .attr("r", function (d) {return aScale(d[1])})
                .attr("fill", function (d) {
                    return chart.colorMap[d[2]];
                })
        });

        return this;
    }
}