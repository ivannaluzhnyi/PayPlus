import React from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { Grid, makeStyles } from '@material-ui/core';
import { ROLE } from 'src/constants';
import MerchantInfo from './MerchantInfo';
import Invoices from './Payment';
import OtherActions from './OtherActions';

const useStyles = makeStyles(() => ({
  root: {}
}));

const Details = ({ user }) => {
  const classes = useStyles();

  return (
    <Grid className={clsx(classes.root)} container spacing={3}>
      <Grid item lg={4} md={6} xl={3} xs={12}>
        <MerchantInfo user={user} />
      </Grid>
      <Grid item lg={4} md={6} xl={3} xs={12}>
        <Invoices />
      </Grid>

      {user.role === ROLE.ADMIN && (
        <Grid item lg={4} md={6} xl={3} xs={12}>
          <OtherActions />
        </Grid>
      )}
    </Grid>
  );
};

Details.propTypes = {
  user: PropTypes.object.isRequired
};

export default Details;
