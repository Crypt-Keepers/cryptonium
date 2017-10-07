const router = require('express').Router();
const controller = require('./controllers');

router.get('/range', controller.range.get);
router.get('/ticker', controller.ticker.get);
// router.get('/sma', controller.sma.get);

router.get('/search', controller.search.get);
router.get('/list', controller.list.get);
router.post('/list', controller.list.post);


router.get('/user', controller.user.get);
router.post('/user', controller.user.post);

// app.get('/', () => {
//   // All 3 daily coin data
//   // Trending news in date order
//   // req.body: {username: <string>}
//   // If username exists, only send back watchlist coin data
//   // if watch list is empty, send back all 3.
// });

// app.get('/range', () => {
//   // get time series data which will be passed in
//   // req.body: { coin: <coin id>, dateStart: <milliseconds>, dateEnd: <milliseconds>}
//   // Send back coin data with NO metadata
// });

router.get('/ticker', controller.ticker.get);

// app.get('/search', () => {
//   // get news for specific coin
//   // req.body: {coin: <coin id>}
//   // Send back news in date order
// });


// app.post('/list', () => {
//   // Add coin to user's watchlist in DB
//   // req.body: {username: <string>, coin: <coin id> }
// });

// app.get('/list', () => {
//   // Retrieve news stories for only coins on user's list
//   // req.body: { username: <string> }
//   // Send back news in date order
// });



module.exports = router;
