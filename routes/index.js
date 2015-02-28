var express = require('express');
var router = express.Router();

/* GET home page. */
// router.get('/', function(req, res) {
// 	res.render('user', { id: 'dddd' });
//   //res.render('index', { title: 'Express' });
// });

router.route('/')
.all(function(req, res, next) {
  // 첫 메인 페이지 보여주기~
  console.log('all');
  next();
})
.get(function(req, res, next) {

  res.render('index', { title: 'Express' });
})
.put(function(req, res, next) {
  // just an example of maybe updating the user
  req.user.name = req.params.name;
  // save user ... etc
  res.json(req.user);
})
.post(function(req, res, next) {
  next(new Error('not implemented'));
})
.delete(function(req, res, next) {
  next(new Error('not implemented'));
})



module.exports = router;
