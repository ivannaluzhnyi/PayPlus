import React from 'react';
import { useDispatch } from 'react-redux';
import clsx from 'clsx';
import * as Yup from 'yup';
import PropTypes from 'prop-types';
import { Formik } from 'formik';
import axios from 'src/utils/axios';
import { useSnackbar } from 'notistack';

import {
  Box,
  Button,
  Checkbox,
  FormHelperText,
  TextField,
  Typography,
  Link,
  Divider,
  makeStyles,
  Grid
} from '@material-ui/core';
import { REGISTER_SUCCESS, REGISTER_FAILURE } from 'src/actions/accountActions';

import { toBase64, convertReponseErrors } from 'src/utils/helpers';

const useStyles = makeStyles(() => ({
  root: {}
}));

const RegisterForm = ({ onSubmitSuccess }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();
  const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;
  return (
    <Formik
      initialValues={{
        last_name: '',
        first_name: '',
        name: '',
        address: '',
        zip_code: '',
        city: '',
        country: '',
        phone: '',
        email: '',
        password: '',
        KBIS: undefined,
        policy: false
      }}
      validationSchema={Yup.object().shape({
        first_name: Yup.string()
          .max(255)
          .required('Nom est requis'),
        last_name: Yup.string()
          .max(255)
          .required('Nom est requis'),
        name: Yup.string()
          .max(255)
          .required('Nom est requis'),
        address: Yup.string()
          .max(255)
          .required('Adresse est requis'),
        zip_code: Yup.string()
          .max(255)
          .required('Code postale est requi/'),
        city: Yup.string()
          .max(255)
          .required('Vile est requis'),
        country: Yup.string()
          .max(255)
          .required('Pays est requis'),
        KBIS: Yup.mixed().required('KBIS est requis'),
        phone: Yup.string().matches(phoneRegExp, 'Phone number is not valid'),
        email: Yup.string()
          .email('Must be a valid email')
          .max(255)
          .required('Email est requis'),
        password: Yup.string()
          .min(7)
          .max(255)
          .required('Mot de passe est requis'),
        policy: Yup.boolean().oneOf([true], 'This field must be checked')
      })}
      onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
        try {
          axios
            .post('/api/register', values)
            .then(response => {
              if (response.status === 201) {
                dispatch({
                  type: REGISTER_SUCCESS,
                  payload: {
                    user: response.data
                  }
                });

                enqueueSnackbar('Compte été bien créé', {
                  variant: 'success'
                });
                onSubmitSuccess();
              } else {
                dispatch({ type: REGISTER_FAILURE });
                enqueueSnackbar('Une erreur se produir', {
                  variant: 'error'
                });
              }
            })
            .catch(err => {
              dispatch({ type: REGISTER_FAILURE });
              if (err.response) {
                setStatus({ success: false });
                setErrors({ ...convertReponseErrors(err.response.data) });
                setSubmitting(false);

                enqueueSnackbar('Une erreur se produir', {
                  variant: 'error'
                });
              }
            });
        } catch (error) {
          setStatus({ success: false });
          setErrors({ submit: error.message });
          setSubmitting(false);

          enqueueSnackbar('Une erreur se produir', {
            variant: 'error'
          });
        }
      }}
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
        <form className={clsx(classes.root)} onSubmit={handleSubmit}>
          <Grid container wrap="nowrap" direction="row">
            <Grid item>
              <Box p="15px">
                <Typography as="h2">Information d'utilisateur</Typography>
                <Divider component="hr" />

                <TextField
                  error={Boolean(touched.first_name && errors.first_name)}
                  fullWidth
                  helperText={touched.first_name && errors.first_name}
                  label="Prénom"
                  margin="normal"
                  name="first_name"
                  onBlur={handleBlur}
                  required
                  onChange={handleChange}
                  type="text"
                  value={values.first_name}
                  variant="outlined"
                />

                <TextField
                  error={Boolean(touched.last_name && errors.last_name)}
                  fullWidth
                  helperText={touched.last_name && errors.last_name}
                  label="Nom"
                  margin="normal"
                  name="last_name"
                  onBlur={handleBlur}
                  required
                  onChange={handleChange}
                  type="name"
                  value={values.last_name}
                  variant="outlined"
                />

                <TextField
                  error={Boolean(touched.phone && errors.phone)}
                  fullWidth
                  helperText={touched.phone && errors.phone}
                  label="Telephone"
                  margin="normal"
                  name="phone"
                  onBlur={handleBlur}
                  required
                  onChange={handleChange}
                  type="phone"
                  value={values.phone}
                  variant="outlined"
                />

                <TextField
                  error={Boolean(touched.email && errors.email)}
                  fullWidth
                  helperText={touched.email && errors.email}
                  label="Email"
                  margin="normal"
                  name="email"
                  onBlur={handleBlur}
                  required
                  onChange={handleChange}
                  type="email"
                  value={values.email}
                  variant="outlined"
                />
                <TextField
                  error={Boolean(touched.password && errors.password)}
                  fullWidth
                  helperText={touched.password && errors.password}
                  label="Password"
                  margin="normal"
                  name="password"
                  onBlur={handleBlur}
                  required
                  onChange={handleChange}
                  type="password"
                  value={values.password}
                  variant="outlined"
                />
              </Box>
            </Grid>

            <Grid item>
              <Box p="15px">
                <Typography as="h2">Information du marchand</Typography>
                <Divider />

                <TextField
                  error={Boolean(touched.name && errors.name)}
                  fullWidth
                  helperText={touched.name && errors.name}
                  label="Nom de la société"
                  margin="normal"
                  name="name"
                  onBlur={handleBlur}
                  required
                  onChange={handleChange}
                  type="name"
                  value={values.name}
                  variant="outlined"
                />

                <TextField
                  error={Boolean(touched.address && errors.address)}
                  fullWidth
                  helperText={touched.address && errors.address}
                  label="Adresse"
                  margin="normal"
                  name="address"
                  required
                  onBlur={handleBlur}
                  onChange={handleChange}
                  type="address"
                  value={values.address}
                  variant="outlined"
                />
                <TextField
                  error={Boolean(touched.zip_code && errors.zip_code)}
                  fullWidth
                  helperText={touched.zip_code && errors.zip_code}
                  label="Code postal"
                  autoComplete="billing postal-code"
                  margin="normal"
                  name="zip_code"
                  required
                  onBlur={handleBlur}
                  onChange={handleChange}
                  type="zipCode"
                  value={values.zip_code}
                  variant="outlined"
                />
                <TextField
                  error={Boolean(touched.city && errors.city)}
                  fullWidth
                  helperText={touched.city && errors.city}
                  label="Vile"
                  margin="normal"
                  name="city"
                  required
                  onBlur={handleBlur}
                  onChange={handleChange}
                  type="city"
                  value={values.city}
                  variant="outlined"
                />
                <TextField
                  error={Boolean(touched.country && errors.country)}
                  fullWidth
                  helperText={touched.country && errors.country}
                  label="Pays"
                  margin="normal"
                  name="country"
                  required
                  onBlur={handleBlur}
                  onChange={handleChange}
                  type="country"
                  value={values.country}
                  variant="outlined"
                />
              </Box>
            </Grid>
          </Grid>

          <Box p="15px">
            <Button variant="contained" component="label">
              Upload File
              <input
                name="KBIS"
                type="file"
                style={{ display: 'none' }}
                onBlur={handleBlur}
                onChange={async e => {
                  e.preventDefault();

                  const file = e.target.files[0];

                  if (file) {
                    handleChange({
                      currentTarget: {
                        name: 'KBIS',
                        value: await toBase64(file)
                      }
                    });
                  }
                }}
              />
            </Button>

            <Typography m={2} variant="h5" color="error">
              {errors.KBIS && <p style={{ color: 'red' }}>{errors.KBIS}</p>}
            </Typography>

            <Box alignItems="center" display="flex" mt={2} ml={-1}>
              <Checkbox
                checked={values.policy}
                name="policy"
                onChange={handleChange}
              />
              <Typography variant="body2" color="textSecondary">
                J'ai lu les{' '}
                <Link component="a" href="#" color="secondary">
                  Conditions Générales
                </Link>
              </Typography>
            </Box>
            {Boolean(touched.policy && errors.policy) && (
              <FormHelperText error>{errors.policy}</FormHelperText>
            )}
          </Box>

          <Box mt={2}>
            <Button
              color="secondary"
              disabled={isSubmitting}
              fullWidth
              size="large"
              type="submit"
              variant="contained"
            >
              Create account
            </Button>
          </Box>
        </form>
      )}
    </Formik>
  );
};

RegisterForm.propTypes = {
  onSubmitSuccess: PropTypes.func
};

RegisterForm.default = {
  onSubmitSuccess: () => {}
};

export default RegisterForm;
