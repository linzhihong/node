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
	app.use(function (req, res, next) {
	  console.log('Time:', Date.now());
	  next();
	});
	//查询全部数据	
	app.get('/selectall', function(req, res) {
		var selectall = "SELECT * FROM User1";
		new sql.Request().query(selectall,function (err,result) {
		  	if(err){
		    	console.log('error');
		    	return;
		  	}		  	
		  	console.log('-----------------查询----------------');
		  	console.log(result);
		  	res.jsonp(result);		  	
		})		
	});	
	//根据Id查询	
	app.get('/selectalone', function(req, res) {
		var user_id=req.query.id;
		var selectall = "SELECT * FROM User1 WHERE Id="+user_id;
		new sql.Request().query(selectall,function (err,result) {
		  	if(err){
		    	console.log('error');
		    	return;
		  	}
		  	console.log('-----------------根据Id查询----------------');
		  	console.log(result);
		  	res.jsonp(result);
		  	console.log('-----------------查询结束----------------');
		})		
	});
	//修改数据
	app.get('/update', function(req, res) {
		var user_id=req.query.Id;
		var user_name=req.query.Name;
		var user_pwd=req.query.Pwd;
		console.log(user_id,user_name,user_pwd);
		var modsql = "UPDATE User1 SET name ='"+user_name+"',password='"+user_pwd+"'where Id ="+user_id;
		new sql.Request().query(modsql,function (err,result) {
		  if(err){
		    console.log('error');
		    return;
		  }
		  console.log('----------修改数据成功---------------');
		  console.log(result);
		  res.jsonp("suc");
		  console.log('-------------结束----------------');
		})
	})
//	增加数据
	app.post('/add', function(req, res) {
		var user_name=req.query.Name;
		var user_pwd=req.query.Pwd;
		var addsql = "INSERT INTO User1(name,password) VALUES('"+user_name+"','"+user_pwd+"')";
		new sql.Request().query(addsql,function (err,result) {
		  if(err){
		    console.log('error');
		    return;
		  }
		  console.log('-----------------新增成功----------------');
		  console.log(result);
		  res.jsonp("suc");
		  console.log('-----------------结束----------------');
		})
	});

	
//	删除数据
	app.get('/del', function(req, res) {
		var user_id=req.query.id;
		var delsql = "DELETE FROM User1 where Id ="+user_id;
//		console.log(delsql);
		new sql.Request().query(delsql,function (err,result) {
		  	if(err){
		    	console.log('err');
		    	return;
		  	}
		  	console.log('----------删除成功-------------');
		  	console.log(result);
			res.jsonp("suc");
			console.log('-----------------结束----------------');
		})
	});
});
app.listen(3000, '127.0.0.1');
//在server关闭的时候也关闭sql连接
app.on('close',function(){
    sql.close();
});
console.log('the server is staring,listening on port  3000');
//连接方式1："mssql://用户名:密码@ip地址（无需端口号）/SqlServer名/数据库名称"
//连接方式2："mssql://用户名:密码@ip地址:1433(默认端口号)/数据库名称"
//sql.connect(config).then(function() {
//  new sql.Request().query("select * from User1").then(function(pws) {
//      console.log(pws);        
//		app.get('/kk', function(req, res) {
//			res.jsonp(pws);
//		});
//  }).catch(function(err) {
//     console.log(err);
//  });
//  new sql.Request().query("select * from [User]").then(function(k) {
//      console.log(k);        
//		app.get('/mm', function(req, res) {
//			res.jsonp(k);
//		});
//  }).catch(function(err) {
//     console.log(err);
//  });
//});
//
//app.listen(3000, '127.0.0.1');
//
////在server关闭的时候也关闭sql连接
//app.on('close',function(){
//  sql.close();
//});
//console.log('listening on port 3000');

//var express             = require('express');
//var app                 = express();
//var bodyParse           = require('body-parser')
//var cookieParser        = require('cookie-parser') ;
//app.use(cookieParser()) ;
//app.use(bodyParse.urlencoded({extended:false})) ;
//
//// 处理根目录的get请求
//app.get('/',function(req,res){
//  res.sendfile('views/index.html') ;
//  console.log('index page is required ');
//}) ;
//// 处理/login的post请求
//app.post('/login',function(req,res){
//  name=req.body.name ;
//  pwd=req.body.pwd   ;
//  console.log(name+'--'+pwd) ;
//  res.status(200).send(name+'--'+pwd) ;
//});
//// 监听3000端口
//var server=app.listen(3000) ;
//console.log('listening on port  3000');