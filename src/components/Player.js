import React from "react";
import { Table, TableHeader, TableBody } from './Table/index'
import TableHead from "./Table/th/index"



const Player = () => {
    return (<div styles={{ padding: "20px" }}>
        <Table>
            <TableHeader>
                <TableHead>ID</TableHead>
                <TableHead>Nick</TableHead>
                <TableHead>Alliance</TableHead>
                <TableHead>HabitatIDs</TableHead>
            </TableHeader>
            <TableBody>
                
            </TableBody>
        </Table>
        
    </div>)
};

export default Player;

