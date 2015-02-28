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

// this is listener
Common.prototype.newPostModel = function(req, callback) {
  var obj = {};
  var now = new Date();
  var nowAll = now.getFullYear() + "-" + (now.getMonth() + 1) + "-" + now.getDate() + " " + now.getHours() + ":" + now.getMinutes() + ":" + now.getSeconds();
  obj.user_id = req.session.user_id || null;
  obj.post_id = req.body.post_id || uuid.v1();
  obj.post_comm = req.body.post_comm || null;
  obj.post_contents = req.body.post_contents || null;
  obj.temp_save = false;
  obj.post_date = nowAll;
  obj.update_date = nowAll;
  obj.post_title = req.body.post_title;
  obj.post_sub = req.body.post_sub;
  obj.post_img = req.body.post_img;
  obj.category = req.body.category;
  obj.read_information = [];
  obj.tag = req.body.tag;
  obj.like_information = [];
  obj.bookmark = [];
  obj.comment = [];

  if(callback){
    callback(obj);
  }
}

Common.prototype.postTempModel = function(req, callback) {
  var obj = {};
  var now = new Date();
  var nowAll = now.getFullYear() + "-" + (now.getMonth() + 1) + "-" + now.getDate() + " " + now.getHours() + ":" + now.getMinutes() + ":" + now.getSeconds();
  obj.user_id = req.session.user_id || null;
  obj.post_id = req.body.post_id || uuid.v1();
  obj.post_comm = req.body.post_comm || null;
  obj.post_contents = req.body.post_contents || null;
  obj.temp_save = true;
  obj.post_date = nowAll;
  obj.update_date = nowAll;
  obj.post_title = req.body.post_title;
  obj.post_sub = req.body.post_sub;
  obj.post_img = req.body.post_img;
  obj.category = req.body.category;
  obj.read_information = [];
  obj.tag = req.body.tag;
  obj.like_information = [];
  obj.bookmark = [];
  obj.comment = [];

  if(callback){
    callback(obj);
  }
}

Common.prototype.postReadModel = function(req, callback) {
  var obj = {};
  var now = new Date();
  var nowAll = now.getFullYear() + "-" + (now.getMonth() + 1) + "-" + now.getDate() + " " + now.getHours() + ":" + now.getMinutes() + ":" + now.getSeconds();
  obj.read_id = req.body.read_id;
  obj.read_date = nowAll;
  obj.read_restTime = req.body.read_restTime;

  if(callback){
    callback(obj);
  }
}

Common.prototype.postBookmarkModel = function(req, callback) {
  var obj = {};
  var now = new Date();
  var nowAll = now.getFullYear() + "-" + (now.getMonth() + 1) + "-" + now.getDate() + " " + now.getHours() + ":" + now.getMinutes() + ":" + now.getSeconds();
  obj.bookmark_id = req.body.bookmark_id;
  obj.bookmark_date = nowAll;

  if(callback){
    callback(obj);
  }
}

Common.prototype.postLikeModel = function(req, callback) {
  var obj = {};
  var now = new Date();
  var nowAll = now.getFullYear() + "-" + (now.getMonth() + 1) + "-" + now.getDate() + " " + now.getHours() + ":" + now.getMinutes() + ":" + now.getSeconds();
  obj.like_id = req.body.like_id;
  obj.like_date = nowAll;

  if(callback){
    callback(obj);
  }
}

Common.prototype.imageModel = function(req, callback) {
  var obj = {};
  obj.post_img = req.files.post_img || null;
  obj.profile_img = req.files.profile_img || null;
  obj.bg_img = req.files.bg_img || null;

  if(callback){
    callback(obj);
  }
}


var Post = new Schema({
  user_id : String,
  post_id : String,
  post_comm : String,
  post_contents : String,
  temp_save : Boolean,
  post_date : Date,
  update_date : Date,
  post_title : String,
  post_sub : String,
  post_img : String,
  category : String,
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

// POST 모델 생성
Common.prototype.post_model = function(req, callback){
  var PostModel = mongoose.model('Post', Post);
  if(callback){
    callback(PostModel);
  }
}

Common.prototype.findPostList = function (model, options, callback){

  model.find(options).sort('-updated_at').exec(
    function(err, postList) {
      callback(err, postList);
    });
}

Common.prototype.upsertPostList = function (model, options, callback){
  model.findOneAndUpdate(options[0], options[1], {upsert : true}).sort('-updated_at').exec(
    function(err, result) {
      console.log('err : ', err);
      console.log('result : ', result);
      callback(err, result);
    });
 
}

// 포스팅 읽음 정보 저장
Common.prototype.putPostRead = function (model, options, callback){
  model.findOneAndUpdate(options[0], options[1], {upsert : true}).sort('-updated_at').exec(
    function(err, result) {
      callback(err, result);
    });
 
}
// 포스팅 북마크 하기
Common.prototype.putPostBookmark = function (model, options, callback){
  model.findOneAndUpdate(options[0], options[1], {upsert : true}).sort('-updated_at').exec(
    function(err, result) {
      callback(err, result);
    });
 
}
// 포스팅 좋아요 하기
Common.prototype.putPostLike = function (model, options, callback){
  model.findOneAndUpdate(options[0], options[1], {upsert : true}).sort('-updated_at').exec(
    function(err, result) {
      callback(err, result);
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
  var connection = mysql.createConnection({
    host  : '127.0.0.1',
    port  : 3306,
    user  : 'root',
    password : '1234',
    database : 'ayotalk',
    multipleStatements: true
  });

  // var connection = mysql.createConnection({
  //   host  : '192.168.8.242',
  //   port  : 3306,
  //   user  : 'u2AgbeKtmnqBV',
  //   password : 'pBOkYhO4ZzoMe',
  //   database : 'dd768826ec62747bab56e3475fe4534aa',
  //   multipleStatements: true
  // });

  callback(connection);
}

var common = new Common();

module.exports = common;

