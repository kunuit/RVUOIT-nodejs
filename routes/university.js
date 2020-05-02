var express = require('express');

const connectDB = require('../connection')
const uniController = require('../controller/university.controller')
const infoRVController = require('../controller/infoRV.controller')
const checkAuth  = require('../middleware/checkAuth')

var router = express.Router();

connectDB()

/* GET users listing. */
router.get('/demo', function(req, res, next) {
  res.send('respond with a resource');
});

// tạo thêm một trường mới
router.post('/',checkAuth,  uniController.createOne)
// lấy hết thông tin của các trường đã được tạo
router.get('/', uniController.getAll)
//  xóa đi 1 trường theo params _id
router.delete('/:_id',checkAuth, uniController.deleteOne)
// post review của trường đó
router.post('/:IDUni', infoRVController.createOne)
// lấy hết thông tin review của 1 trường theo params
router.get('/:IDUni', infoRVController.getAll)
//  xóa đi 1 review trong trường theo params _id
router.delete('/:IDUni/:_id',checkAuth, infoRVController.deleteOne)
module.exports = router;
