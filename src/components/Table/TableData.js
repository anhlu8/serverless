import React, {Fragment} from 'react';
const uuidv4 = require('uuid/v4');


export const TableData = ({data}) => {
    const styles = {
        display: "block",
    };

    // const keys = [number, mapX, mapY, creationDate]
    
    return (
        <Fragment key={uuidv4()}>
            {Object.keys(data).map(key => {
                const value = data.key;
                console.log("value", value)
                return (<td key={uuidv4()} style={styles}>{value}</td>)
            })
            }

        </Fragment>
    );
};


