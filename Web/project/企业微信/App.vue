<script>
	const VConsole = require('./common/vConsole/vconsole.min.js')
	export default {
		onLaunch() {
			this.$wechat.wxAuthorize()
		},
		mounted() {
			var vConsole = new VConsole()
		},
	}
</script>

<style lang="scss">

</style>
