import * as echarts from 'echarts';
import { useEffect } from 'react';

const Home = () => {
    useEffect(() => {
        const chartdom = document.getElementById('main')
        const myChart = echarts.init(chartdom)

        var option;

        option = {
            xAxis: {
                type: 'category',
                data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
            },
            yAxis: {
                type: 'value'
            },
            series: [
                {
                    data: [120, 200, 150, 80, 70, 110, 130],
                    type: 'bar'
                }
            ]
        };

        option && myChart.setOption(option);
    }, [])
    return <div><div id='main' style={{ width: '500px', height: '500px' }}></div></div>
}

export default Home