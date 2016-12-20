require.config({

	baseUrl: "js",

	paths: {
		ipinbb: "ipinbb.min",
		base: "base.min"
	}
});

// // Start the main mobile logic.
requirejs(['ipinbb', 'base'], function () {

	$(function(){

		// banner图轮换;
		$('.home-banner').slider({ 
			autoPlay: true,
			interval: 3000,
			imgZoom: true,
			// loop: true
		});

		tabFixed();

		/*组件初始化js start*/
		$('.ui-refresh').refresh({
		    load: function (dir, type) {
		        var me = this;
		        var promptUp = $("<div class='prompt-up'>没有更多内容了</div>");
		        var promptDown = $("<div class='prompt-down'>没有更多内容了</div>");

		        // 向上拉且上一次上拉请求数据不为空, 或下拉且上一次下拉请求数据不为空 	
		        if ($(".prompt-down").length === 0) {

		        	setTimeout(function(){
		        		// 向服务器发送一个请求, 并 
			            $.getJSON('json/list.json', function (data) {
				            var result = '',
				            	list = $('.home-list');

			            	// 对请求回来的数据进行判断是否为空
			            	// 不为空：将请求回来的json数据拼接成字符串并将数据插入至对应的方向
			            	// 为空：则在直接禁用相应的拉动刷新且页面上添加提示 ———— 没有更多内容了
							if (data !== null) {

				                // 判断拉动方向将拼接的数据插入
				                list[dir == 'up' ? 'prepend' : 'append'](strList(data,result ));
				                //数据加载完成后改变状态
				            	me.afterDataLoading(dir);
				            	$(".imglazyload").lazyImgLoad({
									backgroundImg: "http://m.baokuandaren.com/baokuandaren/static/images/img-placeholder.png",
									distance: "50"
								});

			                } else {
					        	// 将没有更多数据友好提示添加至页面
			        			$(".ui-refresh-down").hide().children().removeClass();
				            	me.afterDataLoading(dir);
					        	return dir !== 'up' ? $(".ui-refresh").append(promptUp) : $(".ui-refresh").before(promptDown);
					        }
					    });
		        	},500);
		        }
		    }
		});
		/*组件初始化js end */

		// 字符串拼接
		function strList(data,result){
			for(var i = 0, len = data.lists.length; i < len; i++){
	            
				result+="<div class='list-box01' data-href='details.html'>" +
							"<span class='list-img01'>" +
								"<img data-url='https://gd3.alicdn.com/bao/uploaded/i3/1110896189/TB2Wh6okpXXXXXtXpXXXXXXXXXX_!!1110896189.jpg_400x400.jpg' class='imglazyload' data-alt='透蜜美白祛斑霜去斑去黄淡斑膏祛斑产品精华液素颜面霜护肤品' />" +
							"</span>" +
							"<h3 class='list-title01'>国行联保Canon/佳能微单相机</h3>" +
							"<p class='list-text01'>性比价很高的一款，操作比较简单，适合我这样的新手感觉平时家用已经足够，双镜头可以满足日常。晒两种日常拍摄的照片给大家看看。。。</p>" +
							"<div class='buy-price'>" +
								"<a class='fn-right buy01' data-href=''><span class='iconfont'>&#xe60d;</span><em>3人团</em></a>" +
								"<i class='price01'>¥0.01</i>" +
							"</div>" +
						"</div>";
	        };
	        return result;
		}

		// 图片延迟加载;
		$(".imglazyload").lazyImgLoad({
			backgroundImg: "http://m.ipinbb.com/ipbb/static/images/img-placeholder.png",
			distance: "50"
		});

		$('.tab-bar-box').navigator();
	});
});