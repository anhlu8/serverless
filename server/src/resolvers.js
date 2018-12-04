// require('dotenv').config()
// const bcrypt = require('bcryptjs');
// const jwt = require('jsonwebtoken');
// const { jsonArrs } = require('../../src');

const resolvers = {
    Query: {
        players(parent, args, { prisma }, info) {
            return prisma.query.players({}, info); 
        },
        player(parent, { id }, { prisma }, info) {
            return prisma.query.player({ where: { id } }, info);
        },
        habitats(parent, args, { prisma }, info) {
            return prisma.query.habitats({}, info)
        },
        habitat(parent, { id }, { prisma }, info) {
            return prisma.query.habitat({ where: { id } }, info)
        },
        alliances(parent, args, { prisma }, info) {
            return prisma.query.alliances({}, info)
        },
        alliance(parent, { id }, { prisma }, info) {
            return prisma.query.alliance({ where: { id } }, info)
        }
    },
    Mutation: {
        async createPlayer(parent, args, { prisma, db}, info) {
            db.players.list.map(i => {
                return prisma.mutation.createPlayer({ data: {
                    id: i.id,
                    nick: i.nick
                }}, info)
            })
        },
        async createAlliance(parent, args, { prisma, db}, info) {
            db.alliances.list.map(i => {
                return prisma.mutation.createAlliance({ data: {
                    id: i.id,
                    name: i.name,
                    points: i.points
                }}, info)
            })
        },
        async createHabitat(parent, args, { prisma, db}, info) {
            db.habitats.list.map(i => {
                return prisma.mutation.createHabitat({ data: {
                    id: i.id,
                    mapX: i.mapX,
                    mapY: i.mapY,
                    creationDate: i.creationDate
                }}, info)
            })
        },
        // async signup(parent, {email, password}, { prisma, db }, info){
        //     const encryptedPassword = await bcrypt.hash(password, 10);
        //     const user = await prisma.mutation.createUser({
        //         data:{
        //             email,
        //             password: encryptedPassword
        //         }
        //     }, `{id}`);
        //     const token = jwt.sign({userId: user.id}, process.env.APP_SECRET);
        //     return {
        //         token,
        //         user
        //     }
        // },
        // async login(parent, {email, password}, { prisma, db }, info){
        //     const user = await prisma.query.user({
        //         where:{
        //             email
        //         }
        //     }, `{id password}`);
        //     if (!user){
        //         throw new Error('No such a user')
        //     }
        //     const valid = await bcrypt.compare(password, user.password);
        //     if (!valid){
        //         throw new Error('Invalid password')
        //     }
        //     const token = jwt.sign({userId: user.id}, process.env.APP_SECRET);
        //     return {
        //         token,
        //         user
        //     }
        // },
    },
};


module.exports = resolvers;

