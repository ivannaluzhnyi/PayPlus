import React, { useState } from 'react';
import {
  Box,
  Container,
  Divider,
  Tab,
  Tabs,
  makeStyles
} from '@material-ui/core';
import { useSelector } from 'react-redux';
import Page from 'src/components/Page';
import Header from './Header';
import General from './General';
import Security from './Security';

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    paddingTop: theme.spacing(3),
    paddingBottom: theme.spacing(3)
  }
}));

const tabs = [
  { value: 'general', label: 'General' },
  { value: 'security', label: 'Security' }
];

const AccountView = () => {
  const classes = useStyles();
  const [currentTab, setCurrentTab] = useState('general');

  const { user } = useSelector(state => state.account);

  const handleTabsChange = (event, value) => {
    setCurrentTab(value);
  };

  return (
    <Page className={classes.root} title="Paramètres">
      <Container maxWidth="lg">
        <Header />
        <Box mt={3}>
          <Tabs
            onChange={handleTabsChange}
            scrollButtons="auto"
            value={currentTab}
            variant="scrollable"
            textColor="secondary"
            className={classes.tabs}
          >
            {tabs.map(tab => (
              <Tab key={tab.value} label={tab.label} value={tab.value} />
            ))}
          </Tabs>
        </Box>
        <Divider />
        <Box mt={3}>
          {currentTab === 'general' && <General user={user} />}
          {currentTab === 'security' && <Security user={user} />}
        </Box>
      </Container>
    </Page>
  );
};

export default AccountView;
