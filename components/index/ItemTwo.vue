<template>
	<view class="item shadow">
		<view class="df df-r ai-c">
			<image :src="FILE_URL+'/'+myData.avatar" class="icon shadow" lazy-load></image>
			<view class="role df df-c">
				<text class="one-hide fs_34">{{myData.name}}</text>
				<text class="one-hide fs_28 mt_10">所属机构：{{myData.organization}}</text>
			</view>
		</view>
		<text class="one-hide fs_28 mt_20">专业方向：{{myData.skill}}</text>
		<text class="one-hide fs_28 mt_20" space="ensp">介    绍：{{myData.domain}}</text>
	</view>
</template>

<script>
import {FILE_URL} from "../../api/request.js";
	
export default {
	data() {
		return {
			FILE_URL: ""
		};
	},
	created(){
		this.FILE_URL = FILE_URL;
	},
	props:['myData']
}
</script>

<style scoped>
.item{margin-top:20upx; padding:24upx; display:flex; flex-direction: column; background: #FFFFFF; border-radius: 8upx; overflow: hidden;}
.icon{width:132upx; height:132upx; border-radius: 50%;}
.role{flex:1; margin-left:30upx;}
</style>
