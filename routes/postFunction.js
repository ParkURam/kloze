
var async = require('async');
var mongoDbConnection = require('./mongoConnection.js');
var blozeUserComm = require("./blozeUserComm.js");
var blozeComm = require("./blozeComm.js");
var mysqlQuery = require("./mysqlQuery.js");
var events = require('events');
var util = require('util');

var Common = function(){
    events.EventEmitter.call(this); // call super class constructor
 
};
// This is object that generate(emit) events

util.inherits(Common,events.EventEmitter);

// 포스트 스끼
Common.prototype.getNewPost = function(req, res, callback){

  // 옵션 설정
  var options = [req.session.user_id];

  options = 'b43a6ae0-bcb4-11e4-945a-cb211b311fe2';
  console.log('postfunction getNewPost 접속');
  // 쿼리문 던지기
  blozeComm.sendQuery(mysqlQuery.getUserCategory(), options, function(err, result){
    callback(err, result);
  });
};

// 포스트 메인 정보 업데이트
Common.prototype.userMainupdate = function(req, res, callback){

  // 옵션 설정
 var options;

  blozeComm.getUserMain(req, function(user){
      //options = [user, req.session.user_id];
      console.log('use : ', user);
      options = [user, 'b43a6ae0-bcb4-11e4-945a-cb211b311fe2'];
  });

  // 쿼리문 던지기
  blozeComm.sendQuery(mysqlQuery.userMainupdate(), options, function(err, result){
    console.log('err : ', err);
    console.log('result : ', result);
    callback(err, result);
  });
};

// 카테고리 포스트 가져오기
Common.prototype.getCategoryPost = function(req, res, callback){
  req.session.user_id = '563e2fe0-b9b6-11e4-a5ae-fb70400c303c';
  // 옵션 설정
  var postModel;
  var options;

  blozeComm.post_model(req, function(model){
    postModel = model;
    options = {
      user_id : req.session.user_id,
      category : req.body.info
    }
   });
   
   blozeComm.findPostList(postModel, options, function(err, postList){
      console.log('postList : ', postList);
     callback(err, postList);
   });
  
};

// 카테고리 포스트 가져오기
Common.prototype.getTempPost = function(req, res, callback){
  req.session.user_id = '563e2fe0-b9b6-11e4-a5ae-fb70400c303c';
  // 옵션 설정
  var postModel;
  var options;

  blozeComm.post_model(req, function(model){
    postModel = model;
    options = {
      user_id : req.session.user_id,
      temp_save : true
    }
   });
   
   blozeComm.findPostList(postModel, options, function(err, postList){
      console.log('postList : ', postList);
     callback(err, postList);
   });
  
};

// 포스트 가져오기
Common.prototype.getPost = function(req, res, callback){
  req.session.user_id = '563e2fe0-b9b6-11e4-a5ae-fb70400c303c';
  // 옵션 설정
  var postModel;
  var options;

  blozeComm.post_model(req, function(model){
    postModel = model;
    options = {
      user_id : req.session.user_id,
      post_id : req.body.info
    }
   });
   
   blozeComm.findPostList(postModel, options, function(err, postList){
     callback(err, postList);
   });
  
};

// 포스트 히스토리 가져오기
Common.prototype.getPostHistory = function(req, res, callback){
  req.session.user_id = '563e2fe0-b9b6-11e4-a5ae-fb70400c303c';
  // 옵션 설정
  var postModel;
  var options;
  blozeComm.post_model(req, function(model){
    postModel = model;
    options = {
      user_id : req.session.user_id,
    }
   });
   blozeComm.findPostList(postModel, options, function(err, postList){
     callback(err, postList);
   });
  
};
// 포스팅 글 저장

Common.prototype.putNewPost = function(req, res, callback){
  var postModel;
  var options;
  req.session.user_id = '563e2fe0-b9b6-11e4-a5ae-fb70400c303c';

  blozeComm.newPostModel(req, function(obj){
    options = [
      {post_id : obj.post_id},
      obj
    ];

  });
  blozeComm.post_model(req, function(model){
    postModel = model;
  });
  
  blozeComm.upsertPostList(postModel, options, function(err, postList){
    callback(err, postList);
  });
};

// 포스팅 글 임시 저장
Common.prototype.putTempPost = function(req, res, callback){
  var postModel;
   var options;
   req.session.user_id = '563e2fe0-b9b6-11e4-a5ae-fb70400c303c';

   blozeComm.postTempModel(req, function(obj){
     options = [
       {post_id : obj.post_id},
       obj
     ];
   });

   blozeComm.post_model(req, function(model){
     postModel = model;
   });
   
   blozeComm.upsertPostList(postModel, options, function(err, postList){
     callback(err, postList);
   });
};

