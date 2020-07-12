import React from 'react';
import clsx from 'clsx';
import {
  Box,
  Container,
  Grid,
  Typography,
  makeStyles
} from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    paddingTop: theme.spacing(6),
    paddingBottom: theme.spacing(6),
    '& dt': {
      marginTop: theme.spacing(2)
    }
  }
}));

const Presentetion = () => {
  const classes = useStyles();

  return (
    <div className={clsx(classes.root)}>
      <Container maxWidth="lg">
        <Grid container spacing={3} component="dl">
          <Grid item xs={12} md={6}>
            <Typography variant="overline" color="secondary">
              ÉCOSYSTÈME
            </Typography>
            <Box mt={6}>
              <dt>
                <Typography variant="body1" color="textSecondary">
                  Nous sommes convaincus que tisser des liens de partenariat
                  avec d’autres acteurs permet de créer des synergies
                  profitables à tous nos clients. PayPlus+dispose aujourd’hui
                  d’un large panel de partenaires qui complète son offre :
                  comptabilité, gestion des abonnements, CRM, facturation,
                  fournisseurs de services de paiement, etc.
                </Typography>
              </dt>
            </Box>
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography variant="overline" color="secondary">
              API
            </Typography>
            <Box mt={6}>
              <dt>
                <Typography variant="body1" color="textSecondary">
                  L’API de PayPlus+facilite l’intégration de notre solution pour
                  commencer rapidement à collecter vos paiements. Notre API
                  permet de faciliter l’acquisition de nouveaux clients en
                  capturant les données de carte bancaire ou l’IBAN, mais aussi
                  de suivre le status de vos paiements et mandats, ainsi que la
                  gestion des paiements en échec.
                </Typography>
              </dt>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};

export default Presentetion;
