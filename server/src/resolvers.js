const resolvers = {
    Query: {
        players(parent, args, { prisma }, info) {
            return prisma.query.players({}, info); 
        },
        habitats(parent, args, { prisma }, info) {
            return prisma.query.habitats({}, info)
        },
        alliances(parent, args, { prisma }, info) {
            return prisma.query.alliances({}, info)
        },
    },
    Mutation: {
        async createPlayer(parent, args, { prisma, db }, info) {
            const promises = db.players.list.map(async player => {
                let newDB = await prisma.mutation.createPlayer({ 
                    data: {
                    number: player.id,
                    nick: player.nick,
                    alliance:{
                        connect:{
                            number: player.allianceID
                        }
                    }
                }}, info)
                return newDB;
            })
            return await Promise.all(promises)
        },
        async createAlliance(parent, args, { prisma, db}, info) {
            const promises = db.alliances.list.map(async alliance => {
                let newDB =  await prisma.mutation.createAlliance({ 
                    data: {
                        number: alliance.id,
                        name: alliance.name,
                        points: alliance.points
                    }}, info);
                return newDB;
            })
            return await Promise.all(promises);
        },
        async createHabitat(parent, args, { prisma, db}, info) {
            const promises = db.habitats.list.map(async habitat => {
                let newDB = await prisma.mutation.createHabitat({ 
                    data: {
                        number: habitat.id,
                        mapX: habitat.mapX,
                        mapY: habitat.mapY,
                        creationDate: habitat.creationDate,
                        player:{
                            connect:{
                                number: habitat.playerID
                            }
                        }
                    }}, info);
                return newDB;
            })
            return await Promise.all(promises);
        },
        async deletePlayer(parent, { number }, {prisma}, info) {
            return prisma.mutation.deletePlayer({ where: { number } }, info)
        },
        async deleteAlliance(parent, { number }, {prisma}, info) {
            return prisma.mutation.deleteAlliance({ where: { number } }, info)
        },
        async deleteHabitat(parent, { number }, {prisma}, info) {
            return prisma.mutation.deleteHabitat({ where: { number } }, info)
        },
    }
};


module.exports.resolvers = resolvers;

