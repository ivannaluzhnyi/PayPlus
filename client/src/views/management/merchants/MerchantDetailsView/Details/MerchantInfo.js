import React from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
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
import PersonIcon from '@material-ui/icons/PersonOutline';
import Label from 'src/components/Label';
import useMerchant from 'src/hooks/useMerchant';
import { ROLE } from 'src/constants';

const labelColors = {
  CONFIRMED: 'success',
  PENDING: 'warning',
  BANNIE: 'error',
  DISABLED: 'error'
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

const MerchantInfo = ({ user }) => {
  const classes = useStyles();
  const { merchant } = useMerchant();

  return (
    <Card className={clsx(classes.root)}>
      <CardHeader title="Informations sur le marchand" />
      <Divider />
      <Table>
        <TableBody>
          <TableRow>
            <TableCell className={classes.fontWeightMedium}>Nom</TableCell>
            <TableCell>
              <Typography variant="body2" color="textSecondary">
                {merchant.name}
              </Typography>
            </TableCell>
          </TableRow>

          <TableRow>
            <TableCell className={classes.fontWeightMedium}>Statut</TableCell>
            <TableCell>
              <Label color={labelColors[merchant.state]}>
                {merchant.state}
              </Label>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell className={classes.fontWeightMedium}>Adress</TableCell>
            <TableCell>
              <Typography variant="body2" color="textSecondary">
                {merchant.address}
              </Typography>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell className={classes.fontWeightMedium}>
              Ville/Code postal
            </TableCell>
            <TableCell>
              <Typography variant="body2" color="textSecondary">
                {merchant.city} {merchant.zip_code}
              </Typography>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell className={classes.fontWeightMedium}>Country</TableCell>
            <TableCell>
              <Typography variant="body2" color="textSecondary">
                {merchant.country}
              </Typography>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>

      {user.role === ROLE.ADMIN && (
        <Box
          p={1}
          display="flex"
          flexDirection="column"
          alignItems="flex-start"
        >
          <Button disabled>
            <PersonIcon className={classes.actionIcon} />
            Login as Customer
          </Button>
        </Box>
      )}
    </Card>
  );
};

MerchantInfo.propTypes = {
  user: PropTypes.object.isRequired
};

export default MerchantInfo;
