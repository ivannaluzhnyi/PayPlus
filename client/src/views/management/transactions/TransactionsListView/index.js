import React, { useState, useCallback } from 'react';
import axios from 'src/utils/axios';
import { makeStyles, Container, Box } from '@material-ui/core';
import Page from 'src/components/Page';

import Header from './Header';
import Search from './Search';
import Results from './Results';

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    paddingTop: theme.spacing(3),
    paddingBottom: theme.spacing(3)
  }
}));

const TransactionsListView = () => {
  const classes = useStyles();
  const [transactions, setTransactions] = useState(null);

  const getTransactions = useCallback(({ merchantsId }) => {
    axios.post('/api/transactions/mongo', { merchantsId }).then(response => {
      setTransactions(response.data);
    });
  }, []);

  const creDevise = '2020-07-12T16:57:06.127Z';
  const creaTrans = '2020-07-12T16:58:21.120Z';

  const deviseDate = new Date(creDevise);
  deviseDate.setHours(0, 0, 0, 0);

  const transactionDate = new Date(creaTrans);
  transactionDate.setHours(0, 0, 0, 0);

  return (
    <Page className={classes.root} title="Liste des transactions">
      <Container maxWidth={false}>
        <Header />

        <Search getTransactions={getTransactions} />
        {transactions && (
          <Box mt={3}>
            <Results transactions={transactions} />
          </Box>
        )}
      </Container>
    </Page>
  );
};

export default TransactionsListView;
