var express = require('express');
var router = express.Router();

const signController = require('../controller/sign.controller')
const checkAuth = require('../middleware/checkAuth')

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

// signup
router.post('/signup', signController.signup)
// signIn
router.post('/signIn', signController.signIn)
// accept acc to admin
router.get('/accept', checkAuth, signController.acceptToAdmin)


module.exports = router;
