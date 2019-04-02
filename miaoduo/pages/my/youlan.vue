<template>
	<view class="content">
		<view class="title">
			最近{{count}}条游览记录
		</view>
		<view class="sec" v-for="(item,index) in list">
			<view class="sec_left">
				<view class="sec_left_top">
					<image :src="item.logo" mode=""></image>
					<text>{{item.name}}</text>
				</view>
				<view class="sec_left_bot">低利率</view>
			</view>
			<view class="sec_content">
				<view class="qian">￥{{item.creditMin}}-{{item.creditMax}}</view>
				<view class="qx">{{item.dueMin}}-{{item.dueMax}}天</view>
			</view>
			<view class="sec_right">
				<image src="../../static/righttou.png" mode=""></image>
			</view>
		</view>
		<!-- <view class="sec">
			<view class="sec_left">
				<view class="sec_left_top">
					<image src="../../static/timg.jpg" mode=""></image>
					<text>现金飞船</text>
				</view>
				<view class="sec_left_bot">低利率</view>
			</view>
			<view class="sec_content">
				<view class="qian">￥400-6000</view>
				<view class="qx">6-24周</view>
			</view>
			<view class="sec_right">
				<image src="../../static/righttou.png" mode=""></image>
			</view>
		</view>
		<view class="sec">
			<view class="sec_left">
				<view class="sec_left_top">
					<image src="../../static/timg.jpg" mode=""></image>
					<text>现金飞船</text>
				</view>
				<view class="sec_left_bot">低利率</view>
			</view>
			<view class="sec_content">
				<view class="qian">￥400-6000</view>
				<view class="qx">6-24周</view>
			</view>
			<view class="sec_right">
				<image src="../../static/righttou.png" mode=""></image>
			</view>
		</view>
		<view class="sec">
			<view class="sec_left">
				<view class="sec_left_top">
					<image src="../../static/timg.jpg" mode=""></image>
					<text>现金飞船</text>
				</view>
				<view class="sec_left_bot">低利率</view>
			</view>
			<view class="sec_content">
				<view class="qian">￥400-6000</view>
				<view class="qx">6-24周</view>
			</view>
			<view class="sec_right">
				<image src="../../static/righttou.png" mode=""></image>
			</view>
		</view> -->
	</view>
</template>

<script>
	export default {
		data() {
			return {
				list:[],
				count:''
			}
		},
		methods:{
			
		},
		onLoad() {
			this.list = uni.getStorageSync('visit');
			this.count = this.list.length;
			console.info(this.list);
		}
	}
</script>

<style>
	.content{
		overflow: hidden;
	}
	button::after{ border: none;}
	.sec_right image{
		width: 36upx;
		height: 36upx;
	}
	.qx{
		color: #8A8A8A;
		font-size: 24upx;
		padding-left:10rpx
	}
	.qian{
		color: #FAD00D;
		font-size: 36upx;
		margin-bottom: 10upx;
	}
	.sec_content{
		display: flex;
		flex-direction: column;
	}
	.sec_left_bot{
		width: 84upx;
		height: 27upx;
		background: #FFD041;
		color: #FFFFFF;
		font-size: 18upx;
		text-align: center;
		line-height: 27upx;
		
	}
	.sec_left_top{
		display: flex;
		align-items: center;
		margin-bottom: 8upx;
	}
	.sec_left_top text{
		color: #3B3B3B;
		font-size: 24upx;
	}
	.sec_left_top image{
		width: 64upx;
		height: 64upx;
		margin-right: 10upx;
	}
	.sec_left{
		display: flex;
		flex-direction: column;
	}
	.sec{
		width: 100%;
		height: 132upx;
		display: flex;
		align-items: center;
		box-sizing: border-box;
		padding: 12upx 31upx 0 22upx;
		justify-content: space-between;
		box-shadow: 0upx 6upx 6upx #f0f0f0;
		margin-bottom: 5upx;
	}
	.title{
		width: 100%;
		height: 71upx;
		color: #6B6B6B;
		font-size: 24upx;
		padding-left: 32upx;
		line-height: 71upx;
	}
</style>
