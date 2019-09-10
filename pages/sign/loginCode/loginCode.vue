<template>
	<view class="page df ai-c just-c-ct">
		<!-- <navigator url="../signUp/signUp">
			<text class="signup fs_34 c_33 b">注册</text>
		</navigator> -->
		<view class="box">
			<view class="df just-c-ct">
				<image src="../../../static/index/logo.png" class="logo"></image>
			</view>
			<!-- <text class="title df mt_60 fs_44 c_33 b">手机号登录</text> -->
			<view class="iptbox mt_20">
				<input type="text" class="ipt mt_10 fs_32 c_33" placeholder="请输入手机号" />
			</view>
			<view class="iptbox df df-r just-c-bet ai-c">
				<input type="number" class="ipt mt_10 fs_32 c_33 f1" placeholder="验证码" />
				<button class="getCode fs_24" :disabled="codeDisabled">{{codeTxt}}</button>
			</view>
			<view class="df mt_30">
				<navigator url="../login/login" open-type="redirect">
					<text class="fs_28 c_66">密码登录</text>
				</navigator>
			</view>
			<button class="com-btn mt_120">登录</button>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			codeTxt: "获取验证码",
			codeDisabled: false,
			showPwd: true
		}
	},
	// 导航栏按钮
	onNavigationBarButtonTap(e){
		if(e.index == 0){uni.redirectTo({url:"../signUp/signUp"})}
	},
	methods: {
		
	}
}
</script>

<style scoped>
.f1{flex:1;}
.page{box-sizing:border-box; padding-bottom:44px; width:100%; height:100%; background:#FFFFFF;}
.box{width:690upx;}
.logo{width:200upx; height:200upx;}
.iptbox{padding:38upx 0 16upx; border-bottom:1px solid #ccc;}
.ipt{line-height:60upx; height:60upx;}
.getCode{border:1px solid #999999;}
.showPwd{width:10px;height:10px;background:#FF0000;}
.hidePwd{width:10px;height:10px;background:#00ff00;}
</style>
