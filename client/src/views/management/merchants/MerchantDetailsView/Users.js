import React, { useState, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import moment from 'moment';
import PerfectScrollbar from 'react-perfect-scrollbar';
import {
  Box,
  Card,
  CardHeader,
  Divider,
  Table,
  TableBody,
  TableCell,
  TableRow,
  makeStyles
} from '@material-ui/core';
import * as Yup from 'yup';

import getInitials from 'src/utils/getInitials';
import TableHead from '@material-ui/core/TableHead';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import TextField from '@material-ui/core/TextField';
import { Formik } from 'formik';
import axios from 'src/utils/axios';
import { useDispatch } from 'react-redux';
import { useSnackbar } from 'notistack';
import { Alert } from '@material-ui/lab';
import { convertReponseErrors } from 'src/utils/helpers';
import useMerchant from 'src/hooks/useMerchant';
import { MERCHANT_STATUS } from 'src/constants';

const useStyles = makeStyles(theme => ({
  root: {},
  methodCell: {
    width: 100
  },
  statusCell: {
    width: 64
  },
  avatar: {
    height: 42,
    width: 42,
    marginRight: theme.spacing(1)
  },
  buttonIcon: {
    marginRight: theme.spacing(1)
  }
}));

const Users = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();
  const [addUserOpen, serAddUser] = useState(false);
  const [pageUsers, setUsers] = useState([]);

  const {
    merchant: { users, state, id }
  } = useMerchant();

  useEffect(() => {
    setUsers(setUsers);
  }, [users]);

  if (!users) {
    return null;
  }

  const handleSetUser = user => {
    setUsers([{ ...user }, ...pageUsers]);
  };

  const handleClickOpen = () => {
    serAddUser(true);
  };

  const handleClose = () => {
    serAddUser(false);
  };
  const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

  const Disalog = (
    <Dialog
      open={addUserOpen}
      onClose={handleClose}
      aria-labelledby="form-dialog-title"
    >
      <DialogTitle id="form-dialog-title">Ajouter utilisateur</DialogTitle>
      <DialogContent>
        <Alert severity="warning">
          Attention ! Vous êtes sur le point de créer un nouveau utilisateur
          pour le compte marchand avec les mêmes permissions.
        </Alert>
        <Formik
          initialValues={{
            last_name: '',
            first_name: '',
            phone: '',
            email: ''
          }}
          validationSchema={Yup.object().shape({
            first_name: Yup.string()
              .max(255)
              .required('Nom est requis'),
            last_name: Yup.string()
              .max(255)
              .required('Nom est requis'),
            phone: Yup.string().matches(
              phoneRegExp,
              'Phone number is not valid'
            ),
            email: Yup.string()
              .email('Must be a valid email')
              .max(255)
              .required('Email est requis')
          })}
          onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
            try {
              axios
                .post(`/api/merchants/${id}/new-user`, values)
                .then(response => {
                  if (response.status === 201) {
                    handleSetUser(response.data);
                    enqueueSnackbar('Compte été bien créé', {
                      variant: 'success'
                    });
                  } else {
                    enqueueSnackbar('Une erreur se produir', {
                      variant: 'error'
                    });
                  }
                })
                .catch(err => {
                  if (err.response) {
                    setStatus({ success: false });

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
              <Box p="15px">
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
              </Box>

              <Box mt={2} display="flex" flexDirection="row-reverse">
                <Button
                  disabled={isSubmitting}
                  onClick={handleClose}
                  color="secondary"
                  type="submit"
                >
                  Valider & ajouter
                </Button>
                <Button onClick={handleClose} color="primary">
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
    <div className={clsx(classes.root)}>
      <Card>
        <CardHeader
          title="Utilisateur associé"
          action={
            <Button
              color="secondary"
              variant="contained"
              onClick={() => handleClickOpen()}
              disabled={!(state === MERCHANT_STATUS.CONFIRMED)}
            >
              Ajouter un utilisateur
            </Button>
          }
        />
        <Divider />
        <PerfectScrollbar>
          <Box minWidth={1150}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Nom</TableCell>
                  <TableCell>Email</TableCell>
                  <TableCell>Téléphone</TableCell>
                  <TableCell>Créé</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {users.map(user => (
                  <TableRow key={user.id}>
                    <TableCell>
                      <Box display="flex" alignItems="center">
                        <Avatar className={classes.avatar} src={user.avatar}>
                          {getInitials(`${user.first_name} ${user.last_name}`)}
                        </Avatar>
                        <div>
                          {user.first_name} {user.last_name}
                        </div>
                      </Box>
                    </TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>{user.phone}</TableCell>
                    <TableCell>
                      {moment(user.createdAt).format('YYYY-MM-DD HH:mm:ss')}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Box>
        </PerfectScrollbar>
      </Card>

      {Disalog}
    </div>
  );
};

export default Users;
