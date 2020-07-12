/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import clsx from 'clsx';
import {
  Breadcrumbs,
  Button,
  Grid,
  Link,
  SvgIcon,
  Typography,
  makeStyles,
  Dialog,
  DialogTitle,
  DialogContent,
  Box,
  TextField
} from '@material-ui/core';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import { PlusCircle as PlusCircleIcon } from 'react-feather';
import useMerchant from 'src/hooks/useMerchant';
import { useSelector } from 'react-redux';
import * as Yup from 'yup';
import axios from 'src/utils/axios';
import { Formik } from 'formik';
import { useSnackbar } from 'notistack';
import { convertReponseErrors, toBase64 } from 'src/utils/helpers';

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

const Header = ({ handleSetMerchant }) => {
  const classes = useStyles();
  const { enqueueSnackbar } = useSnackbar();

  const [addMerchant, setAddMerchant] = useState(false);

  const { user } = useSelector(state => state.account);

  const Disalog = (
    <Dialog
      open={addMerchant}
      onClose={() => setAddMerchant(false)}
      aria-labelledby="form-dialog-title"
    >
      <DialogTitle id="form-dialog-title">Ajouter marchand</DialogTitle>
      <DialogContent>
        <Formik
          initialValues={{
            name: '',
            address: '',
            zip_code: '',
            city: '',
            country: '',
            KBIS: undefined
          }}
          validationSchema={Yup.object().shape({
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
            KBIS: Yup.mixed().required('KBIS est requis')
          })}
          onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
            try {
              axios
                .post(`/api/users/${user.id}/new-merchant`, values)
                .then(response => {
                  if (response.status === 201) {
                    handleSetMerchant(response.data);
                    enqueueSnackbar('Marchand été bien créé', {
                      variant: 'success'
                    });
                    setAddMerchant(false);
                  } else {
                    enqueueSnackbar('Une erreur se produite', {
                      variant: 'error'
                    });
                  }
                })
                .catch(err => {
                  if (err.response) {
                    setStatus({ success: false });
                    setErrors({ ...convertReponseErrors(err.response.data) });
                    setSubmitting(false);
                    enqueueSnackbar('Une erreur se produite', {
                      variant: 'error'
                    });
                  }
                });
            } catch (error) {
              setStatus({ success: false });
              setErrors({ submit: error.message });
              setSubmitting(false);

              enqueueSnackbar('Une erreur se produite', {
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
              <Box p="15px">
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
              </Box>

              <Typography m={2} ml={5} variant="h6" color="error">
                {errors.KBIS && <p style={{ color: 'red' }}>{errors.KBIS}</p>}
              </Typography>

              <Box mt={2} display="flex" flexDirection="row-reverse">
                <Button disabled={isSubmitting} color="secondary" type="submit">
                  Valider & ajouter
                </Button>
                <Button onClick={() => setAddMerchant(false)} color="primary">
                  Annuler
                </Button>
              </Box>
            </form>
          )}
        </Formik>
      </DialogContent>
    </Dialog>
  );

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
            Marchands
          </Typography>
        </Breadcrumbs>
        <Typography variant="h3" color="textPrimary">
          Tous les marchands
        </Typography>
      </Grid>
      <Grid item>
        <Button
          color="secondary"
          variant="contained"
          className={classes.action}
          onClick={() => setAddMerchant(true)}
        >
          <SvgIcon fontSize="small" className={classes.actionIcon}>
            <PlusCircleIcon />
          </SvgIcon>
          Nouveau Marchand
        </Button>
      </Grid>

      {Disalog}
    </Grid>
  );
};

export default Header;
