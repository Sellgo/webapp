import React from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import {Segment} from 'semantic-ui-react';

import {Home} from "../Home/Home";
import {ProductTracker} from "../ProductTracker/ProductTracker";
import {AdminLayout} from '../../components/AdminLayout/index';
import {Login} from '../Login/Login';
import {SignUp} from '../SignUp/Signup';
import {RecoverPass} from '../RecoverPass';
import {Setting} from '../Dashboard/Setting';
import {Dashboard} from '../Dashboard';

const App: React.SFC = () => (
  <Router>
    <Switch>
      <Route exact path="/" component={Home}/>
      <Route exact path="/login" component={Login}/>
      <Route exact path="/sign-up" component={SignUp}/>
      <Route exact path="/forgot-password" component={RecoverPass}/>
      <Route exact path="/product-tracker" component={ProductTracker}/>
      <Route exact path="/dashboard/setting" render={() => <AdminLayout title={'Setting'}><Setting /></AdminLayout>}/>
      <Route exact path="/dashboard" component={Dashboard}/>
      <Route render={() => <AdminLayout title={''}><Segment>Page not found</Segment></AdminLayout>}/>
    </Switch>
  </Router>
);

export default App;
