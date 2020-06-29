import React from 'react';
import { makeStyles } from '@material-ui/core';
import Page from 'src/components/Page';
import Hero from './Hero';
import Features from './Features';
import Testimonials from './Testimonials';
import Presentetion from './Presentetion';

const useStyles = makeStyles(() => ({
  root: {}
}));

const HomeView = () => {
  const classes = useStyles();

  return (
    <Page className={classes.root} title="Home">
      <Hero />
      <Features />
      <Presentetion />
      <Testimonials />
    </Page>
  );
};

export default HomeView;
