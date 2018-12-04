const { jsonArrs } = require('../../src');


const getDB = async () => {
    let players = [];
    let habitats = [];
    let alliances = [];

    let promise = await jsonArrs();
    let arrays = await Promise.all(promise.map(i => {
        if (i.title === '209-players.json') {
            return players = i.list;
        }
        if (i.title === '209-habitats.json') {
            return habitats = i.list;
        }
        if (i.title === '209-alliances.json') {
            return alliances = i.list
        }
    }))

    
    .then(() => {
        const db = {
            players,
            habitats,
            alliances
        }
        return db
    })
};

console.log(getDB());

// module.exports = getDB;
