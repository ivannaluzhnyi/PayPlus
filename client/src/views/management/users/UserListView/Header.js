import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import clsx from 'clsx';
import {
  Breadcrumbs,
  Button,
  Grid,
  Link,
  SvgIcon,
  Typography,
  makeStyles
} from '@material-ui/core';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import { PlusCircle as PlusCircleIcon } from 'react-feather';

const useStyles = makeStyles(theme => ({
  root: {},
  action: {
    marginBottom: theme.spacing(1),
    '& + &': {
      marginLeft: theme.spacing(1)
    }
  },
  actionIcon: {
    marginRight: theme.spacing(1)
  }
}));

const Header = () => {
  const classes = useStyles();

  return (
    <Grid
      className={clsx(classes.root)}
      container
      justify="space-between"
      spacing={3}
    >
      <Grid item>
        <Breadcrumbs
          separator={<NavigateNextIcon fontSize="small" />}
          aria-label="breadcrumb"
        >
          <Link
            variant="body1"
            color="inherit"
            to="/app"
            component={RouterLink}
          >
            Dashboard
          </Link>
          <Link
            variant="body1"
            color="inherit"
            to="/app/management"
            component={RouterLink}
          >
            Gestion
          </Link>
          <Typography variant="body1" color="textPrimary">
            Utilisateurs
          </Typography>
        </Breadcrumbs>
        <Typography variant="h3" color="textPrimary">
          Tous les Utilisateurs
        </Typography>
      </Grid>
      <Grid item>
        <Button
          color="secondary"
          variant="contained"
          disabled
          className={classes.action}
        >
          <SvgIcon fontSize="small" className={classes.actionIcon}>
            <PlusCircleIcon />
          </SvgIcon>
          Nouveau utilisateur
        </Button>
      </Grid>
    </Grid>
  );
};

export default Header;
