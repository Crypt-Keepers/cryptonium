const router = require('express').Router();
const controller = require('./controllers');

router.get('/range', controller.range.get);
router.get('/ticker', controller.ticker.get);
router.get('/search', controller.search.get);
router.get('/user', controller.user.get);
router.post('/user', controller.user.post);


module.exports = router;
