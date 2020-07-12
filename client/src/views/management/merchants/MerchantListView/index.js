import React, { useState, useEffect, useCallback } from 'react';
import { Box, Container, makeStyles } from '@material-ui/core';
import axios from 'src/utils/axios';
import Page from 'src/components/Page';
import useIsMountedRef from 'src/hooks/useIsMountedRef';
import Header from './Header';
import Results from './Results';

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    paddingTop: theme.spacing(3),
    paddingBottom: theme.spacing(3)
  }
}));

const MerchantListView = () => {
  const classes = useStyles();
  const isMountedRef = useIsMountedRef();
  const [merchants, setMerchants] = useState(null);

  const getMerchants = useCallback(() => {
    axios.get('/api/merchants').then(response => {
      if (isMountedRef.current) {
        setMerchants(response.data.merchants);
      }
    });
  }, [isMountedRef]);

  const handleSetMerchant = merchand => {
    setMerchants([merchand, ...merchants]);
  };

  useEffect(() => {
    getMerchants();
  }, [getMerchants]);

  if (!merchants) {
    return null;
  }

  return (
    <Page className={classes.root} title="Liste des clients">
      <Container maxWidth={false}>
        <Header handleSetMerchant={handleSetMerchant} />
        {merchants && (
          <Box mt={3}>
            <Results merchants={merchants} />
          </Box>
        )}
      </Container>
    </Page>
  );
};

export default MerchantListView;
