import React, { useEffect } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
} from 'react-router-dom';
import { useDispatch } from 'react-redux';

import * as haActions from 'state/ha/actions';

import Home from 'containers/Home';
import Office from 'containers/Office';
import LivingRemote from 'containers/LivingRemote';

import SiteLayout from './SiteLayout';

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(haActions.listen());
  }, [dispatch]);

  return (
    <Router>
      <SiteLayout>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/office" component={Office} />
          <Route path="/living-remote" component={LivingRemote} />
        </Switch>
      </SiteLayout>
    </Router>
  );
};

export default App;
