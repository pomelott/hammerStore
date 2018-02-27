import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

var store = new Vuex.Store({
	state: {
		cartList: [],// 购物车数据
		numTotal: 0, // 购物车商品总数量
		priceTotal: 0,// 购物车商品总价格
		modelFlag: false,// 弹出层开关
		cartShowFlag: false,// 购物车开关
		// 添加至购物车时显示的小球
		ball: {
			show: false,
			el: null,
			img: ''
		}
	},
	mutations: {
		addCartData (state, data) {
			let flag = true// 是否为未加过的商品(包括规格颜色不同的商品)
			state.cartList.forEach(goods => {
				if (goods.sku_id === data.sku_id) {
					if (goods.count >= goods.limit_num) { // 超过规定数量后显示模态框
						state.modelFlag = true
					} else {
						goods.count++// 购物车有相同类型商品，数量自增1
						// 初始化小球数据
						state.ball.el = event.path[0]
						state.ball.show = true
						state.ball.img = data.ali_image
						state.cartShowFlag = true// 每添加一次显示模态框
					}
					flag = false
				}
			})
			if (flag) {
				Vue.set(data, 'count', 1)// 购物车没有相同类型商品，则将新商品添加至cartList中，并将数量设置为1
				state.cartList.push(data)
				state.cartShowFlag = true// 每添加一次显示模态框
				// 初始化小球数据
				state.ball.el = event.path[0]
				state.ball.show = true
				state.ball.img = data.ali_image
			}
		},
		doDelGoods (state, data) {
			let nowIndex = state.cartList.indexOf(data)
			let nowCount = state.cartList[nowIndex].count
			nowCount--
			Vue.set(state.cartList[nowIndex], 'count', nowCount)
			if (!nowCount) {
				state.cartList.splice(nowIndex, 1)
			}
		},
		closeModel (state) {
			state.modelFlag = false
		},
		showCart (state) {
			state.cartShowFlag = true
		},
		hideCart (state) {
			state.cartShowFlag = false
		}
	},
	actions: {
		hideCartAct ({commit}) {
			setTimeout(() => {
				commit('hideCart')
			}, 500)
		}
	},
	getters: {
		// 计算购物车中的总数量
		calNumToal: state => {
			let total = 0
			state.cartList.forEach(goods => {
				total += goods.count
			})
			state.numTotal = total
			return state.numTotal
		},
		// 计算购物车中的总价格
		calPriceTotal (state) {
			let total = 0
			state.cartList.forEach(goods => {
				total += goods.count * goods.price
			})
			state.priceTotal = total
			return state.priceTotal
		}
	}
})

export default store