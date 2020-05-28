import React from 'react';
import classes from './Input.module.css';
const input = (props) => {
    let inputElement = null;
    let inputClasses = [classes.InputElement];
    let validationError = null;
    if (
        props.invalid &&
        props.requiresValidation &&
        props.touched
    ) {
        inputClasses.push(classes.Invalid);
        validationError = (
            <p className={classes.ValidationError}>
                Please enter a valid value!{' '}
                {props.elementConfig.type}
            </p>
        );
    }

    switch (props.elementType) {
        case 'input':
            inputElement = (
                <input
                    className={inputClasses.join(' ')}
                    {...props.elementConfig}
                    value={props.value}
                    onChange={props.changed}></input>
            );
            break;
        case 'textarea':
            inputElement = (
                <textarea
                    className={inputClasses.join(' ')}
                    {...props.elementConfig}
                    value={props.value}
                    onChange={props.changed}></textarea>
            );
            break;
        case 'select':
            inputElement = (
                <select
                    className={inputClasses.join(' ')}
                    onChange={props.changed}>
                    {props.elementConfig.options.map((o) => (
                        <option key={o.value} value={o.value}>
                            {o.displayValue}
                        </option>
                    ))}
                </select>
            );
            break;
        default:
            inputElement = (
                <input
                    className={inputClasses.join(' ')}
                    {...props.elementConfig}
                    value={props.value}
                    onChange={props.changed}></input>
            );
            break;
    }

    return (
        <div>
            <label className={classes.Label}>
                {props.label}
            </label>
            {inputElement}
            {validationError}
        </div>
    );
};

export default input;
