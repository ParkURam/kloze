
var async = require('async');
var mongoDbConnection = require('./mongoConnection.js');
var blozeUserComm = require("./blozeUserComm.js");
var blozeComm = require("./blozeComm.js");
var mysqlQuery = require("./mysqlQuery.js");
var events = require('events');
var util = require('util');

var session_id = 'b43a6ae0-bcb4-11e4-945a-cb211b311fe2';
var Common = function(){
    events.EventEmitter.call(this); // call super class constructor
 
};
// This is object that generate(emit) events

util.inherits(Common,events.EventEmitter);

// 멤버 정보 보
Common.prototype.getUserInfo = function(req, res, callback){
  
  // 옵션 설정
  var options = [req.session.user_id];

  options = session_id;
  // 쿼리문 던지기
  blozeUserComm.sendQuery(mysqlQuery.getUserInfo(), options, function(err, result){
    callback(err, result);
  });
};

// 사용자 개인 설정 페이지 수정
Common.prototype.update = function(req, res, callback){
  var userModel;
  blozeUserComm.userInfo(req, function(model){
    blozeUserComm.chkModel(model,function(result){
      userModel = result;
    });
  });

  // 옵션 설정
  var options = [userModel, req.body.user_id];
  // 쿼리문 던지기
  blozeUserComm.sendQuery(mysqlQuery.updateUserAdd(), options, function(err, result){
    callback(err, result);
  });
};


// 사용자 메인 페이지 정보 가져오기
Common.prototype.getUserMain = function(req, res, callback){
  
  // 옵션 설정
  var options = [req.session.user_id];

  options = session_id;
  // 쿼리문 던지기
  blozeUserComm.sendQuery(mysqlQuery.getUserMain(), options, function(err, result){

    callback(err, result);
  });
};

// 사용자 메인 페이지 정보 수정
Common.prototype.userMainupdate = function(req, res, callback){
  var userModel;
  blozeUserComm.getUserMain(req, function(model){
    blozeUserComm.chkModel(model,function(result){
      userModel = result;
    });
  });

  // 옵션 설정
  var options = [userModel, req.body.user_id];
  // 쿼리문 던지기
  blozeUserComm.sendQuery(mysqlQuery.userMainupdate(), options, function(err, result){
    callback(err, result);
  });
};


// 팔로우 하기
Common.prototype.fllowRelation = function(req, res, callback){

  var fllowModel;
  var options = [
      {user_id : session_id},
      {fllowing : ['aaa','bbb']}
  ]
  // var options = [
  //   {user_id : req.session.user_id},
  //   {fllowing : req.body.user_id}

  // ]

  blozeUserComm.fllow_model(req, function(model){
    fllowModel = model;
  });
  
  blozeUserComm.fllowRelation(fllowModel, options, function(err, result){
      callback(err, result);
  });;
};

// 팔로우 지우기
Common.prototype.fllowDelRelation = function(req, res, callback){

  var fllowModel;
  var options = [
      {user_id : session_id},
      {fllowing : 'aaa'}
  ]
  // var options = [
  //   {user_id : req.session.user_id},
  //   {fllowing : req.body.user_id}

  // ]

  blozeUserComm.fllow_model(req, function(model){
      fllowModel = model;
  });
  
  blozeUserComm.fllowDelRelation(fllowModel, options, function(err, result){
      callback(err, result);
  });;
};


// 팔로우 찾기
Common.prototype.findRelation = function(req, res, callback){
  // var fllowModel;
  // var options = {
  //   user_id : req.session.user_id
  // }
  // blozeUserComm.fllow_model(req, function(model){
  //   fllowModel = model;
  //   console.log('fllowModel : ', fllowModel);
  //   blozeUserComm.findRelation(fllowModel, options, function(err, result){ 
  //     callback(err, result);
  //   });
  // });

  var fllowModel;
  var options = {
    user_id : session_id
  };

  var temp = {}; // json 수정 temp 객체
  var resultList = new Array();// 보낼 JSON

  blozeUserComm.fllow_model(req, function(model){
    console.log('model : ', model);
    fllowModel = model;
  });
  
  blozeUserComm.findRelation(fllowModel, options, function(err, result){
      callback(err, result);
  });;
};

Common.prototype.imageUpload = function(req, res, callback){
  //path": "images/aaaa/f325a72870fe29bca43cd82c0c54e009.jpg"

  // 옵션 설정
  var options;

  req.session.user_id = session_id;

  var imageModel;
  // post_img, profile_img, bg_img 등 받고 모델 만들기
  blozeComm.imageModel(req, function(obj){
    blozeComm.chkModel(obj, function(model){
      imageModel = model;
      if(imageModel.post_img != undefined){
        // 포스트는 캐시 확인 blozeComm
        callback(null, imageModel.post_img.path);
      }else if(imageModel.profile_img != undefined){
        // 옵션 설정
        var path = imageModel.profile_img.path;
        options = [{profile_img : path}, req.session.user_id];
        // 쿼리문 던지기
        blozeUserComm.sendQuery(mysqlQuery.userMainupdate(), options, function(err, result){
          result.path =  imageModel.profile_img.path;
          callback(err, result.path);
        });

      }else if(imageModel.bg_img != undefined){
        callback(null, imageModel.bg_img.path);
      }

    });
  })
};

var common = new Common();

module.exports = common;