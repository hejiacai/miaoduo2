<template>
	<view class="box">
		<view class="img"><image src="../../static/miaoduo.png" mode=""></image></view>		
		<view class="bxh">版本型号 v1.1.2</view>
		<view class="nrb">秒多贷款软件是专为用户提供贷款服务的手机app。贷款是银行或其他金融机构按一定利率和必须归还等条件出借货币资金的一种信用活动形式。广义的贷款指贷款、贴现 、透支等出贷资金的总称。随着智能手机的普及，人们可以足不出户通过手机随时随地的申请贷款。</view>
		<view class="sec">
			<view class="kfdh">客服电话</view>
			<view class="phone">023-68600006</view>
		</view>
		<view class="sec" @tap="jum_xieyi">
			<view class="kfdh">服务协议</view>
			<view class="phone">></view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		methods:{
			jum_xieyi(){
				uni.navigateTo({
					url:'../my/xieyi'
				})
			}
		}
	}
</script>

<style>
	button::after{ border: none;}
	.kfdh,.phone{
		color: #636363;
		font-size: 26upx;
	}
	.sec{
		display: flex;
		align-items: center;
		justify-content: space-between;
		box-sizing: border-box;
		padding: 0 37upx;
		width: 100%;
		height: 94upx;
		border-bottom: 1px solid #EEEEEE;
	}
	.nrb{
		color: #636363;
		font-size: 24upx;
		text-indent: 20upx;
		box-sizing: border-box;
		padding: 0 32upx;
		margin-bottom: 32upx;		
	}
	.bxh{
		text-align: center;
		color: #636363;
		font-size: 20upx;
		margin-bottom: 61upx;
	}
	.img{
		display: flex;
		align-items: center;
		justify-content: center;
		margin-bottom: 19upx;
	}
	.img image{
		width: 148upx;
		height: 142upx;
	}
	.box{
		box-sizing: border-box;
		padding-top: 73upx;
		
	}
</style>
