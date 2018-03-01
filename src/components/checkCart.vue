<template>
	<div id="main" class="hander-car">
		<div class="store-content">
			<div class="cart-box">
				<div class="title">
					<h2>购物清单</h2>
				</div>
				<div class="cart-inner">
					<div class="empty-label" v-if='!totalCount'>
						<h3>您的购物车中还没有商品</h3>
						<router-link to='/' class="link">现在选购</router-link>
					</div>
					<div v-else>
						<div class="cart-table-title">
							<span class="name">商品信息</span>
							<span class="operation">操作</span>
							<span class="subtotal">小计</span>
							<span class="num">数量</span>
							<span class="price">单价</span>
						</div>
						<div class="cart-table">
							<div class="cart-group">
								<!--购物列表-->
								<div class="cart-top-items" v-for='item in cartList' :key='item.id'>
									<div class="cart-items">
										<div class="items-choose">
											<span class="blue-checkbox-new" :class="{'checkbox-on': item.checked }" @click.stop='changeChecked(item.sku_id)'><a></a></span>
										</div>
										<div class="items-thumb">
											<img :src="item.ali_image">
											<a href="javascript:;" target="_blank"></a>
										</div>
										<div class="name hide-row" >
											<div class="name-table">
												<a href="javascript:;" target="_blank">{{item.title}}</a>
												<ul class="attribute">
													<li>{{item.spec_json.show_name}}</li>
												</ul>
											</div>
										</div>
										<div class="operation">
											<a class="items-delete-btn" @click='delGoods(item)'></a>
										</div>
										<div class="subtotal">¥ {{item.price * item.count}}.00</div>
										<div class="item-cols-num">
											<div class="select js-select-quantity">
												<span class="down" @click.stop='subCartNumHandle(item.sku_id)' :class="{'down-disabled':item.count<=1}">-</span>
												<span class="num">
													<input type="text" style="display: inline-block;" v-model='item.count'>
													<ul>
														<li>1</li>
														<li>2</li>
													</ul>
												</span>
												<span class="up" @click.stop='plusCartNumHandle(item.sku_id)' :class="{'up-disabled':item.count>=item.limit_num}">+</span>
											</div>
										</div>
										<div class="price">¥ {{item.price}}.00</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
				<div class="cart-bottom-bg fix-bottom" v-if='totalCount'>
					<div class="cart-bar-operation">
						<div>
							<div class="choose-all js-choose-all">
								<span class="blue-checkbox-new " :class="{'checkbox-on': allChecked}" @click.stop='changeAllChecked(allChecked)'><a></a></span>
								全选
							</div>
							<div class="delete-choose-goods" @click.stop='delChoseGoods'>删除选中的商品</div>
						</div>
					</div>
					<div class="shipping">
						<div class="shipping-box">
							<div class="shipping-total shipping-num">
								<h4 class="">
									已选择 <i>{{choseAllNum}}</i> 件商品
								</h4>
								<h5>
									共计 <i >{{totalCount}}</i> 件商品
								</h5>
							</div>
							<div class="shipping-total shipping-price">
								<h4 class="">应付总额：<span>￥</span><i >{{choseAllPrice}}</i></h4>
								<h5 class="shipping-tips">
									应付总额不含运费
								</h5>
							</div>
						</div>
						<router-link tag='span' to='/checkout' class="jianguo-blue-main-btn big-main-btn js-checkout" :class="{'disabled-btn': choseAllNum <=0}"><a>现在结算</a></router-link>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
	export default {
		computed: {
			cartList () {
				return this.$store.state.cartList
			},
			totalCount () {
				return this.$store.getters.calNumToal
			},
			totalPrice () {
				return this.$store.getters.calPriceTotal
			},
			// 是否全选
			allChecked () {
				return this.$store.getters.judgeAllChecked
			},
			// 选中的商品总数
			choseAllNum () {
				return this.$store.getters.choseAllNum
			},
			// 选中的商品总价格
			choseAllPrice () {
				return this.$store.getters.choseAllTotalPrice
			}
		},
		methods: {
			// 提交删除商品
			delGoods (item) {
				this.$store.commit('doDelGoods', item)
			},
			// 提交增加商品数量
			plusCartNumHandle (id) {
				this.$store.commit('plusCartNum', id)
			},
			// 提交减少商品数量
			subCartNumHandle (id) {
				this.$store.commit('subCartNum', id)
			},
			// 提交改变选中状态
			changeChecked (id) {
				this.$store.commit('changeChecked', id)
			},
			// 提交改变全选状态
			changeAllChecked (allChecked) {
				this.$store.commit('changeAllChecked', allChecked)
			},
			// 提交删除选中商品
			delChoseGoods () {
				this.$store.commit('delChoseGoods')
			}
		}
	}
</script>