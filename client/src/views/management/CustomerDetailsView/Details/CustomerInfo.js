import React from 'react';
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
import LockOpenIcon from '@material-ui/icons/LockOpenOutlined';
import PersonIcon from '@material-ui/icons/PersonOutline';
import Label from 'src/components/Label';
import useCustomer from 'src/hooks/useCustomer';

const labelColors = {
  CONFIRMED: 'success',
  PENDING: 'warning',
  BANNIE: 'error'
};

const useStyles = makeStyles(theme => ({
  root: {},
  fontWeightMedium: {
    fontWeight: theme.typography.fontWeightMedium
  },
  actionIcon: {
    marginRight: theme.spacing(1)
  }
}));

const CustomerInfo = () => {
  const classes = useStyles();
  const { customer } = useCustomer();

  return (
    <Card className={clsx(classes.root)}>
      <CardHeader title="Informations sur les clients" />
      <Divider />
      <Table>
        <TableBody>
          <TableRow>
            <TableCell className={classes.fontWeightMedium}>Nom</TableCell>
            <TableCell>
              <Typography variant="body2" color="textSecondary">
                {customer.name}
              </Typography>
            </TableCell>
          </TableRow>

          <TableRow>
            <TableCell className={classes.fontWeightMedium}>Statut</TableCell>
            <TableCell>
              <Label color={labelColors[customer.state]}>
                {customer.state}
              </Label>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell className={classes.fontWeightMedium}>Email</TableCell>
            <TableCell>
              <Typography variant="body2" color="textSecondary">
                {customer.email}
              </Typography>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell className={classes.fontWeightMedium}>
              Téléphone
            </TableCell>
            <TableCell>
              <Typography variant="body2" color="textSecondary">
                {customer.phone}
              </Typography>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell className={classes.fontWeightMedium}>Adress</TableCell>
            <TableCell>
              <Typography variant="body2" color="textSecondary">
                {customer.address} {customer.city} {customer.zip_code}
              </Typography>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell className={classes.fontWeightMedium}>Country</TableCell>
            <TableCell>
              <Typography variant="body2" color="textSecondary">
                {customer.country}
              </Typography>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
      <Box p={1} display="flex" flexDirection="column" alignItems="flex-start">
        <Button>
          <PersonIcon className={classes.actionIcon} />
          Login as Customer
        </Button>
      </Box>
    </Card>
  );
};

export default CustomerInfo;
