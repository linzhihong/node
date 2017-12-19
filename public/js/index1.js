var vm=new Vue({
	el:'#app',
	data:{
		stulist:[],
		upId:""
	},
	//页面加载进来时获取的数据
	mounted:function(){
		this.$nextTick(function() {
	      this.init();
	  	})
	},
	methods:{
		init:function(){
			console.log("init");		
		},
		btn_a:function(){
			$.ajax({
				type: "get",
				url: "http://127.0.0.2:3001/user/"+1,
				async: true,
				dataType: 'jsonp',
				data: {},
				success: function(data) {
					console.log(data);
				},
				error: function(e) {
					alert(e);
				}
			});
		}
	}
});
