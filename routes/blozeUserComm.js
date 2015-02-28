var events = require('events');
var util = require('util');
var mongoDbConnection = require('./mongoConnection.js');
var mysqPoolConnection = require('./mysqlConnection.js');
var mysql = require('mysql');
var mongoose = require('mongoose');
var async = require('async');
var Schema = mongoose.Schema;

var Common = function(){
    events.EventEmitter.call(this); // call super class constructor
 
};
// This is object that generate(emit) events

util.inherits(Common,events.EventEmitter);
 
Common.prototype.userInfo = function(req, callback) {
  var obj = {};
  console.log('user body : ', req.body);
  obj.email = req.body.email;
  obj.domain = req.body.domain;
  
  if(callback){
    callback(obj);
  }
}

Common.prototype.getUserMain = function(req, callback) {
  var obj = {};
  console.log('user body : ', req.body);
  obj.profile_img = req.body.profile_img;
  obj.name = req.body.name;
  obj.user_release = req.body.user_release;
  obj.introduction = req.body.introduction;
  obj.bg_img = req.body.bg_img;
  //category 문자열로 변경
  obj.category = req.body.category;
  obj.category = obj.category.join(',');

  if(callback){
    callback(obj);
  }
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

// this is listener
var Fllow = new Schema({
  user_id : String,
  fllower : [String],
  fllowing : [String],
  friends : [String]
});

Common.prototype.fllow_model = function(req, callback){
  var FllowModel = mongoose.model('Fllow', Fllow);
  //fllow.user_id = req.session.user_id;

  if(callback){
    callback(FllowModel);
  }
}



Common.prototype.findRelation = function (model, options, callback){

  model.find(options).sort('-updated_at').exec(
    function(err, result) {
      console.log('err : ', err);
      console.log('result : ', result);
      callback(err, result);
    }); 
}

Common.prototype.fllowRelation = function (model, options, callback){
  
  model.findOneAndUpdate(options[0], options[1] ,{upsert : true}).sort('-updated_at').exec(
    function(err, result) {
      callback(err, result);
    });
}

Common.prototype.fllowDelRelation = function (model, options, callback){
  model.find(options).sort('-updated_at').exec(
     function(err, result) {

       async.waterfall([
         function(callback){
           var arr = new Array(result[0].fllowing);
           var optionsList = arr[0].slice(arr.indexOf(options[1]));
           result[0].fllowing = optionsList;
           var fllowingModel = {
            fllowing :result[0].fllowing 
           }
           callback(err, fllowingModel);
         }
         ], function (err, result) {
           model.findOneAndUpdate(options[0], result ,{upsert : true}).sort('-updated_at').exec(
             function(err, changeresult) {
               callback(err, changeresult);
             });
       });
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

