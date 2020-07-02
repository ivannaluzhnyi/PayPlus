import React from 'react';
import clsx from 'clsx';
import * as Yup from 'yup';
import { Formik } from 'formik';
import { useSnackbar } from 'notistack';
import axios from 'src/utils/axios';
import {
  Box,
  Button,
  Card,
  CardContent,
  Grid,
  TextField,
  makeStyles
} from '@material-ui/core';
import useMerchant from 'src/hooks/useMerchant';

const useStyles = makeStyles(() => ({
  root: {}
}));

const MerchantEditForm = () => {
  const classes = useStyles();
  const { enqueueSnackbar } = useSnackbar();
  const { merchant, saveMerchant } = useMerchant();

  return (
    <Formik
      initialValues={{
        name: merchant.name || '',
        address: merchant.address || '',
        country: merchant.country || '',
        city: merchant.city || '',
        zip_code: merchant.zip_code || ''
      }}
      validationSchema={Yup.object().shape({
        address: Yup.string().max(255),
        country: Yup.string().max(255),
        name: Yup.string().max(255),
        city: Yup.string()
          .max(255)
          .required('city is required'),
        zip_code: Yup.string().max(255)
      })}
      onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
        try {
          axios
            .put(`/api/merchants/update/${merchant.id}`, {
              ...values
            })
            .then(response => {
              if (response.status === 200) {
                setStatus({ success: true });
                setSubmitting(true);
                enqueueSnackbar('Marchand mis à jour', {
                  variant: 'success'
                });
                saveMerchant(response.data[0]);
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
        <form className={clsx(classes.root)} onSubmit={handleSubmit}>
          <Card>
            <CardContent>
              <Grid container spacing={3}>
                <Grid item md={6} xs={12}>
                  <TextField
                    error={Boolean(touched.name && errors.name)}
                    fullWidth
                    helperText={touched.name && errors.name}
                    label="Nom"
                    name="name"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    required
                    value={values.name}
                    variant="outlined"
                  />
                </Grid>

                <Grid item md={6} xs={12}>
                  <TextField
                    error={Boolean(touched.address && errors.address)}
                    fullWidth
                    helperText={touched.address && errors.address}
                    label="Adresse"
                    name="address"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.address}
                    variant="outlined"
                  />
                </Grid>

                <Grid item md={6} xs={12}>
                  <TextField
                    error={Boolean(touched.city && errors.city)}
                    fullWidth
                    helperText={touched.city && errors.city}
                    label="Ville"
                    name="city"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.city}
                    variant="outlined"
                  />
                </Grid>

                <Grid item md={6} xs={12}>
                  <TextField
                    error={Boolean(touched.zip_code && errors.zip_code)}
                    fullWidth
                    helperText={touched.zip_code && errors.zip_code}
                    label="Postal Code"
                    name="cizip_codety"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.zip_code}
                    variant="outlined"
                  />
                </Grid>

                <Grid item md={6} xs={12}>
                  <TextField
                    error={Boolean(touched.country && errors.country)}
                    fullWidth
                    helperText={touched.country && errors.country}
                    label="Pays"
                    name="country"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.country}
                    variant="outlined"
                  />
                </Grid>
              </Grid>
              <Box mt={2}>
                <Button
                  variant="contained"
                  color="secondary"
                  type="submit"
                  disabled={isSubmitting}
                >
                  Mise à jour du marchand
                </Button>
              </Box>
            </CardContent>
          </Card>
        </form>
      )}
    </Formik>
  );
};

export default MerchantEditForm;
