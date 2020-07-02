import React, { useState, useCallback, useEffect } from 'react';
import { makeStyles, Container, Box } from '@material-ui/core';
import useIsMountedRef from 'src/hooks/useIsMountedRef';
import axios from 'src/utils/axios';
import Page from 'src/components/Page';

import Results from './Results';
import Header from './Header';

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    paddingTop: theme.spacing(3),
    paddingBottom: theme.spacing(3)
  }
}));

const UserListView = () => {
  const classes = useStyles();
  const isMountedRef = useIsMountedRef();
  const [users, setUsers] = useState(null);

  const getUsers = useCallback(() => {
    axios.get('/api/users').then(response => {
      if (isMountedRef.current) {
        setUsers(response.data.users);
      }
    });
  }, [isMountedRef]);

  useEffect(() => {
    getUsers();
  }, [getUsers]);

  if (!users) {
    return null;
  }

  return (
    <Page className={classes.root} title="Liste des utilisateurs">
      <Container maxWidth={false}>
        <Header />
        {users && (
          <Box mt={3}>
            <Results users={users} />
          </Box>
        )}
      </Container>
    </Page>
  );
};

export default UserListView;
