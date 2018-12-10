import React from 'react';


export const TableBody = (props) => {
    return (
        <tbody>
            <tr>
                {props.children}
            </tr>
        </tbody>
    );
}


