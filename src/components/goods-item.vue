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
			<span class="item-gray-btn"><a href="javascript:;" target="_blank">查看详情</a> </span><span class="item-blue-btn" @click.stop='doAddCartData(item.sku_info[typeIndex])'>加入购物车 </span>
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
				typeIndex: 0
			}
		},
		methods: {
			show (index) {
				this.typeIndex = index
			},
			doAddCartData (data) {
				this.$store.commit('addCartData', data)
			}
		}
	}
</script>