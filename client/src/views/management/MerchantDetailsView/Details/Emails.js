import React, { useState, useCallback, useEffect } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import moment from 'moment';
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Table,
  TableBody,
  TableCell,
  TableRow,
  TextField,
  makeStyles
} from '@material-ui/core';
import MaiIcon from '@material-ui/icons/MailOutline';
import axios from 'src/utils/axios';
import useIsMountedRef from 'src/hooks/useIsMountedRef';
import useMerchant from 'src/hooks/useMerchant';
import { useSnackbar } from 'notistack';
import { MerchantContextProvider } from 'src/context/MerchantContext';

const useStyles = makeStyles(theme => ({
  root: {},
  actionIcon: {
    marginRight: theme.spacing(1)
  },
  cell: {
    padding: theme.spacing(1)
  }
}));

const emailOptions = [
  {
    label: 'Envoyer la réinitialisation du mot de passe',
    value: 'RESET_PASSWORD'
  }
];

const Emails = () => {
  const classes = useStyles();
  const { enqueueSnackbar } = useSnackbar();
  const isMountedRef = useIsMountedRef();
  const [emailOption, setEmailOption] = useState(emailOptions[0]);
  const [emails, setEmails] = useState(null);

  const { customer } = useMerchant();

  const handleSendEmail = () => {
    if (emailOption.value === 'RESET_PASSWORD') {
      axios
        .get(`/api/users/reset-password-admin/${customer.id}`)
        .then(response => {
          if (response.status === 200) {
            enqueueSnackbar('Mot de pass modifé', {
              variant: 'success'
            });
          } else {
            enqueueSnackbar('Une errur se produit.', {
              variant: 'error'
            });
          }
        });
    }
  };

  // const getMails = useCallback(() => {
  //   axios.get('/api/users/emails/').then(response => {
  //     if (isMountedRef.current) {
  //       setEmails(response.data.emails);
  //     }
  //   });
  // }, [isMountedRef]);

  // useEffect(() => {
  //   // getMails();
  // }, [getMails]);

  return (
    <Card className={clsx(classes.root)}>
      <CardHeader title="Envoyer des courriels" />
      <Divider />
      <CardContent>
        <TextField
          fullWidth
          name="option"
          onChange={event => setEmailOption(event.target.value)}
          select
          SelectProps={{ native: true }}
          value={emailOption}
          variant="outlined"
        >
          {emailOptions.map(option => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </TextField>
        <Box mt={2}>
          <Button variant="contained" onClick={handleSendEmail}>
            <MaiIcon className={classes.actionIcon} />
            Send email
          </Button>
        </Box>
        {/* {emails && (
          <Box mt={2}>
            <Table>
              <TableBody>
                {emails.map(email => (
                  <TableRow key={email.id}>
                    <TableCell className={classes.cell}>
                      {moment(email.createdAt).format('DD/MM/YYYY | HH:MM')}
                    </TableCell>
                    <TableCell className={classes.cell}>
                      {email.description}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Box>
        )} */}
      </CardContent>
    </Card>
  );
};

export default Emails;
