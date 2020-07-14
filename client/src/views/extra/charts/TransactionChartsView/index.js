import React, { useCallback, useEffect, useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import axios from 'src/utils/axios';
import {
  Box,
  Breadcrumbs,
  Container,
  Grid,
  Link,
  Typography,
  makeStyles
} from '@material-ui/core';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import Page from 'src/components/Page';
import useMerchant from 'src/hooks/useMerchant';
import useIsMountedRef from 'src/hooks/useIsMountedRef';
import { MERCURE_TOPICS } from 'src/constants';

import AreaChart from './AreaChart';
import LineChart from './LineChart';
import RadialChart from './RadialChart';
import useMercureSubscriber from 'src/hooks/useMercureSubscriber';

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    paddingTop: theme.spacing(3),
    paddingBottom: theme.spacing(3)
  }
}));

const TransactionChartsView = () => {
  const classes = useStyles();
  const isMountedRef = useIsMountedRef();
  const [stats, setStats] = useState(null);
  const { merchant } = useMerchant();

  const getStatsMerchant = useCallback(() => {
    axios.get(`/api/statistics/merchant/${merchant.id}`).then(response => {
      if (isMountedRef.current) {
        setStats(response.data);
      }
    });
  }, [isMountedRef]);

  useEffect(() => {
    getStatsMerchant();
  }, [getStatsMerchant]);

  useMercureSubscriber({
    topic: MERCURE_TOPICS.STATS.BY_MERCHANT,
    callback: passedData => setStats(passedData)
  });

  if (!stats) {
    return null;
  }

  return (
    <Page className={classes.root} title="Transaction Stats">
      <Container maxWidth="lg">
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
            to="/app/extra"
            component={RouterLink}
          >
            Extra
          </Link>
          <Typography variant="body1" color="textPrimary">
            Charts
          </Typography>
        </Breadcrumbs>
        <Typography variant="h3" color="textPrimary">
          Statistique du marchand
        </Typography>
        <Box mt={3}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <LineChart lineStat={stats.lineStat} />
            </Grid>
            <Grid item xs={12} md={8}>
              <AreaChart areaSats={stats.areaSats} />
            </Grid>
            <Grid item xs={12} md={4}>
              <RadialChart radialStat={stats.radialStat} />
            </Grid>
          </Grid>
        </Box>
      </Container>
    </Page>
  );
};

export default TransactionChartsView;
