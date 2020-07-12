import React from 'react';
import PropTypes from 'prop-types';
import {
  Box,
  Card,
  CardContent,
  Typography,
  makeStyles,
  Avatar
} from '@material-ui/core';
import getInitials from 'src/utils/getInitials';

const useStyles = makeStyles(theme => ({
  root: {},
  name: {
    marginTop: theme.spacing(1)
  },
  avatar: {
    height: 100,
    width: 100,
    fontSize: '45px'
  }
}));

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
          <Avatar className={classes.avatar} src={user.avatar}>
            {getInitials(`${user.first_name} ${user.last_name}`)}
          </Avatar>
          <Typography
            className={classes.name}
            gutterBottom
            variant="h1"
            color="textPrimary"
          >
            {`${user.first_name} ${user.last_name}`}
          </Typography>
          <Typography color="textPrimary" variant="body1">
            {user.email}
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
