<template>
	<view class="content">
		<view v-if="listData.length" class="listbox">
			<view
				v-for="(item,index) in listData"
				:key="index"
			>
				<navigator :url="'../../indexSubPage/article/article?id='+item.id+'&tab='">
					<item-one :myData="item"></item-one>
				</navigator>
			</view>
		</view>
		<view v-else class="pt_30 df just-c-ct ai-c">
			<text class="fs_30 c_99">{{moreText}}</text>
		</view>
	</view>
</template>

<script>
import ItemOne from "../../../components/index/ItemOne";
import {Request,Alert} from "../../../api/request.js";

export default {
	data() {
		return {
			moreText: "加载中...",
			listData: []
		}
	},
	onLoad(){
		Request({
			url: "/index/news/getUserCollect",
			success: (data)=>{
				this.listData = data.data;
				this.moreText = "没有更多数据";
			},
			error: ()=>{
				Alert("请求发生错误");
				this.moreText = "没有更多数据";
			}
		})
	},
	methods: {
		
	},
	components:{ItemOne}
}
</script>

<style scoped>
.pt_30{padding-top:30upx;}
.listbox{padding:20upx 28upx;}
</style>
