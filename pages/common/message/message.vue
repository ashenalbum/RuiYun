<template>
	<view class="content">
		<view class="listbox">
			<view v-if="auth">
				<navigator url="../message_auth/message_auth">
					<view class="item shadow">
						<text class="fs_32 c_33">您的企业审核{{auth.status==1?"已通过":"未通过"}}</text>
						<text class="linehide mt_20 fs_28 c_66">{{auth.reason}}</text>
					</view>
				</navigator>
			</view>
			<view
				v-for="(item,index) in listData"
				:key="index"
			>
				<navigator :url="'../../needsSubPage/needsDetail/needsDetail?id='+item.id+'&type=2'">
					<view class="item shadow">
						<text class="txt fs_32 c_33">您发布的需求编号：{{item.number}}有新的动态，快去查看吧！</text>
						<view class="df df-r just-c-end ai-c mt_20">
							<text class="detail fs_24 c_66">点击查看详情 &gt;</text>
						</view>
					</view>
				</navigator>
			</view>
		</view>
		<view v-if="nodata" class="mt_30 df just-c-ct ai-c">
			<text class="fs_30 c_99">暂无数据</text>
		</view>
	</view>
</template>

<script>
import {Request} from "../../../api/request.js";

export default {
	data() {
		return {
			auth:null,
			listData: []
		}
	},
	onLoad(){
		Request({
			url: "/index/user/newReply",
			success: (data)=>{
				if(data.data.company){
					this.auth = data.data.company;
					if(this.auth.status == 1){
						Request({url: "/index/user/iscompany"});
					}
				}
				this.listData = data.data.info;
			}
		});
	},
	computed: {
		nodata() {return (!this.listData.length)&&(!this.auth);}
	}
}
</script>

<style scoped>
.content{box-sizing:border-box; padding:20upx;}
.item{margin-bottom:20upx; padding:20upx 20upx 24upx; border-top:12upx solid #b8e986; background:#FFFFFF; border-radius:8upx;}
.linehide{display: -webkit-box; -webkit-box-orient: vertical; -webkit-line-clamp: 2;overflow: hidden;}
</style>
