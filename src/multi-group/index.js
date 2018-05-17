import {csvParseRows, radialLine, scaleLinear, select, timeParse, range, cloudshapes, scaleOrdinal, max, scaleBand} from "d3";

export default function multiGroup(response)
{
    let windData = [];

    //Date,"Wind Direction","Wind Speed (m/s)"
    let dt, angle, speed, max = 0.0;

    let rows = csvParseRows(response.responseText);
    for (let i = 1; i < rows.length; i++) {

        angle = parseFloat(rows[i][1].replace(',', '.'));
        speed = parseFloat(rows[i][2].replace(',', '.'));
        if(max < speed) {
            max = speed;
        }

        let parseDateTime;

        if(rows[i][0].length === '2016/01/01'.length){
            parseDateTime = timeParse("%Y/%m/%d");
            dt = parseDateTime(rows[i][0]);
        } else if(rows[i][0].length === "2016/04/01 08:00:00".length) {
            parseDateTime = timeParse("%Y/%m/%d %H:%M:%S");
            dt = parseDateTime(rows[i][0]);
        } else {
            console.log('Value: "' + rows[i][0] + '" is not a date')
            continue
        }

        if(null === dt) {
            console.log('DateTime parse error' + rows[i][0])
        }

        windData.push([Math.PI * angle/180, speed/max])
    }

    let data = windData;
    let width = 200,
        height = 150,
        radius = Math.min(width, height) / 2 - 30;

    let r = scaleLinear()
        .domain([0, .5])
        .range([0, radius]);

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

    let line = radialLine()
        .radius(function(d) { return r(d[1]); })
        .angle(function(d) { return -d[0] + Math.PI / 2; });

    let svg = select("td.plot1")
        .append("svg")
        .attr("width", 1000)
        .attr("height", 800);



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
    const chairWidth = 20;

    let circles1 =svg.selectAll(".circle")
        .data(data3)
        .enter().append("circle")
        .attr("cx", function(d){return xxScale(d[0])})
        .attr("cy", function(d){return yyScale(d[1])})
        .attr("r", outerCircleRadius)
        .attr("fill", "pink")
        .attr("fill-opacity", "0.9")

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

    svg.selectAll("point")
        .data(data)
        .enter()
        .append("circle")
        .attr("class", "point")
        .attr("transform", function(d) {

            const coors = line([d]).slice(1).slice(0, -1);

            const centerX = parseFloat(data3[0][0]);
            const centerY = parseFloat(data3[0][1]);

            const [xx, yy] = coors.split(',');

            const x = parseFloat(xx) + xxScale(centerX) + (chairWidth/2);
            const y = parseFloat(yy) + yyScale(centerY) + (chairWidth/2);

            return "translate(" + x + ',' + y + ")"
        })
        .attr("r", 2)
        .attr("fill",function(d,i){
            return 'black'//color(i);
        });


    // https://spin.atomicobject.com/2015/06/12/objects-around-svg-circle-d3-js/
}