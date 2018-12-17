import React, { Component, Fragment } from "react";
import { Table, TableHeader, TableBody, TableData, TableHead } from './Table/index';
import { Query } from 'react-apollo'
import gql from 'graphql-tag';
const uuidv4 = require('uuid/v4');

const FEED_QUERY = gql`
{
    habitats {
        number
        mapX
        mapY
        creationDate
    }
}
`

class Habitat extends Component {
    render() {
        return (
            <Query query={FEED_QUERY}>
                {({ loading, error, data }) => {
                    if (loading) return <div>Fetching</div>
                    if (error) return <div>Error1</div>
                    

                    const habitatsToRender = data.habitats
                    console.log('habitat', habitatsToRender)

                    return (
                        <Table>
                            <TableHeader>
                                <TableHead>ID</TableHead>
                                <TableHead>MapX</TableHead>
                                <TableHead>MapY</TableHead>
                                <TableHead>CreationDate</TableHead>
                            </TableHeader>
                            <TableBody>
                                {habitatsToRender.map(habitat => {
                                    return (
                                        <Fragment key={uuidv4()}>
                                            <TableData data={habitat} />
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

export default Habitat;

