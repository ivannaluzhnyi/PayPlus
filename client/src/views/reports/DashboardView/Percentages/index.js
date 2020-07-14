/* eslint-disable react/prop-types */
import React from 'react';
import clsx from 'clsx';
import {
  Box,
  Card,
  CardHeader,
  Divider,
  Typography,
  makeStyles
} from '@material-ui/core';
import GenericMoreButton from 'src/components/GenericMoreButton';
import Chart from './Chart';

const useStyles = makeStyles(theme => ({
  root: {},
  item: {
    textAlign: 'center',
    flexGrow: 1,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    padding: theme.spacing(3, 2),
    '&:not(:last-of-type)': {
      borderRight: `1px solid ${theme.palette.divider}`
    }
  }
}));

const Percentages = ({ percentages }) => {
  const classes = useStyles();
  return (
    <Card className={clsx(classes.root)}>
      <CardHeader title={percentages.title} />
      <Divider />
      <Box p={3} position="relative" minHeight={320}>
        <Chart data={percentages} />
      </Box>
      <Divider />
      <Box display="flex">
        {percentages.labels.map((label, i) => (
          <div key={label} className={classes.item}>
            <Typography variant="h4" color="textPrimary">
              {percentages.datasets[0].data[i]}%
            </Typography>
            <Typography variant="overline" color="textSecondary">
              {label}
            </Typography>
          </div>
        ))}
      </Box>
    </Card>
  );
};

export default Percentages;
