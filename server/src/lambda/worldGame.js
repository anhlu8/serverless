const urls = ['http://public-data.lordsandknights.com/LKWorldServer-RE-US-1/alliances.json.gz', 'http://public-data.lordsandknights.com/LKWorldServer-RE-US-1/players.json.gz', 'http://public-data.lordsandknights.com/LKWorldServer-RE-US-1/habitats.json.gz'];
const name = ['alliances', 'players', 'habitats']


const worldGame = async () => {
    let worldList = []
    await urls.map(url => {
        name.map(e => {
            if (url.match(e)) {
                const world = {
                    'title': `209-${e}`,
                    'url': url
                };
                worldList.push(world);
            }
        })
    })
    
    return worldList;
};
module.exports = worldGame;