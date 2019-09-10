<template>
	<view class="content"
		@touchstart="touchStart"
		@touchend="touchEnd"
	>
		<view class="topTab">
			<view class="barbox" :style="{left:tabLeft}">
				<view class="bar"></view>
			</view>
			<view
				v-for="item in topTab"
				:key="item.id"
				@click.native="changeTab(item.id)"
				:class="[{active: tab===item.id},'tab']"
			>
				<text class="tabTxt fs_32">
					{{item.text}}
				</text>
			</view>
		</view>
		<view class="listbox">
			<view
				v-for="(item,index) in nowList"
				:key="index"
			>
				<navigator :url="'../indexSubPage/article/article?id='+item.id+'&tab='+tabName">
					<item-one
						v-if="tab!=3"
						:myData="item"
					></item-one>
				</navigator>
				<navigator :url="'../indexSubPage/role/role?id='+item.id">	
					<item-two
						v-if="tab==3"
						:myData="item"
					></item-two>
				</navigator>
			</view>
			<view class="more">
				<text>{{moreText[tab]}}</text>
			</view>
		</view>
	</view>
</template>

<script>
import {Request,Alert} from "../../api/request.js";
import ItemOne from "../../components/index/ItemOne";
import ItemTwo from "../../components/index/ItemTwo";

export default {
	data() {
		return {
			tabLeft:"0",
			topTab:[
				{id:0, text:"资讯", upid:1},
				{id:1, text:"政策", upid:2},
				{id:2, text:"需求", upid:3},
				{id:3, text:"智库", upid:4},
			],
			tab:0,
			tabName:"咨询",
			listData:[[],[],[],[]],
			pages:[1,1,1,1],
			onePageLen:10,
			nowList:[],
			moreText: ["","","",""],
			showLoading: true,
			tcStart: {x:0,y:0},
		}
	},
	onLoad() {
		this.getList();
	},
	// 下拉刷新
	onPullDownRefresh() {this.getList()},
	// 上拉加载
	onReachBottom(){this.addPage()},
	// 导航栏按钮
	onNavigationBarButtonTap(e){
		if(e.index == 0){uni.navigateTo({url:"../common/message/message"})}
		else if(e.index == 1){uni.navigateTo({url:"../indexSubPage/search/search"})}
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
	},
	methods: {
		getList(){
			let tab = this.tab;
			this.pages[tab] = 1;
			this.showLoading = true;
			this.moreText[tab] = "加载中...";
			Request({
				url: "/index/news",
				showLoad: false,
				data: {
					type: this.topTab[this.tab].upid,
					page: this.pages[tab],
					per_page: this.onePageLen
				},
				success: (data)=>{
					uni.stopPullDownRefresh();
					this.listData[tab] = data.data.data;
					this.nowList = this.listData[this.tab];
					if(!data.data.length || data.data.length < this.onePageLen){
						this.moreText[tab] = "没有更多数据了";
						return false;
					}
					this.moreText[tab] = "上拉加载更多";
				},
				error: ()=>{
					uni.stopPullDownRefresh();
					this.moreText[tab] = "没有更多数据了";
					Alert("请求错误");
				}
			});
		},
		addPage(){
			let tab = this.tab;
			this.showLoading = true;
			this.moreText[tab] = "加载中...";
			this.pages[tab]++;
			
			Request({
				url: "/index/news",
				showLoad: false,
				data: {
					type: this.topTab[this.tab].upid,
					page: this.pages[tab],
					per_page: this.onePageLen
				},
				success: (data)=>{
					uni.stopPullDownRefresh();
					if(!data.data || !data.data.data){return false;}
					if(!data.data.data.length){
						this.pages[tab]--;
						this.moreText[tab] = "没有更多数据了";
					} else if(data.data.data.length < this.onePageLen){
						this.listData[tab] = this.listData[tab].concat(data.data.data);
						this.moreText[tab] = "没有更多数据了";
					}else{
						this.listData[tab] = this.listData[tab].concat(data.data.data);
						this.moreText[tab] = "上拉加载更多";
					}
					this.nowList = this.listData[this.tab];
				},
				error: ()=>{
					uni.stopPullDownRefresh();
					this.moreText[tab] = "上拉加载更多";
					Alert("请求错误");
				}
			});
		},
		changeTab(id){
			if(this.tab === id){return false;}
			this.tab = id;
		},
		touchStart(e){
			let p = e.touches[0];
			this.tcStart = {x:p.pageX, y:p.pageY};
		},
		touchEnd(e){
			let p = e.changedTouches[0];
			let swipe = this.getSwipe(this.tcStart,{x:p.pageX, y:p.pageY});
			if(swipe===2 && this.tab>0){this.tab--}
			if(swipe===3 && this.tab<3){this.tab++}
		},
		getSwipe(s,e){
			// 1,点击 2,左滑 3,右滑 4,上滑 5,下滑
			var lx = e.x - s.x;
			var ly = e.y - s.y;
			if(Math.abs(lx)<70){
				if(Math.abs(ly)<70){return 1;}
				return ly>0?4:5;
			}else{
				if(Math.abs(ly)>Math.abs(lx)){return ly>0?4:5;}
				return lx>0?2:3;
			}
		}
	},
	computed:{
		listHeight(){
			return uni.getSystemInfoSync().windowHeight + "px";
		}
	},
	watch:{
		tab(){
			this.nowList = this.listData[this.tab];
			if(!this.nowList.length){
				this.getList()
			}else{
				this.showLoading = this.nowList.length >= this.onePageLen;
			}
			this.tabName = this.topTab[this.tab].text;
			this.tabLeft = this.tab * 25 + "%";
		}
	},
	components:{
		ItemOne,
		ItemTwo
	}
}
</script>

<style scoped>
.content{display:flex; flex-direction: column;}
.topTab{position:fixed; top:0; display:flex; width:100%; height:88upx; flex-direction:row; z-index: 99; background:#FFFFFF;box-shadow: 0px 0px 8px 0px rgba(0, 0, 0, 0.2);}
.topTab > .tab{flex:1; display:flex; align-items: center; justify-content: center;}
.topTab > .tab.active{color:#ff0000;}
.topTab > .tab.active .tabTxt{font-weight:bold; color:#333333;}
.listbox{padding:100upx 28upx 20upx;}
.more{padding:20upx;color:#666666;font-size:30upx;text-align: center;}
.barbox{position:absolute; display:flex; justify-content:center; width:25%; height:14upx; bottom:26upx; transition:left 0.3s; z-index:-1;}
.bar{width:50%; height:100%; background:#ffe30a;}
</style>

