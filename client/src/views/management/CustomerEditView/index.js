import React, { useState, useCallback, useEffect } from 'react';
import { Box, Container, makeStyles } from '@material-ui/core';
import { useParams } from 'react-router';
import axios from 'src/utils/axios';
import Page from 'src/components/Page';
import useIsMountedRef from 'src/hooks/useIsMountedRef';
import { CustomerContextProvider } from 'src/context/CustomerContext';
import CustomerEditForm from './CustomerEditForm';
import Header from './Header';

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    paddingTop: theme.spacing(3),
    paddingBottom: theme.spacing(3)
  }
}));

const CustomerEditView = () => {
  const classes = useStyles();
  const isMountedRef = useIsMountedRef();
  const [customer, setCustomer] = useState();

  const params = useParams();

  console.log('customer => ', customer);

  const getCustomer = useCallback(() => {
    axios.get(`/api/users/${params.customerId}`).then(response => {
      if (isMountedRef.current) {
        setCustomer(response.data);
      }
    });
  }, [isMountedRef]);

  useEffect(() => {
    getCustomer();
  }, [getCustomer]);

  if (!customer) {
    return null;
  }

  return (
    <CustomerContextProvider value={{ saveCustomer: setCustomer, customer }}>
      <Page className={classes.root} title="Édition client">
        <Container maxWidth="lg">
          <Header />
          <Box mt={3}>
            <CustomerEditForm />
          </Box>
        </Container>
      </Page>
    </CustomerContextProvider>
  );
};

export default CustomerEditView;
