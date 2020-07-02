import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import clsx from 'clsx';
import { Typography, Breadcrumbs, Link, makeStyles } from '@material-ui/core';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';

const useStyles = makeStyles(() => ({
  root: {
    marginTop: '15px'
  }
}));

const Header = () => {
  const classes = useStyles();

  return (
    <div className={clsx(classes.root)}>
      <Breadcrumbs
        separator={<NavigateNextIcon fontSize="small" />}
        aria-label="breadcrumb"
      >
        <Link color="inherit" to="/app" component={RouterLink}>
          Dashboard
        </Link>
        <Typography color="textPrimary">Utilisateurs</Typography>
      </Breadcrumbs>
      <Typography variant="h3" color="textPrimary">
        Paramètres
      </Typography>
    </div>
  );
};

export default Header;
