import React, { useCallback, useState, useEffect } from 'react';
import {
  Box,
  Container,
  Divider,
  Tab,
  Tabs,
  makeStyles
} from '@material-ui/core';
import { useParams } from 'react-router';
import Page from 'src/components/Page';
import axios from 'src/utils/axios';
import useIsMountedRef from 'src/hooks/useIsMountedRef';
import { CustomerContextProvider } from 'src/context/CustomerContext';
import Header from './Header';
import Details from './Details';
import Invoices from './Transactions';
import Logs from './Logs';

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    paddingTop: theme.spacing(3),
    paddingBottom: theme.spacing(3)
  }
}));

const CustomerDetailsView = () => {
  const classes = useStyles();
  const isMountedRef = useIsMountedRef();
  const [customer, setCustomer] = useState(null);
  const [currentTab, setCurrentTab] = useState('details');

  const params = useParams();

  const tabs = [
    { value: 'details', label: 'Details' },
    { value: 'invoices', label: 'Invoices' },
    { value: 'logs', label: 'Logs' }
  ];

  const handleTabsChange = (event, value) => {
    setCurrentTab(value);
  };

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
      <Page className={classes.root} title="Customer Details">
        <Container maxWidth={false}>
          <Header />
          <Box mt={3}>
            <Tabs
              onChange={handleTabsChange}
              scrollButtons="auto"
              value={currentTab}
              variant="scrollable"
              textColor="secondary"
              className={classes.tabs}
            >
              {tabs.map(tab => (
                <Tab key={tab.value} label={tab.label} value={tab.value} />
              ))}
            </Tabs>
          </Box>
          <Divider />
          <Box mt={3}>
            {currentTab === 'details' && <Details customer={customer} />}
            {currentTab === 'invoices' && <Invoices />}
            {currentTab === 'logs' && <Logs />}
          </Box>
        </Container>
      </Page>
    </CustomerContextProvider>
  );
};

export default CustomerDetailsView;
