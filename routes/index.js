var express = require('express');
const home = require('../controllers/home');
var router = express.Router();


/* GET home page. */
router.get('/', home.home);
router.get('/videos', home.videos);




module.exports = router;
