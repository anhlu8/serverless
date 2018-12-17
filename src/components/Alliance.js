import React, { Component, Fragment } from "react";
import { Table, TableHeader, TableBody, TableData, TableHead } from './Table/index';
import { Query } from 'react-apollo'
import gql from 'graphql-tag';
const uuidv4 = require('uuid/v4');

const FEED_QUERY = gql`
{
    alliances {
        number
        name
        points
    }
}
`

class Alliance extends Component {
    render() {
        return (
            <Query query={FEED_QUERY}>
                {({ loading, error, data }) => {
                    if (loading) return <div>Fetching</div>
                    if (error) return <div>Error</div>

                    const alliancesToRender = data.alliances

                    return (
                        <Table>
                            <TableHeader>
                                <TableHead>ID</TableHead>
                                <TableHead>Nickname</TableHead>
                                <TableHead>Points</TableHead>
                            </TableHeader>
                            <TableBody>
                                {alliancesToRender.map(alliance => {
                                    return (
                                        <Fragment key={uuidv4()}>
                                            <TableData data={alliance} />
                                        </Fragment>
                                    )
                                })}
                            </TableBody>
                        </Table>
                    )
                }}
            </Query>
        )
    };
}

export default Alliance;

