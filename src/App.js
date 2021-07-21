import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { Provider } from 'react-redux';

import { createMuiTheme, StylesProvider, ThemeProvider } from '@material-ui/core/styles';
import { CssBaseline } from '@material-ui/core';

import { store } from './redux/store';

import './styles/bootstrap.scss';
import './styles/global.scss';

import { MainLayout } from './components/layout/MainLayout/MainLayout';
import { Homepage } from './components/views/Homepage/Homepage';
import { NotFound } from './components/views/NotFound/NotFound';
import {Product} from './components/views/Product/Product';
import {Order} from './components/views/Order/Order'
import { AllProducts } from './components/features/AllProducts/AllProducts';

const theme = createMuiTheme({
  palette: {
    primary: {main: '#2B4C6F'},
  },
});

const App = () => (
  <Provider store={store}>
    <BrowserRouter>
      <StylesProvider injectFirst>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <MainLayout>
            <Switch>
              <Route exact path='/' component={Homepage}/>
              <Route exact path='/products' component={AllProducts}/>
              <Route exact path='/products/:id' component={Product}/>
              <Route exact path='/order' component={Order}/>
              <Route path='*' component={NotFound}/>
            </Switch>
          </MainLayout>
        </ThemeProvider>
      </StylesProvider>
    </BrowserRouter>
  </Provider>
);
export {App};