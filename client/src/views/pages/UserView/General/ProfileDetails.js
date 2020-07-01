import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import {
  Avatar,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Typography,
  makeStyles
} from '@material-ui/core';
import Label from 'src/components/Label';

const useStyles = makeStyles(theme => ({
  root: {},
  name: {
    marginTop: theme.spacing(1)
  },
  avatar: {
    height: 100,
    width: 100
  }
}));

const labelColors = {
  CONFIRMED: 'success',
  PENDING: 'warning',
  BANNIE: 'error'
};

const ProfileDetails = ({ user }) => {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardContent>
        <Box
          display="flex"
          alignItems="center"
          flexDirection="column"
          textAlign="center"
        >
          <Typography
            className={classes.name}
            gutterBottom
            variant="h1"
            color="textPrimary"
          >
            {`${user.name} `}
          </Typography>
          <Typography color="textPrimary" variant="body1">
            <Label color={labelColors[user.state]}>{user.state}</Label>
            {` | ${user.email}`}
          </Typography>
          <Typography color="textSecondary" variant="body2">
            {user.timezone}
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
};

ProfileDetails.propTypes = {
  user: PropTypes.object.isRequired
};

export default ProfileDetails;
