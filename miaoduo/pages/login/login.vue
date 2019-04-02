<template>
	<view class="box">
		<view class="title">短信登录</view>
		<view class="sec">
			<image src="../../static/shouji.png" mode=""></image>
			<input type="number" value=""  placeholder="请输入手机号" placeholder-class="phClass" v-model="mobile">
		</view>
		<view class="sec_t">
			<image src="../../static/yanzm.png" mode=""></image>
			<input type="number" value=""  placeholder="请输入验证码" placeholder-class="phClass" v-model="captcha">
			<button type="primary" @tap="send_code" :disabled="disabled" v-if="!dissend">获取验证码</button>
			<button type="primary" v-if="dissend" :class="{active:isSend}">{{countDownNum}}秒</button>
		</view>
		<view class="yhxy" @tap="change_o" v-if="show">
			<image src="../../static/weixuan.png" mode=""></image>
			<image src="../../static/xuanzhong.png" mode="" @tap="change_t" v-if="!show"></image>
			<view class="ty">点击登录表示同意 用户服务协议</view>
		</view>
		<view class="yhxy" @tap="change_t" v-if="!show">
			<image src="../../static/xuanzhong.png" mode=""></image>
			<view class="ty">点击登录表示同意 用户服务协议</view>
		</view>
		<view class="but"><button type="primary" @tap="denglu">登录</button></view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				show:true,
				dissend:false,
				mobile:'',
				captcha:'',
				isSend:false,
				disabled:false,
				countDownNum:'60'
			}
		},
		onLoad() {
			// #ifdef APP-PLUS
			plus.navigator.setFullscreen(false);
			// #endif
		},
		methods:{
			change_o(){
				this.show=false
			},
			change_t(){
				this.show=true
			},
			send_code(){
				var that = this
				if(this.mobile==null || this.mobile==''){
					uni.showToast({
						title:'请输入手机号'
					})
					return false;
				}else{
				that.dissend = true;
				that.isSend = true;
				that.disabled = true;
				let countDownNum = that.countDownNum;
				var timer = setInterval(function(){
					countDownNum--;
					// console.log(JSON.stringify(countDownNum));
					that.countDownNum = countDownNum;
					// console.log(JSON.stringify(that.countDownNum));
					if(countDownNum ==0){
						clearInterval(timer)
						that.countDownNum = 60;
						that.isSend = false;
						that.disabled = false;
						that.dissend = false;
					}
				},1000)
				uni.request({
					url:'http://api.xinmicredit.cn/user/sendSms/',
					method:'POST',
					header: {
						"Content-Type": "application/x-www-form-urlencoded"
					},
					data:{
						 mobile:this.mobile
					},
					success: (res) => {
						console.info(JSON.stringify(res))
					},
					fail: (res) => {
						uni.showToast({
							title:'网络错误'
						})
					}
				})
				}
			},
			denglu(){
				if(this.mobile==''||this.mobile==null){
					uni.showToast({
						title:'请输入手机号'
					})
					return false;
				}
				if(this.captcha==''||this.captcha==null){
					uni.showToast({
						title:'请输入验证码'
					})
					return false;
				}
				if(this.show){
					uni.showToast({
						title:'请勾选协议'
					})
					return false;
				}			
				uni.request({
					url:'http://api.xinmicredit.cn/user/loginBySms',
					method:'POST',
					header: {
						"Content-Type": "application/x-www-form-urlencoded"
					},
					data:{
						 mobile:this.mobile,
						 captcha:this.captcha
					},					
					success: (res) => {
						console.info(JSON.stringify(res.data.code));
						if(res.data.code=="0000"){
							console.info(JSON.stringify(res.data.data))
							uni.setStorageSync('token',res.data.data);
							uni.setStorageSync('phone',this.mobile);
							uni.switchTab({
									url: '/pages/index/index'
								});
						}else{
							uni.showToast({
								title:res.data.msg
							})
						}						
					},
					fail: (res) => {
						uni.showToast({
							title:'网络错误'
						})
					}
				})
			}
		}	
	}
</script>

<style>
	.box{
		overflow: hidden;
	}
	button::after{ border: none;}
	button[disabled][type=primary] {
			background-color:#FFC000;
			}
	.phClass{
		color: #A4A4A4;
		font-size: 30upx;
	}
	.active{
		background: #8A8A8A!important;
	}
	.but{
		width: 100%;
		height: 91upx;
		}
	.but button{
		width: 664upx;
		height: 100%;
		line-height: 91upx;
		background: #FFC000;
		text-align: center;
		font-size: 38upx;
		color: #FFFFFF;
		border-radius: 46upx;
		outline: none;
	}
	.sec_t{
		margin-bottom: 30upx;
	}
	.ty{
		color: #8A8A8A;
		font-size: 26upx;
	}
	.yhxy{
		display: flex;
		align-items: center;
		margin-bottom: 34upx;
		font-size: 30upx;
	}
	.yhxy image{
		width: 40upx;
		height: 40upx;
		margin-right: 8upx;
	}
	.sec image{
		width: 36upx;
		height: 54upx;
		margin-right: 33upx;
	}
	.sec input{
		width: 100%;
		height: 100%;
		padding: 0;
		margin: 0;
	}
	.sec_t input{
		width: 100%;
		height: 100%;
		padding: 0;
		margin: 0;
	}
	.sec_t button{
		width: 210upx;
		height: 58upx;
		background: #FFB916;
		color: #FFFFFF;
		font-size: 24upx;
		text-align: center;
		line-height: 58upx;
		outline: none;
		padding: 0;
		border-radius: 25upx;
	}
	.sec_t image{
		width: 60upx;
		height: 48upx;
		margin-right: 30upx;
	}
	.sec,.sec_t{
		display: flex;
		align-items: center;      
		width: 100%;
		height: 110upx;
		border-bottom: 1px solid #EEEEEE;
	}
	.box{
		padding-top: 130upx;
		padding-left: 29upx;
		padding-right: 57upx;
	}
	.title{
		color: #5F5F5F;
		font-size: 44upx;
		font-weight: bold;
		margin-bottom: 20upx;
	}
</style>
