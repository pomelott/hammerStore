<template>
	<div id="main">
			<div class="content page-order-checkout checkout">
				<div class="js-checkout-address-box">
					<div class="gray-box clear">
						<div class="title columns-title pre-title">
							<h2>收货信息</h2>
						</div>
						<div class="box-inner js-checkout-address-panel ">
							<div class="address-common-table js-multiple-address-panel">
								<ul class="address-item-list clear js-address-item-list">
									<li class="js-choose-address" @click.stop='selectAdd(index)' :class="{'selected-address-item': addIndex == index}" v-for='(item, index) in addList' :key='index'>
										<div class="address-item">
											<div class="name-section">{{item.name}}</div>
											<div class="mobile-section">{{item.phone}}</div>
											<div class="detail-section"> {{item.province}} {{item.city}} {{item.county}}<br> {{item.add}} </div>
										</div>
										<div class="operation-section">
											<span class="update-btn js-edit-address">修改</span>
											<span class="delete-btn js-delete-address">删除</span>
										</div>
									</li>
									<li class="add-address-item js-add-address" @click.stop='showAddPop'>
										<p>使用新地址</p>
									</li>
								</ul>
							</div>
						</div>
					</div>
				</div>
				<div class="gray-box">
					<div class="title">
						<h2>发票信息</h2>
					</div>
					<div class="box-inner invoice-box js-invoice-box">
						<p class="invoice-detail"> 发票类型：电子发票 </p>
						<div class="invoice-detail"> 发票抬头：
							<div class="radio-box">
								<label @click.stop='invoiceChecked(true)'>
									<input type="radio" class="hide">
									<span class="blue-radio " :class="{'blue-radio-on': invoice.personal}"><a></a></span>个人
								</label>
								<label @click.stop='invoiceChecked(false)'>
									<input type="radio" class="hide">
									<span class="blue-radio" :class="{'blue-radio-on': !invoice.personal}"><a></a></span>单位
								</label>
							</div>
							<div class="module-form-row form-item fn-hide js-invoice-title" v-if='!invoice.personal'>
								<div class="module-form-item-wrapper no-icon small-item">
									<i v-show='!invoice.headText'>请填写公司发票抬头</i>
									<input type="text" class="js-verify" v-model='invoice.headText'>
								</div>
							</div>
						</div>
						<p class="invoice-detail">发票内容：购买商品明细</p> <p class="invoice-label">电子发票是税务局认可的有效收付款凭证，可作为售后服务凭据。电子发票打印后可以用于企业报销。 </p>
					</div>
				</div>
				<div class="gray-box">
					<div class="title pre-title">
						<h2>购物清单</h2>
					</div>
					<div class="box-inner ui-goods-cart">
						<div class="gray-sub-title cart-table-title">
							<span class="name">商品名称</span>
							<span class="subtotal">小计</span>
							<span class="num">数量</span>
							<span class="price">单价</span>
						</div>
						<div class="cart-table">
							<div class="cart-group js-cart-group">
								<div class="cart-items" v-for='item in toCheckGoods' :key='item.id'>
									<div class="items-thumb">
										<a href="javascript:;" target="_blank"><img :src="item.ali_image+'?x-oss-process=image/resize,w_80/quality,Q_100/format,webp'"></a>
									</div>
									<div class="name hide-row">
										<div class="name-cell">
											<a href="javascript:;" :title="item.title+'（'+ item.spec_json.show_name +'）'" target="_blank">{{item.title}}（{{item.spec_json.show_name}}）</a>
										</div>
									</div>
									<div class="subtotal">
										<div class="subtotal-cell">  ¥ {{item.price}}.00  </div>
									</div>
									<div class="goods-num">{{item.count}}</div>
									<div class="price">¥ {{ item.price * item.count }}.00</div>
								</div>
							</div>
						</div>
					</div>
					<div class="box-inner">
						<div class="order-discount-line">
							<p> 商品总计：<span>¥ {{choseAllTotalPrice}}.00</span></p>
							<p> 运费： <span>+ ¥ {{transFee}}.00</span> </p>
							<p class="discount-line js-discount-cash"> <em>现金券</em>： <span> - 0 </span> </p>
						</div>
					</div>
					<div class="box-inner">
						<div class="last-payment clear">
							<span class="jianguo-blue-main-btn big-main-btn payment-blue-bt fn-right js-checkout" @click='subOrder'><a>提交订单</a> </span> <span class="prices fn-right">应付金额： <em>¥ {{choseAllTotalPrice + transFee}}.00</em></span>
						</div>
					</div>
				</div>
			</div>
			<add-pop v-if='popShow' @closepop='popHandle'></add-pop>
		</div>
</template>
<script>
	import addPop from '@/components/address-pop'// 已有地址信息
	export default {
		data () {
			return {
		        addIndex: 0,// 当前选中的地址（默认地址）索引
		        popShow: false,// 是否显示新增地址模态框
		        invoice: { // 发票信息
		        	personal: false,// 是否为个人
		        	headText: ''
		        }
			}
		},
		components: {
			addPop
		},
		computed: {
			// 购物车中选中的商品
			toCheckGoods () {
				return this.$store.getters.toCheckGoods
			},
			// 购物车中选中的商品总价
			choseAllTotalPrice () {
				return this.$store.getters.choseAllTotalPrice
			},
			// 根据商品价格计算的运费
			transFee () {
				let trans = 8
				if (this.choseAllTotalPrice >= 88 || this.choseAllTotalPrice === 0) {
					trans = 0
				}
				return trans
			},
			// 地址列表
			addList () {
				return this.$store.state.receiveInfo
			}
		},
		methods: {
			// 选择默认地址
			selectAdd (index) {
				this.addIndex = index
			},
			// 关闭新增地址模态框后，判断新增地址是否选择了设为默认
			popHandle () {
				this.popShow = false
				this.$store.state.receiveInfo.forEach((item, index) => {
					if (item.default === true) {
						this.addIndex = index
					}
				})
			},
			// 显示新增地址模态框
			showAddPop () {
				this.popShow = true
			},
			// 控制选择发票抬头
			invoiceChecked (boo) {
				this.invoice.personal = boo
			},
			// 提交订单
			subOrder () {
				let nowOrderAdd = this.$store.state.receiveInfo[this.addIndex]
				if (!this.invoice.personal && !this.invoice.headText) {
					alert(`公司抬头为必填项！`) // 简易正则判断
				}
				if (this.invoice.personal) {
					this.invoice.headText = '个人'
				}
				let iDate = new Date()
				let iMonth = iDate.getMonth() + 1
				let iDay = iDate.getDate()
				if (iMonth > 0 && iMonth <= 9) {
					iMonth = '0' + iMonth
				}
				if (iDay > 0 && iDay <= 9) {
					iDay = '0' + iDay
				}
				let orderItem = {
					orderId: iDate.getTime(),
					orderGoods: this.toCheckGoods,
					orderTotalPrice: this.choseAllTotalPrice,
					orderTrans: this.transFee,
					orderAdd: nowOrderAdd,
					orderInvoiceName: this.invoice.headText,
					orderDate: iDate.getFullYear() + '-' + iMonth + '-' + iDay,
					isPay: false
				}
				this.$store.commit('subOrd', orderItem)
				this.$router.push({path:'/pay', query: {orderId: orderItem.orderId}})
			}
		}
	}
</script>