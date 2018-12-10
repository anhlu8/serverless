import React from 'react';


export const TableHeader = ({children}) => {
    return (
        <thead>
            <tr>
                {children}
            </tr>
        </thead>
        );
}


