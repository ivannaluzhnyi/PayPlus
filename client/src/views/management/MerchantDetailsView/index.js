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
import { MerchantContextProvider } from 'src/context/MerchantContext';
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

const MerchantDetailsView = () => {
  const classes = useStyles();
  const isMountedRef = useIsMountedRef();
  const [merchant, setMerchant] = useState(null);
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

  console.log('merchantId => ', params.merchantId);

  const getMerchant = useCallback(() => {
    axios.get(`/api/merchants/${params.merchantId}`).then(response => {
      console.log('response => ', response);
      if (isMountedRef.current) {
        setMerchant(response.data);
      }
    });
  }, [isMountedRef]);

  useEffect(() => {
    getMerchant();
  }, [getMerchant]);

  if (!merchant) {
    return null;
  }

  return (
    <MerchantContextProvider value={{ saveMerchant: setMerchant, merchant }}>
      <Page className={classes.root} title="Détails sur les commerçants">
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
            {currentTab === 'details' && <Details />}
            {/* {currentTab === 'invoices' && <Invoices />} */}
            {currentTab === 'logs' && <Logs />}
          </Box>
        </Container>
      </Page>
    </MerchantContextProvider>
  );
};

export default MerchantDetailsView;
