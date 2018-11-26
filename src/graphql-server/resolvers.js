const resolvers = {
    Query:{
        getPlayers(){
            return {
                id:'123',
                nickname:'anh',
                creationDate:'xxxx-xx-xx',
                habitatArray:['habitat1','habitat2']
            }
        },
        getPlayer:(root, {id}, ctx, info) => {
            return players.find(player => players.id === id);
        }
    },
    Mutation:{
        createPlayer:(root, {id, nickname, creationDate, habitatArray}, ctx, info) => {
            const newPlayer = {
                id,
                nickname,
                creationDate,
                habitatArray
            }
            players.push(newPlayer);
            return newPlayer;
        },
        updatePlayer(root, { id, description, url }) {
            const index = players.findIndex(player => player.id === id);
            if (url) {
                players[index].url = url
            }
            if (description) {
                players[index].description = description
            }
            return players[index];
        },
        deletePlayer(root, { id }) {
            const index = players.findIndex(player => player.id === id);
            players.splice(index, 1);
            return players[index];
        }
    }
}

module.exports = resolvers;