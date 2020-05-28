import React, { Component } from 'react';
import Button from '../../../components/UI/Button/Button';
import classes from './Contact.module.css';
import axios from '../../../axios-orders';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Input from '../../../components/UI/Input/Input';

class contactData extends Component {
    state = {
        orderForm: {
            name: {
                ...this.generateAttributes(
                    'input',
                    'text',
                    'Your Name',
                    ''
                ),
                validation: { required: true },
            },
            street: {
                ...this.generateAttributes(
                    'input',
                    'text',
                    'Street',
                    ''
                ),
                validation: { required: true },
            },
            zipCode: {
                ...this.generateAttributes(
                    'input',
                    'text',
                    'ZIP CODE',
                    ''
                ),
                validation: {
                    required: true,
                    minLength: 5,
                    maxLength: 5,
                },
            },
            country: {
                ...this.generateAttributes(
                    'input',
                    'text',
                    'Country',
                    ''
                ),
                validation: { required: true },
            },
            email: {
                ...this.generateAttributes(
                    'input',
                    'email',
                    'Your E-Mail',
                    ''
                ),
                validation: { required: true },
            },
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
                value: 'fastest',
                valid: true,
                validation: {},
            },
        },
        loading: false,
        isFormValid: false,
    };

    validateData(value, rules) {
        let isValid = true;

        if (rules.required)
            isValid = value.trim() !== '' && isValid;

        if (rules.minLength)
            isValid =
                value.trim().length >= rules.minLength &&
                isValid;
        if (rules.maxLength)
            isValid =
                value.trim().length <= rules.maxLength &&
                isValid;

        return isValid;
    }
    generateAttributes(elementType, type, placeholder, value) {
        return {
            elementType: elementType,
            elementConfig: {
                type: type,
                placeholder: placeholder,
            },
            value: value,
            valid: false,
            touched: false,
        };
    }
    submitHandler = (event) => {
        event.preventDefault();
        this.setState({ loading: true });

        const customerData = {};

        for (let orderElement in this.state.orderForm)
            customerData[orderElement] = this.state.orderForm[
                orderElement
            ].value;

        const order = {
            ingredients: this.props.ingredients,
            price: this.props.totalPrice,
            orderData: customerData,
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

    inputChangedHandler = (event, inputElementId) => {
        const elementForm = { ...this.state.orderForm };
        const elementFormConfig = {
            ...elementForm[inputElementId],
        };

        elementFormConfig.value = event.target.value;

        elementFormConfig.valid = this.validateData(
            elementFormConfig.value,
            elementFormConfig.validation
        );

        elementFormConfig.touched = true;

        elementForm[inputElementId] = elementFormConfig;

        let isFormValid = true;
        for (let element in elementForm)
            isFormValid =
                elementForm[element].valid && isFormValid;

        this.setState({
            orderForm: elementForm,
            isFormValid: isFormValid,
        });
    };
    render() {
        let formElements = [];

        for (let key in this.state.orderForm)
            formElements.push({
                id: key,
                config: this.state.orderForm[key],
            });

        let form = (
            <form onSubmit={this.submitHandler}>
                {formElements.map((e) => (
                    <Input
                        key={e.id}
                        elementType={e.config.elementType}
                        elementConfig={e.config.elementConfig}
                        value={e.config.value}
                        invalid={!e.config.valid}
                        requiresValidation={
                            e.config.validation
                        }
                        touched={e.config.touched}
                        changed={(event) =>
                            this.inputChangedHandler(
                                event,
                                e.id
                            )
                        }
                    />
                ))}
                <Button
                    btnType="Success"
                    disabled={!this.state.isFormValid}>
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
