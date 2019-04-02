<template>
	<view class="content" @touchmove.stop.prevent="moveHandle">
		<view class="top">
			<image src="../../static/chengetox.png" mode=""></image>
			<view class="phnoe">{{mun}}</view>
		</view>
		<!-- <view class="sect" @tap="jump_jilu">
			<view class="sect_left">
				<image src="../../static/liulan.png" mode=""></image>
				<text>游览记录</text>
			</view>
			<view class="sect_right">
				<image src="../../static/righttou.png" mode=""></image>
			</view>
		</view> -->
		<view class="sect" @tap="jump_xieyi">
			<view class="sect_left">
				<image src="../../static/fuwu.png" mode=""></image>
				<text>服务协议</text>
			</view>
			<view class="sect_right">
				<image src="../../static/righttou.png" mode=""></image>
			</view>
		</view>
		<view class="sect" @tap="jump_fankui">
			<view class="sect_left">
				<image src="../../static/fankuit.png" mode=""></image>
				<text>意见反馈</text>
			</view>
			<view class="sect_right">
				<image src="../../static/righttou.png" mode=""></image>
			</view>
		</view>
		<view class="sect" @tap="jump_about">
			<view class="sect_left">
				<image src="../../static/guanyu.png" mode=""></image>
				<text>关于我们</text>
			</view>
			<view class="sect_right">
				<image src="../../static/righttou.png" mode=""></image>
			</view>
		</view>
		<view class="sect">
			<view class="sect_left">
				<image src="../../static/jiancha.png" mode=""></image>
				<text>检查更新</text>
			</view>
			<view class="sect_right">
				<image src="../../static/righttou.png" mode=""></image>
			</view>
		</view>
		<view class="sect" @tap="jump_login">
			<view class="sect_left">
				<image src="../../static/tuichu.png" mode=""></image>
				<text>退出登录</text>
			</view>
			<view class="sect_right">
				<image src="../../static/righttou.png" mode=""></image>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				mun:''
			}
		},
		onShow() {
			// #ifdef APP-PLUS
			plus.navigator.setFullscreen(false);
			// #endif
		},
		onLoad() {
			var phone = uni.getStorageSync('phone');
			this.mun = phone.replace(/^(\d{3})\d{4}(\d+)/,"$1****$2");
		},
		methods:{
			jump_jilu(){
				uni.navigateTo({
					url:'../my/youlan'
				})
			},
			jump_xieyi(){
				uni.navigateTo({
					url:'../my/xieyi'
				})
			},
			jump_fankui(){
				uni.navigateTo({
					url:'../my/fankui'
				})
			},
			jump_about(){
				uni.navigateTo({
					url:'../my/about'
				})
			},
			jump_login(){
				var token = uni.getStorageSync('token');
				uni.request({
					url:'http://api.xinmicredit.cn/user/logout',
					method:'POST',
					header:{'Authorization': token},
					success: (res) => {
						console.info(res)
						uni.clearStorageSync();
					}
				})
				uni.reLaunch({
					url:'../login/login'
				})
			}
		}
	}
</script>

<style>
	button::after{ border: none;}
	.sect_right image{
		width: 28upx;
		height: 28upx;
	}
	.sect_left{
		display: flex;
		align-items: center;
	}
	.sect_left image{
		width: 30upx;
		height: 30upx;
		margin-right: 23upx;
	}
	.sect_left text{
		color: #4A4A49;
		font-size: 28upx;
	}
	.sect{
		box-sizing: border-box;
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 0 26upx 0 23upx;
		width: 100%;
		height: 90upx;
		border-bottom: 1px solid #EEEEEE;
	}
	.phnoe{
		color: #FFFFFF;
		font-size: 24upx;
	}
	.top{
		width: 100%;
		height: 411upx;
		background: url(../../static/toubu.png) no-repeat;
		background-position: 100% 100%;
		box-sizing: border-box;
		/* padding-top: 100upx; */
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}
	.top image{
		width: 142upx;
		height: 142upx;
		margin: 0 auto;
		margin-bottom: 17upx;
	}
</style>
