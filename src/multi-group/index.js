import MultiChartData from './data'
import MultiChart from './chart'

export default function multiGroup(response)
{
    new MultiChart(
        ".plot1",
        MultiChartData.getWindData(response)
    );
}