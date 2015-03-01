var express = require('express');
var router = express.Router();
var userFunction = require('./userFunction');
var postFunction = require('./postFunction');
/* GET home page. */
// router.get('/', function(req, res) {
// 	res.render('user', { id: 'dddd' });
//   //res.render('index', { title: 'Express' });
// });

router.get('/newpost', function(req, res, next) {
  postFunction.getNewPost(req, res, function(err, result){
    if(err){
      res.render('postEdit', { err : err });
    }else{
      //result[0].category = result[0].category.split(',');
      console.log('category : ', result[0]);
      res.render('postEdit', { user : result[0] });
    }
  });
});

// 새글 저장
router.put('/newpost', function(req, res, next) {
  // 저장
  postFunction.putNewPost(req, res, function(err, result){
      if(err){

      }else{
        res.json({ result : result});
      }
    });
});

// 임시저장
router.post('/newpost', function(req, res, next) {
  // 임시저장
  postFunction.putTempPost(req, res, function(err, result){
      if(err){

      }else{
        res.json({ result : result});
      }
    });
});

router.get('/templist', function(req, res, next) {
  postFunction.getTempPost(req, res, function(err, result){
    res.json({err : err, result : result});
  });
});

router.get('/history', function(req, res, next) {
  postFunction.getPostHistory(req, res, function(err, result){
        res.json({err : err, result : result});
  });
});

router.put('/read', function(req, res, next) {
  postFunction.putPostRead(req, res, function(err, result){
        res.json({err : err, result : result});
  });
});

router.put('/bookmark', function(req, res, next) {
  postFunction.putPostBookmark(req, res, function(err, result){
        res.json({err : err, result : result});
  });
});

router.put('/like', function(req, res, next) {
  postFunction.putPostLike(req, res, function(err, result){
        res.json({err : err, result : result});
  });
});

router.delete('/', function(req, res, next) {
  next(new Error('not implemented'));
})



module.exports = router;
