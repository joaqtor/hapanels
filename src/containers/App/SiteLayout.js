import React from 'react';
import PropTypes from 'prop-types';
import styled, { ThemeProvider } from 'styled-components';

import ThemeDefault from './themes/default';

const Layout = styled.div`
  background-color: ${(props) => props.theme.colors.mainBackground};
  color: ${(props) => props.theme.colors.mainText};
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  padding: ${(props) => props.theme.mainPadding};
  box-sizing: border-box;
`;

const SiteLayout = ({ children }) => (
  <ThemeProvider theme={ThemeDefault}>
    <Layout>
      {children}
    </Layout>
  </ThemeProvider>
);

SiteLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default SiteLayout;
