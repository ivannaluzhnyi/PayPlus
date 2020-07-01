import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import * as Yup from 'yup';
import { Formik } from 'formik';
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Checkbox,
  Divider,
  FormControlLabel,
  Grid,
  Typography,
  makeStyles,
  TextField,
  FormHelperText
} from '@material-ui/core';
import { updateProfile } from 'src/actions/accountActions';
import { useSnackbar } from 'notistack';
import { useDispatch } from 'react-redux';
import { DEVISE } from 'src/constants';

const useStyles = makeStyles(() => ({
  root: {}
}));

const PaymentInfo = ({ user }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();

  return (
    <Card className={clsx(classes.root)}>
      <Formik
        enableReinitialize
        initialValues={{
          devise: user.devise || '',
          url_cancel: user.url_cancel || '',
          url_confirmation: user.url_confirmation || ''
        }}
        validationSchema={Yup.object().shape({
          devise: Yup.string()
            .max(255)
            .required('devise is required'),

          url_cancel: Yup.string().url('Veuillez entrer une URL valide', {
            allowLocal: true
          }),
          url_confirmation: Yup.string().url('Veuillez entrer une URL valide', {
            allowLocal: true
          })
        })}
        onSubmit={async (
          values,
          { resetForm, setErrors, setStatus, setSubmitting }
        ) => {
          try {
            await dispatch(updateProfile(user.id, values));
            resetForm();
            setStatus({ success: true });
            enqueueSnackbar('Profile updated', {
              variant: 'success'
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
                  <Grid item md={12} xs={12}>
                    <TextField
                      fullWidth
                      label="Devise"
                      name="devise"
                      onChange={handleChange}
                      select
                      SelectProps={{ native: true }}
                      value={values.devise}
                      variant="outlined"
                    >
                      {Object.keys(DEVISE).map(devise => (
                        <option key={devise} value={devise}>
                          {devise}
                        </option>
                      ))}
                    </TextField>
                  </Grid>

                  <Grid item md={12} xs={12}>
                    <TextField
                      error={Boolean(touched.url_cancel && errors.url_cancel)}
                      fullWidth
                      helperText={touched.url_cancel && errors.url_cancel}
                      label="Url d'annulation"
                      name="url_cancel"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      required
                      value={values.url_cancel}
                      variant="outlined"
                    />
                  </Grid>

                  <Grid item md={12} xs={12}>
                    <TextField
                      error={Boolean(
                        touched.url_confirmation && errors.url_confirmation
                      )}
                      fullWidth
                      helperText={
                        touched.url_confirmation && errors.url_confirmation
                      }
                      label="Url de validation"
                      name="url_confirmation"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      required
                      type="text"
                      value={values.url_confirmation}
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
    </Card>
  );
};

PaymentInfo.propTypes = {
  user: PropTypes.object.isRequired
};

export default PaymentInfo;
