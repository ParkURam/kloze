var events = require('events');
var util = require('util');
var mysqPoolConnection = require('./mysqlConnection.js');
var mysql = require('mysql');
var mongoDbConnection = require('./mongoConnection.js');
var mongoose = require('mongoose');
var mysqlQuery = require('./mysqlQuery.js');
var uuid = require('uuid');
var async = require('async');
var Schema = mongoose.Schema;

// this is listener


var Common = function(){
    events.EventEmitter.call(this); // call super class constructor
 
};
// This is object that generate(emit) events

util.inherits(Common,events.EventEmitter);

// session 사용자 정보 입력
Common.prototype.setSession = function(req, res, info, callback){

  var mysqlDbConnection = mysqPoolConnection;
  async.waterfall([
    function(callback){
      options = [
          info
        ];
       mysqlDbConnection.query(mysqlQuery.selectUserInfo(), options,function (err, result) {
         if (err) {
          console.log('err : ', err);
         }else{
          console.log('결과 확인 : ', result);
          callback(err, result);
         }
       });
    }
    ], function (err, result) {
      callback(req, res);
  })
}

Common.prototype.insertUser = function(info, callback){

  //console.log('insertUserinfo : ', info);
  var uuidKey = uuid.v1();
  var query;
  var options;
  var mysqlDbConnection = mysqPoolConnection;
  async.waterfall([
    function(callback){
      options = [
          uuidKey , info.facebook_profile.id, info.twitter_token
        ];
       mysqlDbConnection.query(mysqlQuery.selectUser(), options,function (err, result) {
         if (err) {
          console.log('err : ', err);
         }else{
          console.log('sel qeury result : ', result.length);
          callback(null, result.length);
         }
       });
    }
    ], function (err, result) {
     // console.log('result : ', result);
      if(result == 0){
        //req.session.user_id = uuidKey;
        options = [
           uuidKey, info.facebook_profile.id, info.twitter_token, info.facebook_profile.id, info.twitter_token
         ];
        mysqlDbConnection.query(mysqlQuery.authUser(), options,function (err, result) {
          if (err) {
           console.log('err : ', err);
          }else{
            options = [uuidKey, info.domain, info.name];
            mysqlDbConnection.query(mysqlQuery.insertUserInfo(), options, function(err, result){
              if (err) {
               console.log('err : ', err);
               callback();
             }else{
              //console.log('insert qeury userinfo result : ', result);
              callback();
             }
            });
          }
        });
      }else{
        // 사용자 정보 가져와서 session에 user_id 담기
        //req.session.user_id = result[0].user_id;
        console.log('기존 가입 되있음');  
        callback();
      }
      
  });
}

Common.prototype.selectUserInfo = function(info, callback){

  var mysqlDbConnection = mysqPoolConnection;
  console.log('select 입장!!!');
  console.log('info : ', info);
  async.waterfall([
    function(callback){
      options = [
          info.domainUrl
        ];
       mysqlDbConnection.query(mysqlQuery.selectUserInfo(), options,function (err, result) {
         if (err) {
          console.log('err : ', err);
         }else{
          console.log('결과 확인 : ', result);
          callback(err, result);
         }
       });
    }
    ], function (err, result) {
      callback(result[0]);
  })
}


Common.prototype.updateUserInfo = function(info){
  
  var query;
  var options;
  var mysqlDbConnection;

  async.waterfall([
    function(callback){
      mysqlDbConnection = mysqPoolConnection;
      callback(null);
    }
    ], function (err, result) {

     options = [
        info.profile_img, info.name, info.domain, info.release, info.introduction, info.bg_img, info.user_id
      ];

     mysqlDbConnection.query(mysqlQuery.updateUserInfo(), options,function (err, result) {
       if (err) {
        console.log('err : ', err);
       }else{
        console.log('qeury result : ', result);
        
       }
     });
  });
}


Common.prototype.userRelationship = function(user_id){
  
  var model;
    var options = {
      user_id : user_id
    };

    var temp = {}; // json 수정 temp 객체
    var resultList = new Array();// 보낼 JSON

    mongoQuery.fllow_model(req, function(model){
      model = model;
    });
    
    ayoCommon.findFllow(model, options, function(err, fllowList){
         if(err){
           res.json({result: 0, err : err});
         }else{
          // 친구 목록 에서 필요한 정보 가져오기
          console.log('fllowList');
          return fllowList;
         }
    });;
}


// this is listener
Common.prototype.postModel = function(req, callback) {
  var obj = {};
  obj.post_comm = req.body.member_id || null;
  obj.post_contents = req.body.member_key;
  obj.temp_save = req.body.member_pw;
  obj.post_date = req.body.member_name;
  obj.update_date = req.body.token_id;
  obj.post_title = req.body.phone_number;
  obj.post_sub = req.body.auth_code;
  obj.post_img = req.body.status_text;
  obj.memberInstantId = req.body.member_instantId;
  obj.type = req.body.type;
  obj.tokenStatus = req.body.token_status;

  if(callback){
    callback(obj);
  }
}

