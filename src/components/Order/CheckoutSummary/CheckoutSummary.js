import React from 'react';
import Burger from '../../Burger/Burger';
import Button from '../../../components/UI/Button/Button';
import classes from './CheckoutSummary.module.css';

const checkoutSummary = (props) => {
    return (
        <div className={classes.CheckoutSummary}>
            <h1>Hope you like it!!</h1>
            <div style={{ width: '100%', margin: 'auto' }}>
                <Burger ingredients={props.ingredients} />
            </div>
            <Button
                clicked={props.cancelHandler}
                btnType="Danger">
                CANCEL
            </Button>
            <Button
                clicked={props.continueHandler}
                btnType="Success">
                CONTINUE
            </Button>
        </div>
    );
};

export default checkoutSummary;
