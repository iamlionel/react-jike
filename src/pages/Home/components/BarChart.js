import * as echarts from 'echarts';
import { useEffect, useRef } from 'react';

const BarChart = ({ title }) => {
    const chartRef = useRef(null)
    useEffect(() => {
        const chartdom = chartRef.current
        const myChart = echarts.init(chartdom)

        var option;

        option = {
            title: {
                text: title
            },
            xAxis: {
                type: 'category',
                data: ['Vue', 'React', 'Angular']
            },
            yAxis: {
                type: 'value'
            },
            series: [
                {
                    data: [10, 40, 70],
                    type: 'bar'
                }
            ]
        };

        option && myChart.setOption(option);
    }, [])
    return <div ref={chartRef} style={{ width: '500px', height: '400px' }}></div>
}

export default BarChart