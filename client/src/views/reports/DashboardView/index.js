import React, { useState, useCallback, useEffect } from 'react';
import { Container, Grid, makeStyles } from '@material-ui/core';
import axios from 'src/utils/axios';
import Page from 'src/components/Page';
import useIsMountedRef from 'src/hooks/useIsMountedRef';
import CountTransactions from './CountTransactions';
import CountCustomerUser from './CountCustomerUser';
import CountProducts from './CountProducts';
import TodaysMoney from './TodaysMoney';
import Header from './Header';

import FinancialStats from './FinancialStats';
import Percentages from './Percentages';
import { MERCURE_TOPICS } from 'src/constants';
import useMercureSubscriber from 'src/hooks/useMercureSubscriber';
import { Alert } from '@material-ui/lab';

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

  const isMountedRef = useIsMountedRef();
  const [stats, setStats] = useState(null);

  const getStatsMerchant = useCallback(() => {
    axios.get('/api/statistics/dashboard').then(response => {
      if (isMountedRef.current) {
        setStats(response.data);
      }
    });
  }, [isMountedRef]);

  useEffect(() => {
    getStatsMerchant();
  }, [getStatsMerchant]);

  useMercureSubscriber({
    topic: MERCURE_TOPICS.STATS.DASHBOARD,
    callback: passedData => setStats(passedData)
  });

  if (!stats) {
    return null;
  }

  return (
    <Page className={classes.root} title="Dashboard">
      <Container maxWidth={false} className={classes.container}>
        <Header />
        <Grid container spacing={3}>
          <Grid item lg={3} sm={6} xs={12}>
            <TodaysMoney amount={stats.total_transactions_amount} />
          </Grid>
          <Grid item lg={3} sm={6} xs={12}>
            <CountTransactions number={stats.number_transactions} />
          </Grid>
          <Grid item lg={3} sm={6} xs={12}>
            <CountProducts number={stats.number_products} />
          </Grid>
          <Grid item lg={3} sm={6} xs={12}>
            <CountCustomerUser userMerchant={stats.userMerchant} />
          </Grid>

          {stats.number_transactions !== 0 ? (
            <>
              <Grid item lg={8} xl={9} xs={12}>
                <FinancialStats data={stats.financial} />
              </Grid>
              <Grid item lg={4} xl={3} xs={12}>
                <Percentages percentages={stats.percentages} />
              </Grid>{' '}
            </>
          ) : (
            <Alert severity="warning">
              Votre dashboard restera inactif tant que votre compte n'a pas été
              validé par un admin.
            </Alert>
          )}
        </Grid>
      </Container>
    </Page>
  );
};

export default DashboardView;
