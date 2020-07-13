/* eslint-disable react/prop-types */
import React from 'react';
import Chart from 'react-apexcharts';
import moment from 'moment';
import { Card, CardContent, Typography, useTheme } from '@material-ui/core';

const AreaChart = ({ areaSats }) => {
  const theme = useTheme();

  const data = {
    options: {
      chart: {
        background: theme.palette.background.paper,
        toolbar: {
          show: false
        }
      },
      colors: ['#13affe', '#fbab49'],
      dataLabels: {
        enabled: false
      },
      grid: {
        borderColor: theme.palette.divider,
        yaxis: {
          lines: {
            show: false
          }
        }
      },
      legend: {
        show: true,
        labels: {
          colors: theme.palette.text.secondary
        }
      },
      plotOptions: {
        bar: {
          columnWidth: '40%'
        }
      },
      stroke: {
        show: true,
        width: 2,
        colors: ['transparent']
      },
      theme: {
        mode: theme.palette.type
      },
      tooltip: {
        theme: theme.palette.type
      },
      xaxis: {
        axisBorder: {
          show: true,
          color: theme.palette.divider
        },
        axisTicks: {
          show: true,
          color: theme.palette.divider
        },
        categories: areaSats.dates.map(dtStr =>
          moment(dtStr).format('DD/MM/YYYY')
        ),
        labels: {
          style: {
            colors: theme.palette.text.secondary
          }
        }
      },
      yaxis: {
        axisBorder: {
          show: true,
          color: theme.palette.divider
        },
        axisTicks: {
          show: true,
          color: theme.palette.divider
        },
        labels: {
          style: {
            colors: theme.palette.text.secondary
          }
        }
      }
    },
    series: [
      {
        name: 'Transaction effectué',
        data: areaSats.transactionPerformed
      },
      {
        name: 'Remoursement',
        data: areaSats.refunds
      }
    ]
  };

  return (
    <Card>
      <CardContent>
        <Typography variant="h4" color="textPrimary">
          Transactions
        </Typography>
        <Chart
          options={data.options}
          series={data.series}
          type="bar"
          height="300"
        />
      </CardContent>
    </Card>
  );
};

export default AreaChart;
