import React, { Component } from 'react';
import Button from '../../../components/UI/Button/Button';
import classes from './Contact.module.css';

class contactData extends Component {
    state = {
        name: 'name',
        address: 'address',
        postal: 'postal',
        email: 'email',
    };

    render() {
        return (
            <div className={classes.ContactData}>
                <h4>Enter Your Contact Information</h4>
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
                    <Button btnType="Success"> SUBMIT</Button>
                </form>
            </div>
        );
    }
}

export default contactData;
