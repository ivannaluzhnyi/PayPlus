import React from 'react';
import { useDispatch } from 'react-redux';
import clsx from 'clsx';
import PropTypes from 'prop-types';
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

const GeneralSettings = ({ user }) => {
  const classes = useStyles();
  const { enqueueSnackbar } = useSnackbar();

  return (
    <Formik
      enableReinitialize
      initialValues={{
        first_name: user.first_name || '',
        last_name: user.last_name || '',
        phone: user.phone || ''
      }}
      validationSchema={Yup.object().shape({
        phone: Yup.string()
          .max(255)
          .required('phone is required'),

        first_name: Yup.string()
          .max(255)
          .required('First name is required'),
        last_name: Yup.string()
          .max(255)
          .required('First name is required')
      })}
      onSubmit={async (
        values,
        { resetForm, setErrors, setStatus, setSubmitting }
      ) => {
        try {
          axios
            .put(`/api/users/update/${user.id}`, {
              ...values
            })
            .then(response => {
              if (response.status === 200) {
                setStatus({ success: true });
                setSubmitting(true);
                enqueueSnackbar('Utilisateur mis à jour', {
                  variant: 'success'
                });
              } else {
                enqueueSnackbar('Une erreur se produit ', {
                  variant: 'error'
                });
                setStatus({ success: false });
                setSubmitting(false);
              }
            });
        } catch (error) {
          setStatus({ success: false });
          setErrors({ submit: error.message });
        } finally {
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
            <CardHeader title="Profile" />
            <Divider />
            <CardContent>
              <Grid container spacing={4}>
                <Grid item md={6} xs={12}>
                  <TextField
                    error={Boolean(touched.first_name && errors.first_name)}
                    fullWidth
                    helperText={touched.first_name && errors.first_name}
                    label="Prénom"
                    name="first_name"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    required
                    type="text"
                    value={values.first_name}
                    variant="outlined"
                  />
                </Grid>
                <Grid item md={6} xs={12}>
                  <TextField
                    error={Boolean(touched.last_name && errors.last_name)}
                    fullWidth
                    helperText={touched.last_name && errors.last_name}
                    label="Nom"
                    name="last_name"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    required
                    type="text"
                    value={values.last_name}
                    variant="outlined"
                  />
                </Grid>
                <Grid item md={6} xs={12}>
                  <TextField
                    error={Boolean(touched.phone && errors.phone)}
                    fullWidth
                    helperText={touched.phone && errors.phone}
                    label="Phone Number"
                    name="phone"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.phone}
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
                Enregistrer les changements
              </Button>
            </Box>
          </Card>
        </form>
      )}
    </Formik>
  );
};

GeneralSettings.propTypes = {
  user: PropTypes.object.isRequired
};

export default GeneralSettings;
