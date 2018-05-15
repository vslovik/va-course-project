import {csvParseRows, radialLine, scaleLinear, select, timeParse, range} from "d3";

export default function multiChart(response)
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

    console.log('winData', windData);
    let data = windData;
    let width = 200,
        height = 150,
        radius = Math.min(width, height) / 2 - 30;

    let r = scaleLinear()
        .domain([0, .5])
        .range([0, radius]);

    let line = radialLine()
        .radius(function(d) { return r(d[1]); })
        .angle(function(d) { return -d[0] + Math.PI / 2; });

    let d = [
        [229, 633],
        [243, 584],
        [277, 564],
        [319, 549],
        [372, 557],
        [369, 630],
        [323, 696],
        [271, 682]
    ];

    let svg = select("td.plot1")
        .selectAll("svg")
        .data(d)
        .enter().append("svg")
        .attr("width", width)
        .attr("height", height)
        .append("g")
        .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

    let gr = svg.append("g")
        .attr("class", "r axis")
        .selectAll("g")
        .data(r.ticks(5).slice(1))
        .enter().append("g");

    gr.append("circle")
        .attr("r", r);

    gr.append("text")
        .attr("y", function(d) { return -r(d) - 4; })
        .attr("transform", "rotate(15)")
        .style("text-anchor", "middle")
        .text(function(d) { return d; });

    let ga = svg.append("g")
        .attr("class", "a axis")
        .selectAll("g")
        .data(range(0, 360, 30))
        .enter().append("g")
        .attr("transform", function(d) { return "rotate(" + -d + ")"; });

    ga.append("line")
        .attr("x2", radius);

    ga.append("text")
        .attr("x", radius + 6)
        .attr("dy", ".35em")
        .style("text-anchor", function(d) { return d < 270 && d > 90 ? "end" : null; })
        .attr("transform", function(d) { return d < 270 && d > 90 ? "rotate(180 " + (radius + 6) + ",0)" : null; })
        .text(function(d) { return d + "°"; });

    // svg.append("path")
    //     .datum(data)
    //     .attr("class", "line")
    //     .attr("d", line);

    svg.selectAll("point")
        .data(data)
        .enter()
        .append("circle")
        .attr("class", "point")
        .attr("transform", function(d) {
            let coors = line([d]).slice(1).slice(0, -1);
            return "translate(" + coors + ")"
        })
        .attr("r", 2)
        .attr("fill",function(d,i){
            return 'black'//color(i);
        });
}