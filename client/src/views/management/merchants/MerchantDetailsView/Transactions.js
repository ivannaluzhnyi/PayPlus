import React, { useState, useEffect, useCallback } from 'react';
import clsx from 'clsx';

import { Box, Card, CardHeader, makeStyles } from '@material-ui/core';
import axios from 'src/utils/axios';
import useIsMountedRef from 'src/hooks/useIsMountedRef';
import GenericMoreButton from 'src/components/GenericMoreButton';
import useMerchant from 'src/hooks/useMerchant';

import Results from '../../transactions/TransactionsListView/Results';

const useStyles = makeStyles(() => ({
  root: {}
}));

const Transactions = () => {
  const classes = useStyles();
  const isMountedRef = useIsMountedRef();
  const [transactions, setTransactions] = useState(null);

  const { merchant } = useMerchant();

  const getTransactions = useCallback(() => {
    axios
      .post('/api/transactions/mongo', { merchantsId: [merchant.id] })
      .then(response => {
        setTransactions(response.data);
      });
  }, [isMountedRef]);

  useEffect(() => {
    getTransactions();
  }, [getTransactions]);

  if (!setTransactions) {
    return null;
  }

  return (
    <div className={clsx(classes.root)}>
      <Card>
        <CardHeader action={<GenericMoreButton />} title="Les transactions" />

        {transactions && (
          <Box mt={3}>
            <Results transactions={transactions} />
          </Box>
        )}
      </Card>
    </div>
  );
};

export default Transactions;
