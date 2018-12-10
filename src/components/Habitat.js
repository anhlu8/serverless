import React, {Component} from "react";
import { Table, TableHeader, TableBody, TableData, TableHead } from './Table/index'
import { Query } from 'react-apollo'
import gql from 'graphql-tag'

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

                    return (<div styles={{ padding: "20px" }}>
                        <Table>
                            <TableHeader>
                                <TableHead>ID</TableHead>
                                <TableHead>MapX</TableHead>
                                <TableHead>MapY</TableHead>
                                <TableHead>CreationDate</TableHead>
                            </TableHeader>
                            <TableBody>
                                {habitatsToRender.map(habitat => {
                                    <TableData key={habitat.id} id={habitat.number} />;
                                    <TableData key={habitat.id} mapx={habitat.mapX} />;
                                    <TableData key={habitat.id} mapy={habitat.mapY} />;
                                    <TableData key={habitat.id} creationdate={habitat.creationDate} />
                                })}
                            </TableBody>
                        </Table>
                    </div>)
                }}
            </Query>
        )
    };
}

export default Habitat;

