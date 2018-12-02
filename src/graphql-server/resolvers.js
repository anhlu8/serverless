require('dotenv').config()
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const resolvers = {
    Query: {
        players(parent, args, { prisma }, info) {
            return prisma.query.players({}, info); //prisma takes 2 arguments: operations arg & selection set: in this case, operations arg is an empty object, we can also pass in 'null'
        },
        player(parent, { id }, { prisma }, info) {
            return prisma.query.player({ where: { id } }, info);
        },
        habitats(parent, args, {prisma}, info){
            return prisma.query.habitats({}, info)
        },
        habitat(parent, { id }, {prisma}, info){
            return prisma.query.habitat({where: {id}}, info)
        },
        alliances(parent, args, {prisma}, info){
            return prisma.query.alliances({}, info)
        },
        alliance(parent, { id }, {prisma}, info){
            return prisma.query.alliance({where: {id}}, info)
        }
    },
    Mutation: {
        async createPlayer(parent, args, { prisma, db }, info) {
            await db.map(i => {
                if (i.title === '209-players.json') {
                    i.list.map(j => {
                        return prisma.mutation.createPlayer({
                            data: {
                                id: j.id,
                                nickname: j.nick
                            },
                        },
                            info
                        )
                    })
                }
            })
        },
        async createAlliance(parent, args, { prisma, db }, info){
            await db.map(i => {
                if (i.title === '209-alliances.json') {
                    i.list.map(j => {
                        return prisma.mutation.createAlliance({
                            data: {
                                id: j.id,
                                name: j.name,
                                points: j.points
                            },
                        },
                            info
                        )
                    })
                }
            })
        },
        async createHabitat(parent, args, { prisma, db }, info){
            await db.map(i => {
                if (i.title === '209-habitats.json') {
                    i.list.map(j => {
                        return prisma.mutation.createHabitat({
                            data: {
                                id: j.id,
                                mapX: j.mapX,
                                mapY: j.mapY,
                                creationDate: j.creationDate
                            },
                        },
                            info
                        )
                    })
                }
            })
        },
        async signup(parent, {email, password}, { prisma, db }, info){
            const encryptedPassword = await bcrypt.hash(password, 10);
            const user = await prisma.mutation.createUser({
                data:{
                    email,
                    password: encryptedPassword
                }
            }, `{id}`);
            const token = jwt.sign({userId: user.id}, process.env.APP_SECRET);
            return {
                token,
                user
            }
        },
        async login(parent, {email, password}, { prisma, db }, info){
            const user = await prisma.query.user({
                where:{
                    email
                }
            }, `{id password}`);
            if (!user){
                throw new Error('No such a user')
            }
            const valid = await bcrypt.compare(password, user.password);
            if (!valid){
                throw new Error('Invalid password')
            }
            const token = jwt.sign({userId: user.id}, process.env.APP_SECRET);
            return {
                token,
                user
            }
            
        },
       

        
    }
};

module.exports = resolvers;
