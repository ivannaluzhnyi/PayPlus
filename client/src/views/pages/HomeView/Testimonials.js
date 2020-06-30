import React from 'react';
import clsx from 'clsx';
import { Container, Typography, makeStyles } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    paddingTop: 128,
    paddingBottom: 128
  },
  title: {
    fontWeight: theme.typography.fontWeightRegular
  }
}));

const Testimonials = () => {
  const classes = useStyles();

  return (
    <div className={clsx(classes.root)}>
      <Container maxWidth="md">
        <Typography
          variant="h2"
          align="center"
          color="textPrimary"
          className={classes.title}
        >
          Nous soutenons la croissance de nos clients dans de nombreux secteurs
        </Typography>
      </Container>
    </div>
  );
};

export default Testimonials;