Common.prototype.member_Model = function(req, callback) {
  var obj = {};
  obj.member_id = req.body.member_id;
  obj.member_key = req.body.member_key;
  obj.member_pw = req.body.member_pw;
  obj.member_name = req.body.member_name;
  obj.token_id = req.body.token_id;
  obj.phone_number = req.body.phone_number;
  obj.auth_code = req.body.auth_code;
  obj.status_text = req.body.status_text;
  obj.member_instantId = req.body.member_instantId;
  obj.type = req.body.type;
  obj.token_status = req.body.token_status;

  if(callback){
    callback(obj);
  }
}

Common.prototype.memberOptModel = function(req, callback) {
  var obj = {};
  obj.memberKey = req.body.member_key;
  obj.infoFlag = req.body.info_flag;
  obj.emailFlag = req.body.email_flag;
  obj.phoneFlag = req.body.phone_flag;
  obj.searchFlag = req.body.search_flag;

  if(callback){
    callback(obj);
  }
}
Common.prototype.memberOpt_Model = function(req, callback) {
  var obj = {};
  obj.member_key = req.body.member_key;
  obj.info_flag = req.body.info_flag;
  obj.email_flag = req.body.email_flag;
  obj.phone_flag = req.body.phone_flag;
  obj.search_flag = req.body.search_flag;

  if(callback){
    callback(obj);
  }
}
var Post = new Schema({
  post_comm : String,
  post_contents : String,
  temp_save : Boolean,
  post_date : Date,
  update_date : Date,
  post_title : String,
  post_sub : String,
  post_img : String,
  read_information : [
    {read_id : String, read_date : Date, read_resttime : Date}
    ],
  tag : Boolean,
  like_information : [
    {like_id : String, like_date : Date}
  ],
  bookmark : [
    { bookmark_id : String, bookmark_date : Date }
  ],
  comment : [
    { comment_id : String, comment_date : Date, comment_contents : String }
  ]
});

var Fllow = new Schema({
  user_id : String,
  fllower : [String],
  fllowing : [String],
  friends : [String]
});


// POST 모델 생성
Common.prototype.post_model = function(req, callback){
  var Post = mongoose.model('Post', Post);
  if(callback){
    callback(Post);
  }
}

Common.prototype.fllow_model = function(req, callback){

  var Fllow = mongoose.model('Fllow', Fllow);
  if(callback){
    callback(Fllow);
  }
}

Common.prototype.findFllow = function (model, options,callback){

  model.find(options).sort('-updated_at').exec(
    function(err, friendsList) {
      callback(err, friendsList);
    });
}

Common.prototype.upsertFllow = function (model, options, callback){
  model.findOneAndUpdate(options[0], options[1] ,{upsert : true}).sort('-updated_at').exec(
    function(err, friendsList) {
      callback(err, friendsList);
    });
 
}

Common.prototype.findChatList = function (model, callback){

  FriendsModel.find(model).sort('-updated_at').exec(
    function(err, friendsList) {
      callback(err, friendsList);
    });
}

Common.prototype.upsertChatList = function (model, callback){

  FriendsModel.update({member_key: member_key}, {change : change_list} ,{upsert : true}).sort('-updated_at').exec(
    function(err, friendsList) {
      callback(err, friendsList);
    });
 
}

Common.prototype.findMsgList = function (model, callback){

  FriendsModel.find(model).sort('-updated_at').exec(
    function(err, friendsList) {
      callback(err, friendsList);
    });
}

Common.prototype.upsertMsgList = function (model, callback){

  FriendsModel.update({member_key: member_key}, {change : change_list} ,{upsert : true}).sort('-updated_at').exec(
    function(err, friendsList) {
      callback(err, friendsList);
    });
 
}

Common.prototype.upsertMemberList = function (model, callback){

  FriendsModel.update({member_key: member_key}, {change : change_list} ,{upsert : true}).sort('-updated_at').exec(
    function(err, friendsList) {
      callback(err, friendsList);
    });
 
}


Common.prototype.chkModel = function (model, callback){
  for(var obj in model){
    if(!model[obj]){
      delete model[obj];
    }
  }
  callback(model);
}



Common.prototype.sendQuery = function (query, options, callback){
  mysqPoolConnection.getConnection(function(err, conn){
     if(err){
        callback(err);  
     }else{
       conn.query(query, options, function(err, result) {
           conn.release();
           callback(err, result);
       }); 
     }
   });
}

Common.prototype.getConn = function (callback){
  // var connection = mysql.createConnection({
  //   host  : '127.0.0.1',
  //   port  : 3306,
  //   user  : 'root',
  //   password : '1234',
  //   database : 'ayotalk',
  //   multipleStatements: true
  // });

  var connection = mysql.createConnection({
    host  : '192.168.8.242',
    port  : 3306,
    user  : 'u2AgbeKtmnqBV',
    password : 'pBOkYhO4ZzoMe',
    database : 'dd768826ec62747bab56e3475fe4534aa',
    multipleStatements: true
  });

  callback(connection);
}

var common = new Common();

module.exports = common;

