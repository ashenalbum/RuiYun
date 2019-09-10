<template>
	<view class="item shadow">
		<view class="txt">
			<text class="txt-1">{{myData.title}}</text>
			<view>
				<view class="df df-r label">
					<text
						v-for="(item,index) in sliceTag"
						:key="index"
					>{{item}}</text>
				</view>
				<view class="df df-r just-c-bet txt-2">
					<text>{{myData.create_time}}</text>
					<text>浏览量：{{myData.read}}</text>
				</view>
			</view>
		</view>
		<image :src="FILE_URL+'/'+myData.cover_img" class="img" lazy-load></image>
	</view>
</template>

<script>
import {FILE_URL} from "../../api/request.js";

export default {
	data() {
		return {
			imgSrc: "",
			FILE_URL: "",
			sliceTag: []
		};
	},
	created(){
		this.FILE_URL = FILE_URL;
		if(this.myData.tags){
			this.sliceTag = this.myData.tags.split(",");
		}
	},
	methods: {},
	props:['myData']
}
</script>

<style scoped>
.item{margin-top:20upx; display:flex; flex-direction: row; background: #FFFFFF; border-radius: 8upx; overflow: hidden;}
.txt{flex:1; display:flex; padding:20upx; flex-direction: column; justify-content: space-between;}
.txt .txt-1{font-size:34upx; display: -webkit-box; -webkit-box-orient: vertical; -webkit-line-clamp: 2;overflow: hidden;}
.txt .label{height:32upx; overflow: hidden; flex-wrap: wrap; padding-bottom:22upx;}
.txt .label text{padding:0 10upx; line-height: 28upx; border:1px solid #f5a623; font-size:18upx; color:#666; margin-right:20upx;}
.txt .txt-2 text{font-size:22upx; color:#666666; }
.img{width:240upx; height:240upx;}
</style>
