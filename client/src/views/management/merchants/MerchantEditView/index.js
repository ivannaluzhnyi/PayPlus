import React, { useState, useCallback, useEffect } from 'react';
import { Box, Container, makeStyles } from '@material-ui/core';
import { useParams, useLocation } from 'react-router';
import axios from 'src/utils/axios';
import Page from 'src/components/Page';
import useIsMountedRef from 'src/hooks/useIsMountedRef';
import { MerchantContextProvider } from 'src/context/MerchantContext';
import Tabs from '@material-ui/core/Tabs';
import Divider from '@material-ui/core/Divider';
import Tab from '@material-ui/core/Tab';
import Header from './Header';
import MerchantEditForm from './MerchantEditForm';
import PaymentInfo from './PaymentInfo';

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    paddingTop: theme.spacing(3),
    paddingBottom: theme.spacing(3)
  }
}));

const tabs = [
  { value: 'general', label: 'General' },
  { value: 'payment-info', label: 'Infos de paiement' }
];

const MerchantEditView = () => {
  const classes = useStyles();
  const isMountedRef = useIsMountedRef();
  const [currentTab, setCurrentTab] = useState('general');
  const [merchant, setMerchant] = useState(null);

  const location = useLocation();
  const params = useParams();

  const getMerchant = useCallback(() => {
    axios.get(`/api/merchants/${params.merchantId}`).then(response => {
      if (isMountedRef.current) {
        setMerchant(response.data);
      }
    });
  }, [isMountedRef]);

  useEffect(() => {
    if (location.state && location.state.merchant) {
      setMerchant(location.state.merchant);
    } else {
      getMerchant();
    }
  }, [getMerchant]);

  if (!merchant) {
    return null;
  }

  const handleTabsChange = (event, value) => {
    setCurrentTab(value);
  };

  return (
    <MerchantContextProvider value={{ saveMerchant: setMerchant, merchant }}>
      <Page className={classes.root} title="Édition du marchend">
        <Container maxWidth="lg">
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
            {currentTab === 'general' && <MerchantEditForm />}
            {currentTab === 'payment-info' && <PaymentInfo />}
          </Box>
        </Container>
      </Page>
    </MerchantContextProvider>
  );
};

export default MerchantEditView;
