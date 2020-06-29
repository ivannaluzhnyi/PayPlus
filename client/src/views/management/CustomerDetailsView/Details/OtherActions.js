import React from 'react';
import clsx from 'clsx';
import axios from 'src/utils/axios';
import {
  Box,
  Card,
  CardHeader,
  CardContent,
  Button,
  Divider,
  Typography,
  makeStyles
} from '@material-ui/core';
import NotInterestedIcon from '@material-ui/icons/NotInterested';
import CheckIcon from '@material-ui/icons/Check';
import DeleteIcon from '@material-ui/icons/DeleteOutline';
import { USER_STATUS } from 'src/constants';
import { changeStateCustomer } from 'src/actions/customerActions';
import { useSnackbar } from 'notistack';
import useCustomer from 'src/hooks/useCustomer';

const useStyles = makeStyles(theme => ({
  root: {},
  deleteAction: {
    color: theme.palette.common.white,
    backgroundColor: theme.palette.error.main,
    '&:hover': {
      backgroundColor: theme.palette.error.dark
    }
  },
  actionIcon: {
    marginRight: theme.spacing(1)
  }
}));

const OtherActions = () => {
  const classes = useStyles();
  const { customer, saveCustomer } = useCustomer();
  const { enqueueSnackbar } = useSnackbar();

  const handleCustomerAction = () => {
    const stateToSend =
      customer.state === USER_STATUS.PENDING
        ? USER_STATUS.CONFIRMED
        : USER_STATUS.PENDING;

    axios
      .put(`/api/users/change-user-status/${customer.id}`, {
        state: stateToSend
      })
      .then(response => {
        if (response.status === 200) {
          saveCustomer(response.data[0]);
          enqueueSnackbar('Statut et credentials été changé!', {
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
      <CardHeader title="Autres actions" />
      <Divider />
      <CardContent>
        <Box display="flex" flexDirection="column" alignItems="flex-start">
          <Button onClick={handleCustomerAction}>
            {customer.state === USER_STATUS.PENDING && (
              <>
                <CheckIcon className={classes.actionIcon} />
                Confirmer le client
              </>
            )}
            {customer.state === USER_STATUS.CONFIRMED && (
              <>
                <NotInterestedIcon className={classes.actionIcon} />
                Désactivé le client
              </>
            )}
          </Button>
        </Box>
        <Box mt={1} mb={2}>
          <Typography variant="body2" color="textSecondary">
            Supprimez les données de ce client s'il en fait la demande, sinon
            sachez que ce qui a été supprimé ne pourra jamais être récupéré
          </Typography>
        </Box>
        <Button className={classes.deleteAction}>
          <DeleteIcon className={classes.actionIcon} />
          Supprimer un compte
        </Button>
      </CardContent>
    </Card>
  );
};

export default OtherActions;
