import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import {
  AppBar,
  Box,
  Button,
  Divider,
  Toolbar,
  Hidden,
  Typography,
  Link,
  makeStyles
} from '@material-ui/core';
import { APP_VERSION } from 'src/config';
import Logo from 'src/components/Logo';

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: theme.palette.background.default
  },
  toolbar: {
    height: 64
  },
  logo: {
    marginRight: theme.spacing(2)
  },
  link: {
    fontWeight: theme.typography.fontWeightMedium,
    '& + &': {
      marginLeft: theme.spacing(2)
    }
  },
  divider: {
    width: 1,
    height: 32,
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2)
  }
}));

const TopBar = () => {
  const classes = useStyles();

  return (
    <AppBar className={classes.root} color="default">
      <Toolbar className={classes.toolbar}>
        <RouterLink to="/">
          <Logo className={classes.logo} />
        </RouterLink>
        <Hidden mdDown>
          <Typography variant="caption" color="textSecondary">
            Version
            {APP_VERSION}
          </Typography>
        </Hidden>
        <Box flexGrow={1} />
        <Link
          className={classes.link}
          color="textSecondary"
          component={RouterLink}
          to="/app"
          underline="none"
          variant="body2"
        >
          Dashboard
        </Link>
        <Link
          className={classes.link}
          color="textSecondary"
          component={RouterLink}
          to="/docs"
          underline="none"
          variant="body2"
        >
          Documentation
        </Link>
        <Divider className={classes.divider} />

        <>
          <RouterLink to="/register" style={{ textDecoration: 'none' }}>
            <Button color="secondary" variant="contained" size="small">
              Créer un compte !
            </Button>
          </RouterLink>
        </>
      </Toolbar>
    </AppBar>
  );
};

export default TopBar;
