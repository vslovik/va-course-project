import Data from './data'
import Chart from './chart'

export default function polarChart(response)
{
    new Chart("td.plot1", Data.getData(response));
}