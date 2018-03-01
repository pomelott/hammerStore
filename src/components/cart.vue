<template>
	<div class="nav-cart-wrapper" @click.stop>
		<div class="nav-cart-list">
			<div class="empty" v-if='numData<=0'>
				<h3>购物车为空</h3>
				<p>您还没有选购任何商品，现在前往商城选购吧!</p>
			</div>
			<div class="full" v-else>
				<div class="nav-cart-items">
					<ul>
						<li class="clear">
							<div class="cart-item js-cart-item cart-item-sell">
								<div class="cart-item-inner" v-for='item in cartData' :key='item.id'>
									<div class="item-thumb">
										<img :src="item.ali_image">
									</div>
									<div class="item-desc">
										<div class="cart-cell">
											<h4>
												<a href="#/item/100027401">{{ item.title }}</a>
											</h4>
											<p class="attrs">
												<span>{{ item.show_name }}</span>
											</p>
											<h6>
												<span class="price-icon">¥</span><span class="price-num">{{ item.price }}</span><span class="item-num">x {{ item.count }}</span>
											</h6>
										</div>
									</div>
									<div class="del-btn" @click='delGoods(item)'>删除</div>
								</div>
							</div>
						</li>
					</ul>
				</div>
				<div class="nav-cart-total">
					<p>共 <strong class="ng-binding">{{ numData }}</strong> 件商品</p>
					<h5>合计：<span class="price-icon">¥</span><span class="price-num ng-binding" ng-bind="cartMenu.totalPrice">{{ totalPriceData }}</span></h5>
					<h6>
						<!-- <a ng-href="http://www.smartisan.com/shop/#/cart" class="nav-cart-btn" href="http://www.smartisan.com/shop/#/cart">去购物车</a> -->
						<router-link to='/cart' class="nav-cart-btn">去购物车</router-link>
					</h6>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
	export default {
		computed: {
			// 购物车数据
			cartData () {
				return this.$store.state.cartList
			},
			// 购物车商品总数
			numData () {
				return this.$store.getters.calNumToal
			},
			// 购物车商品总价
			totalPriceData () {
				return this.$store.getters.calPriceTotal
			}
		},
		methods: {
			// 提交删除商品
			delGoods (item) {
				this.$store.commit('doDelGoods', item)
			}
		}
	}
</script>