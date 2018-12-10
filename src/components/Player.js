import React, {Component} from "react";
import { Table, TableHeader, TableBody, TableData, TableHead } from './Table/index'
import { Query } from 'react-apollo'
import gql from 'graphql-tag'

const FEED_QUERY = gql`
  {
    feed {
      players {
        number
        nick
        habitatIDs
        alliance
      }
    }
  }
`

class Player extends Component {
    render() {
        return (
            <Query query={FEED_QUERY}>
                {({ loading, error, data }) => {
                    if (loading) return <div>Fetching</div>
                    if (error) return <div>Error</div>

                    const playersToRender = data.feed.players

                    return (<div styles={{ padding: "20px" }}>
                        <Table>
                            <TableHeader>
                                <TableHead>ID</TableHead>
                                <TableHead>Nick</TableHead>
                                <TableHead>Alliance</TableHead>
                            </TableHeader>
                            <TableBody>
                                {playersToRender.map(player => <TableData key={player.id} id={player.number} />)}
                                {playersToRender.map(player => <TableData key={player.id} nick={player.nick} />)}
                                {playersToRender.map(player => <TableData key={player.id} alliance={player.alliance} />)}
                            </TableBody>
                        </Table>
                    </div>)
                }}
            </Query>
        )
    };
}

export default Player;

