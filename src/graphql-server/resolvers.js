const resolvers = {
    Query: {
        players(parent, args, { prisma }, info) {
            return prisma.query.players({}, info); //prisma takes 2 arguments: operations arg & selection set: in this case, operations arg is an empty object, we can also pass in 'null'
        },
        player(parent, { id }, { prisma }, info) {
            return prisma.query.player({ where: {id} }, info);
        }
    },
    Mutation: {
        async createPlayer(parent, { id, nickname, habitat }, { prisma, db }, info) {
            return prisma.mutation.createPlayer({
                data: {
                    id:
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

// mutation{
//     createPlayer(data:{
//       nickname: "Anh"
//       habitatArray:{
//         create: [
//           {
//           mapX:100
//             mapY:200
//         }
//           {
//           mapX:200
//             mapY:300
//         }
//           {
//           mapX:150
//             mapY:250
//         }
//         ]}
//     }){
//       nickname
//       habitatArray{
//         id
//         mapX
//         mapY
//       }
//     }
//   }