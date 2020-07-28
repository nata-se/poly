import React, { useRef, useEffect } from "react";
import { createChart } from "lightweight-charts";
import ReactResizeDetector from 'react-resize-detector';

let chart

const TickerChart = () => {
  const chartRef = useRef(null);
  const chartContainerRef = useRef(null)

  console.log('=================')  

  useEffect(() => {
    console.log('useEffect')
    chart = createChart(chartRef.current, {
        width: chartContainerRef.current.clientWidth,
        height: 300,
      })
  
      const lineSeries = chart.addLineSeries()
  
      lineSeries.setData([
        { time: '2019-04-11', value: 80.01 },
        { time: '2019-04-12', value: 96.63 },
        { time: '2019-04-13', value: 76.64 },
        { time: '2019-04-14', value: 81.89 },
        { time: '2019-04-15', value: 74.43 },
        { time: '2019-04-16', value: 80.01 },
        { time: '2019-04-17', value: 96.63 },
        { time: '2019-04-18', value: 76.64 },
        { time: '2019-04-19', value: 81.89 },
        { time: '2019-04-20', value: 74.43 },
      ])
  }, []);

  function onChartResize (width, height) {
      console.log('width', width)
      console.log('chart', chart)
      if (chart) {
        chart.resize(width, 300)
      }
  }

  return (
    <div className="box">
        <ReactResizeDetector handleWidth handleHeight onResize={onChartResize}>
            <div className="ticker-chart-container" ref={chartContainerRef}>
                <div className="ticker-chart" ref={chartRef}>
                {/* {({ width, height }) => <div>{`${width}x${height}`}</div>} */}
                </div>
            </div>
        </ReactResizeDetector>;
    </div>
  );
};

export default TickerChart;
