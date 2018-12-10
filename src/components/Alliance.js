import React, {Component} from "react";
import { Table, TableHeader, TableBody, TableData, TableHead } from './Table/index'
import { Query } from 'react-apollo'
import gql from 'graphql-tag'

const FEED_QUERY = gql`
  {
    feed {
      alliances {
        number
        mapX
        mapY
        creationDate
        player
      }
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

                    const alliancesToRender = data.feed.alliances

                    return (<div styles={{ padding: "20px" }}>
                        <Table>
                            <TableHeader>
                                <TableHead>ID</TableHead>
                                <TableHead>Nickname</TableHead>
                                <TableHead>Points</TableHead>
                            </TableHeader>
                            <TableBody>
                                {alliancesToRender.map(alliance => <TableData key={alliance.id} id={alliance.number} />)}
                                {alliancesToRender.map(alliance => <TableData key={alliance.id} name={alliance.name} />)}
                                {alliancesToRender.map(alliance => <TableData key={alliance.id} points={alliance.points} />)}
                            </TableBody>
                        </Table>
                    </div>)
                }}
            </Query>
        )
    };
}

export default Alliance;

