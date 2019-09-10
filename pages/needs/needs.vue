<template>
	<view class="content">
		<view v-if="!noData" class="listbox">
			<view
				v-for="(item,index) in listData"
				:key="index"
				class="item mt_20"
			>
				<uni-swipe-action
					:options="delOptions"
					@click="delClick($event,item.id)"
				>
					<navigator :url="'../needsSubPage/needsDetail/needsDetail?id='+item.id+'&type=1'">
						<needs-item :myData="item"></needs-item>
					</navigator>
				</uni-swipe-action>
			</view>
			<view v-if="showLoad" class="more">
				<text>{{moreText}}</text>
			</view>
		</view>
		<no-needs v-else></no-needs>
		<navigator url="../needsSubPage/addNeeds/addNeeds">
			<!-- <uni-icon v-if="!noData" class="add" type="plus-filled" size="60" color="#efd50e"></uni-icon> -->
			<image v-if="!noData" src="../../static/needs/add.png" class="add"></image>
		</navigator>
	</view>
</template>

<script>
import {Request,Alert} from "../../api/request.js";
import noNeeds from "../../components/needs/noNeeds";
import needsItem from "../../components/needs/needsItem";
import {uniIcon} from "@dcloudio/uni-ui";
import uniSwipeAction from "../../components/uni-swipe-action/uni-swipe-action.vue";

export default {
	data() {
		return {
			listData: [],
			moreText: "加载中...",
			noData: false,
			showLoad: true,
			delOptions: [{
                text: '删  除',
                style: {backgroundColor: '#dd524d'}
            }]
		}
	},
	// 下拉刷新
	onPullDownRefresh() {
		this.getList(false);
	},
	// 上拉加载
	onReachBottom(){
		this.moreText = "加载中..."
		uni.stopPullDownRefresh();
		this.moreText = "没有更多数据了";
	},
	onLoad(){
		uni.$on('needsGetList',()=>{this.getList(false)});
	},
	onShow(){
		Request({
			url: "/index/user/newReply",
			showLoad: false,
			success: (data)=>{
				let webView = this.$mp.page.$getAppWebview();
				webView.setTitleNViewButtonBadge({index: 0, text: (data.data && data.data.count) || ""});
			}
		});
		if(!this.listData.length){this.getList();}
	},
	// 导航栏按钮
	onNavigationBarButtonTap(e){
		if(e.index == 0){uni.navigateTo({url:"../common/message/message"})}
	},
	methods: {
		getList(){
			Request({
				url: "/index/user/myneeds",
				showLoad: false,
				success: (data)=>{
					uni.stopPullDownRefresh();
					this.listData = data.data;
					this.noData = !data.data.length;
					this.showLoad = false;
				}
			}); 
		},
		delClick(e,id){
			uni.showModal({
				title: "请确认",
				content: "要删除该需求吗？",
				success(data){
					if(!data.confirm){return;}
					Request({
						url:"/index/user/delmyneeds",
						data:{id:id},
						success(data){
							Alert("删除成功");
							uni.startPullDownRefresh();
						}
					})
				}
			})
		}
	},
	components:{noNeeds,needsItem,uniIcon,uniSwipeAction}
}
</script>

<style scoped>
.listbox{ padding:2upx 28upx 20upx;}
.item{border-radius:8upx; overflow:hidden;}
.addbox{height:132upx;}
.more{padding:20upx;color:#666666;font-size:30upx;text-align: center;}
.add{width:120upx; height:120upx; position:fixed; z-index:99; right:20upx; bottom:60upx;}
</style>
