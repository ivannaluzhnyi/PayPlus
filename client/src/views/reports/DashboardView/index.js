import React from 'react';
import { Container, Grid, makeStyles } from '@material-ui/core';
import Page from 'src/components/Page';
import Header from './Header';
import CountTransactions from './CountTransactions';
import PerformanceOverTime from './PerformanceOverTime';
import CountCustomerUser from './CountCustomerUser';
import CountProducts from './CountProducts';
import TodaysMoney from './TodaysMoney';

import FinancialStats from './FinancialStats';
import Percentages from './Percentages';

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    paddingTop: theme.spacing(3),
    paddingBottom: theme.spacing(3)
  },
  container: {
    [theme.breakpoints.up('lg')]: {
      paddingLeft: 64,
      paddingRight: 64
    }
  }
}));

const DashboardView = () => {
  const classes = useStyles();

  const response = {
    total_transactions_amount: 3054.25,
    number_transactions: 143,
    number_products: 52,
    userMerchant: {
      users: 25,
      merchants: 12
    },
    percentages: {
      datasets: [
        {
          data: [56, 24, 20],
          backgroundColor: ['#3d72eb', '#4b9e86', '#b658f5']
        }
      ],
      labels: ['Subscriptions', 'Affiliate', 'Sales'],
      title: 'Title passe'
    },

    financial: {
      transactionAmounts: [23.55],
      refundAmounts: [10],
      avaragePriceByTransaction: [28],
      dates: ['14/07/2020']
    }
  };

  return (
    <Page className={classes.root} title="Dashboard">
      <Container maxWidth={false} className={classes.container}>
        <Header />
        <Grid container spacing={3}>
          <Grid item lg={3} sm={6} xs={12}>
            <TodaysMoney amount={response.total_transactions_amount} />
          </Grid>
          <Grid item lg={3} sm={6} xs={12}>
            <CountTransactions number={response.number_transactions} />
          </Grid>
          <Grid item lg={3} sm={6} xs={12}>
            <CountProducts number={response.number_products} />
          </Grid>
          <Grid item lg={3} sm={6} xs={12}>
            <CountCustomerUser userMerchant={response.userMerchant} />
          </Grid>

          <Grid item lg={8} xl={9} xs={12}>
            <FinancialStats data={response.financial} />
          </Grid>
          <Grid item lg={4} xl={3} xs={12}>
            <Percentages percentages={response.percentages} />
          </Grid>
        </Grid>
      </Container>
    </Page>
  );
};

export default DashboardView;
