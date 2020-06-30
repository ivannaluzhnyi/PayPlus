import React from 'react';
import Page from 'src/components/Page';
import { Container, Box } from '@material-ui/core';

function WelcomeView() {
  return (
    <Page title="Welcome">
      <Container>
        <Box p={5}>
          <p>Sooooooooon.....</p>
        </Box>
      </Container>
    </Page>
  );
}

export default WelcomeView;
