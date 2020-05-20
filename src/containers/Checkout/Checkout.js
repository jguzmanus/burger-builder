import React, { Component } from 'react';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import ContactData from './ContactData/ContactData';
import { Route } from 'react-router-dom';

class Checkout extends Component {
    state = {
        ingredients: { salad: 1 },
    };

    componentDidMount() {
        const ingredients = new URLSearchParams(
            this.props.location.search
        );

        const newIngredients = {};
        for (let i of ingredients.entries())
            newIngredients[i[0]] = +i[1];

        this.setState({ ingredients: newIngredients });
        console.log(this.state.ingredients);
    }

    purchaseCancelHandler = () => {
        this.props.history.goBack();
    };

    purchaseContinueHandler = () => {
        this.props.history.push('/checkout/contact-data');
    };

    render() {
        return (
            <div>
                <CheckoutSummary
                    ingredients={this.state.ingredients}
                    cancelHandler={this.purchaseCancelHandler}
                    continueHandler={
                        this.purchaseContinueHandler
                    }
                />
                <Route
                    path={
                        this.props.match.path + '/contact-data'
                    }
                    component={ContactData}
                />
            </div>
        );
    }
}

export default Checkout;
