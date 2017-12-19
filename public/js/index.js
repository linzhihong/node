var vm=new Vue({
	el:'#app',
	data:{
		stulist:[],
		upId:""
	},
	//局部过滤器
	filters: {
		formatmoney:function(value){
			return "¥"+value.toFixed(2);
		}
	},
	//页面加载进来时获取的数据
	mounted:function(){
		this.$nextTick(function() {
	      this.init();
	  	})
	},
	//计算
	computed:{
		fullName: function () {
			return this.firstName + ' ' + this.lastName
		}
	},
	methods:{
		init:function(){
//			var _this=this;
//			this.$http.get("data/Stu_Info.json").then(function(res){
//				console.log(res);
//				_this.stulist=res.body.result.stulist;
//			});
//			let _this=this;
//			//这样做使函数内部的this与外面的this是一致的
//			this.$http.get("http://127.0.0.1:3000/kk").then(res=>{
//				console.log(res)
//			});
				
//			这是两种ajax请求的方式
			let _this=this;
			//这样做使函数内部的this与外面的this是一致的
			this.$http.jsonp("http://127.0.0.1:3000/selectall").then(res=>{
				_this.stulist=res.body.recordset;	
				console.log(res.body.recordset);
			});
			
			$.ajax({
				type: "get",
				url: "http://127.0.0.1:3000/selectall",
				async: true,
				dataType: 'jsonp',
				data: {},
				success: function(data) {
//					_this.stulist=data.recordset;	
					console.log(data.recordset);
				},
				error: function(e) {
					alert(e);
				}
			});
		
		},
		//登录
		login:function(){
			var name=$("#name2").val();
			var pwd=$("#pwd2").val();
			var k=0;
			for(var i=0;i<vm.stulist.length;i++){
				if(vm.stulist[i].name==name&&vm.stulist[i].password==pwd){
					k++;
				}
			}
			if(name==""||pwd==""){
				alert("账号密码不许为空");
			}else if(k>0){
				alert("登录成功");
				location.reload();
			}else if(k<=0){
				alert("账号不存在");
				return;
			}	
		},
		del:function(Id){
			console.log(Id);
			let _this=this;
			$.ajax({
				type: "get",
				url: "http://127.0.0.1:3000/del",
				async: true,
				dataType: 'jsonp',
				data: {id:Id},
				success: function(data) {
					alert("删除成功！")
					console.log(data);
					location.reload();
				},
				error: function(e) {
					alert(e);
				}
			});
		},
		add:function(){			
			var name=$("#name1").val();
			var pwd=$("#pwd1").val();
			if(name.trim()==""||pwd.trim()==""){
				alert("不允许为空");
				return;
			}else{
				console.log(name,pwd);
				let _this=this;
				$.ajax({
					type: "get",
					url: "http://127.0.0.1:3000/add",
					async: true,
					dataType: 'jsonp',
					data: {Name:name,Pwd:pwd},
					success: function(data) {
						alert("添加成功！")
						location.reload();
					},
					error: function(e) {
						alert(e);
					}
				});
			}			
		},
		update:function(Id){
			let _this=this;
			$("#updateform").css("display","block");
//			console.log(Id);
			$.ajax({
				type: "get",
				url: "http://127.0.0.1:3000/selectalone",
				async: true,
				dataType: 'jsonp',
				data: {id:Id},
				success: function(data) {
//					console.log(data.recordset[0]);
					_this.upId=data.recordset[0].Id;
					$("#upname").val(data.recordset[0].name);
					$("#uppwd").val(data.recordset[0].password);
				},
				error: function(e) {
					alert(e);
				}
			});
		},
		updateconfirm:function(){
			var id=this.upId;
			var name=$("#upname").val();
			var pwd=$("#uppwd").val();
//			console.log(id,name,pwd);
			$.ajax({
				type: "get",
				url: "http://127.0.0.1:3000/update",
				async: true,
				dataType: 'jsonp',
				data: {Id:id,Name:name,Pwd:pwd},
				success: function(data) {
					console.log(data);
					alert("修改成功！")
					$("#updateform").css("display","none");
					location.reload();
				},
				error: function(e) {
					alert(e);
				}
			});
		}
	}
});
