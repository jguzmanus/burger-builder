import React, { Component, Suspense } from 'react';

import Layout from './hoc/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import Checkout from './containers/Checkout/Checkout';
import { Route, Switch, withRouter, Redirect } from 'react-router-dom';
import Auth from './containers/Auth/Auth';
import Logout from './containers/Auth/Logout/Logout';
import * as actions from './store/actions/index';
import { connect } from 'react-redux';

const Orders = React.lazy(() => import('./containers/Orders/Orders'));

class App extends Component {
    componentDidMount() {
        this.props.onAuthCheckState();
    }
    render() {
        let routes = (
            <Switch>
                <Route path="/auth" component={Auth} />
                <Route path="/" exact component={BurgerBuilder} />
                <Redirect to="/" />
            </Switch>
        );

        if (this.props.isAuthenticated)
            routes = (
                <Switch>
                    <Route path="/auth" component={Auth} />
                    <Route path="/checkout" component={Checkout} />
                    <Route
                        path="/orders"
                        render={() => (
                            <Suspense fallback={<div>Loading...</div>}>
                                <Orders />
                            </Suspense>
                        )}
                    />
                    <Route path="/logout" component={Logout} />
                    <Route path="/" exact component={BurgerBuilder} />
                    <Redirect to="/" />
                </Switch>
            );
        return (
            <div>
                <Layout>{routes}</Layout>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        isAuthenticated: state.auth.token !== null,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        onAuthCheckState: () => dispatch(actions.authCheckState()),
    };
};
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
