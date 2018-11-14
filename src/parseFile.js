// const cheerio = require('cheerio');

// module.exports = page => {
//     // param page is the res from the getPage function
//     try {
//         const $ = cheerio.load(page);
//         const rating = $('.rating-info .i-stars').attr('title').trim();
//         const reviewCount = $('.rating-info .review-count').text().trim();
//         const yelpData = {
//             rating,
//             reviewCount
//         }
//         return Promise.resolve(yelpData);
//     } catch (err) {
//         return Promise.reject(`Error parsing page: ${JSON.stringify(err)}`)
//     }
// };