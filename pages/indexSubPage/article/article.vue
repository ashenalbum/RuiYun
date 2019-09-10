<template>
	<view class="continer">
		<text class="title fs_34 c_33">{{myData.title}}</text>
		<view class="infobox df df-r ai-c just-c-bet">
			<text class="fs_24 c_66">发布人：{{myData.author}}</text>
			<view class="df df-r ai-c ov-auto">
				<text class="fs_24 c_66">{{myData.create_time}}</text>
				<text class="fs_24 c_66 pl-20">浏览量：{{myData.read}}</text>
			</view>
		</view>
		<view class="note  ql-editor">
			<rich-text class="a" :nodes="initNote(myData.content)"></rich-text>
		</view>
	</view>
</template>

<script>
import "../../../components/index/quill-snow.css";
import {Request,Alert} from "../../../api/request.js";
	
export default {
	data() {
		return {
			id: null,
			save: false,
			node: "",
			myData: {
				title: "",
				read: "",
				create_time: "",
				author: "",
				content: ""
			}
		}
	},
	onLoad(option){
		this.id = option.id;
		Request({
			url: "/index/news/getinfobyid",
			data: {id: this.id},
			success: (data)=>{
				this.myData = data.data;
				let tabName = "";
				switch(data.data.type_id){
					case 1: tabName="资讯"; break;
					case 2: tabName="政策"; break;
					case 3: tabName="需求"; break;
				}
				uni.setNavigationBarTitle({title:tabName || ''});
				if(data.data.is_collect){
					this.save = true;
					let webView = this.$mp.page.$getAppWebview();
					webView.setTitleNViewButtonStyle(0, {
						text: "\ue7d2",
						color: "#FF0000"
					});
				}
			}
		});
		
	},
	// 导航栏按钮
	onNavigationBarButtonTap(e){
		if(e.index == 0){
			Request({
				url: "/index/news/setCollect",
				data: {id: this.id},
				success: (data)=>{
					this.save = !this.save;
					Alert(this.save?"已收藏":"已取消收藏");
					let webView = this.$mp.page.$getAppWebview();
					webView.setTitleNViewButtonStyle(0, {
						text: this.save?"\ue7d2":"\ue814",
						color: this.save?"#FF0000":"#666666"
					});
				}
			});
		}
	},
	methods: {
		// 修改样式
		initNote(dom){
			let mb = uni.upx2px(28);
			let imgSize = dom.replace(/(<img\s[^>]+)(\/?>)/g, `$1 style="display:block;margin-bottom:${mb}px;width:100%!important;height:auto!important;" $2`);
			let fontSize = imgSize.replace(/font-size\s*:\s*(\d+)px\s*;/g, (a,b)=>{
				return `font-size: ${uni.upx2px(b / 16 * 32)}px`;
			});
			let pBottom = fontSize.replace(/<p(\s[^>]*)?>/g, `<p$1 style="margin-bottom:${mb}px;">`);
			return pBottom;
		}
	}
}
</script>

<style scoped>
.continer{border-top:1px solid #ECECEC;}
.title{display:flex; padding:26upx 36upx; }
.infobox{padding:12upx 36upx; border-bottom:1px solid #ECECEC;}
.note{padding:20upx 40upx; font-size:28upx; line-height:1.8;}
.pl-20{padding-left:20upx;}
.ov-auto{overflow:auto;}
.a{font-size:32upx;}
</style>