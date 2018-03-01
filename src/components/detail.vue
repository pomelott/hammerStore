<template>
	<div id="main">
		<div class="store-content item">
			<div class="item-box">
				<div class="gallery-wrapper">
					<div class="gallery">
						<div class="thumbnail">
							<ul>
								<li :class="{'on': index == chooseIndex}" @click='changePic(index)' v-for='(img, index) in detailItem.ali_images' :key='img.id'><img :src="img+'?x-oss-process=image/resize,w_54/quality,Q_90/format,webp'"></li>
							</ul>
						</div>
						<div class="thumb">
							<ul>
								<li :class="{'on': index == chooseIndex}" v-for='(img, index) in detailItem.ali_images' :key='img.id'><img :src="img+'?x-oss-process=image/resize,w_440/quality,Q_90/format,webp'"></li>
							</ul>
						</div>
					</div>
				</div>
				<div class="banner">
					<div class="sku-custom-title">
						<div class="params-price">
							<span><em>¥</em><i>{{detailItem.price}}</i></span>
						</div>
						<div class="params-info">
							<h4>{{detailItem.title}}</h4>
							<h6>{{detailItem.sub_title}}</h6>
						</div>
					</div>
					<div class="sku-dynamic-params-panel">
						<div class="sku-dynamic-params clear">
							<span class="params-name">颜色</span>
							<ul class="params-colors">
								<li :class="{'cur': type.id == $route.query.gid }" v-for='type in detailItem.sku_list' :key='type.id' >
									<router-link :title='type.color' :to="{ path: '/detail',query: { gid: type.id }}"><img :src="'http://img01.smartisanos.cn/'+ type.image +'20X20.jpg'"></router-link>
								</li>

							</ul>
						</div>
						<div class="sku-dynamic-params clear">
							<div class="params-name">数量</div>
							<div class="params-detail clear">
								<div class="item-num js-select-quantity">
									<span class="down" :class="{'down-disabled':count<=1}" @click.stop='subCount' >-</span>
									<span class="num">{{count}}</span>
									<span class="up" :class="{'up-disabled':count>=detailItem.limit_num}" @click.stop='addCount' >+</span>
								</div>
							</div>
						</div>
					</div>
					<div class="sku-status">
						<div class="cart-operation-wrapper clearfix">
							<span class="blue-title-btn js-add-cart" @click='doAddCartData'><a>加入购物车</a></span>
							<span class="gray-title-btn"><a>现在购买</a></span>
						</div>
					</div>
				</div>
			</div>
		</div>
		<prompt v-if='modelFlag'></prompt>
	</div>
</template>
<script>
	import detailList from '@/lib/newItemsData'
	import prompt from '@/components/prompt'
	export default {
		data () {
			return {
				chooseIndex: 0,// 详情页左侧图片显示索引
				count: 1// 当前选择的数量
			}
		},
		components: {
			prompt
		},
		computed: {
			detailItem () {
				// 获取数据后筛选goods.sku_id与当前query的gid相同的索引值
				return detailList.filter((goods) => {
					return Number(this.$route.query.gid) === goods.sku_id
				})[0]
			},
			// 详情页增加商品数量到达上限后弹出提示框
			modelFlag () {
				return this.$store.state.modelFlag
			}
		},
		methods: {
			// 详情页左侧点击切换图片
			changePic (index) {
				this.chooseIndex = index
			},
			// 向购物车添加商品
			doAddCartData () {
				let itemData = {itemInfo: this.detailItem,count: this.count}
				this.$store.commit('addCartData', itemData)
			},
			// 增加商品数量
			addCount () {
				this.count++
				if (this.count > this.detailItem.limit_num) {
					this.count = this.detailItem.limit_num
				}
			},
			// 减少商品数量
			subCount () {
				this.count--
				if (this.count < 1) {
					this.count = 1
				}
			}
		},
		watch: {
			// 监控路由变化后，点击切换颜色后，将缩略图索引值改为0
			'$route.query.gid' () {
				this.chooseIndex = 0
			}
		}
	}
</script>