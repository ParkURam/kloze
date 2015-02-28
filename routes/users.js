var express = require('express');
var router = express.Router(); 
var userFunction = require('./userFunction');
var postFunction = require('./postFunction');
var fs = require('fs');
var multer = require('multer');
var path = require('path');


//사용자 개인 설정 페이지
router.get('/information', function(req, res, next) {

  //req.body 유저 정보 확인
  userFunction.getUserInfo(req, res, function(err, result){

    if(err){
      // 유저정보 전송+페이지(메인페이지)
      res.redirect('/');
    }else{
      console.log('userinfo : ', result);
      // 유저정보 전송+페이지
      var user = {
        email : result[0].email,
        domain : result[0].domain,
        facebook : result[0].facebook,
        twitter : result[0].twitter
      }
      res.render('information', {user : user});
    }

  });
});

// 사용자 개인 설정 페이지 수정
router.post('/update', function(req, res, next) {

  //req.body 유저 정보 확인
  userFunction.update(req, res, function(err, result){


    // 변경 결과 확인
    if(err){
      res.json('변경 에러 : ', err);
    }else{
      res.json('변경 정상 : ', result);
    }

    // 유저결과 재전송
  });
});

// 팔로우 팔로잉 정보
router.get('/relationship', function(req, res, next) {

  //req.body 유저 정보 확인
  userFunction.findRelation(req, res, function(err, result){

    // 유저정보 전송+페이지
    console.log('result : ', result);
    if(err){
      res.json('가져오기 에러 : ', err);
      //res.render('user', { id: id });
    }else{
      res.json('가져오 정상 : ', result);
      //res.render('fllow', { result: result });
    }

  });
});

// 팔로우 팔로잉 정보
router.post('/relationship', function(req, res, next) {

  //req.body 유저 정보 확인
  userFunction.fllowRelation(req, res, function(err, result){

    // 유저정보 전송+페이지
    console.log('result : ', result);
    if(err){
      res.json('가져오기 에러 : ', err);
      //res.render('user', { id: id });
    }else{
      res.json('가져오 정상 : ', result);
      //res.render('fllow', { result: result });
    }

  });
});

// 팔로잉 삭제
router.delete('/relationship', function(req, res, next) {

  //req.body 유저 정보 확인
  userFunction.fllowDelRelation(req, res, function(err, result){

    // 유저정보 전송+페이지
    console.log('result : ', result);
    if(err){
      res.json('가져오기 에러 : ', err);
      //res.render('user', { id: id });
    }else{
      res.json('가져오 정상 : ', result);
      //res.render('fllow', { result: result });
    }

  });
});

// 북마크 히스토리 가져오기
router.get('/history/bookmark', function(req, res, next){

  postFunction.historyBookmarkList(req, res, function(err, result){
        res.json({err : err, result : result});
  });
  
});

// 북마크 히스토리 가져오기
router.get('/history/all', function(req, res, next){

  postFunction.historyAllList(req, res, function(err, result){
        res.json({err : err, result : result});
  });
  
});

module.exports = router;
