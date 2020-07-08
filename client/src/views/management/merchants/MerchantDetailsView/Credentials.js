import React, { useCallback, useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import Divider from '@material-ui/core/Divider';
import clsx from 'clsx';
import moment from 'moment';
import { useSnackbar } from 'notistack';
import useMerchant from 'src/hooks/useMerchant';
import axios from 'src/utils/axios';
import useIsMountedRef from 'src/hooks/useIsMountedRef';
import Checkbox from '@material-ui/core/Checkbox';
import PerfectScrollbar from 'react-perfect-scrollbar';
import Button from '@material-ui/core/Button';
import { Box } from '@material-ui/core';
import Table from '@material-ui/core/Table';
import CachedIcon from '@material-ui/icons/Cached';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import TableBody from '@material-ui/core/TableBody';
import { MERCHANT_STATUS } from 'src/constants';

import copy from 'copy-to-clipboard';

import truncate from 'lodash/truncate';

const useStyles = makeStyles(theme => ({
  root: {},
  fontWeightMedium: {
    fontWeight: theme.typography.fontWeightMedium
  },
  buttonIcon: {
    marginRight: theme.spacing(1)
  }
}));

const Credentials = () => {
  const classes = useStyles();
  const { enqueueSnackbar } = useSnackbar();
  const isMountedRef = useIsMountedRef();
  const [credentials, setCredentials] = useState([]);
  const [selectedCredentials, setSelectedCredentials] = useState([]);

  const { merchant } = useMerchant();

  const getCredentials = useCallback(() => {
    axios.get(`/api/credentials/merchant/${merchant.id}`).then(response => {
      if (isMountedRef.current) {
        setCredentials(response.data);
      }
    });
  }, [isMountedRef]);

  useEffect(() => {
    getCredentials();
  }, [getCredentials]);

  const handleAddCredential = credential => {
    setCredentials([{ ...credential }, ...credentials]);
  };

  const handleManageCredentials = () => {
    const newCredentials = [];

    credentials.forEach(cr => {
      if (!selectedCredentials.includes(cr.id)) newCredentials.push(cr);
    });

    setCredentials(newCredentials);
  };

  const handleGenerateCredentials = () => {
    axios.get(`/api/credentials/generate/${merchant.id}`).then(response => {
      if (response.status === 200) {
        handleAddCredential(response.data);
        enqueueSnackbar('Credentials été bien généré', {
          variant: 'success'
        });
      } else {
        enqueueSnackbar('Une errur se produit.', {
          variant: 'error'
        });
      }
    });
  };

  const handleRemoveCredentials = () => {
    axios
      .delete('/api/credentials/delete', { data: { ids: selectedCredentials } })
      .then(response => {
        if (response.status === 200) {
          handleManageCredentials();
          enqueueSnackbar('Credentials été bien supprimé', {
            variant: 'success'
          });
        } else {
          enqueueSnackbar('Une errur se produit.', {
            variant: 'error'
          });
        }
      });
  };

  const handleSelectAllCredentials = event => {
    setSelectedCredentials(
      event.target.checked ? credentials.map(credential => credential.id) : []
    );
  };

  const handleSelectOneCredential = (event, credentialId) => {
    if (!selectedCredentials.includes(credentialId)) {
      setSelectedCredentials(prevSelected => [...prevSelected, credentialId]);
    } else {
      setSelectedCredentials(prevSelected =>
        prevSelected.filter(id => id !== credentialId)
      );
    }
  };

  const copieText = text => {
    copy(text);

    enqueueSnackbar('Copié', {
      variant: 'success'
    });
  };

  const enableBulkOperations = selectedCredentials.length > 0;
  const selectedAllCredentials =
    selectedCredentials.length === credentials.length;
  const selectedSomeCredentials =
    selectedCredentials.length > 0 &&
    selectedCredentials.length < credentials.length;

  return (
    <Card className={clsx(classes.root)}>
      <CardHeader
        title="Credentials"
        action={
          <Button
            color="secondary"
            variant="contained"
            disabled={Boolean(
              merchant.state === MERCHANT_STATUS.PENDING ||
                merchant.state === MERCHANT_STATUS.BANNED
            )}
            onClick={handleGenerateCredentials}
          >
            <CachedIcon className={classes.buttonIcon} />
            Régénérer credentials
          </Button>
        }
      />

      <Divider />

      {enableBulkOperations && (
        <div className={classes.bulkOperations}>
          <div className={classes.bulkActions}>
            <Checkbox
              checked={selectedAllCredentials}
              indeterminate={selectedSomeCredentials}
              onChange={handleSelectAllCredentials}
            />
            <Button
              onClick={handleRemoveCredentials}
              variant="outlined"
              className={classes.bulkAction}
            >
              Delete
            </Button>
          </div>
        </div>
      )}

      <PerfectScrollbar>
        <Box minWidth={700}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell padding="checkbox">
                  <Checkbox
                    checked={selectedAllCredentials}
                    indeterminate={selectedSomeCredentials}
                    onChange={handleSelectAllCredentials}
                  />
                </TableCell>
                <TableCell>Secret (client_secret)</TableCell>
                <TableCell>Token (client_token)</TableCell>
                <TableCell align="right">Créé</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {credentials.length !== 0 ? (
                credentials.map(credential => {
                  const isCredentialSelected = selectedCredentials.includes(
                    credential.id
                  );

                  return (
                    <TableRow
                      hover
                      key={credential.id}
                      selected={isCredentialSelected}
                    >
                      <TableCell padding="checkbox">
                        <Checkbox
                          checked={isCredentialSelected}
                          onChange={event =>
                            handleSelectOneCredential(event, credential.id)
                          }
                          value={isCredentialSelected}
                        />
                      </TableCell>

                      <TableCell>
                        {credential.client_secret} |
                        <Button
                          onClick={() => copieText(credential.client_secret)}
                          size="small"
                        >
                          Copier
                        </Button>
                      </TableCell>
                      <TableCell>
                        {truncate(credential.client_token, {
                          length: 50
                        })}{' '}
                        |
                        <Button
                          onClick={() => copieText(credential.client_token)}
                          size="small"
                        >
                          Copier
                        </Button>
                      </TableCell>

                      <TableCell align="right">
                        {moment(merchant.createdAt).format(
                          'YYYY-MM-DD HH:mm:ss'
                        )}
                      </TableCell>
                    </TableRow>
                  );
                })
              ) : (
                <TableRow>
                  <TableCell>{null}</TableCell>
                  <TableCell>Pas de credentials</TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </Box>
      </PerfectScrollbar>
    </Card>
  );
};

export default Credentials;
