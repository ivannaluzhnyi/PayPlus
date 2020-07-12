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

  const getTransactions = useCallback(merchantsId => {
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

  console.log('TEST  => ', deviseDate.getTime() === transactionDate.getTime());

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

// client_first_name: "John"
// client_last_name: "Deckard"
// delivery_address: "242 Rue du Faubourg Saint-Antoine"
// delivery_city: "Paris"
// delivery_country: "France"
// delivery_zip_code: "75012"
// id: 49
//     merchant: {id: 1, name: "Lygge", country: "France", city: "Paris 16", address: "36 RUE CLAUDE TERRASSE", …}
//     operations: Array(1)
//         0:
//         amount: null
//         createdAt: "2020-07-11T22:58:08.305Z"
//         id: 98
//         state: "CREATED"
//         transaction_id: 49
//         type: null
//         updatedAt: "2020-07-11T22:58:08.305Z"
//         __proto__: Object
//         length: 1
//         __proto__: Array(0)
//         order_amount: "12"
//         products: Array(1)
//     0:
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
