export const BASE_URL = "http://scapi.raysightiot.cn";
export const FILE_URL = "http://scapi.raysightiot.cn";
export const Alert = (str)=>{plus.nativeUI.toast(str)};
// ajax
export const Request = (obj)=>{
	let account = uni.getStorageSync('account');
	let token = uni.getStorageSync('token');
	let outTime = uni.getStorageSync('outTime');
	outTime = Number(outTime);
	
	if(!outTime || Date.now()>outTime){outLogin(!!outTime);return false;}
	if(!obj){return false;}
	if(obj.showLoad!==false){plus.nativeUI.showWaiting();}
	
	uni.request({
		url: `${BASE_URL}${obj.url}?account=${account}&token=${token}`,
		data: obj.data || {},
		method: obj.type || "GET",
		success: (data)=>{
			plus.nativeUI.closeWaiting();
			if(data.data.code == 2){outLogin(true);return false;}
			if(data.data.code){
				Alert(data.data.message);
				if(obj.isCode){obj.isCode(data.data);}
				return false;
			}
			if(obj.success){obj.success(data.data);}
		},
		fail: (data)=>{
			plus.nativeUI.closeWaiting();
			if(obj.error){
				obj.error(data);
			} else {
				Alert("请求发生错误");
			}
		}
	});
}
// 登录ajax
export const SignRequest = (obj)=>{
	if(!obj){return false;}
	if(obj.showLoad!==false){plus.nativeUI.showWaiting();}
	
	uni.request({
		url: `${BASE_URL}${obj.url}`,
		data: obj.data || {},
		method: obj.type || "GET",
		success: (data)=>{
			plus.nativeUI.closeWaiting();
			if(data.data.code){
				Alert(data.data.message);
				if(obj.isCode){obj.isCode(data.data);}
				return false;
			}
			if(obj.success){obj.success(data.data);}
		},
		fail: (data)=>{
			plus.nativeUI.closeWaiting();
			if(obj.error){
				obj.error(data);
			} else {
				Alert("请求发生错误");
			}
		}
	});
}
// 上传文件
export const UpFile = (obj)=>{
	let account = uni.getStorageSync('account');
	let token = uni.getStorageSync('token');
	let outTime = uni.getStorageSync('outTime');
	outTime = Number(outTime);
	
	if(!outTime || Date.now()>outTime){outLogin(!!outTime)}
	if(!obj){return false;}
	
	plus.nativeUI.showWaiting();
	uni.uploadFile({
		url: `${BASE_URL}${obj.url}?account=${account}&token=${token}`,
		filePath: obj.filePath,
		name: obj.name,
		success: (data)=>{
			data.data = JSON.parse(data.data);
			plus.nativeUI.closeWaiting();
			if(data.data.code == 2){outLogin(true);return false;}
			if(data.data.code){Alert(data.data.message);return false;}
			if(obj.success){obj.success(data.data);}
		},
		fail: (data)=>{
			plus.nativeUI.closeWaiting();
			if(obj.error){
				obj.error(data);
			} else {
				Alert("上传失败！");
			}
		}
	});
}
// 退出登录
export const outLogin = (alert)=>{
	if(alert){plus.nativeUI.toast("登录失效！请重新登录")}
	uni.removeStorageSync('account');
	uni.removeStorageSync('token');
	uni.reLaunch({url: "/pages/sign/login/login"});
}