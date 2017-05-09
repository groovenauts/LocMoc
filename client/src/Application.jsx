import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';
import createHistory from 'history/createBrowserHistory'
import { syncHistoryWithStore } from 'react-router-redux';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import injectTapEventPlugin from 'react-tap-event-plugin';
// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin();


import store from './core/store';
import './style.scss';
import Root from './Root';
import Top from './Top';

const history = syncHistoryWithStore(createHistory(), store);
const App = (
  <MuiThemeProvider>
    <Provider store={ store }>
      <Router history={ history }>
        <Root>
          <Route exact path="/" component={ Top } />
        </Root>
      </Router>
    </Provider>
  </MuiThemeProvider>
);


window.addEventListener('load', () => {
  ReactDOM.render(App, document.getElementById('application'));
});

