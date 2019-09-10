<template>
	<view class="content">
		<view class="box mt_20 fs_32 c_33">
			<text class="item" space="ensp" >审核结果： {{myData.jg || "--"}}</text>
			<text class="item mt_10" space="ensp" >审核时间： {{myData.reply_time || "--"}}</text>
			<text class="item mt_10" space="ensp" >原    因： {{myData.reason || "--"}}</text>
		</view>
	</view>
</template>

<script>
import {Request} from "../../../api/request.js";

export default {
	data() {
		return {
			myData:{},
		};
	},
	onLoad(option){
		Request({
			url: "/index/user/getCompanyStatus",
			success: (data)=>{
				this.myData = data.data.info;
				this.myData.jg = data.data.info.status==1?"通过":"不通过";
			}
		});
	}
}
</script>

<style scoped>
.box{background:#FFFFFF; border-radius:12upx; padding:20upx 10upx;}
.content{box-sizing:border-box; padding:20upx;}
.item{display:block; padding:10upx;}
</style>
