import React from "react";

const styles ={
    borderCollapse: "separate",
    width: "100%"
}

export const Table = ({children}) => {
    return (
        <table style={styles}>
            {children}
        </table>
    );
};