var express = require('express');
var router = express.Router();
var userFunction = require('./userFunction.js');

var postFunction = require('./postFunction.js');

// 사용자 메인 페이지 정보 가져오기
router.get('/', function(req, res){
  console.log('기본 들어옴');
  var resultArray = req.originalUrl.split('/').length;
  console.log('resultArray : ', resultArray);

  // 분기 처리
  if(resultArray == 2){ // 사용자 메인페이지 가기
    userFunction.getUserMain(req, res, function(err, result){
      console.log('getUserMain result : ', result);
    
      var user = result[0];
      // 카테고리 배열로 변경
      user.category = user.category.split(',');

      res.render('main', { 'user': user });
    });
  }else if(resultArray == 3){ // 카테고리 목록
    var domainUrl = req.originalUrl.split('/@')[2];
    // 정보 불러오기
    req.body.info = domainUrl;
    postFunction.getCategoryPost(req, res, function(err, result){
      res.json({err : err, result : result});
    })

  }else if(resultArray == 4){ // 글보기
    console.log('글보기');
    var domainUrl = req.originalUrl.split('/')[3];
    // 정보 불러오기
    req.body.info = domainUrl;
    console.log('req.body.info : ', req.body.info);
    postFunction.getPost(req, res, function(err, result){
      res.json({err : err, result : result});
    })
  }

});

// 사용자 메인 페이지 정보 수정
router.post('/', function(req, res){
  // 정보 가져오기
  console.log('안들어오나??');
  // 변경 결과 전송
  //req.body 유저 정보 확인
  userFunction.userMainupdate(req, res, function(err, result){

    // 변경 결과 확인
    if(err){
      res.json('변경 에러 : ', err);
    }else{
      res.json('변경 정상 : ', result);
    }

    // 유저결과 재전송
  });

});

module.exports = router;


