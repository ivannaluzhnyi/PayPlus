import React from 'react';
import axios from 'src/utils/axios';
import { useSnackbar } from 'notistack';
import clsx from 'clsx';
import {
  Box,
  Button,
  Card,
  CardHeader,
  Divider,
  Table,
  TableBody,
  TableCell,
  TableRow,
  Typography,
  makeStyles
} from '@material-ui/core';
import CachedIcon from '@material-ui/icons/Cached';
import useCustomer from 'src/hooks/useCustomer';
import { MERCHANT_STATUS } from 'src/constants';
import { Alert } from '@material-ui/lab';

const useStyles = makeStyles(theme => ({
  root: {},
  fontWeightMedium: {
    fontWeight: theme.typography.fontWeightMedium
  },
  buttonIcon: {
    marginRight: theme.spacing(1)
  }
}));

const Payment = () => {
  const classes = useStyles();
  const { enqueueSnackbar } = useSnackbar();
  const { customer, saveCustomer } = useCustomer();

  const handleGenerateCredentials = () => {
    axios
      .get(`/api/users/generate-credentials/${customer.id}`)
      .then(response => {
        if (response.status === 200) {
          saveCustomer(response.data[0]);
          enqueueSnackbar('Credentials été bien régénéré', {
            variant: 'success'
          });
        } else {
          enqueueSnackbar('Une errur se produit.', {
            variant: 'error'
          });
        }
      });
  };

  return (
    <Card className={clsx(classes.root)}>
      <CardHeader title="Paiement/Credentials" />
      <Divider />
      <Table>
        <TableBody>
          <TableRow>
            <TableCell className={classes.fontWeightMedium}>Devise</TableCell>
            <TableCell>
              <Typography variant="body2" color="textSecondary">
                {customer.devise}
              </Typography>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell className={classes.fontWeightMedium}>
              Secret de client
            </TableCell>
            <TableCell>
              <Typography variant="body2" color="textSecondary">
                {customer.client_secret}
              </Typography>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell className={classes.fontWeightMedium}>
              Token client
            </TableCell>
            <TableCell>
              <Typography variant="body2" color="textSecondary">
                {customer.client_token}
              </Typography>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell className={classes.fontWeightMedium}>
              URL de confirmation
            </TableCell>
            <TableCell>
              <Typography variant="body2" color="textSecondary">
                {customer.url_confirmation}
              </Typography>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell className={classes.fontWeightMedium}>
              URL d'annulation
            </TableCell>
            <TableCell>
              <Typography variant="body2" color="textSecondary">
                {customer.url_cancel}
              </Typography>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
      <Box p={1} display="flex" flexDirection="column" alignItems="flex-start">
        <Button
          disabled={Boolean(
            customer.state === MERCHANT_STATUS.PENDING ||
              customer.state === MERCHANT_STATUS.BANNED
          )}
          onClick={handleGenerateCredentials}
        >
          <CachedIcon className={classes.buttonIcon} />
          Régénérer credentials
        </Button>
      </Box>
    </Card>
  );
};

export default Payment;
