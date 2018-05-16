import {csvParseRows, radialLine, scaleLinear, select, timeParse, range, cloudshapes, scaleOrdinal, max, scaleBand} from "d3";

export default function multiGroup(response)
{
    let svg = select("td.plot1")
        .append("svg")
        .attr("width", 1000)
        .attr("height", 800);

    let data3 = [
        [229, 633],
        [243, 584],
        [277, 564],
        [319, 549],
        [372, 557],
        [369, 630],
        [323, 696],
        [271, 682]
    ];

    const w = 100;
    const h = 100;

    var xxScale = scaleLinear()
        .domain([200, 400])
        .range([0, 800 - 2*w])

    var yyScale = scaleLinear()
        .domain([500,700])
        .range([0, 800 - 2*h])

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
    
    var circles =svg.selectAll(".circle")
        .data(data3)
        .enter().append("circle")
        .attr("cx", function(d){return xxScale(d[0])})
        .attr("cy", function(d){return yyScale(d[1])})
        .attr("r", 50)
        .attr("fill", "pink")
        .attr("fill-opacity", "0.9")

    const outerCircleRadius = 60
    var chairWidth = 20;

    var circles1 =svg.selectAll(".circle")
        .data(data3)
        .enter().append("circle")
        .attr("cx", function(d){return xxScale(d[0])})
        .attr("cy", function(d){return yyScale(d[1])})
        .attr("r", outerCircleRadius)
        .attr("fill", "pink")
        .attr("fill-opacity", "0.9")

    var circles2 =svg.selectAll(".rect3")
        .data(data3)
        .enter().append("rect")
        .attr("x", function(d){return xxScale(d[0]) + ((outerCircleRadius) * Math.sin(0)) - (chairWidth/2)})
        .attr("y", function(d){return yyScale(d[1]) - ((outerCircleRadius) * Math.cos(0)) - (chairWidth/2)})
        .attr("width", 20)
        .attr("height", 20)
        .attr("fill", "black")
        .attr("stroke", "blue")
        .attr("class", "rect2")

    //https://spin.atomicobject.com/2015/06/12/objects-around-svg-circle-d3-js/
}