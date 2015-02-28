var express = require('express');
var router = express.Router();
var userComm = require('./userComm.js');

var passport = require('passport');
var TwitterStrategy = require('passport-twitter').Strategy;
var FacebookStrategy = require('passport-facebook').Strategy;


passport.use(new TwitterStrategy({
  consumerKey: 'i02DH2n7ZgfcqhVElvVjHttBF',
  consumerSecret: 'A84a6RcBZV1vDxFwz5fnoJxfpfi5zJcbo3Jqw1HxX20rYs3CeC',
  callbackURL: "http://localhost:3000/auth/twitter/callback"
}, function(token, tokenSecret, profile, done) {
  //
  // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
  // req.session.passport 정보를 저장하는 단계이다.
  // done 메소드에 전달된 정보가 세션에 저장된다.
  // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
  //

  //console.log('done : ', done(null, profile));
  // 토큰 확인 후 없으면 저장

  // INSERT INTO students (NAME, email) VALUES ('saltfactory', 'saltfactory@gmail.com') 
 //ON DUPLICATE KEY UPDATE name='saltfactory', email='saltfactory@me.com'
 var userInfo = {
 		twitter_token : token,
 		twitter_tokenSecret : tokenSecret,
 		twitter_profile : profile
 }
  userComm.insertUser(userInfo, function(){
  	done(null, profile);
  });

}));



router.get('/twitter', passport.authenticate('twitter'));
router.get('/twitter/callback', passport.authenticate('twitter', { failureRedirect: '/' }),
  function(req, res) {
    // Successful authentication, redirect home.
    
    //console.log('req. user : ', req.user);
    // var info = {
    //   twitter : '',
    //   facebook : 'accessToken'
    // }

    // userComm.insertUser(info);
    console.log('callback 정보 : ', req.session);
    console.log('트위터 인증 완료');

    req.login(req.user, function(err){
    	if(err) { return next(err); }
    	//return res.redirect('/user/'+ req.user.username);
      return res.redirect('/user');
    });
   }
);

passport.use(new FacebookStrategy({
    clientID: '1543865529189916',
    clientSecret: '0d8d301204da03b62a22f9756bf5dcd2',
    callbackURL: "http://localhost:3000/regist/facebook/callback"
  },
  function(accessToken, refreshToken, profile, done) {
    var userInfo = {
    		facebook_token : accessToken,
    		facebook_refreshToken : refreshToken,
    		facebook_profile : profile
    }
     userComm.insertUser(userInfo, function(){
     	done(null, profile);
    });
  }
));

router.get('/facebook', passport.authenticate('facebook'));
router.get('/facebook/callback', passport.authenticate('facebook', { failureRedirect: '/' }),
  function(req, res) {
      // Successful authentication, redirect home.
     // console.log('callback session : ', req.session);
      console.log('페이스북 인증 완료');

      //console.log('req. user : ', req.user);
      req.login(req.user, function(err){
            if(err) { return next(err); }
            //return res.redirect('/user/'+ req.session.passport.displayName);
            // console.log('usl 설정 !!! : ', req.session.passport.user.displayName);
            var url = req.session.passport.user.displayName;
            url = url.replace(/\s/gi, ''); // 모든 공백을 제거

            // session 사용자 정보 입력
            userComm.setSession(req, res, url, function(req, res){
              return res.redirect('/@'+url);  
            });
      });
     }
);

// // 사용자 가입
// router.get('/', function(req, res){

//   // 사용자 정보 받아오기
//   console.log('req : ', req.body);

//   // req 또는 res 에 정보 담기

//   // redirect main
//   res.redirect('/user');
// });

module.exports = router;
