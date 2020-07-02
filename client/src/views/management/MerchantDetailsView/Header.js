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
import BeenhereIcon from '@material-ui/icons/Beenhere';

import { Edit as EditIcon } from 'react-feather';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import { useDispatch } from 'react-redux';
import axios from 'src/utils/axios';

import { LOAD_KBIS_CUSTOMER } from 'src/actions/customerActions';
import useMerchant from 'src/hooks/useMerchant';

const useStyles = makeStyles(theme => ({
  root: {},
  actionIcon: {
    marginRight: theme.spacing(1)
  }
}));

const Header = () => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const { customer } = useMerchant();

  const handleLoadKBIS = () => {
    axios.get(`/api/users/kbis/${customer.KBIS}`).then(response => {
      if (response.status === 200) {
        dispatch({ type: LOAD_KBIS_CUSTOMER });
        const newTab = window.open();
        newTab.document.body.innerHTML = `<img src="data:image/png;base64,${response.data.base64}">`;
      }
    });
  };

  return (
    <Grid
      container
      spacing={3}
      justify="space-between"
      className={clsx(classes.root)}
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
            Clients
          </Typography>
        </Breadcrumbs>
        <Typography variant="h3" color="textPrimary">
          {customer.fullName}
        </Typography>
      </Grid>

      <Grid item>
        <Button
          color="secondary"
          variant="contained"
          style={{ marginRight: '16px' }}
          onClick={handleLoadKBIS}
        >
          <SvgIcon fontSize="small" className={classes.actionIcon}>
            <BeenhereIcon />
          </SvgIcon>
          Verifier KBIS
        </Button>

        <Button
          color="secondary"
          variant="contained"
          component={RouterLink}
          to={`/app/management/merchants/${customer.id}/edit`}
        >
          <SvgIcon fontSize="small" className={classes.actionIcon}>
            <EditIcon />
          </SvgIcon>
          Edit
        </Button>
      </Grid>
    </Grid>
  );
};

export default Header;
