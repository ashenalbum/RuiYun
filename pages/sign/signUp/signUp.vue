<template>
	<view class="page df ai-c just-c-ct">
		<view class="box">
			<view class="df">
				<!-- <image src="../../../static/index/logo.png" class="logo"></image> -->
				<text class="fs_50 b c_33">注册</text>
			</view>
			<!-- <text class="title df mt_60 fs_44 c_33 b">手机号登录</text> -->
			<view class="iptbox mt_20">
				<input type="text" v-model="account" class="ipt mt_10 fs_32 c_33" placeholder="请输入手机号" />
			</view>
			<view class="iptbox df df-r just-c-bet ai-c">
				<input :type="iptType" v-model="pwd" class="ipt mt_10 fs_32 c_33 f1" placeholder="请输入8-16位密码" />
				<image :src="eyeSrc" class="eye" @tap="showPwd=!showPwd"></image>
			</view>
			<view class="iptbox df df-r just-c-bet ai-c">
				<input type="number" v-model="code" class="ipt mt_10 fs_32 c_33 f1" placeholder="验证码" />
				<button class="getCode fs_24" :disabled="codeDisabled" @tap="getCode">{{codeTxt}}</button>
			</view>
			<button class="com-btn mt_120" :disabled="!inputAll" @tap="sigUp">完成</button>
		</view>
	</view>
</template>

<script>
import {SignRequest, Alert} from "../../../api/request.js";

export default {
	data() {
		return {
			account: "",
			code: "",
			pwd: "",
			codeTxt: "获取验证码",
			codeDisabled: false,
			showPwd: false
		}
	},
	// 导航栏按钮
	onNavigationBarButtonTap(e){
		if(e.index == 0){uni.redirectTo({url:"../login/login"})}
	},
	methods: {
		getCode(){
			if(!this.account){Alert("请输入手机号");return false;}
			if(!/^1\d{10}/.test(this.account)){Alert("请输入正确的手机号");return false;}
			if(!this.pwd){Alert("请输入8-16位数字与字母组合密码");return false;}
			if(!/^[0-9a-zA-Z]{8,16}$/.test(this.pwd) || !/\d/.test(this.pwd) || !/[a-zA-Z]/.test(this.pwd)){Alert("请输入8-16位数字与字母组合密码");return false;}
			this.codeDisabled = true;
			this.codeTxt = "60s后重新发送";
			let time = 60;
			let timeout = setInterval(()=>{
				time--;
				if(time <= 0){
					this.codeDisabled = false;
					this.codeTxt = "重新发送";
					clearInterval(timeout);
					return false;
				}
				this.codeTxt = time + "s后重新发送";
			},1000);
			
			SignRequest({
				url: "/index/user/sendsms",
				data: {account: this.account},
				success: (data)=>{Alert("验证码发送成功");}
			});
		},
		sigUp(){
			SignRequest({
				url: "/index/user/signup",
				data: {
					account: this.account,
					password: this.pwd,
					verify: this.code
				},
				type: "post",
				success: (data)=>{
					Alert("注册成功，请登录");
					uni.redirectTo({url:"../login/login"});
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
			return this.account && this.pwd && this.code;
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
.ipt{line-height:60upx; height:60upx;}
.getCode{border:1px solid #999999;}
.eye{width:46upx; height:46upx; margin-left:20upx;}
</style>
