import circularHeatChart from "./circular.js";
import {select} from 'd3'

export default function windChart(response) {

    // const data = [1, 2, 3, 4, 2, 3, 4, 5, 3, 4, 5, 6, 4, 5, 6, 7];
    // const chart = circularHeatChart().innerRadius(100).numSegments(4).range(["white", "red"]);
    // select('td.plot1')
    //     .selectAll('svg')
    //     .data([data])
    //     .enter()
    //     .append('svg')
    //     .call(chart);

    /* Random data */
    let data = [];
    for(let i=0; i<168; i++) data[i] = Math.random();

    let chart = circularHeatChart()
        .innerRadius(20)
        .range(["white", "steelblue"])
        .radialLabels(["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"])
        .segmentLabels(["Midnight", "1am", "2am", "3am", "4am", "5am", "6am", "7am", "8am", "9am", "10am",
            "11am", "Midday", "1pm", "2pm", "3pm", "4pm", "5pm", "6pm", "7pm", "8pm", "9pm", "10pm", "11pm"]);

    select('td.plot1')
        .selectAll('svg')
        .data([data])
        .enter()
        .append('svg')
        .call(chart);

}