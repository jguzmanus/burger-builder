import React, { Component } from 'react';
import Button from '../../../components/UI/Button/Button';
import classes from './Contact.module.css';
import axios from '../../../axios-orders';
import Spinner from '../../../components/UI/Spinner/Spinner';

class contactData extends Component {
    state = {
        name: 'name',
        address: 'address',
        postal: 'postal',
        email: 'email',
        loading: false,
    };

    submitHandler = (event) => {
        event.preventDefault();
        this.setState({ loading: true });
        const order = {
            ingredients: this.props.ingredients,
            price: this.props.totalPrice,
            customer: {
                name: 'Max Schwarzmüller',
                address: {
                    street: 'Teststreet 1',
                    zipCode: '41351',
                    country: 'Germany',
                },
                email: 'test@test.com',
            },
            deliveryMethod: 'fastest',
        };
        console.log('Contact Data');
        console.log(this.props);
        axios
            .post('/orders.json', order)
            .then((response) => {
                this.setState({ loading: false });
                this.props.history.push('/');
            })
            .catch((error) => {
                this.setState({ loading: false });
            });
    };
    render() {
        let form = (
            <form>
                <input
                    className={classes.Input}
                    type="text"
                    name="name"
                    placeholder="Your Name"
                />
                <input
                    className={classes.Input}
                    type="email"
                    name="email"
                    placeholder="Your Email"
                />
                <input
                    className={classes.Input}
                    type="text"
                    name="address"
                    placeholder="Your Address"
                />
                <input
                    className={classes.Input}
                    type="text"
                    name="postal"
                    placeholder="Your ZIP"
                />
                <Button
                    btnType="Success"
                    clicked={this.submitHandler}>
                    {' '}
                    SUBMIT
                </Button>
            </form>
        );
        if (this.state.loading) form = <Spinner />;
        return (
            <div className={classes.ContactData}>
                <h4>Enter Your Contact Information</h4>
                {form}
            </div>
        );
    }
}

export default contactData;
