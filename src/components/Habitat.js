import React, { Component, Fragment } from "react";
import { Table, TableHeader, TableBody, TableData, TableHead } from './Table/index';
import { Query } from 'react-apollo'
import gql from 'graphql-tag';
const uuidv4 = require('uuid/v4');

const FEED_QUERY = gql`
  {
    feed {
      habitats {
        number
        mapX
        mapY
        creationDate
      }
    }
  }
`

class Habitat extends Component {
    render() {
        return (
            <Query query={FEED_QUERY}>
                {({ loading, error, data }) => {
                    if (loading) return <div>Fetching</div>
                    if (error) return <div>Error</div>

                    const habitatsToRender = data.feed.habitats

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
                                            <TableData key={uuidv4()} id={habitat.number} />
                                            <TableData key={uuidv4()} mapx={habitat.mapX} />
                                            <TableData key={uuidv4()} mapy={habitat.mapY} />
                                            <TableData key={uuidv4()} creationdate={habitat.creationDate} />
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

