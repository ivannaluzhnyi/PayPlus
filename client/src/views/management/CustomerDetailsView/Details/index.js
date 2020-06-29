import React from 'react';
import clsx from 'clsx';
import { Grid, makeStyles } from '@material-ui/core';
import CustomerInfo from './CustomerInfo';
import Emails from './Emails';
import Invoices from './Payment';
import OtherActions from './OtherActions';

const useStyles = makeStyles(() => ({
  root: {}
}));

const Details = () => {
  const classes = useStyles();

  return (
    <Grid className={clsx(classes.root)} container spacing={3}>
      <Grid item lg={4} md={6} xl={3} xs={12}>
        <CustomerInfo />
      </Grid>
      <Grid item lg={4} md={6} xl={3} xs={12}>
        <Invoices />
      </Grid>
      <Grid item lg={4} md={6} xl={3} xs={12}>
        <Emails />
      </Grid>
      <Grid item lg={4} md={6} xl={3} xs={12}>
        <OtherActions />
      </Grid>
    </Grid>
  );
};

export default Details;
