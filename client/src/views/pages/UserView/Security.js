import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import * as Yup from 'yup';
import { Formik } from 'formik';
import axios from 'src/utils/axios';
import { useSnackbar } from 'notistack';
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  FormHelperText,
  Grid,
  TextField,
  makeStyles
} from '@material-ui/core';

const useStyles = makeStyles(() => ({
  root: {}
}));

const Security = ({ user }) => {
  const classes = useStyles();
  const { enqueueSnackbar } = useSnackbar();

  return (
    <Formik
      initialValues={{
        password: '',
        oldPassword: '',
        passwordConfirm: ''
      }}
      validationSchema={Yup.object().shape({
        oldPassword: Yup.string()
          .max(255)
          .required('Required'),
        password: Yup.string()
          .min(7, 'Must be at least 7 characters')
          .max(255)
          .required('Required'),
        passwordConfirm: Yup.string()
          .oneOf([Yup.ref('password'), null], 'Passwords must match')
          .required('Required')
      })}
      onSubmit={async (
        values,
        { resetForm, setErrors, setStatus, setSubmitting }
      ) => {
        try {
          axios
            .put(`/api/users/change-password/${user.id}`, {
              oldPassword: values.oldPassword,
              newPassword: values.password
            })
            .then(response => {
              if (response.status === 200) {
                enqueueSnackbar('Mot de pass modifé', {
                  variant: 'success'
                });

                resetForm();
                setStatus({ success: true });
                setSubmitting(false);
              } else {
                enqueueSnackbar('Une errur se produit.', {
                  variant: 'error'
                });

                setStatus({ success: false });
                setSubmitting(false);
              }
            });
        } catch (error) {
          setStatus({ success: false });
          setErrors({ submit: error.message });
          setSubmitting(false);
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
        <form onSubmit={handleSubmit}>
          <Card className={clsx(classes.root)}>
            <CardHeader title="Change Password" />
            <Divider />
            <CardContent>
              <Grid container spacing={3}>
                <Grid item md={4} sm={4} xs={12}>
                  <TextField
                    error={Boolean(touched.oldPassword && errors.oldPassword)}
                    fullWidth
                    helperText={touched.oldPassword && errors.oldPassword}
                    label="Ancien mot de passe"
                    name="oldPassword"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    type="password"
                    value={values.oldPassword}
                    variant="outlined"
                  />
                </Grid>
                <Grid item md={4} sm={4} xs={12}>
                  <TextField
                    error={Boolean(touched.password && errors.password)}
                    fullWidth
                    helperText={touched.password && errors.password}
                    label="Mot de passe"
                    name="password"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    type="password"
                    value={values.password}
                    variant="outlined"
                  />
                </Grid>
                <Grid item md={4} sm={4} xs={12}>
                  <TextField
                    error={Boolean(
                      touched.passwordConfirm && errors.passwordConfirm
                    )}
                    fullWidth
                    helperText={
                      touched.passwordConfirm && errors.passwordConfirm
                    }
                    label="Mot de passe Confirmation"
                    name="passwordConfirm"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    type="password"
                    value={values.passwordConfirm}
                    variant="outlined"
                  />
                </Grid>
              </Grid>
              {errors.submit && (
                <Box mt={3}>
                  <FormHelperText error>{errors.submit}</FormHelperText>
                </Box>
              )}
            </CardContent>
            <Divider />
            <Box p={2} display="flex" justifyContent="flex-end">
              <Button
                color="secondary"
                disabled={isSubmitting}
                type="submit"
                variant="contained"
              >
                Changer le mot de passe
              </Button>
            </Box>
          </Card>
        </form>
      )}
    </Formik>
  );
};

Security.propTypes = {
  user: PropTypes.object.isRequired
};

export default Security;
