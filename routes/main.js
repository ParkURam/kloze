var express = require('express');
var router = express.Router();
var postFunction = require('./postFunction.js');

// 처음 검색
router.get('/:search', function(req, res, next) {
  console.log('req.param : ', req.params);
  // post option 설정
  postFunction.searchPostList(req, res, function(err, result){
    res.json({err : err, result : result});

    // 사용자 정보 가져오기

  });
});

// 지속적으로 찾기
router.post('/search', function(req, res, next) {
  console.log('req.body : ', req.body.search);

  var searchArray = new Array();

  searchArray = req.body.search.split(',');

  console.log('searchArray : ', searchArray);
  req.body.search = searchArray;

  console.log('body search : ', req.body.search);
  // post option 설정
  postFunction.searchPostList(req, res, function(err, result){
    res.json({err : err, result : result});

    // 사용자 정보 가져오기

  });
});


module.exports = router;