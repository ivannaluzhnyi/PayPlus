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
import { MERCHANT_STATUS } from 'src/constants';
import { useSnackbar } from 'notistack';
import useMerchant from 'src/hooks/useMerchant';

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
  const { merchant, saveMerchant } = useMerchant();
  const { enqueueSnackbar } = useSnackbar();

  const handleCustomerAction = () => {
    const stateToSend =
      merchant.state === MERCHANT_STATUS.PENDING ||
      merchant.state === MERCHANT_STATUS.DISABLED
        ? MERCHANT_STATUS.CONFIRMED
        : MERCHANT_STATUS.DISABLED;

    axios
      .put(`/api/merchants/change-state/${merchant.id}`, {
        state: stateToSend
      })
      .then(response => {
        if (response.status === 200) {
          saveMerchant(response.data[0]);
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
            {(merchant.state === MERCHANT_STATUS.PENDING ||
              merchant.state === MERCHANT_STATUS.DISABLED) && (
              <>
                <CheckIcon className={classes.actionIcon} />
                Confirmer marchand
              </>
            )}
            {merchant.state === MERCHANT_STATUS.CONFIRMED && (
              <>
                <NotInterestedIcon className={classes.actionIcon} />
                Désactivé marchand
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
        <Button disabled className={classes.deleteAction}>
          <DeleteIcon className={classes.actionIcon} />
          Supprimer marchend
        </Button>
      </CardContent>
    </Card>
  );
};

export default OtherActions;
