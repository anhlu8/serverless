require('dotenv').config()
const AWS = require('aws-sdk');
AWS.config.setPromisesDependency(Promise);
const s3 = new AWS.S3();
const bucket = process.env.BUCKET_NAME;

const resolvers = {
    Query: {
        players(parent, args, { prisma }, info) {
            return prisma.players();
        },
        player(parent, {id}, { prisma }, info){
            return prisma.player({id})
        }
    },
    Mutation: {
        async createPlayer(parent, arg, { prisma, worldGame }, info) {
            return worldGame.map(async world => {
                if (world.titleJson.includes("players")) {
                    let params = {
                        Bucket: bucket,
                        Key: world.titleJson,
                    };
                    let returnedObject = await s3.getObject(params).promise();
                    let playerList = await JSON.parse(Buffer.from(returnedObject.Body).toString("utf8"));
                    console.log("1");
                    let newPlayer = await playerList.map(async player => {
                        const player = await prisma.mutation.createPlayer({
                            data: {
                                id: player.id,
                                nickname: player.nick,
                                habitatArray: player.habitatIDs
                            }
                        });
                        return player;
                    })

                    return newPlayer;

                }
            })
        }
    }

}

module.exports = resolvers;





// updatePlayer(parent, { id, description, url }) {
        //     const index = players.findIndex(player => player.id === id);
        //     if (url) {
        //         players[index].url = url
        //     }
        //     if (description) {
        //         players[index].description = description
        //     }
        //     return players[index];
        // },
        // deletePlayer(parent, { id }) {
        //     const index = players.findIndex(player => player.id === id);
        //     players.splice(index, 1);
        //     return players[index];
        // }
    // }

    // getPlayer: (parent, { id }, ctx, info) => {
    //     return players.find(player => players.id === id);
    // }