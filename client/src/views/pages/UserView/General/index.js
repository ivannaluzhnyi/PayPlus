import React from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { Grid, makeStyles } from '@material-ui/core';
import ProfileDetails from './ProfileDetails';
import GeneralSettings from './GeneralSettings';

const useStyles = makeStyles(() => ({
  root: {}
}));

const General = ({ user }) => {
  const classes = useStyles();

  return (
    <Grid className={clsx(classes.root)} container spacing={3}>
      <Grid item lg={4} md={6} xl={3} xs={12}>
        <ProfileDetails user={user} />
      </Grid>
      <Grid item lg={8} md={6} xl={9} xs={12}>
        <GeneralSettings user={user} />
      </Grid>
    </Grid>
  );
};

ProfileDetails.propTypes = {
  user: PropTypes.object.isRequired
};

export default General;
