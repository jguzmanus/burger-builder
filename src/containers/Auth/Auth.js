import classes from './Auth.module.css';
import React, { Component } from 'react';
import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import * as actions from '../../store/actions/index';
import { connect } from 'react-redux';
import Spinner from '../../components/UI/Spinner/Spinner';
import { Redirect } from 'react-router-dom';

class Auth extends Component {
    state = {
        controls: {
            email: {
                ...this.generateAttributes('input', 'email', 'Your Email', ''),
                validation: { required: true, isEmail: true },
            },
            password: {
                ...this.generateAttributes('input', 'password', 'Password', ''),
                validation: { required: true, minLength: 6 },
            },
        },
        isSignup: true,
    };

    /******************************************************************/

    validateData(value, rules) {
        let isValid = true;

        if (rules.required) isValid = value.trim() !== '' && isValid;

        if (rules.minLength)
            isValid = value.trim().length >= rules.minLength && isValid;
        if (rules.maxLength)
            isValid = value.trim().length <= rules.maxLength && isValid;

        if (rules.isEmail) {
            const pattern = /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/g;
            isValid = pattern.test(value) && isValid;
        }

        return isValid;
    }

    /******************************************************************/

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
    /******************************************************************/

    inputChangedHandler = (event, inputElementId) => {
        const updatedControls = { ...this.state.controls };
        const updatedControl = {
            ...updatedControls[inputElementId],
        };

        updatedControl.value = event.target.value;

        updatedControl.valid = this.validateData(
            updatedControl.value,
            updatedControl.validation
        );

        updatedControl.touched = true;

        updatedControls[inputElementId] = updatedControl;

        this.setState({
            controls: updatedControls,
        });
    };

    /******************************************************************/

    submitHandler = (event) => {
        event.preventDefault(); // prevent reloading of the page
        this.props.onAuth(
            this.state.controls.email.value,
            this.state.controls.password.value,
            this.state.isSignup
        );
    };

    /******************************************************************/

    switchSignupHandler = () => {
        this.setState((prevState) => {
            return { isSignup: !prevState.isSignup };
        });
    };

    /******************************************************************/

    componentDidMount() {
        if (!this.props.buildingBurger && this.props.authRedirectPath !== '/')
            this.props.onSetAuthRedirectPath();
    }
    render() {
        let formElements = [];

        for (let key in this.state.controls)
            formElements.push({
                id: key,
                config: this.state.controls[key],
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
                        requiresValidation={e.config.validation}
                        touched={e.config.touched}
                        changed={(event) => this.inputChangedHandler(event, e.id)}
                    />
                ))}
                <Button btnType="Success">SUBMIT</Button>
            </form>
        );

        if (this.props.loading) {
            form = <Spinner />;
        }

        let error = null;
        if (this.props.error) error = <p>{this.props.error.message}</p>;

        let isAuthRedirect = this.props.isAuth ? (
            <Redirect to={this.props.authRedirectPath} />
        ) : null;
        return (
            <div className={classes.Auth}>
                {isAuthRedirect}
                {error}
                {form}
                <Button clicked={this.switchSignupHandler} btnType="Danger">
                    SWITCH TO {this.state.isSignup ? 'SIGNIN' : 'SIGNUP'}
                </Button>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        loading: state.auth.loading,
        error: state.auth.error,
        isAuth: state.auth.token !== null,
        buildingBurger: state.burgerBuilder.building,
        authRedirectPath: state.auth.authRedirectPath,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        onAuth: (email, password, isSignup) =>
            dispatch(actions.auth(email, password, isSignup)),
        onSetAuthRedirectPath: () => dispatch(actions.setAuthRedirectPath('/')),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Auth);
