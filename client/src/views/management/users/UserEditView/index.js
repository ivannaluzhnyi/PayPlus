import React, { useCallback, useState, useEffect } from 'react';
import { useParams, useLocation } from 'react-router';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import axios from 'src/utils/axios';
import useIsMountedRef from 'src/hooks/useIsMountedRef';

import Page from 'src/components/Page';
import Container from '@material-ui/core/Container';

import General from './General';
import Emails from './Emails';
import Header from './Header';
import { Box } from '@material-ui/core';

const useStyles = makeStyles(() => ({
  root: {}
}));

const UserEditView = () => {
  const classes = useStyles();
  const isMountedRef = useIsMountedRef();
  const [user, setUser] = useState(null);
  const params = useParams();
  const location = useLocation();

  const getUser = useCallback(() => {
    axios.get(`/api/users/${params.userId}`).then(response => {
      if (isMountedRef.current) {
        setUser(response.data);
      }
    });
  }, [isMountedRef]);

  useEffect(() => {
    if (location.state.user) {
      setUser(location.state.user);
    } else {
      getUser();
    }
  }, [getUser]);

  if (!user) {
    return null;
  }

  return (
    <Page className={classes.root} title="Modification d'utilisateur">
      <Container>
        <Header />
        <Box mt={3}>
          <Grid className={classes.root} container spacing={3}>
            <Grid item lg={4} md={6} xl={3} xs={12}>
              <General user={user} />
            </Grid>
            <Grid item lg={4} md={6} xl={3} xs={12}>
              <Emails user={user} />
            </Grid>
          </Grid>
        </Box>
      </Container>
    </Page>
  );
};

export default UserEditView;
