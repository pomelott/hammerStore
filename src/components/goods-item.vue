<template>
	<div>
		<div class="item-img"><img :alt="item.name_title" :src="item.sku_info[typeIndex].ali_image+'?x-oss-process=image/resize,w_206/quality,Q_80/format,webp'">
		</div>
		<h6>{{item.name}}</h6>
		<h3 >{{item.name_title}}</h3>
		<div class="params-colors">
			<ul class="colors-list">
				<li v-for='(sku, index) in item.sku_info' :key='sku.id' :title='sku.show_name'><a href="javascript:;" :class="{'active': typeIndex == index}" @click='show(index)'><img :src="'http://img01.smartisanos.cn/'+sku.spec_json.image+'20X20.jpg'"></a></li>
			</ul>
		</div>
		<div class="item-btns clearfix">
			<span class="item-gray-btn"><router-link :to="{ path: '/detail',query: { gid: item.sku_info[typeIndex].sku_id }}">查看详情</router-link></span><span class="item-blue-btn" @click.stop='doAddCartData(item.sku_info[typeIndex])'>加入购物车 </span>
		</div>
		<div class="item-price clearfix">
			<i>¥</i><span>{{ item.price }}</span>
		</div>
		<div class="discount-icon">false</div>
		<div class="item-cover">
			<a href="javascript:;" target="_blank"></a>
		</div>
	</div>
</template>
<script type="text/javascript">
	export default {
		props: ['item'],
		data () {
			return {
				typeIndex: 0// 商品当前选中的颜色索引
			}
		},
		methods: {
			// 切换列表商品颜色
			show (index) {
				this.typeIndex = index
			},
			// 向购物车添加商品
			doAddCartData (data) {
				let itemData = {itemInfo: data,count: 1}
				this.$store.commit('addCartData', itemData)
			}
		}
	}
</script>