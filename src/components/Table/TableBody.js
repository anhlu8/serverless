import React from 'react';


export const TableBody = (props) => {
    return (
        <tbody>
            <tr>
                {console.log("props",props.children)}
                {props.children}
            </tr>
        </tbody>
    );
}


