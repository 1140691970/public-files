<template>
	<view>
		<form>
			<u-form-item label="账号" prop="username">
				<input v-model="form.username" placeholder="请输入用户名" />
			</u-form-item>
			<u-form-item label="密码" prop="password">
				<input v-model="form.password" placeholder="请输入密码" />
			</u-form-item>
		<form>
		<button style="margin-top: 50rpx;"  @click="submit">提交</button>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				// 表单对应值
				form: {
					code: '',
					username: '', // 用户名
					password: '' ,// 密码
					siteId: 1001, // 站点id
					loginType: 1, // 用户类型 1管理员， 2货主， 3车主
				},
				// 定时器
				timer1: null,
			}
		},
		onLoad() {
			// 取缓存code
			try {
			    const code = uni.getStorageSync('code');
			    if (code && code !== '') {
			    	this.form.code = code
			    }
			} catch (e) {
			    // error
			}
		},
		onUnload(){  
		    if(this.timer1) {  
		        clearInterval(this.timer1);  
		        this.timer1 = null; 
		    }  
		},
		methods: {
			// 提交
			submit() {
				this.$u.api.getLogin(this.form).then(res=>{
					this.$u.toast(res.message);
					if (res.data) {
						this.$u.vuex('vuex_logoInfo', res.data);
						this.timer1 = setTimeout(()=>{
							uni.reLaunch({
								url: '/pages/home'
							});
						}, 1000)
					}
				})
			},
		},
	}
</script>

<style>
	page {
		padding: 20rpx 30rpx;
	}
</style>
