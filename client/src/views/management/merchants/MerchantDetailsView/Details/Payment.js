import React from 'react';
import clsx from 'clsx';
import {
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
import useMerchant from 'src/hooks/useMerchant';

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
  const { merchant } = useMerchant();

  return (
    <Card className={clsx(classes.root)}>
      <CardHeader title="Paiement" />
      <Divider />
      <Table>
        <TableBody>
          <TableRow>
            <TableCell className={classes.fontWeightMedium}>Devise</TableCell>
            <TableCell>
              <Typography variant="body2" color="textSecondary">
                {merchant.devise}
              </Typography>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell className={classes.fontWeightMedium}>
              URL de confirmation
            </TableCell>
            <TableCell>
              <Typography variant="body2" color="textSecondary">
                {merchant.url_confirmation}
              </Typography>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell className={classes.fontWeightMedium}>
              URL d'annulation
            </TableCell>
            <TableCell>
              <Typography variant="body2" color="textSecondary">
                {merchant.url_cancel}
              </Typography>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </Card>
  );
};

export default Payment;
