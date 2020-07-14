import React from 'react';
import clsx from 'clsx';
import { Box, Card, Typography, makeStyles } from '@material-ui/core';
import { useSelector } from 'react-redux';

const useStyles = makeStyles(theme => ({
  root: {
    color: theme.palette.secondary.contrastText,
    backgroundColor: theme.palette.secondary.main,
    padding: theme.spacing(3),
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  avatar: {
    backgroundColor: theme.palette.secondary.contrastText,
    color: theme.palette.secondary.main,
    height: 48,
    width: 48
  }
}));

const CountCustomerUser = ({ userMerchant: { users, merchants } }) => {
  const classes = useStyles();

  const {
    user: { role }
  } = useSelector(state => state.account);

  const isAdmin = role === 'ADMIN';

  return (
    <Card className={clsx(classes.root)}>
      <Box flexGrow={1}>
        <Typography
          color="inherit"
          component="h3"
          gutterBottom
          variant="overline"
        >
          {isAdmin
            ? "Nombre total d'utilisaturs & marchands"
            : 'Nombre total de marchands'}
        </Typography>
        <Box display="flex" alignItems="center" flexWrap="wrap">
          <Typography color="inherit" variant="h3">
            {isAdmin ? `${users} & ${merchants}` : merchants}
          </Typography>
        </Box>
      </Box>
    </Card>
  );
};

export default CountCustomerUser;
