import React from 'react';


export const TableHead = ({children}) => {
    const styles = {
        display: "inline",
        border: "1px solid #dddddd"
    };

    return (<th style={styles}>{children}</th>);
};