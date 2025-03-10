import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { Provider } from 'react-redux';

import './App.css';

import Layout from './hocs/Layout';
import Home from './containers/Home';
import Login from './containers/Login';
import Logout from './containers/Logout';
import SignupPhone from './containers/SignupPhone';
import SignupPhoneVerify from './containers/SignupPhoneVerify';
import Signup from './containers/Signup';
import LocationSetup from './containers/LocationSetup';
import ResetPassword from './containers/ResetPassword';
import ResetPasswordConfirm from './containers/ResetPasswordConfirm';
import Profile from './containers/Profile';
import SellerProfile from './containers/seller/SellerProfile';
import Shop from './containers/Shop';
import Product from './containers/Product';
import Cart from './containers/Cart'
import Checkout from './containers/Checkout'
import CheckoutSuccess from './containers/CheckoutSuccess';
import Activate from './containers/Activate';

import store from './store';

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Layout>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/login" component={Login} />
            <Route path="/logout" component={Logout} />
            <Route path="/signup" component={SignupPhone} />
            <Route path="/signup_phone-verification" render={(props) => <SignupPhoneVerify {...props} />} />
            <Route path="/signup_finishing-up" render={(props) => <Signup {...props} />} />
            <Route path="/account/location-setup" component={LocationSetup} />
            <Route path="/account/password-reset" component={ResetPassword} />
            <Route path="/account/password/reset/confirm/:uid/:token" component={ResetPasswordConfirm} />
            <Route path="/account/:username" component={Profile} />
            <Route path="/seller/:username" component={SellerProfile} />
            <Route path="/products" component={Shop} />
            <Route path="/product/:slug" component={Product} />
            <Route path="/cart" component={Cart} />
            <Route path="/checkout" component={Checkout} />
            <Route path="/checkout_success" render={(props) => <CheckoutSuccess {...props} />} />
            <Route path="/activate/:uid/:token" component={Activate} />
          </Switch>
        </Layout>
      </BrowserRouter>
    </Provider>
  );
}

export default App;