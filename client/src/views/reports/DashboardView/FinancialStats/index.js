import React from 'react';
import clsx from 'clsx';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { Box, Card, CardHeader, Divider, makeStyles } from '@material-ui/core';
import Chart from './Chart';

const useStyles = makeStyles(() => ({
  root: {},
  chart: {
    height: 400
  }
}));

const FinancialStats = ({ data }) => {
  const classes = useStyles();

  return (
    <Card className={clsx(classes.root)}>
      <CardHeader title="Financial Stats" />
      <Divider />
      <PerfectScrollbar>
        <Box minWidth={700} pt={4} pr={2} pl={2}>
          <Chart className={classes.chart} {...data} />
        </Box>
      </PerfectScrollbar>
    </Card>
  );
};

export default FinancialStats;