// 포스팅 읽음 정보 저장
Common.prototype.putPostRead = function(req, res, callback){
  var postModel;
  var options;
   req.session.user_id = '563e2fe0-b9b6-11e4-a5ae-fb70400c303c';
   blozeComm.postReadModel(req, function(obj){
      options = obj;
   });

   blozeComm.post_model(req, function(model){
     postModel = model;
   });
   blozeComm.findPostList(postModel, {post_id : req.body.post_id}, function(err, post){
      var read_information = [];

      read_information = post[0].read_information;
      read_information.push(options);

      post[0].read_information = read_information;
      options = [
        {post_id : req.body.post_id},
        {read_information : read_information}
      ]
      blozeComm.upsertPostList(postModel, options, function(err, postList){
        callback(err, postList);
      });
   });
};

// 포스팅 북마크 하기
Common.prototype.putPostBookmark = function(req, res, callback){
  var postModel;
  var options;
   req.session.user_id = '563e2fe0-b9b6-11e4-a5ae-fb70400c303c';
   blozeComm.postBookmarkModel(req, function(obj){
      options = obj;
   });

   blozeComm.post_model(req, function(model){
     postModel = model;
   });
   blozeComm.findPostList(postModel, {post_id : req.body.post_id}, function(err, post){
      var bookmark = [];

      bookmark = post[0].bookmark;
      bookmark.push(options);

      post[0].bookmark = bookmark;
      options = [
        {post_id : req.body.post_id},
        {bookmark : bookmark}
      ]
      blozeComm.upsertPostList(postModel, options, function(err, postList){
        callback(err, postList);
      });
   });
};

// 포스팅 좋아요 하기
Common.prototype.putPostLike = function(req, res, callback){
  var postModel;
  var options;
   req.session.user_id = '563e2fe0-b9b6-11e4-a5ae-fb70400c303c';
   blozeComm.postLikeModel(req, function(obj){
      options = obj;
   });

   blozeComm.post_model(req, function(model){
     postModel = model;
   });
   blozeComm.findPostList(postModel, {post_id : req.body.post_id}, function(err, post){
      var like_information = [];

      like_information = post[0].like_information;
      like_information.push(options);

      post[0].like_information = like_information;
      options = [
        {post_id : req.body.post_id},
        {like_information : like_information}
      ]
      blozeComm.upsertPostList(postModel, options, function(err, postList){
        callback(err, postList);
      });
   });
};

// 멤버 정보 보기
Common.prototype.selectUser = function(req, res, callback){
  var userModel;
  console.log('dddd : ', req.body);
  blozeComm.userInfo(req, function(model){
    blozeComm.chkModel(model,function(result){
      userModel = result;
    });
  });

  //delete memberModel.member_key;
  // 멤버 아이디 쿼리문 작성
  var query = 'UPDATE userAdd SET ?, update_time = now() WHERE user_id = ?'
  // 옵션 설정
  var options = [userModel, req.body.user_id];
  // 쿼리문 던지기
  blozeComm.sendQuery(query, options, function(err, result){
    callback(err, result);
  });
};


// 멤버 정보 업데이트
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

// 검색 포스트 가져오기
Common.prototype.searchPostList = function(req, res, callback){
  // 옵션 설정
  var postModel;
  var options;

  blozeComm.post_model(req, function(model){
    postModel = model;
    options = {
      category : { '$in' : req.body.search}
    }
   });
   
   blozeComm.findPostList(postModel, options, function(err, postList){
     callback(err, postList);
   });
  
};

Common.prototype.historyBookmarkList = function(req, res, callback){
  // 옵션 설정
  var postModel;
  var options;
  req.session.user_id = 'cccc';
  blozeComm.post_model(req, function(model){
    postModel = model;
    options = {
      'bookmark.bookmark_id' : req.session.user_id
    }
   });
   blozeComm.findPostList(postModel, options, function(err, postList){
     callback(err, postList);
   });
  
};

Common.prototype.historyAllList = function(req, res, callback){
  // 옵션 설정
  var postModel;
  var options;
  req.session.user_id = '563e2fe0-b9b6-11e4-a5ae-fb70400c303c';
  blozeComm.post_model(req, function(model){
    postModel = model;
    options = {
      user_id : req.session.user_id
    }
   });

   blozeComm.findPostList(postModel, options, function(err, postList){
     callback(err, postList);
   });
  
};

var common = new Common();

module.exports = common;
