const resolvers = {
    Query: {
        players(parent, args, { prisma }, info) {
            return prisma.query.players({}, info);
        },
        player(parent, { id }, { prisma }, info) {
            return prisma.query.player({ id }, info);
        }
    },
    Mutation: {
        async createPlayer(parent, { id, nickname, habitat }, { prisma, db }, info) {
            return prisma.mutation.createPlayer(
                {
                    data: {
                        id,
                        nickname,
                        habitat
                    },
                },
                info
            )
        },
    }
};

module.exports = resolvers;