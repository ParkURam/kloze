var mysql = require('mysql');


// var pool = mysql.createPool({
// 	host	: '127.0.0.1',
// 	port	: 3306,
// 	user	: 'root',
// 	password : '1234',
// 	database : 'Kloze'
// });

var pool = mysql.createPool({
	host	: 'kloze.ceibyuelgpkc.ap-northeast-1.rds.amazonaws.com',
	port	: 3306,
	user	: 'kloze',
	password : '12345678',
	database : 'kloze'
});


// var pool = mysql.createPool({
// 	host	: '192.168.8.242',
// 	port	: 3306,
// 	user	: 'u2AgbeKtmnqBV',
// 	password : 'pBOkYhO4ZzoMe',
// 	database : 'dd768826ec62747bab56e3475fe4534aa'
// });



module.exports = pool;
