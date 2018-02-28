<template>
	<div id="header">
		<div class="nav-global">
			<div class="container">
				<h1 class="nav-logo">
					<a href="javascript:;"></a>
				</h1>
				<ul class="nav-aside">
					<li class="nav-user">
						<a href="javascript:;">个人中心</a>
						<!--active-->
						<div class="nav-user-wrapper">
							<div class="nav-user-list">
								<dl class="nav-user-avatar">
									<dd><span class="ng-scope"></span></dd>
									<dt class="ng-binding">+86 138****9453</dt>
								</dl>
								<ul>
									<li class="order"><a href="javascript:;">我的订单</a></li>
									<li class="support"><a href="javascript:;">售后服务</a></li>
									<li class="coupon"><a href="javascript:;">我的优惠</a></li>
									<li class="information"><a href="javascript:;">账户资料</a></li>
									<li class="address"><a href="javascript:;">收货地址</a></li>
									<li class="logout"><a href="javascript:;">退出</a></li>
								</ul>
							</div>
						</div>
					</li>
					<!--active-->
					<li class="nav-cart" @mouseover='showCart' @mouseleave='hideCart'>
						<a href="javascript:;">购物车</a>
						<!--根据class改变颜色-->
						<span class="cart-empty-num cart-num">
							<i>{{ numData }}</i>
						</span>
						<cart v-if='cartShowFlag' id='cartBox'></cart>
						<transition name='ballWrap' v-on:before-enter='beforeEnter' v-on:enter='enter' v-on:after-enter='afterEnter' v-bind:css='true'>
							<div class="ballBox" v-show='ball.show'>
								<img class="ball">
							</div>
						</transition>
					</li>
				</ul>
				<ul class="nav-list">
					<li><a href="javascript:;">在线商城</a></li>
					<li><a href="javascript:;">坚果 Pro</a></li>
					<li><a href="javascript:;">Smartisan M1 / M1L</a></li>
					<li><a href="javascript:;">Smartisan OS</a></li>
					<li><a href="javascript:;">欢喜云</a></li>
					<li><a href="javascript:;">应用下载</a></li>
					<li><a href="javascript:;">官方论坛</a></li>
				</ul>
			</div>
		</div>
		<div class="nav-sub">
			<div class="nav-sub-wrapper">
				<div class="container">
					<ul class="nav-list">
						<li><router-link to='/'>首页</router-link></li>
						<li><a href="javascript:;">手机</a></li>
						<li><a href="javascript:;">“足迹系列”手感膜</a></li>
						<li class="active"><a href="javascript:;">官方配件</a></li>
						<li><a href="javascript:;">周边产品</a></li>
						<li><a href="javascript:;">第三方配件</a></li>
						<li><a href="javascript:;">全部商品</a></li>
						<li><a href="javascript:;">服务</a></li>
					</ul>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
	import cart from '@/components/cart'
	import {mapMutations, mapActions} from 'vuex'
	export default {
		components: {
			cart
		},
		computed: {
			numData () {
				return this.$store.getters.calNumToal
			},
			cartShowFlag () {
				return this.$store.state.cartShowFlag
			},
			ball () {
				return this.$store.state.ball
			}
		},
		methods: {
			...mapMutations({
				'showCart': 'showCart'
			}),
			...mapActions({
				'hideCart': 'hideCartAct'
			}),
			beforeEnter (el) {
				let btnRect = this.ball.el.getBoundingClientRect()// 点击按钮的位置对象
				let cartBoxRect = document.querySelector('.cart-num').getBoundingClientRect()// 购物车图标的位置对象
				let x = (cartBoxRect.left + cartBoxRect.width / 2) - (btnRect.left + btnRect.width / 2) - 25// 两个位置的水平距离
				let y = (btnRect.top + btnRect.height / 2) - (cartBoxRect.top + cartBoxRect.height / 2) - 40// 两个位置的垂直距离
				el.style.transform = 'translateY(' + y + 'px)'// 初始化y轴位移
				document.querySelector('.ball').style.transform = 'translateX(-' + x + 'px)'// 初始化x轴位移
				document.querySelector('.ball').src = this.ball.img// 初始化小球的缩略图片
			},
			enter (el) {
				// 更新el用于触发transition
				let a = el.offsetHeight
				el.a = a
				// 更新transition过渡
				el.style.transform = 'translateY(' + -25 + 'px)'
				document.querySelector('.ball').style.transform = 'translateX(' + 0 + ')'
			},
			afterEnter (el) {
				this.ball.show = false
			}
		}

	}
</script>
<style>
	.ballBox{
		position: relative;
		z-index: 1000;
	}
	.ball{
		height: 30px;
		width: 30px;
		border-radius: 50%;
		overflow: hidden;
		box-shadow: 0 0 10px #ddd;
	}
	/*垂直效果为贝塞尔曲线*/
	.ballWrap-enter-active{
		transition:all cubic-bezier(.17,.67,.55,.94) .5s;
	}
	/*水平为线性效果*/
	.ballWrap-enter-active .ball{
		transition:all linear .5s;
	}
</style>