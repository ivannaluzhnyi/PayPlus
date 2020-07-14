import React from 'react';
import clsx from 'clsx';
import { Bar } from 'react-chartjs-2';
import { fade, makeStyles, useTheme } from '@material-ui/core';

const useStyles = makeStyles(() => ({
  root: {
    position: 'relative'
  }
}));

const Chart = ({
  transactionAmounts,
  dates,
  refundAmounts,
  avaragePriceByTransaction
}) => {
  const classes = useStyles();
  const theme = useTheme();

  const data = {
    datasets: [
      {
        label: 'Moyenne cout par panier',
        backgroundColor: theme.palette.primary.main,
        data: avaragePriceByTransaction,
        barThickness: 12,
        maxBarThickness: 10,
        barPercentage: 0.5,
        categoryPercentage: 0.5
      },
      {
        label: 'Montant de transaction',
        backgroundColor: theme.palette.secondary.main,
        data: transactionAmounts,
        barThickness: 12,
        maxBarThickness: 10,
        barPercentage: 0.5,
        categoryPercentage: 0.5
      },
      {
        label: 'Montant de remboursement',
        backgroundColor: fade(theme.palette.secondary.main, 0.5),
        data: refundAmounts,
        barThickness: 12,
        maxBarThickness: 10,
        barPercentage: 0.5,
        categoryPercentage: 0.5
      }
    ],
    labels: dates
  };

  const options = {
    responsive: true,
    animation: false,
    cornerRadius: 20,
    legend: {
      display: false
    },
    layout: {
      padding: 0
    },
    scales: {
      xAxes: [
        {
          gridLines: {
            display: false,
            drawBorder: false
          },
          ticks: {
            padding: 20,
            fontColor: theme.palette.text.secondary
          }
        }
      ],
      yAxes: [
        {
          gridLines: {
            borderDash: [2],
            borderDashOffset: [2],
            color: theme.palette.divider,
            drawBorder: false,
            zeroLineBorderDash: [2],
            zeroLineBorderDashOffset: [2],
            zeroLineColor: theme.palette.divider
          },
          ticks: {
            padding: 20,
            fontColor: theme.palette.text.secondary,
            beginAtZero: true,
            min: 0,
            maxTicksLimit: 5
            // callback: value => (value > 0 ? `${value}K` : value)
          }
        }
      ]
    },
    tooltips: {
      enabled: true,
      mode: 'index',
      intersect: false,
      caretSize: 10,
      yPadding: 20,
      xPadding: 20,
      borderWidth: 1,
      borderColor: theme.palette.divider,
      backgroundColor: theme.palette.background.dark,
      titleFontColor: theme.palette.text.primary,
      bodyFontColor: theme.palette.text.secondary,
      footerFontColor: theme.palette.text.secondary
      // callbacks: {
      //   title: () => {},
      //   label: tooltipItem => {
      //     let label = `Sales: ${tooltipItem.yLabel}`;

      //     if (tooltipItem.yLabel > 0) {
      //       label += 'K';
      //     }

      //     return label;
      //   }
      // }
    }
  };

  return (
    <div className={clsx(classes.root)}>
      <Bar data={data} options={options} />
    </div>
  );
};

export default Chart;
