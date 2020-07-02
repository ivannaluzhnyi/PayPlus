import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { Breadcrumbs, Link, Typography, makeStyles } from '@material-ui/core';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';

const useStyles = makeStyles(() => ({
  root: {}
}));

const Header = () => {
  const classes = useStyles();

  return (
    <div className={clsx(classes.root)}>
      <Breadcrumbs
        separator={<NavigateNextIcon fontSize="small" />}
        aria-label="breadcrumb"
      >
        <Link variant="body1" color="inherit" to="/app" component={RouterLink}>
          Dashboard
        </Link>
        <Link
          variant="body1"
          color="inherit"
          to="/app/management"
          component={RouterLink}
        >
          Management
        </Link>
        <Typography variant="body1" color="textPrimary">
          Marchanads
        </Typography>
      </Breadcrumbs>
      <Typography variant="h3" color="textPrimary">
        Modifier marchand
      </Typography>
    </div>
  );
};

export default Header;
