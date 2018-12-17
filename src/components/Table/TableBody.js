import React from 'react';


export const TableBody = (props) => {
    const styles ={
        display: "inline",
        float: "left",
        border: "1px solid #dddddd",
        whiteSpace: "nowrap"
    }
    return (
        <tbody>
            <tr style={styles}>
                {props.children}
            </tr>
        </tbody>
    );
}


