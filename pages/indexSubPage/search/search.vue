<template>
	<view class="content">
		<view class="listbox">
			<view
				v-for="(item,index) in info"
				:key="index"
			>
				<navigator :url="'../article/article?id='+item.id">
					<item-one :myData="item"></item-one>
				</navigator>
			</view>
			<view
				v-for="(item,index) in zhiku"
				:key="index"
			>
				<navigator :url="'../role/role?id='+item.id">
					<item-two :myData="item"></item-two>
				</navigator>
			</view>
			<view v-if="noData" class="nodata"><text>暂无数据</text></view>
		</view>
	</view>
</template>

<script>
import {Request} from "../../../api/request.js";
import ItemOne from "../../../components/index/ItemOne";
import ItemTwo from "../../../components/index/ItemTwo";

export default {
	data() {
		return {
			searchTxt: "",
			info: [],
			zhiku: [],
			noData: false
		}
	},
	onNavigationBarSearchInputConfirmed(e){
		this.searchTxt = e.text;
		Request({
			url: "/index/news/searchInfo",
			type: "post",
			data: {search: this.searchTxt},
			success: (data)=>{
				this.info = data.data.info;
				this.zhiku = data.data.zhiku;
				if(this.info.length + this.zhiku.length == 0){
					this.noData = true;
				}
			}
		})
	},
	methods: {
		
	},
	components:{
		ItemOne,
		ItemTwo
	}
}
</script>

<style scoped>
.listbox{padding:30upx 28upx 20upx;}
.nodata{font-size:30upx; color:#999999; text-align: center; padding-top:10upx;}
</style>
