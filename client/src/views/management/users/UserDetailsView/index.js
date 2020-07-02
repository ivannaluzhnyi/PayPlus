import React, { useCallback, useEffect, useState } from 'react';
import Divider from '@material-ui/core/Divider';
import Container from '@material-ui/core/Container';
import Page from 'src/components/Page';

import { makeStyles } from '@material-ui/core/styles';
import { Box, TableRow } from '@material-ui/core';
import axios from 'src/utils/axios';
import useIsMountedRef from 'src/hooks/useIsMountedRef';
import { useParams } from 'react-router';
import moment from 'moment';

import CardHeader from '@material-ui/core/CardHeader';
import Card from '@material-ui/core/Card';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableHead from '@material-ui/core/TableHead';
import TableCell from '@material-ui/core/TableCell';

import { labelColorsUserRole } from 'src/constants';
import Label from 'src/components/Label';

import Header from './Header';

import Results from '../../merchants/MerchantListView/Results';

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    paddingTop: theme.spacing(3),
    paddingBottom: theme.spacing(3)
  }
}));

const UserDetailsView = () => {
  const classes = useStyles();
  const isMountedRef = useIsMountedRef();
  const [user, setUser] = useState(null);

  const params = useParams();

  const getUser = useCallback(() => {
    axios.get(`/api/users/merchants/${params.userId}`).then(response => {
      if (isMountedRef.current) {
        setUser(response.data);
      }
    });
  }, [isMountedRef]);

  useEffect(() => {
    getUser();
  }, [getUser]);

  if (!user) {
    return null;
  }

  return (
    <Page className={classes.root} title="Paramètres">
      <Container maxWidth="lg">
        <Header />

        <Divider />
        <Box mt={3}>
          <Card>
            <CardHeader title="Utilisateur" />
            <Divider />
            <Box minWidth={1150}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Nom</TableCell>
                    <TableCell>email</TableCell>
                    <TableCell>Role</TableCell>
                    <TableCell>Téléphone</TableCell>
                    <TableCell>Création</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow>
                    <TableCell>
                      {user.first_name} {user.last_name}
                    </TableCell>

                    <TableCell>{user.email}</TableCell>
                    <TableCell>
                      <Label color={labelColorsUserRole[user.role]}>
                        {user.role}
                      </Label>
                    </TableCell>
                    <TableCell>{user.phone}</TableCell>
                    <TableCell>
                      {moment(user.createdAt).format('YYYY-MM-DD HH:mm:ss')}
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </Box>
          </Card>
        </Box>

        <Box mt={3}>
          <Results merchants={user.merchants} />
        </Box>
      </Container>
    </Page>
  );
};

export default UserDetailsView;
