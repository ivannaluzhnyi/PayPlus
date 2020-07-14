/* eslint-disable react/prop-types */
import React from 'react';
import Chart from 'react-apexcharts';
import { Card, CardContent, useTheme } from '@material-ui/core';

const RadialChart = ({ radialStat }) => {
  const theme = useTheme();

  const data = {
    options: {
      chart: {
        background: theme.palette.background.paper,
        stacked: false,
        toolbar: {
          show: false
        },
        zoom: false
      },
      colors: ['#27c6db'],
      labels: ['Transations validés'],
      plotOptions: {
        radialBar: {
          hollow: {
            size: '60%'
          },
          dataLabels: {
            name: {
              fontFamily: theme.typography.fontFamily,
              color: theme.palette.text.primary
            },
            value: {
              color: theme.palette.text.secondary
            }
          },
          track: {
            background: theme.palette.background.dark
          }
        }
      },
      theme: {
        mode: theme.palette.type
      }
    },
    series: [radialStat.value]
  };

  return (
    <Card>
      <CardContent>
        <Chart
          options={data.options}
          series={data.series}
          type="radialBar"
          height="300"
        />
      </CardContent>
    </Card>
  );
};

export default RadialChart;
