import React, { Component } from 'react';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import ContactData from './ContactData/ContactData';
import { Route } from 'react-router-dom';
import { connect } from 'react-redux';

class Checkout extends Component {
    // constructor(props) {
    //     super();
    //     const ingredients = new URLSearchParams(
    //         props.location.search
    //     );

    //     const newIngredients = {};
    //     for (let i of ingredients.entries())
    //         newIngredients[i[0]] = +i[1];

    //     this.state = { ingredients: newIngredients };
    //     console.log(this.state.ingredients);
    // }

    // UNSAFE_componentWillMount() {
    //     const ingredients = new URLSearchParams(
    //         this.props.location.search
    //     );

    //     const newIngredients = {};
    //     let price = null;
    //     for (let i of ingredients.entries())
    //         if (i[0] === 'price') price = i[1];
    //         else newIngredients[i[0]] = +i[1];

    //     this.setState({
    //         ingredients: newIngredients,
    //         price: price,
    //     });
    // }

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
                    ingredients={this.props.ingredients}
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

const mapStateToProps = (state) => {
    return {
        ingredients: state.ingredients,
    };
};

export default connect(mapStateToProps)(Checkout);
