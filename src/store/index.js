import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

var store = new Vuex.Store({
	state: {
		cartList: [], // 购物车数据
		numTotal: 0,  // 购物车商品总数量
		priceTotal: 0 // 购物车商品总价格
	},
	mutations: {
		addCartData (state, data) {
			let flag = true // 是否为未加过的商品(包括规格颜色不同的商品)
			state.cartList.forEach(goods => {
				if (goods.sku_id === data.sku_id) {
					goods.count++
					flag = false
				}
			})
			if (flag) {
				Vue.set(data, 'count', 1)
				state.cartList.push(data)
			}
		}
	},
	getters: {
		calNumToal: state => {
			let total = 0
			state.cartList.forEach(goods => {
				total += goods.count
			})
			state.numTotal = total
			return state.numTotal
		},
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