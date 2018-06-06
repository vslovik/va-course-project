import {radialLine, scaleLinear, select, timeParse, range,scaleOrdinal, max, scaleBand} from "d3";
/**
 *
 * @see https://spin.atomicobject.com/2015/06/12/objects-around-svg-circle-d3-js/
 */
export default class MultiChart {
    constructor(selector, data) {

        this.data    = data;

        this.centers = [
            [62, 21],
            [66, 35],
            [76, 41],
            [88, 45],
            [103, 43],
            [102, 22],
            [89, 3],
            [74, 7],
            [119, 42]
        ];

        this.svg = select(selector)
            .append("svg")
            .attr("width", 1000)
            .attr("height", 800);

        this.createScales().drawCircles().drawPoints();
    }

    createScales() {
        const w = 80;
        const h = 100;

        this.xScale = scaleLinear()
            .domain([50, 130])
            .range([0, 800 - 2*w]);

        this.yScale = scaleLinear()
            .domain([0,50])
            .range([h, 800 - h]);

        this.drawCircles().drawPoints();

        return this;
    }

    drawCircles(){
        // var rect_type3 =svg.selectAll(".rect3")
        //     .data(data3)
        //     .enter().append("rect")
        //     .attr("x", function(d){return xxScale(d[0])})
        //     .attr("y", function(d){return yyScale(d[1])})
        //     .attr("width", w)
        //     .attr("height", h)
        //     .attr("fill", "pink")
        //     .attr("fill-opacity", "0.9")
        //     .attr("class", "rect2")

        let chart = this;

        this.svg.selectAll(".circle")
            .data(this.centers)
            .enter().append("circle")
            .attr("cx", function(d){return chart.xScale(d[0])})
            .attr("cy", function(d){return chart.yScale(d[1])})
            .attr("r", 50)
            .attr("fill", "pink")
            .attr("fill-opacity", "0.9");

        this.svg.selectAll(".circle")
            .data(this.centers)
            .enter().append("circle")
            .attr("cx", function(d){return chart.xScale(d[0])})
            .attr("cy", function(d){return chart.yScale(d[1])})
            .attr("r", 60)
            .attr("fill", "pink")
            .attr("fill-opacity", "0.9");

        return this;
    }

    drawPoints()
    {
        const chairWidth = 20;

        // var circles2 =svg.selectAll(".rect3")
        //     .data(data3)
        //     .enter().append("rect")
        //     .attr("x", function(d){return xxScale(d[0]) + ((outerCircleRadius) * Math.sin(0)) - (chairWidth/2)})
        //     .attr("y", function(d){return yyScale(d[1]) - ((outerCircleRadius) * Math.cos(0)) - (chairWidth/2)})
        //     .attr("width", 20)
        //     .attr("height", 20)
        //     .attr("fill", "black")
        //     .attr("stroke", "blue")
        //     .attr("class", "rect2")

        const width  = 200,
            height = 150,
            radius = Math.min(width, height) / 2 - 30;

        const r = scaleLinear()
            .domain([0, .5])
            .range([0, radius]);

        const line = radialLine()
            .radius(function(d) { return r(d[1]); })
            .angle(function(d) { return -d[0] + Math.PI / 2; });

        let chart = this;

        this.centers.forEach(function(entry) {
            chart.svg.selectAll("point")
                .data(chart.data)
                .enter()
                .append("circle")
                .attr("class", "point")
                .attr("transform", function (d) {

                    const coors = line([d]).slice(1).slice(0, -1);

                    let [centerX, centerY] = entry;

                    centerX = parseFloat(centerX);
                    centerY = parseFloat(centerY);

                    let [x, y] = coors.split(',');

                    x = parseFloat(x) + chart.xScale(centerX) + (chairWidth / 2);
                    y = parseFloat(y) + chart.yScale(centerY) + (chairWidth / 2);

                    return "translate(" + x + ',' + y + ")"
                })
                .attr("r", 2)
                .attr("fill", function (d, i) {
                    return 'black'//color(i);
                });
        });

        return this;
    }
}