import {csvParseRows, radialLine, scaleLinear, select, timeParse, range, cloudshapes, scaleOrdinal, max, scaleBand} from "d3";
import MultiChartData from './data'
import MultiChart from './chart'

export default function multiGroup(response)
{
    new MultiChart(
        "td.plot1",
        MultiChartData.getWindData(response)
    );
}