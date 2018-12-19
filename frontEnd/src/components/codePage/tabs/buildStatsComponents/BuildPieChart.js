import React from 'react';
import {Pie as PieChart} from 'react-chartjs-2';

function chartData(chartDataObject) {
  return { 
    labels:['No Build','With build','CI Build'],
    datasets: [{
      data: chartDataObject,
      backgroundColor: [
        '#FF6384',
        '#FFCE56',
        '#00FF00', 
      ],
      hoverBackgroundColor: [
        '#FF6384',
        '#FFCE56',
        '#00FF00', 
      ]
    }]
  }
}

const options = {
  scaleShowGridLines: true,
  scaleGridLineColor: 'rgba(0,0,0,.05)',
  scaleGridLineWidth: 1,
  scaleShowHorizontalLines: true,
  scaleShowVerticalLines: true,
  bezierCurve: true,
  bezierCurveTension: 0.4,
  pointDot: true,
  pointDotRadius: 4,
  pointDotStrokeWidth: 1,
  pointHitDetectionRadius: 20,
  datasetStroke: true,
  datasetStrokeWidth: 2,
  datasetFill: true,
  }

class BuildPieChart extends React.Component {

  render() {
    return (
      <div>
        <PieChart data={chartData(this.props.chartData)}
          options={options} height={50}/>
      </div>
    )
  }
}

export default BuildPieChart;