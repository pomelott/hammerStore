<template>
	<div>
		<transition name='test' @before-enter='beforeTest' @enter='enterTest' @after-enter='afterTest'><div class="test-box" v-show='show'></div></transition>
		<button @click='show=!show'>test</button>
	</div>
</template>
<script>
	export default {
		data () {
			return {
				show: true
			}
		},
		methods: {
			beforeTest () {
				document.querySelecter('.test-box').style.transform = 'translateX(0)'
			},
			enterTest () {
				document.querySelecter('.test-box').style.transform = 'translateX(100px)'
			},
			afterTest () {
				document.querySelecter('.test-box').style.opacity = '0'
			}
		}
	}
</script>
<style>
	.test-box{
		width: 50px;
		height: 50px;
		background: #ff0;
	}
	.test-enter-active{
		transition: all linear 2s;
	}
</style>