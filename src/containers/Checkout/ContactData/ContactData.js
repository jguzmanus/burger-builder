import React, { Component } from 'react';
import Button from '../../../components/UI/Button/Button';
import classes from './Contact.module.css';
import axios from '../../../axios-orders';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Input from '../../../components/UI/Input/Input';

class contactData extends Component {
    state = {
        orderForm: {
            name: this.generateAttributes(
                'input',
                'text',
                'Your Name',
                ''
            ),
            street: this.generateAttributes(
                'input',
                'text',
                'Street',
                ''
            ),
            zipCode: this.generateAttributes(
                'input',
                'text',
                'ZIP CODE',
                ''
            ),
            country: this.generateAttributes(
                'input',
                'text',
                'Country',
                ''
            ),
            email: this.generateAttributes(
                'input',
                'email',
                'Your E-Mail',
                ''
            ),
            deliveryMethod: {
                elementType: 'select',
                elementConfig: {
                    options: [
                        {
                            value: 'fastest',
                            displayValue: 'Fastest',
                        },
                        {
                            value: 'cheapest',
                            displayValue: 'Cheapest',
                        },
                    ],
                },
                value: '',
            },
        },
        loading: false,
    };

    generateAttributes(elementType, type, placeholder, value) {
        return {
            elementType: elementType,
            elementConfig: {
                type: type,
                placeholder: placeholder,
            },
            value: value,
        };
    }
    submitHandler = (event) => {
        event.preventDefault();
        this.setState({ loading: true });
        const order = {
            ingredients: this.props.ingredients,
            price: this.props.totalPrice,
        };

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
                <Input
                    elementType="..."
                    elementConfig="..."
                    value="..."
                />
                <Input
                    inputtype="input"
                    type="email"
                    name="email"
                    placeholder="Your Email"
                    //  label="Email: "
                />
                <Input
                    inputtype="input"
                    type="text"
                    name="address"
                    placeholder="Your Address"
                    //  label="Address: "
                />
                <Input
                    inputtype="input"
                    type="text"
                    name="postal"
                    placeholder="Your ZIP"
                    //  label="Zip :"
                />
                <Button
                    btnType="Success"
                    clicked={this.submitHandler}>
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
