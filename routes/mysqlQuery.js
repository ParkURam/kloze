var events = require('events');
var util = require('util');

var Common = function(){
    events.EventEmitter.call(this); // call super class constructor
 
};
// This is object that generate(emit) events

util.inherits(Common,events.EventEmitter);
 
// this is listener
Common.prototype.insertUser =  function(){
	return "INSERT INTO userComm (user_id, email, facebook, twitter, password) VALUES (?, ?, ?, ?, ?)";
}

Common.prototype.updateUser =  function(){ 
	return "UPDATE userComm SET facebook = ?, twitter = ? , password= ?  WHERE user_id = ? ";
}

Common.prototype.selectUser = function(){ 
	return "SELECT * FROM userComm WHERE user_id = ? OR facebook = ? OR twitter = ?";
}

Common.prototype.deleteUser =  function(){

	return "DELETE FROM userAdd WHERE user_id = ?";
}
Common.prototype.authUser =  function(){
	return "INSERT INTO userComm (user_id, facebook, twitter) VALUES (?, ?, ?) ON DUPLICATE KEY UPDATE facebook= ? , twitter = ?";
}
Common.prototype.insertUserInfo =  function(){
	return "INSERT INTO userAdd (user_id, domain, name) VALUES (?, ?, ?)";
}

Common.prototype.updateUserInfo =  function(){
	return "UPDATE userAdd SET profile_img= ?, name = ?, domain = ?, user_release = ?, introduction = ?, bg_img = ? WHERE user_id = ?";
}


Common.prototype.deleteUserInfo = function(){
	return "DELETE FROM userAdd	WHERE user_id = ?";

}
// =====================================================
Common.prototype.getUserInfo = function(){ 
	return "SELECT * FROM userComm WHERE user_id = ?";
}

Common.prototype.getUserMain =  function(){
 return "SELECT * FROM userComm c LEFT OUTER JOIN userAdd a ON c.user_id = a.user_id WHERE c.user_id = ?";
} 

Common.prototype.getUserCategory = function(){ 
	return "SELECT category FROM userAdd WHERE user_id = ?";
}

Common.prototype.userMainupdate =  function(){ 
	return 'UPDATE userAdd SET ?, update_time = now() WHERE user_id = ?';
}

var query = new Common();

module.exports = query;

