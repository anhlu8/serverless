import React from 'react';


export const TableHeader = ({ children }) => {
    return (
        <tr>
            <th>{ children }</th>
            <th>{ children }</th>
            <th>{ children }</th>
        </tr>);
}


