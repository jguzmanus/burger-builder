import React from 'react';
import classes from '../Order/Order.module.css';
const order = (props) => {
    let ingredients = [];

    for (let igName in props.ingredients)
        ingredients.push({
            name: igName,
            quantity: props.ingredients[igName],
        });

    const ingredientList = ingredients.map((i) => (
        <span
            key={i.name}
            style={{
                textTransform: 'capitalize',
                display: 'inline-block',
                margin: '0 8px',
                border: '1px solid #ccc',
                padding: '5px',
            }}>
            {i.name} ({i.quantity})
        </span>
    ));

    return (
        <div className={classes.Order}>
            <p>Ingredients: {ingredientList} </p>
            <p>
                Price:
                <strong>USD {props.price.toFixed(2)}</strong>
            </p>
        </div>
    );
};

export default order;
