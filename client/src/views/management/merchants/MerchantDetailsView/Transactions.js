import React, { useState, useEffect, useCallback } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import clsx from 'clsx';
import moment from 'moment';
import PropTypes from 'prop-types';
import PerfectScrollbar from 'react-perfect-scrollbar';
import {
  Box,
  Card,
  CardHeader,
  Divider,
  IconButton,
  SvgIcon,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  makeStyles
} from '@material-ui/core';
import { ArrowRight as ArrowRightIcon } from 'react-feather';
import axios from 'src/utils/axios';
import useIsMountedRef from 'src/hooks/useIsMountedRef';
import Label from 'src/components/Label';
import GenericMoreButton from 'src/components/GenericMoreButton';
import useMerchant from 'src/hooks/useMerchant';

import Results from '../../transactions/TransactionsListView/Results';

const statusColors = {
  paid: 'success',
  pending: 'warning',
  rejected: 'error'
};

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

// product:
// description: "Les couvertures de survie sont utilisées en situation d'urgence pour diminuer les pertes de chaleur ainsi que pour ses propriétés imperméables contre l'humidité et le vent"
// name: "Couverture de survie"
// path_image: "../images/couverture_survie.jpg"
// price: 12
// states: "Disponible"
// __v: 0
// _id: "5f04c290958d885358297e9a"
// __proto__: Object
// qte: 1
