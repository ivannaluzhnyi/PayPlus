import React from 'react';
import PropTypes from 'prop-types';

import clsx from 'clsx';
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Link,
  Paper,
  Typography,
  makeStyles,
  Grid,
  TextField
} from '@material-ui/core';

import { Formik } from 'formik';
import { useDispatch } from 'react-redux';
import { useSnackbar } from 'notistack';
import { MERCHANT_STATUS } from 'src/constants';

const useStyles = makeStyles(theme => ({
  root: {},
  overview: {
    padding: theme.spacing(3),
    display: 'flex',
    alignItems: 'center',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    [theme.breakpoints.down('md')]: {
      flexDirection: 'column-reverse',
      alignItems: 'flex-start'
    }
  },
  productImage: {
    marginRight: theme.spacing(1),
    height: 48,
    width: 48
  },
  details: {
    padding: theme.spacing(3),
    display: 'flex',
    alignItems: 'center',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    [theme.breakpoints.down('md')]: {
      flexDirection: 'column',
      alignItems: 'flex-start'
    }
  }
}));

const Credentials = ({ user }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();

  const canGenerate = user.state === MERCHANT_STATUS.CONFIRMED;

  return (
    <Formik
      enableReinitialize
      initialValues={{
        client_secret: user.client_secret || '',
        client_token: user.client_token || ''
      }}
      onSubmit={async (
        values,
        { resetForm, setErrors, setStatus, setSubmitting }
      ) => {}}
    >
      {({
        errors,
        handleBlur,
        handleChange,
        handleSubmit,
        isSubmitting,
        touched,
        values
      }) => (
        <form onSubmit={handleSubmit}>
          <Card className={clsx(classes.root)}>
            <CardHeader title="Credentials" />
            <Divider />
            <CardContent>
              <Grid container spacing={4}>
                <Grid item md={12} xs={12}>
                  <TextField
                    error={Boolean(
                      touched.client_secret && errors.client_secret
                    )}
                    fullWidth
                    helperText={touched.client_secret && errors.client_secret}
                    label="Secret client (client_secret)"
                    name="client_secret"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    required
                    value={values.client_secret}
                    variant="outlined"
                    disabled
                  />
                </Grid>

                <Grid item md={12} xs={12}>
                  <TextField
                    error={Boolean(touched.client_token && errors.client_token)}
                    fullWidth
                    disabled
                    helperText={touched.client_token && errors.client_token}
                    label="Token client (client_token)"
                    name="client_token"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    required
                    type="text"
                    value={values.client_token}
                    variant="outlined"
                  />
                </Grid>
              </Grid>
            </CardContent>
            <Divider />
            <Box p={2} display="flex" justifyContent="flex-end">
              <Button
                color={canGenerate ? 'secondary' : 'default'}
                disabled={!canGenerate}
                type="submit"
                variant="contained"
              >
                Generer credentials
              </Button>
            </Box>
          </Card>
        </form>
      )}
    </Formik>
  );
};

Credentials.propTypes = {
  user: PropTypes.object.isRequired
};

export default Credentials;
