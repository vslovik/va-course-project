import circularHeatChart from "./circular.js";
import WindChartData from './data'

export default function windChart(response) {

    const APRIL    = 3,
          AUGUST   = 7,
          DECEMBER = 11;

    let wcd = (new WindChartData());

    new circularHeatChart('td.plot1', [wcd.getData(response, DECEMBER)])
        .setInnerRadius(20)
        .setRange(["white", "steelblue"])
        .setRadialLabels(wcd.getRadialLabels())
        .setSegmentLabels(wcd.getSegmentLabels())
        .draw();
}