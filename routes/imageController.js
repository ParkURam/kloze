var express = require('express');
var router = express.Router();
var fs = require('fs');
var path = require('path');
var userFunction = require('./userFunction');
var postFunction = require('./postFunction');

//image upload
router.post('/upload', function(req, res){
  // 정보 가져오기
  console.log('req.files : ', req.files);

  // 저장 경로 보고 데이터 베이스에 넣기
  userFunction.imageUpload(req, res, function(err, result){
    if(err) res.json({err: err});

    res.json({result : result});
  	
  });
});

//image download
router.get('/*', function(req, res){
  // 정보 가져오기
  var name = __dirname + '/../'+req.originalUrl;
  // 저장 경로 보고 데이터 베이스에서 가져오기
  console.log('name : ',name);
  var outputFile = path.resolve(name);
  res.sendfile(outputFile);
});


module.exports = router;