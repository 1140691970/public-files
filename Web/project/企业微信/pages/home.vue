<template>
	<view class="wrap">
		<view class="list-wrap">
			<button class="close-btn" @click="logOut">退出登录</button>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {

			}
		},
		onLoad() {
			// 获取到code就存入缓存，否则跳登录页面
			let code = this.util.getQueryString('code')
			try {
				if (code && code != '') {
					uni.setStorageSync('code', code);
				}
			} catch (e) {
				// error
			}

			if (!this.vuex_logoInfo) {
				uni.reLaunch({
					url: '/pages/src/login'
				})
			}
		},
		methods: {
			// 退出登录
			logOut() {
				uni.showModal({
					title: '提示',
					content: '是否退出登录',
					success: res => {
						if (res.confirm) {
							this.$u.vuex('vuex_logoInfo', null);
							uni.removeStorage({
								key: 'lifeData',
								success: res => {
									this.$wechat.closeWindow()
								}
							});
						}
					}
				});
			},
		}
	}
</script>

<style lang="scss" scoped>
	.u-cell-icon {
		width: 36rpx;
		height: 36rpx;
		margin-right: 8rpx;
	}

	.close-btn {
		margin: 13px 16px;
	}
</style>
