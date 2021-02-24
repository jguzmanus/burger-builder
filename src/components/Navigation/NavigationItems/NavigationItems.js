import React from 'react';

import classes from './NavigationItems.module.css';
import NavigationItem from './NavigationItem/NavigationItem';

const navigationItems = (props) => (
    <ul className={classes.NavigationItems}>
        <NavigationItem exact link="/" active>
            Burger Builder
        </NavigationItem>
        {props.isAuth ? <NavigationItem link="/orders">Orders</NavigationItem> : null}
        {props.isAuth ? (
            <NavigationItem link="/logout">Logout</NavigationItem>
        ) : (
            <NavigationItem link="/auth">Authenticate</NavigationItem>
        )}
    </ul>
);

export default navigationItems;
