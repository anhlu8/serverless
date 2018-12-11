import React, { Component, Fragment } from "react";
import { Table, TableHeader, TableBody, TableData, TableHead } from './Table/index';
import { Query } from 'react-apollo'
import gql from 'graphql-tag';
const uuidv4 = require('uuid/v4');

const PLAYERS_QUERY = gql`
{
    players {
        number
        nick

    }
}
`;

class Player extends Component {
    render() {
        return (
            <Query query={PLAYERS_QUERY}>
                {({ loading, error, data }) => {
                    if (loading) return <div>Fetching</div>
                    if (error) console.log(error)
                    console.log("1", data)

                    const playersToRender = data.players

                    return (
                        <Table>
                            <TableHeader>
                                <TableHead>ID</TableHead>
                                <TableHead>Nick</TableHead>
                                <TableHead>Alliance</TableHead>
                            </TableHeader>
                            <TableBody>
                                {playersToRender.map(player => {
                                    const { nick, number } = player
                                    return (
                                        <Fragment key={uuidv4()}>
                                            <TableData key={uuidv4()} id={number} />
                                            <TableData key={uuidv4()} nick={nick} />
                                            {/* <TableData key={player.id} alliance={player.alliance} /> */}
                                        </Fragment>)
                                })}
                            </TableBody>
                        </Table>
                    )
                }}
            </Query>
        )
    };
}

export default Player;

