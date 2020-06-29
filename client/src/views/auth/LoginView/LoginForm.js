import React from 'react';
import { useDispatch } from 'react-redux';
import clsx from 'clsx';
import * as Yup from 'yup';
import PropTypes from 'prop-types';
import { Formik } from 'formik';
import {
  Box,
  Button,
  TextField,
  FormHelperText,
  makeStyles
} from '@material-ui/core';
import { login } from 'src/actions/accountActions';

const useStyles = makeStyles(() => ({
  root: {}
}));

const LoginForm = ({ onSubmitSuccess }) => {
  const classes = useStyles();
  const dispatch = useDispatch();

  return (
    <Formik
      initialValues={{
        email: '',
        password: ''
      }}
      validationSchema={Yup.object().shape({
        email: Yup.string()
          .email('Doit être une adresse électronique valide')
          .max(255)
          .required("L'adresse électronique est obligatoire"),
        password: Yup.string()
          .max(255)
          .required('Le mot de passe est obligatoire')
      })}
      onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
        try {
          await dispatch(login(values.email, values.password));
          onSubmitSuccess();
        } catch (error) {
          const message =
            (error.response && error.response.data.message) ||
            'Quelque chose a mal tourné';

          setStatus({ success: false });
          setErrors({ submit: message });
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
        <form noValidate className={clsx(classes.root)} onSubmit={handleSubmit}>
          <TextField
            error={Boolean(touched.email && errors.email)}
            fullWidth
            autoFocus
            helperText={touched.email && errors.email}
            label="Email "
            margin="normal"
            name="email"
            onBlur={handleBlur}
            onChange={handleChange}
            type="email"
            value={values.email}
            variant="outlined"
          />
          <TextField
            error={Boolean(touched.password && errors.password)}
            fullWidth
            helperText={touched.password && errors.password}
            label="Mot de passe"
            margin="normal"
            name="password"
            onBlur={handleBlur}
            onChange={handleChange}
            type="password"
            value={values.password}
            variant="outlined"
          />
          <Box mt={2}>
            <Button
              color="secondary"
              disabled={isSubmitting}
              fullWidth
              size="large"
              type="submit"
              variant="contained"
            >
              Connexion
            </Button>
            {errors.submit && (
              <Box mt={3}>
                <FormHelperText error>{errors.submit}</FormHelperText>
              </Box>
            )}
          </Box>
        </form>
      )}
    </Formik>
  );
};

LoginForm.propTypes = {
  onSubmitSuccess: PropTypes.func
};

LoginForm.defaultProps = {
  onSubmitSuccess: () => {}
};

export default LoginForm;
