var sql = require('mssql');
var express = require('express');
var app = express();

var config={
	user:'sa',
	password:'123456',
	server:'127.0.0.1',
	database:'Shared',
}
sql.connect(config).then(function() {
	// 没有挂载路径的中间件，应用的每个请求都会执行该中间件
//	app.use(function (req, res, next) {
//	  console.log('Time:', Date.now());
//	  next();
//	});
	
	// 挂载至 /user/:id 的中间件，任何指向 /user/:id 的请求都会执行它
	app.use('/user/:id', function (req, res, next) {
	  console.log('Request Type:', req.method);
	  next();
	});
	// 路由和句柄函数(中间件系统)，处理指向 /user/:id 的 GET 请求
	app.get('/user/:id', function (req, res, next) {
	  console.log('USER');
	  next();
	});
	// 一个中间件栈，对任何指向 /user/:id 的 HTTP 请求打印出相关信息
	app.use('/user/:id', function(req, res, next) {
	  console.log('Request URL:', req.originalUrl);
	  console.log(req.params.id);
	  next();
	}, function (req, res, next) {
	  console.log('Request Type:', req.method);
	  next();
	});
});
app.listen(3001, '127.0.0.2');
//在server关闭的时候也关闭sql连接
app.on('close',function(){
    sql.close();
});
console.log('listening on port  3001');