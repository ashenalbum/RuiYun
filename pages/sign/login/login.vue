<template>
	<view class="page df ai-c just-c-ct">
		<!-- <navigator url="../signUp/signUp">
			<text class="signup fs_34 c_33 b">注册</text>
		</navigator> -->
		<view class="box">
			<view class="df df-c">
				<!-- <image src="../../../static/index/logo.png" class="logo"></image> -->
				<text class="fs_50 b c_33">您好，</text>
				<text class="fs_50 b c_33">欢迎来到瑞云</text>
			</view>
			<!-- <text class="title df mt_60 fs_44 c_33 b">手机号登录</text> -->
			<view class="iptbox mt_20">
				<input type="number" v-model="form.user" class="ipt mt_10 fs_32 c_33" placeholder="请输入手机号" />
			</view>
			<view class="iptbox df df-r just-c-bet ai-c">
				<input :type="iptType" v-model="form.pwd" class="ipt mt_10 fs_32 c_33 f1" placeholder="请输入密码" />
				<image :src="eyeSrc" class="eye" @tap="showPwd=!showPwd"></image>
			</view>
			<view class="df just-c-end mt_30">
				<!-- <navigator url="../loginCode/loginCode" open-type="redirect">
					<text class="fs_28 c_66">验证码登录</text>
				</navigator> -->
				<navigator url="../getPwd/getPwd" open-type="redirect">
					<text class="fs_28 c_66">忘记密码？</text>
				</navigator>
			</view>
			<button class="com-btn mt_120" @tap="login" :disabled="!inputAll">登录</button>
		</view>
	</view>
</template>

<script>
import {SignRequest} from "../../../api/request.js";

export default {
	data() {
		return {
			showPwd: false,
			form: {
				user: "",
				pwd: ""
			}
		}
	},
	// 导航栏按钮
	onNavigationBarButtonTap(e){
		if(e.index == 0){uni.redirectTo({url:"../signUp/signUp"})}
	},
	methods: {
		login(){
			SignRequest({
				url:"/index/user/loginIn",
				type:"post",
				data:{
					account: this.form.user,
					password: this.form.pwd
				},
				success(data){
					if(data.code){
						plus.nativeUI.toast(data.message);
						return false;
					}
					uni.setStorageSync('account', data.data.account);
					uni.setStorageSync('token', data.data.token);
					uni.setStorageSync('outTime', Date.now() + 2600000000);
					uni.switchTab({url:"/pages/index/index"});
				}
			});
		}
	},
	computed:{
		eyeSrc(){
			return `../../../static/sign/eye${this.showPwd?'-slash':''}.png`;
		},
		iptType(){
			return this.showPwd?"text":"password";
		},
		inputAll(){
			return this.form.user && this.form.pwd;
		}
	}
}
</script>

<style scoped>
.f1{flex:1;}
.page{box-sizing:border-box; padding-bottom:44px; width:100%; height:100%; background:#FFFFFF;}
.box{width:690upx;}
.logo{width:200upx; height:200upx;}
.iptbox{padding:38upx 0 16upx; border-bottom:1px solid #ccc;}
.ipt{line-height:60upx; height:60upx; margin:0;}
.getCode{border:1px solid #999999;}
.eye{width:46upx; height:46upx; margin-left:20upx;}
</style>
