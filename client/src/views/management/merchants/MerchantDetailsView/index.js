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
import { useSelector } from 'react-redux';
import { MerchantContextProvider } from 'src/context/MerchantContext';
import { ROLE, MERCHANT_STATUS } from 'src/constants';
import { Alert } from '@material-ui/lab';
import Header from './Header';
import Details from './Details';
// import Transactions from './Transactions';
import Credentials from './Credentials';
// import Logs from './Logs';
import Users from './Users';

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    paddingTop: theme.spacing(3),
    paddingBottom: theme.spacing(3)
  }
}));

const checkMerchantData = marchent => {
  if (marchent.state === MERCHANT_STATUS.PENDING) {
    if (marchent.url_cancel === null || marchent.url_confirmation === null)
      // eslint-disable-next-line nonblock-statement-body-position
      return (
        <Alert severity="warning">
          Veuillez compéter toutes les informations pour que votre site marchand
          puisse être validé.
        </Alert>
      );
    return (
      <Alert severity="info">
        Votre site marchand est en attente de validation par un admin.
      </Alert>
    );
  }

  return null;
};

const MerchantDetailsView = () => {
  const classes = useStyles();
  const isMountedRef = useIsMountedRef();
  const [merchant, setMerchant] = useState(null);
  const [currentTab, setCurrentTab] = useState('details');

  const params = useParams();

  const { user } = useSelector(state => state.account);

  const tabs = [
    { value: 'details', label: 'Details' },
    { value: 'credentials', label: 'Credentials' },
    { value: 'users', label: 'Utilisateurs' }
  ];

  const handleTabsChange = (event, value) => {
    setCurrentTab(value);
  };

  const getMerchant = useCallback(() => {
    axios.get(`/api/merchants/${params.merchantId}`).then(response => {
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
          {user.role === ROLE.MERCHANT && checkMerchantData(merchant)}
          <Divider />
          <Box mt={3}>
            {currentTab === 'details' && <Details user={user} />}
            {currentTab === 'credentials' && <Credentials />}
            {currentTab === 'users' && <Users />}
          </Box>
        </Container>
      </Page>
    </MerchantContextProvider>
  );
};

export default MerchantDetailsView;
