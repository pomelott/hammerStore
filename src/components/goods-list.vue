<template>
	<div>
		<div id="main">
			<div class="sku-box store-content">
				<div class="sort-option">
					<ul class="line clear">
						<li><a href="javascript:;" class="active">综合排序</a></li>
						<li><a href="javascript:;" class="">销量排序</a></li>
						<li><a href="javascript:;" class="">价格低到高</a></li>
						<li><a href="javascript:;" class="">价格高到低</a></li>
					</ul>
				</div>
				<div class="gray-box">
					<div class="item-box">
						<goods-item :item='item' class="item" v-for='item in goodsData' :key='item.id'></goods-item>
					</div>
				</div>
			</div>
		</div>
		<prompt v-if='modelFlag'></prompt>
	</div>
</template>
<script>
	import goodsData from '@/lib/newGoodsData'
	import goodsItem from '@/components/goods-item'
	import prompt from '@/components/prompt'
	export default {
		data () {
			return {
				goodsData: goodsData
			}
		},
		computed: {
			modelFlag () {
				return this.$store.state.modelFlag
			}
		},
		components: {
			goodsItem,
			prompt
		}
	}
</script>
<style type="text/css"></style>