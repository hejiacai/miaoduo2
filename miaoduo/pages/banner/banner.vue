<template>
	<view class="content" :style="{width:Screen_width+'px',height:Screen_height+'px'}">
		<image src="../../static/yindao.jpg" mode=""></image>
		<view class="tiao" @tap="ture_change">跳过</view>
		<view class="dianji" @tap="ture_change">点击参与</view>
	</view>
</template>

<script>
	export default {	
		data() {
			return {
				s: 3,
				settime:''
			}
		},
		/* created: function(e) {
			var miao;
			this.timer = setInterval(() => {				 
				if (this.s < 0) {				
					uni.navigateTo({
						url:'../login/login'
					})
				}else{
					miao = this.s--
					this.s = miao
				}
			}, 1000)
		}, */
		methods: {
			ture_change(){
				/* uni.navigateTo({
					url:'../login/login'
				}) */
				clearTimeout(timer);
				var token = uni.getStorageSync('token');
				if(token==null||token==''){
					uni.reLaunch({
						url:'../login/login'
					})
				}else{
					uni.request({
						url:"http://api.xinmicredit.cn/token/checkToken",
						method:'GET',
						header:{'Authorization': token},
						success: (res) => {
							// console.info(JSON.stringify(res));
							// console.info(typeof(res));
							// console.info(typeof(res.data));							
							console.info(res.data);
							console.info(res.data.code);
							if(res.data.code==3003){
								console.info('youdu');
								uni.switchTab({
									url:'../index/index'
								})
							}else{
								console.info('youdu2');
								uni.removeStorageSync('token');
								uni.reLaunch({
									url:'../login/login'
								})
							}
							console.info('zhenhao');
						}
					})
				}
			}
			/* dao(){
				var timeo = this.num;
				var timeStop = setInterval(function(){
					timeo--;
				},1000)
				if(this.num==0){
					uni.navigateTo({
						url:'../login/login'
					})
				}
			} */
		},
		computed: {
		    Screen_width() {
		        return uni.getSystemInfoSync().windowWidth;
		    },
			Screen_height() {
			    return uni.getSystemInfoSync().windowHeight;
			}
		},
		onLoad(){
			/* setTimeout(function(){
				uni.navigateTo({
					url:'../login/login'
				});
			},3000) */
			// #ifdef APP-PLUS
			plus.navigator.setFullscreen(true);
			// #endif
			var token = uni.getStorageSync('token');
			if(token==null||token==''){
				var timer = setTimeout(function(){
					uni.reLaunch({
						url:'../login/login'
					})
				},3000)
			}else{
				uni.request({
					url:"http://api.xinmicredit.cn/token/checkToken",
					method:'GET',
					header:{'Authorization': token},
					success: (res) => {
						// console.info(JSON.stringify(res));
						// console.info(typeof(res));
						// console.info(typeof(res.data));							
	// 					console.info(res.data);
	// 					console.info(res.data.code);
						if(res.data.code==3003){
							console.info('youdu');
							uni.switchTab({
								url:'../index/index'
							})
						}else{
							// console.info('youdu2');
							uni.removeStorageSync('token');
							uni.reLaunch({
								url:'../login/login'
							})
						}
						console.info('zhenhao');
					}
				})
			}
			
			/* if(this.hasSkip){
				uni.reLaunch({		
					url: '../tabBar/news/news'
				});
			} */
		}
	}
</script>

<style>
	.dianji{
		border-radius: 19px;
		  position: absolute;
		  left: 234upx;
		  top: 860upx;
		  width: 308upx;
		  height: 60upx;
		  line-height: 60upx;
		  text-align: center;
		  z-index: 128;
		  font-size: 28upx;
		  color: #FFFFFF;
		  font-weight: bold;
		  background:#f407a3;
	}
	.content{
		position: relative;
		overflow: hidden;
	}
	.content image{
		width: 100%;
		height: 100%;
	}
	.tiao{
		position: absolute;
		top: 86upx;
		right: 20upx;
		width:150upx;
		height:58rpx;
		background:#FFB916;
		color:#FFFFFF;
		font-size:20rpx;
		text-align:center;
		line-height:58rpx;
		outline:none;
		border-radius:25rpx;
	}
</style>
